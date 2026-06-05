/**
 * SPEC-FR-2.3.1, SPEC-FR-2.3.2, SPEC-FR-8.2.1
 */

import type {PlayerListItem} from '@/entities/profile/types'

/** @spec SPEC-FR-2.3.1 - Mock список игроков */
export const mockPlayers: PlayerListItem[] = [
  {
    userId: 'user-002',
    displayName: 'Алексей Смирнов',
    fullName: 'Алексей Смирнов',
    city: 'Москва',
    district: 'СЗАО',
    metro: 'Сокол',
    position: 'goalie',
    skillLevel: 'advanced',
    stickHand: 'unknown',
    availability: ['weekday_evening'],
    preferredArenaIds: ['arena-001', 'arena-002'],
    profileCompleteness: 90,
    karmaScore: 88,
  },
  {
    userId: 'user-003',
    displayName: 'Дмитрий Козлов',
    fullName: 'Дмитрий Козлов',
    city: 'Москва',
    district: 'ЮАО',
    metro: 'Коломенская',
    position: 'defense',
    skillLevel: 'amateur',
    stickHand: 'right',
    availability: ['sunday_morning'],
    preferredArenaIds: ['arena-002'],
    profileCompleteness: 65,
    karmaScore: 71,
  },
  {
    userId: 'user-004',
    displayName: 'Сергей Волков',
    fullName: 'Сергей Волков',
    city: 'Москва',
    district: 'САО',
    metro: 'ЦСКА',
    position: 'forward',
    skillLevel: 'beginner',
    stickHand: 'left',
    availability: ['weekday_evening', 'sunday_morning'],
    preferredArenaIds: ['arena-001'],
    profileCompleteness: 55,
    karmaScore: 62,
  },
]
