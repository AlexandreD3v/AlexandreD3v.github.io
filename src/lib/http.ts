export async function fetchOk(url: string, init: RequestInit, timeoutMs = 12000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    if (!response.ok) {
      let host = url;
      try {
        host = new URL(url).host;
      } catch {
        host = 'remoto';
      }
      throw new Error(`HTTP ${response.status} em ${host}`);
    }
    return response;
  } finally {
    clearTimeout(timer);
  }
}
