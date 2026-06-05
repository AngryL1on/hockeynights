/**
 * SPEC-FR-11.1.1, SPEC-FR-11.1.2, SPEC-FR-11.2.1, SPEC-FR-11.2.2
 */

import type {SourceMeta} from '@/entities/common/types'

/** @spec SPEC-FR-11.1.1 - Тип сущности админки */
export type AdminEntityType = 'arena' | 'league' | 'shop'

/** @spec SPEC-FR-11.2.1 - Статус источника данных */
export interface SourceStatusItem {
  /** @spec SPEC-FR-11.2.1 */
  entityType: AdminEntityType
  /** @spec SPEC-FR-11.2.1 */
  entityId: string
  /** @spec SPEC-FR-11.2.1 */
  entityName: string
  /** @spec SPEC-FR-11.2.2 */
  sourceMeta: SourceMeta
  /** @spec SPEC-FR-11.1.2 */
  visible: boolean
}

/** @spec SPEC-FR-11.1.1 - Payload создания сущности */
export interface CreateAdminEntityPayload {
  /** @spec SPEC-FR-11.1.1 */
  entityType: AdminEntityType
  /** @spec SPEC-FR-11.1.1 */
  name: string
  /** @spec SPEC-FR-11.1.1 */
  city?: string
  /** @spec SPEC-FR-11.1.1 */
  websiteUrl?: string
}
