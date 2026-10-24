/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN?: string;
  readonly PORTFOLIO_SKIP_REMOTE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
