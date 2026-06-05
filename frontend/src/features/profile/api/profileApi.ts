/**
 * SPEC-FR-2.2.1, SPEC-FR-2.2.2, SPEC-FR-2.2.3, SPEC-FR-2.2.4
 */

import {apiRequest} from '@/shared/api/client'
import type {HockeyProfile} from '@/entities/profile/types'

/**
 * @spec SPEC-FR-2.2.1 - Получить Hockey ID
 */
export function fetchMyProfile(): Promise<HockeyProfile> {
  return apiRequest<HockeyProfile>('/profile/me')
}

/**
 * @spec SPEC-FR-2.2.1 - Обновить Hockey ID
 */
export function updateMyProfile(profile: Partial<HockeyProfile>): Promise<HockeyProfile> {
  return apiRequest<HockeyProfile>('/profile/me', {method: 'PUT', body: profile})
}
