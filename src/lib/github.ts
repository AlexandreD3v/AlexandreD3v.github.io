import { profile } from '../data/site';
import { readEnv, skipRemote } from './env';
import { fetchOk } from './http';
import type { RepoCard, RepoResult } from './types';

interface GitHubRepo {
  name?: string;
  description?: string | null;
  html_url?: string;
  language?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  pushed_at?: string | null;
  fork?: boolean;
  archived?: boolean;
  private?: boolean;
  topics?: string[];
}

function fallbackRepos(): RepoCard[] {
  return sortRepos(
    profile.fallbackRepos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.url,
      language: repo.language,
      stars: null,
      forks: null,
      pushedAt: null,
    })),
  );
}

function priorityRank(name: string): number | undefined {
  const index = profile.priorityRepos.findIndex((repo) => repo.toLowerCase() === name.toLowerCase());
  return index === -1 ? undefined : index;
}

export function sortRepos(repos: RepoCard[]): RepoCard[] {
  return [...repos].sort((a, b) => {
    const rankA = priorityRank(a.name);
    const rankB = priorityRank(b.name);
    if (rankA !== undefined && rankB !== undefined) return rankA - rankB;
    if (rankA !== undefined) return -1;
    if (rankB !== undefined) return 1;
    const timeA = a.pushedAt ? Date.parse(a.pushedAt) : 0;
    const timeB = b.pushedAt ? Date.parse(b.pushedAt) : 0;
    return timeB - timeA;
  });
}

function nextPage(link: string | null): string | null {
  if (!link) return null;
  for (const part of link.split(',')) {
    const match = part.match(/<([^>]+)>;\s*rel="next"/);
    if (match?.[1]) return match[1];
  }
  return null;
}

function listed(names: readonly string[], name: string): boolean {
  const target = name.toLowerCase();
  return names.some((item) => item.toLowerCase() === target);
}

function repoText(repo: GitHubRepo): string {
  const topics = Array.isArray(repo.topics) ? repo.topics.join(' ') : '';
  return `${repo.name ?? ''} ${repo.description ?? ''} ${topics}`.toLowerCase();
}

/** Denylist vence allowlist. Allowlist vence o filtro por palavras. */
export function repoMatchesFocus(repo: { name: string; description: string | null; language: string | null; topics?: string[] }): boolean {
  const name = repo.name;
  if (listed(profile.repoFilter.deny, name)) return false;
  if (listed(profile.repoFilter.allow, name)) return true;

  const text = `${name} ${repo.description ?? ''} ${(repo.topics ?? []).join(' ')}`.toLowerCase();
  if (profile.repoFilter.excludeKeywords.some((keyword) => text.includes(keyword.toLowerCase()))) return false;

  const language = (repo.language ?? '').toLowerCase();
  return profile.repoFilter.includeKeywords.some((keyword) => {
    const needle = keyword.toLowerCase();
    return text.includes(needle) || language === needle;
  });
}

function toCard(repo: GitHubRepo): RepoCard | null {
  if (typeof repo.name !== 'string' || typeof repo.html_url !== 'string') return null;
  if (repo.fork !== false || repo.archived !== false || repo.private === true) return null;
  if (!repoMatchesFocus({
    name: repo.name,
    description: typeof repo.description === 'string' ? repo.description : null,
    language: typeof repo.language === 'string' ? repo.language : null,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
  })) {
    return null;
  }

  const description =
    typeof repo.description === 'string' && repo.description.trim()
      ? repo.description
      : (profile.descriptionOverrides[repo.name] ?? null);

  return {
    name: repo.name,
    description,
    url: repo.html_url,
    language: typeof repo.language === 'string' ? repo.language : null,
    stars: typeof repo.stargazers_count === 'number' ? repo.stargazers_count : 0,
    forks: typeof repo.forks_count === 'number' ? repo.forks_count : 0,
    pushedAt: typeof repo.pushed_at === 'string' ? repo.pushed_at : null,
  };
}

function exclusionReason(repo: GitHubRepo): string | null {
  if (typeof repo.name !== 'string') return null;
  if (repo.private === true) return null;
  if (repo.fork !== false) return 'fork';
  if (repo.archived !== false) return 'arquivado';
  const card = {
    name: repo.name,
    description: typeof repo.description === 'string' ? repo.description : null,
    language: typeof repo.language === 'string' ? repo.language : null,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
  };
  if (!repoMatchesFocus(card)) {
    if (listed(profile.repoFilter.deny, repo.name)) return 'denylist';
    if (profile.repoFilter.excludeKeywords.some((keyword) => repoText(repo).includes(keyword.toLowerCase()))) {
      return 'palavra excluída';
    }
    return 'fora do recorte';
  }
  return null;
}

async function fetchRepos(): Promise<RepoCard[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'AlexandreD3v-portfolio',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const token = readEnv('GITHUB_TOKEN');
  if (token) headers.Authorization = `Bearer ${token}`;

  const cards: RepoCard[] = [];
  const excluded: string[] = [];
  let url: string | null =
    `https://api.github.com/users/${encodeURIComponent(profile.github.login)}/repos?per_page=100&type=owner&sort=updated`;

  for (let page = 0; url && page < 10; page += 1) {
    const response = await fetchOk(url, { headers });
    const link = response.headers.get('link');
    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) {
      throw new Error('Resposta inesperada da API do GitHub.');
    }
    for (const item of payload) {
      const repo = item as GitHubRepo;
      const reason = exclusionReason(repo);
      if (reason && repo.name) {
        excluded.push(`${repo.name} (${reason})`);
        continue;
      }
      const card = toCard(repo);
      if (card) cards.push(card);
    }
    url = nextPage(link);
  }

  if (cards.length === 0) {
    throw new Error('Nenhum repositório no recorte NetSuite, TypeScript ou VS Code.');
  }

  const sorted = sortRepos(cards);
  console.info(`[portfolio] Repositórios exibidos: ${sorted.map((repo) => repo.name).join(', ')}`);
  console.info(`[portfolio] Repositórios excluídos: ${excluded.join(', ')}`);
  return sorted;
}

export async function loadRepositories(): Promise<RepoResult> {
  if (skipRemote()) {
    console.warn('[portfolio] PORTFOLIO_SKIP_REMOTE ativo: repositórios estáticos.');
    return { repos: fallbackRepos(), live: false };
  }

  try {
    const repos = await fetchRepos();
    console.info(`[portfolio] GitHub: ${repos.length} repositórios públicos.`);
    return { repos, live: true };
  } catch (error) {
    console.warn('[portfolio] API do GitHub indisponível. Usando a lista estática.', error);
    return { repos: fallbackRepos(), live: false };
  }
}
