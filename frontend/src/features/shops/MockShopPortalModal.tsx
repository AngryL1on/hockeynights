/**
 * SPEC-FR-9.1.3
 */

import {Button, Text} from '@gravity-ui/uikit'
import type {Shop} from '@/entities/shop/types'
import {MockExternalFlowDialog} from '@/shared/ui/MockExternalFlowDialog'

/** @spec SPEC-FR-9.1.3 - Props mock-портала магазина */
export interface MockShopPortalModalProps {
  /** @spec SPEC-FR-9.1.3 */
  open: boolean
  /** @spec SPEC-FR-9.1.3 */
  onClose: () => void
  /** @spec SPEC-FR-9.1.2 */
  shop: Shop
}

/**
 * @spec SPEC-FR-9.1.3 - Mock-превью сайта магазина
 */
export function MockShopPortalModal({open, onClose, shop}: MockShopPortalModalProps) {
  return (
    <MockExternalFlowDialog
      open={open}
      onClose={onClose}
      flowType="shop_portal"
      partnerName={shop.name}
      externalUrl={shop.websiteUrl}
      footer={
        <Button view="action" onClick={onClose}>
          Закрыть
        </Button>
      }
    >
      <div className="hockey-stack hockey-stack--gap-8">
        <Text>{shop.city ?? 'Москва'}</Text>
        <Text color="secondary">Категории: {shop.categories.join(', ') || 'не указаны'}</Text>
        <Text color="secondary">Статус: {shop.partnerStatus}</Text>
        <Text color="secondary">
          Mock-каталог экипировки. В Phase 2 — переход на партнёрский сайт или API feed.
        </Text>
      </div>
    </MockExternalFlowDialog>
  )
}
