import { profile, marketplaceUrl, repoUrl } from '../data/site';
import { skipRemote } from './env';
import { fetchOk } from './http';
import type { ExtensionCard } from './types';

const GALLERY_URL = 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery';
const INCLUDE_STATISTICS = 0x100;
const INCLUDE_LATEST_VERSION_ONLY = 0x200;
const INCLUDE_ASSET_URI = 0x80;
const INCLUDE_VERSION_PROPERTIES = 0x10;
const INCLUDE_FILES = 0x2;
const FLAGS =
  INCLUDE_LATEST_VERSION_ONLY |
  INCLUDE_STATISTICS |
  INCLUDE_ASSET_URI |
  INCLUDE_VERSION_PROPERTIES |
  INCLUDE_FILES;

interface GalleryStatistic {
  statisticName?: string;
  value?: number;
}

interface GalleryExtension {
  displayName?: string;
  statistics?: GalleryStatistic[];
  versions?: Array<{ version?: string }>;
}

interface GalleryResponse {
  results?: Array<{ extensions?: GalleryExtension[] }>;
}

function emptyExtension(summary: string): ExtensionCard {
  return {
    name: profile.featuredExtension.name,
    summary,
    marketplaceUrl: marketplaceUrl(profile.featuredExtension.marketplaceId),
    repoUrl: repoUrl(profile.featuredExtension.repo),
    version: null,
    installs: null,
    rating: null,
    ratingCount: null,
    live: false,
  };
}

function statistic(stats: GalleryStatistic[] | undefined, name: string): number | null {
  const found = stats?.find((item) => item.statisticName?.toLowerCase() === name);
  return typeof found?.value === 'number' && Number.isFinite(found.value) ? found.value : null;
}

export async function loadExtension(summary: string): Promise<ExtensionCard> {
  const fallback = emptyExtension(summary);
  if (skipRemote()) {
    console.warn('[portfolio] PORTFOLIO_SKIP_REMOTE ativo: extensão sem estatísticas ao vivo.');
    return fallback;
  }

  try {
    const response = await fetchOk(GALLERY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json;api-version=7.2-preview.1',
        'User-Agent': 'AlexandreD3v-portfolio',
      },
      body: JSON.stringify({
        filters: [
          {
            criteria: [{ filterType: 7, value: profile.featuredExtension.marketplaceId }],
            pageNumber: 1,
            pageSize: 1,
            sortBy: 0,
            sortOrder: 0,
          },
        ],
        assetTypes: [],
        flags: FLAGS,
      }),
    });

    const payload = (await response.json()) as GalleryResponse;
    const extension = payload.results?.[0]?.extensions?.[0];
    if (!extension) {
      throw new Error('Extensão não encontrada no Marketplace.');
    }

    if (extension.displayName && extension.displayName !== profile.featuredExtension.name) {
      console.warn(
        `[portfolio] Nome no Marketplace ("${extension.displayName}") difere de "${profile.featuredExtension.name}". O site mantém o nome configurado.`,
      );
    }

    const installs = statistic(extension.statistics, 'install');
    const rating = statistic(extension.statistics, 'averagerating');
    const ratingCount = statistic(extension.statistics, 'ratingcount');
    const version = extension.versions?.[0]?.version ?? null;

    console.info(
      `[portfolio] Marketplace: ${installs ?? 'sem'} instalações, avaliação ${rating ?? 'sem'} (${ratingCount ?? 0}).`,
    );

    return {
      ...fallback,
      version: typeof version === 'string' ? version : null,
      installs,
      rating,
      ratingCount,
      live: true,
    };
  } catch (error) {
    console.warn('[portfolio] Marketplace indisponível. A extensão segue sem estatísticas.', error);
    return fallback;
  }
}
