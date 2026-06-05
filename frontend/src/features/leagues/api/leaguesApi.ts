/**
 * SPEC-FR-7.1.1, SPEC-FR-7.1.2, SPEC-FR-7.2.1, SPEC-FR-7.2.2
 */

import {apiRequest} from '@/shared/api/client'
import type {League, LeagueScheduleItem, LeagueStanding} from '@/entities/league/types'

/**
 * @spec SPEC-FR-7.1.1 - Список лиг
 */
export function fetchLeagues(): Promise<League[]> {
  return apiRequest<League[]>('/leagues')
}

/**
 * @spec SPEC-FR-7.1.2 - Карточка лиги
 */
export function fetchLeague(leagueId: string): Promise<League> {
  return apiRequest<League>(`/leagues/${leagueId}`)
}

/**
 * @spec SPEC-FR-7.2.1 - Таблица лиги
 */
export function fetchLeagueStandings(leagueId: string): Promise<LeagueStanding[]> {
  return apiRequest<LeagueStanding[]>(`/leagues/${leagueId}/standings`)
}

/**
 * @spec SPEC-FR-7.2.1 - Расписание лиги
 */
export function fetchLeagueSchedule(leagueId: string): Promise<LeagueScheduleItem[]> {
  return apiRequest<LeagueScheduleItem[]>(`/leagues/${leagueId}/schedule`)
}
