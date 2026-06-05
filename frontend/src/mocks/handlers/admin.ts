/**
 * SPEC-FR-11.1.1, SPEC-FR-11.1.2, SPEC-FR-11.2.1, SPEC-FR-11.2.2
 */

import {http, HttpResponse} from 'msw'
import type {AdminEntityType} from '@/entities/admin/types'
import {
  createAdminArena,
  createAdminLeague,
  createAdminShop,
  getSourceStatuses,
  setEntityVisibility,
} from '@/mocks/data/admin'

/** @spec SPEC-FR-11.1.1 - Handlers админки */
export const adminHandlers = [
  http.post('/mock-api/v1/admin/arenas', async ({request}) => {
    const body = (await request.json()) as {name: string; city?: string; websiteUrl?: string}
    const arena = createAdminArena(body)
    return HttpResponse.json(arena)
  }),

  http.post('/mock-api/v1/admin/leagues', async ({request}) => {
    const body = (await request.json()) as {name: string; city?: string; websiteUrl?: string}
    const league = createAdminLeague(body)
    return HttpResponse.json(league)
  }),

  http.post('/mock-api/v1/admin/shops', async ({request}) => {
    const body = (await request.json()) as {name: string; city?: string; websiteUrl?: string}
    const shop = createAdminShop(body)
    return HttpResponse.json(shop)
  }),

  http.patch('/mock-api/v1/admin/entities/:entityId/visibility', async ({params, request}) => {
    const body = (await request.json()) as {entityType: AdminEntityType; visible: boolean}
    const ok = setEntityVisibility(params.entityId as string, body.entityType, body.visible)
    if (!ok) {
      return HttpResponse.json({message: 'Entity not found'}, {status: 404})
    }
    return HttpResponse.json({entityId: params.entityId, visible: body.visible})
  }),

  http.get('/mock-api/v1/admin/sources', () => {
    return HttpResponse.json(getSourceStatuses())
  }),
]
