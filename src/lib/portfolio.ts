import { loadRepositories } from './github';
import { loadExtension } from './marketplace';
import type { ExtensionCard, RepoResult } from './types';

export async function loadPortfolioData(extensionSummary: string): Promise<{
  extension: ExtensionCard;
  repositories: RepoResult;
}> {
  const [extension, repositories] = await Promise.all([
    loadExtension(extensionSummary),
    loadRepositories(),
  ]);

  return { extension, repositories };
}
