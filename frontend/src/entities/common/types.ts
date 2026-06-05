/**
 * SPEC-FR-2.1.2, SPEC-FR-2.2.2, SPEC-FR-4.1.2, SPEC-FR-5.1.2, SPEC-FR-5.1.3
 * SPEC-FR-6.3.2, SPEC-FR-7.2.2, SPEC-FR-11.2.1, SPEC-FR-11.2.2, SPEC-FR-12.1.2
 */

/** @spec SPEC-FR-1.3.1 - Роль игрока */
export type UserRole = 'player' | 'goalie' | 'captain' | 'organizer' | 'admin'

/** @spec SPEC-FR-2.2.2 - Уровень мастерства */
export type SkillLevel = 'beginner' | 'amateur' | 'advanced' | 'league' | 'unknown'

/** @spec SPEC-FR-2.2.2 - Амплуа игрока */
export type PlayerPosition = 'goalie' | 'defense' | 'forward' | 'any'

/** @spec SPEC-FR-3.3.1 - Статус участия в событии */
export type AttendanceStatus = 'going' | 'not_going' | 'maybe'

/** @spec SPEC-FR-4.1.2 - Тип события */
export type EventType = 'game' | 'training' | 'open_ice'

/** @spec SPEC-FR-11.2.1 - Статус синхронизации источника */
export type SyncStatus = 'mock' | 'manual' | 'synced' | 'failed' | 'stale'

/** @spec SPEC-FR-11.2.2 - Метаданные внешнего источника */
export interface SourceMeta {
  /** @spec SPEC-FR-11.2.2 */
  source: 'mock' | 'manual' | 'partner_api' | 'import' | 'external'
  /** @spec SPEC-FR-11.2.2 */
  sourceUrl?: string
  /** @spec SPEC-FR-11.2.2 */
  updatedAt: string
  /** @spec SPEC-FR-11.2.1 */
  syncStatus: SyncStatus
}
