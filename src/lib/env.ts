const ENV_NAMES = ['GITHUB_TOKEN', 'PORTFOLIO_SKIP_REMOTE'] as const;
type EnvName = (typeof ENV_NAMES)[number];

export function readEnv(name: EnvName): string | undefined {
  const fromProcess = typeof process !== 'undefined' ? process.env[name] : undefined;
  if (typeof fromProcess === 'string' && fromProcess.trim().length > 0) {
    return fromProcess.trim();
  }

  const fromMeta = (import.meta.env as Record<string, string | boolean | undefined>)[name];
  if (typeof fromMeta === 'string' && fromMeta.trim().length > 0) {
    return fromMeta.trim();
  }

  return undefined;
}

export function skipRemote(): boolean {
  const value = readEnv('PORTFOLIO_SKIP_REMOTE');
  return value === '1' || value === 'true';
}
