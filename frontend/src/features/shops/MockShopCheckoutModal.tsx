/**
 * SPEC-FR-9.2.3, SPEC-FR-9.2.2
 */

import {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import {Button, Text} from '@gravity-ui/uikit'
import type {ProductOffer} from '@/entities/shop/types'
import type {CheckoutIntent} from '@/entities/external-flow/types'
import {createCheckoutIntent} from '@/features/external-flows/api/externalFlowsApi'
import {MockExternalFlowDialog} from '@/shared/ui/MockExternalFlowDialog'

/** @spec SPEC-FR-9.2.3 - Props mock-checkout */
export interface MockShopCheckoutModalProps {
  /** @spec SPEC-FR-9.2.3 */
  open: boolean
  /** @spec SPEC-FR-9.2.3 */
  onClose: () => void
  /** @spec SPEC-FR-9.2.1 */
  offer: ProductOffer
  /** @spec SPEC-FR-9.1.2 */
  shopName: string
}

/**
 * @spec SPEC-FR-9.2.3 - Mock-переход к покупке на сайте магазина
 */
export function MockShopCheckoutModal({open, onClose, offer, shopName}: MockShopCheckoutModalProps) {
  const [result, setResult] = useState<CheckoutIntent | null>(null)

  const mutation = useMutation({
    mutationFn: createCheckoutIntent,
    onSuccess: (intent) => setResult(intent),
  })

  function handleClose() {
    setResult(null)
    mutation.reset()
    onClose()
  }

  return (
    <MockExternalFlowDialog
      open={open}
      onClose={handleClose}
      flowType="shop_checkout"
      partnerName={shopName}
      externalUrl={offer.externalUrl}
      footer={
        result ? (
          <Button view="action" onClick={handleClose}>
            Понятно
          </Button>
        ) : (
          <>
            <Button view="flat" onClick={handleClose}>
              Отмена
            </Button>
            <Button
              view="action"
              loading={mutation.isPending}
              onClick={() => mutation.mutate({offerId: offer.id})}
            >
              Перейти к покупке (mock)
            </Button>
          </>
        )
      }
    >
      {result ? (
        <div className="hockey-stack hockey-stack--gap-8">
          <Text variant="subheader-2">Переход подготовлен (mock)</Text>
          <Text>
            {result.offerTitle} — {result.price.toLocaleString('ru-RU')} {result.currency}
          </Text>
          <Text color="secondary">
            В Phase 2 откроется {result.externalUrl}. Сейчас покупка не выполняется.
          </Text>
        </div>
      ) : (
        <div className="hockey-stack hockey-stack--gap-8">
          <Text variant="subheader-2">{offer.title}</Text>
          <Text>
            {offer.price.toLocaleString('ru-RU')} {offer.currency} · {offer.availability}
          </Text>
          <Text color="secondary">
            Подтвердите mock-переход на сайт партнёра для демонстрации сценария покупки.
          </Text>
        </div>
      )}
    </MockExternalFlowDialog>
  )
}
