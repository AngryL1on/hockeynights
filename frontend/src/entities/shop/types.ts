/**
 * SPEC-FR-9.1.1, SPEC-FR-9.1.2, SPEC-FR-9.2.1, SPEC-FR-9.2.2, SPEC-FR-11.2.2
 */

import type {SourceMeta} from '@/entities/common/types'

/** @spec SPEC-FR-9.1.1 - Магазин экипировки */
export interface Shop {
  /** @spec SPEC-FR-9.1.1 */
  id: string
  /** @spec SPEC-FR-9.1.2 */
  name: string
  /** @spec SPEC-FR-9.1.2 */
  city?: string
  /** @spec SPEC-FR-9.1.2 */
  websiteUrl: string
  /** @spec SPEC-FR-9.1.2 */
  categories: string[]
  /** @spec SPEC-FR-9.1.2 */
  partnerStatus: 'mock' | 'partner' | 'external'
  /** @spec SPEC-FR-11.2.2 */
  sourceMeta: SourceMeta
  /** @spec SPEC-FR-11.1.2 */
  visible?: boolean
}

/** @spec SPEC-FR-9.2.1 - Товарное предложение */
export interface ProductOffer {
  /** @spec SPEC-FR-9.2.1 */
  id: string
  /** @spec SPEC-FR-9.2.1 */
  shopId: string
  /** @spec SPEC-FR-9.2.1 */
  title: string
  /** @spec SPEC-FR-9.2.1 */
  category: string
  /** @spec SPEC-FR-9.2.1 */
  price: number
  /** @spec SPEC-FR-9.2.1 */
  currency: 'RUB'
  /** @spec SPEC-FR-9.2.1 */
  availability: 'in_stock' | 'out_of_stock' | 'unknown'
  /** @spec SPEC-FR-9.2.2 */
  externalUrl: string
}
