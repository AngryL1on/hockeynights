/**
 * SPEC-FR-9.1.1, SPEC-FR-9.1.2, SPEC-FR-9.2.1, SPEC-FR-9.2.2
 */

import {apiRequest} from '@/shared/api/client'
import type {ProductOffer, Shop} from '@/entities/shop/types'

/**
 * @spec SPEC-FR-9.1.1 - Список магазинов
 */
export function fetchShops(): Promise<Shop[]> {
  return apiRequest<Shop[]>('/shops')
}

/**
 * @spec SPEC-FR-9.2.1 - Список товарных предложений
 */
export function fetchProductOffers(shopId?: string): Promise<ProductOffer[]> {
  const query = shopId ? `?shopId=${shopId}` : ''
  return apiRequest<ProductOffer[]>(`/product-offers${query}`)
}
