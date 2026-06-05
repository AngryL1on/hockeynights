/**
 * SPEC-FR-3.1.1, SPEC-FR-3.1.2, SPEC-FR-3.2.1, SPEC-FR-3.2.2
 */

import {apiRequest} from '@/shared/api/client'
import type {CreateTeamPayload, RosterMember, Team} from '@/entities/team/types'

/**
 * @spec SPEC-FR-3.1.1 - Список команд
 */
export function fetchTeams(): Promise<Team[]> {
  return apiRequest<Team[]>('/teams')
}

/**
 * @spec SPEC-FR-3.1.1 - Создать команду
 */
export function createTeam(payload: CreateTeamPayload): Promise<Team> {
  return apiRequest<Team>('/teams', {method: 'POST', body: payload})
}

/**
 * @spec SPEC-FR-3.2.1 - Получить состав команды
 */
export function fetchTeamRoster(teamId: string): Promise<RosterMember[]> {
  return apiRequest<RosterMember[]>(`/teams/${teamId}/roster`)
}

/**
 * @spec SPEC-FR-3.2.2 - Изменить статус участника
 */
export function updateRosterMemberStatus(
  teamId: string,
  userId: string,
  rosterStatus: RosterMember['rosterStatus'],
): Promise<RosterMember> {
  return apiRequest<RosterMember>(`/teams/${teamId}/roster/${userId}`, {
    method: 'PATCH',
    body: {rosterStatus},
  })
}

/**
 * @spec SPEC-FR-3.1.2 - Добавить игрока в команду
 */
export function addTeamMember(teamId: string, userId: string): Promise<RosterMember> {
  return apiRequest<RosterMember>(`/teams/${teamId}/members`, {
    method: 'POST',
    body: {userId},
  })
}
