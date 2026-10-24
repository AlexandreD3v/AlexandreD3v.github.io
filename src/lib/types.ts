export interface ExtensionCard {
  name: string;
  summary: string;
  marketplaceUrl: string;
  repoUrl: string;
  version: string | null;
  installs: number | null;
  rating: number | null;
  ratingCount: number | null;
  live: boolean;
}

export interface RepoCard {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number | null;
  forks: number | null;
  pushedAt: string | null;
}

export interface RepoResult {
  repos: RepoCard[];
  live: boolean;
}
