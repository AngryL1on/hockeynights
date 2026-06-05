/**
 * SPEC-FR-1.2.3, SPEC-FR-12.1.1, SPEC-FR-12.1.3
 */

/** @spec SPEC-FR-12.1.3 - Режим API: mock или backend */
export type ApiMode = 'mock' | 'backend'

/**
 * @spec SPEC-FR-12.1.3 - Возвращает текущий режим API из env
 */
export function getApiMode(): ApiMode {
  const mode = import.meta.env.VITE_API_MODE
  return mode === 'backend' ? 'backend' : 'mock'
}

/**
 * @spec SPEC-FR-12.1.1 - Базовый URL API в зависимости от режима
 */
export function getApiBaseUrl(): string {
  if (getApiMode() === 'backend') {
    return import.meta.env.VITE_BACKEND_URL ?? '/api/v1'
  }
  return '/mock-api/v1'
}
