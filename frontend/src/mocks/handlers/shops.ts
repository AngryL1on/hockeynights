/**
 * SPEC-FR-9.1.1, SPEC-FR-9.1.2, SPEC-FR-9.2.1, SPEC-FR-9.2.2
 */

import {http, HttpResponse} from 'msw'
import {mockProductOffers, mockShops} from '@/mocks/data/shops'

/** @spec SPEC-FR-9.1.1 - Handlers магазинов и предложений */
export const shopHandlers = [
  http.get('/mock-api/v1/shops', () => {
    const visible = mockShops.filter((s) => s.visible !== false)
    return HttpResponse.json(visible)
  }),

  http.get('/mock-api/v1/product-offers', ({request}) => {
    const url = new URL(request.url)
    const shopId = url.searchParams.get('shopId')
    let offers = mockProductOffers
    if (shopId) {
      offers = offers.filter((o) => o.shopId === shopId)
    }
    return HttpResponse.json(offers)
  }),
]
