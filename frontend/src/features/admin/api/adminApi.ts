/**
 * SPEC-FR-11.1.1, SPEC-FR-11.1.2, SPEC-FR-11.2.1, SPEC-FR-11.2.2
 */

import {apiRequest} from '@/shared/api/client'
import type {AdminEntityType, CreateAdminEntityPayload, SourceStatusItem} from '@/entities/admin/types'
import type {Arena} from '@/entities/arena/types'
import type {League} from '@/entities/league/types'
import type {Shop} from '@/entities/shop/types'

/**
 * @spec SPEC-FR-11.1.1 - Создать сущность
 */
export function createAdminEntity(payload: CreateAdminEntityPayload): Promise<Arena | League | Shop> {
  const path =
    payload.entityType === 'arena' ? '/admin/arenas' :
    payload.entityType === 'league' ? '/admin/leagues' :
    '/admin/shops'
  return apiRequest(path, {method: 'POST', body: payload})
}

/**
 * @spec SPEC-FR-11.1.2 - Изменить видимость
 */
export function updateEntityVisibility(
  entityId: string,
  entityType: AdminEntityType,
  visible: boolean,
): Promise<{entityId: string; visible: boolean}> {
  return apiRequest(`/admin/entities/${entityId}/visibility`, {
    method: 'PATCH',
    body: {entityType, visible},
  })
}

/**
 * @spec SPEC-FR-11.2.1 - Статусы источников
 */
export function fetchSourceStatuses(): Promise<SourceStatusItem[]> {
  return apiRequest<SourceStatusItem[]>('/admin/sources')
}
