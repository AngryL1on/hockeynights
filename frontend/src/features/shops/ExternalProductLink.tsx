/**
 * SPEC-FR-9.2.2, SPEC-FR-9.2.3
 */

import {useState} from 'react'
import {Button} from '@gravity-ui/uikit'
import type {ProductOffer} from '@/entities/shop/types'
import {MockShopCheckoutModal} from '@/features/shops/MockShopCheckoutModal'

/** @spec SPEC-FR-9.2.3 - Props mock-покупки */
export interface ExternalProductLinkProps {
  /** @spec SPEC-FR-9.2.1 */
  offer: ProductOffer
  /** @spec SPEC-FR-9.1.2 */
  shopName: string
}

/**
 * @spec SPEC-FR-9.2.3 - Mock-переход к покупке вместо мёртвой внешней ссылки
 */
export function ExternalProductLink({offer, shopName}: ExternalProductLinkProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button view="outlined" size="s" onClick={() => setOpen(true)}>
        Купить: {offer.title}
      </Button>
      <MockShopCheckoutModal
        open={open}
        onClose={() => setOpen(false)}
        offer={offer}
        shopName={shopName}
      />
    </>
  )
}
