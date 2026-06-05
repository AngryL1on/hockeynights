/**
 * SPEC-FR-3.1.1, SPEC-FR-3.1.2, SPEC-FR-3.2.1, SPEC-FR-3.2.2
 */

import type {PlayerPosition, SkillLevel} from '@/entities/common/types'

/** @spec SPEC-FR-3.1.1 - Команда */
export interface Team {
  /** @spec SPEC-FR-3.1.1 */
  id: string
  /** @spec SPEC-FR-3.1.1 */
  name: string
  /** @spec SPEC-FR-3.1.1 */
  city: string
  /** @spec SPEC-FR-3.1.1 */
  skillLevel: SkillLevel
  /** @spec SPEC-FR-3.1.1 */
  captainUserId: string
  /** @spec SPEC-FR-3.1.1 */
  description?: string
  /** @spec SPEC-FR-3.1.2 */
  memberIds: string[]
}

/** @spec SPEC-FR-3.2.1 - Участник состава */
export interface RosterMember {
  /** @spec SPEC-FR-3.2.1 */
  teamId: string
  /** @spec SPEC-FR-3.2.1 */
  userId: string
  /** @spec SPEC-FR-3.2.1 */
  displayName: string
  /** @spec SPEC-FR-3.2.1 */
  position: PlayerPosition
  /** @spec SPEC-FR-3.2.2 */
  rosterStatus: 'active' | 'bench' | 'invited' | 'removed'
  /** @spec SPEC-FR-3.2.1 */
  joinedAt: string
}

/** @spec SPEC-FR-3.1.1 - Payload создания команды */
export interface CreateTeamPayload {
  /** @spec SPEC-FR-3.1.1 */
  name: string
  /** @spec SPEC-FR-3.1.1 */
  city: string
  /** @spec SPEC-FR-3.1.1 */
  skillLevel: SkillLevel
  /** @spec SPEC-FR-3.1.1 */
  description?: string
}
