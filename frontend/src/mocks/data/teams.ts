/**
 * SPEC-FR-3.1.1, SPEC-FR-3.1.2, SPEC-FR-3.2.1, SPEC-FR-3.2.2
 */

import type {RosterMember, Team} from '@/entities/team/types'

/** @spec SPEC-FR-3.1.1 - Mock команды */
export let mockTeams: Team[] = [
  {
    id: 'team-001',
    name: 'Медведи САО',
    city: 'Москва',
    skillLevel: 'amateur',
    captainUserId: 'user-001',
    description: 'Регулярные тренировки по вторникам и субботам',
    memberIds: ['user-001', 'user-003', 'user-004'],
  },
]

/** @spec SPEC-FR-3.2.1 - Mock состав */
export let mockRoster: RosterMember[] = [
  {
    teamId: 'team-001',
    userId: 'user-001',
    displayName: 'Иван Петров',
    position: 'forward',
    rosterStatus: 'active',
    joinedAt: '2026-01-10T10:00:00Z',
  },
  {
    teamId: 'team-001',
    userId: 'user-003',
    displayName: 'Дмитрий Козлов',
    position: 'defense',
    rosterStatus: 'active',
    joinedAt: '2026-01-12T10:00:00Z',
  },
  {
    teamId: 'team-001',
    userId: 'user-004',
    displayName: 'Сергей Волков',
    position: 'forward',
    rosterStatus: 'bench',
    joinedAt: '2026-02-01T10:00:00Z',
  },
]

/**
 * @spec SPEC-FR-3.1.1 - Создать команду в mock store
 */
export function createMockTeam(team: Team): Team {
  mockTeams = [...mockTeams, team]
  return team
}

/**
 * @spec SPEC-FR-3.1.2 - Добавить игрока в состав
 */
export function addMockRosterMember(member: RosterMember): RosterMember {
  mockRoster = [...mockRoster.filter((m) => !(m.teamId === member.teamId && m.userId === member.userId)), member]
  const team = mockTeams.find((t) => t.id === member.teamId)
  if (team && !team.memberIds.includes(member.userId)) {
    team.memberIds = [...team.memberIds, member.userId]
  }
  return member
}

/**
 * @spec SPEC-FR-3.2.2 - Обновить статус участника
 */
export function updateMockRosterStatus(
  teamId: string,
  userId: string,
  rosterStatus: RosterMember['rosterStatus'],
): RosterMember | undefined {
  const index = mockRoster.findIndex((m) => m.teamId === teamId && m.userId === userId)
  if (index === -1) return undefined
  mockRoster[index] = {...mockRoster[index], rosterStatus}
  return mockRoster[index]
}
