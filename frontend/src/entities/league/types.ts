/**
 * SPEC-FR-7.1.1, SPEC-FR-7.1.2, SPEC-FR-7.2.1, SPEC-FR-7.2.2
 */

import type {SkillLevel, SourceMeta, SyncStatus} from '@/entities/common/types'

/** @spec SPEC-FR-7.1.1 - Любительская лига */
export interface League {
  /** @spec SPEC-FR-7.1.1 */
  id: string
  /** @spec SPEC-FR-7.1.2 */
  name: string
  /** @spec SPEC-FR-7.1.2 */
  region: string
  /** @spec SPEC-FR-7.1.2 */
  level?: SkillLevel
  /** @spec SPEC-FR-7.1.2 */
  websiteUrl?: string
  /** @spec SPEC-FR-7.1.2 */
  integrationStatus: SyncStatus
  /** @spec SPEC-FR-7.2.2 */
  sourceMeta: SourceMeta
  /** @spec SPEC-FR-11.1.2 */
  visible?: boolean
}

/** @spec SPEC-FR-7.2.1 - Строка турнирной таблицы */
export interface LeagueStanding {
  /** @spec SPEC-FR-7.2.1 */
  leagueId: string
  /** @spec SPEC-FR-7.2.1 */
  teamName: string
  /** @spec SPEC-FR-7.2.1 */
  gamesPlayed: number
  /** @spec SPEC-FR-7.2.1 */
  wins: number
  /** @spec SPEC-FR-7.2.1 */
  losses: number
  /** @spec SPEC-FR-7.2.1 */
  points: number
}

/** @spec SPEC-FR-7.2.1 - Матч в расписании лиги */
export interface LeagueScheduleItem {
  /** @spec SPEC-FR-7.2.1 */
  id: string
  /** @spec SPEC-FR-7.2.1 */
  leagueId: string
  /** @spec SPEC-FR-7.2.1 */
  homeTeam: string
  /** @spec SPEC-FR-7.2.1 */
  awayTeam: string
  /** @spec SPEC-FR-7.2.1 */
  startsAt: string
  /** @spec SPEC-FR-7.2.1 */
  arenaName?: string
}
