/**
 * SPEC-FR-9.1.1, SPEC-FR-9.1.2, SPEC-FR-9.2.1, SPEC-FR-9.2.2
 */

import type {ProductOffer, Shop} from '@/entities/shop/types'

const mockSource = {
  source: 'mock' as const,
  updatedAt: '2026-06-05T12:00:00Z',
  syncStatus: 'mock' as const,
}

/** @spec SPEC-FR-9.1.1 - Mock магазины */
export let mockShops: Shop[] = [
  {
    id: 'shop-001',
    name: 'Pro-Hockey Москва',
    city: 'Москва',
    websiteUrl: 'https://prohockey.example.ru',
    categories: ['коньки', 'клюшки', 'защита'],
    partnerStatus: 'partner',
    sourceMeta: mockSource,
    visible: true,
  },
  {
    id: 'shop-002',
    name: 'IceGear',
    city: 'Москва',
    websiteUrl: 'https://icegear.example.ru',
    categories: ['форма', 'аксессуары', 'вратарская'],
    partnerStatus: 'external',
    sourceMeta: mockSource,
    visible: true,
  },
]

/** @spec SPEC-FR-9.2.1 - Mock товары */
export const mockProductOffers: ProductOffer[] = [
  {
    id: 'offer-001',
    shopId: 'shop-001',
    title: 'Коньки Bauer Supreme',
    category: 'коньки',
    price: 45900,
    currency: 'RUB',
    availability: 'in_stock',
    externalUrl: 'https://prohockey.example.ru/bauer-supreme',
  },
  {
    id: 'offer-002',
    shopId: 'shop-001',
    title: 'Клюшка CCM Ribcor',
    category: 'клюшки',
    price: 12900,
    currency: 'RUB',
    availability: 'in_stock',
    externalUrl: 'https://prohockey.example.ru/ccm-ribcor',
  },
  {
    id: 'offer-003',
    shopId: 'shop-002',
    title: 'Вратарские краги Vaughn',
    category: 'вратарская',
    price: 28900,
    currency: 'RUB',
    availability: 'out_of_stock',
    externalUrl: 'https://icegear.example.ru/vaughn-gloves',
  },
]

/**
 * @spec SPEC-FR-11.1.1 - Добавить магазин
 */
export function addMockShop(shop: Shop): Shop {
  mockShops = [...mockShops, shop]
  return shop
}

/**
 * @spec SPEC-FR-11.1.2 - Скрыть магазин
 */
export function setShopVisibility(shopId: string, visible: boolean): void {
  mockShops = mockShops.map((s) => (s.id === shopId ? {...s, visible} : s))
}
