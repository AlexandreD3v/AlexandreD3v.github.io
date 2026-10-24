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

function toCard(repo: GitHubRepo): RepoCard | null {
  if (typeof repo.name !== 'string' || typeof repo.html_url !== 'string') return null;
  if (repo.fork !== false || repo.archived !== false || repo.private === true) return null;

  return {
    name: repo.name,
    description: typeof repo.description === 'string' && repo.description.trim() ? repo.description : null,
    url: repo.html_url,
    language: typeof repo.language === 'string' ? repo.language : null,
    stars: typeof repo.stargazers_count === 'number' ? repo.stargazers_count : 0,
    forks: typeof repo.forks_count === 'number' ? repo.forks_count : 0,
    pushedAt: typeof repo.pushed_at === 'string' ? repo.pushed_at : null,
  };
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
      const card = toCard(item as GitHubRepo);
      if (card) cards.push(card);
    }
    url = nextPage(link);
  }

  if (cards.length === 0) {
    throw new Error('Nenhum repositório público após excluir forks e arquivados.');
  }

  return sortRepos(cards);
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
