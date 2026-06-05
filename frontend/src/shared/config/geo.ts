/**
 * SPEC-FR-1.2.4, SPEC-FR-6.1.1
 */

/** @spec SPEC-FR-1.2.4 - Стартовый город MVP */
export const DEFAULT_CITY = 'Москва'

/** @spec SPEC-FR-1.2.4 - Регион запуска */
export const LAUNCH_REGION = 'Москва и Подмосковье'

/** @spec SPEC-FR-6.1.1 - Центр карты арен (Москва) */
export const MOSCOW_MAP_CENTER = {
  lat: 55.7558,
  lng: 37.6173,
} as const

/** @spec SPEC-FR-6.1.1 - Стартовый zoom для Москвы */
export const MOSCOW_MAP_DEFAULT_ZOOM = 10

/** @spec SPEC-FR-6.1.1 - Минимальный zoom (не показывать весь мир) */
export const MOSCOW_MAP_MIN_ZOOM = 9

/** @spec SPEC-FR-6.1.1 - Максимальный zoom */
export const MOSCOW_MAP_MAX_ZOOM = 16

/**
 * @spec SPEC-FR-6.1.1 - Границы Москвы и ближнего Подмосковья
 * SW / NE углы для maxBounds
 */
export const MOSCOW_MAP_MAX_BOUNDS: [[number, number], [number, number]] = [
  [55.42, 37.18],
  [56.02, 37.98],
]

/** @spec SPEC-FR-6.1.1 - Тайлы OpenStreetMap */
export const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

/** @spec SPEC-FR-6.1.1 - Атрибуция OSM */
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
