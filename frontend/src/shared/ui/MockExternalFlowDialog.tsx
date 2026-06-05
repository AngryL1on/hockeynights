/**
 * SPEC-FR-6.4.1, SPEC-NFR-8
 */

import {Button, Dialog, Text} from '@gravity-ui/uikit'
import type {ReactNode} from 'react'
import type {MockExternalFlowType} from '@/entities/external-flow/types'

const FLOW_LABELS: Record<MockExternalFlowType, string> = {
  ice_booking: 'Запись на лёд',
  shop_checkout: 'Покупка экипировки',
  shop_portal: 'Сайт магазина',
  league_portal: 'Сайт лиги',
}

/** @spec SPEC-FR-6.4.1 - Props mock-диалога внешнего сценария */
export interface MockExternalFlowDialogProps {
  /** @spec SPEC-FR-6.4.1 */
  open: boolean
  /** @spec SPEC-FR-6.4.1 */
  onClose: () => void
  /** @spec SPEC-FR-6.4.1 */
  flowType: MockExternalFlowType
  /** @spec SPEC-FR-6.4.1 */
  partnerName: string
  /** @spec SPEC-FR-6.4.1 */
  externalUrl?: string
  /** @spec SPEC-FR-6.4.1 */
  children: ReactNode
  /** @spec SPEC-FR-6.4.1 */
  footer?: ReactNode
}

/**
 * @spec SPEC-FR-6.4.1 - Оболочка mock-интерфейса внешнего партнёра
 * @spec SPEC-NFR-8 - Пояснение Phase 1 vs реальный портал
 */
export function MockExternalFlowDialog({
  open,
  onClose,
  flowType,
  partnerName,
  externalUrl,
  children,
  footer,
}: MockExternalFlowDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} size="m">
      <Dialog.Header caption={`Phase 1 mock · ${FLOW_LABELS[flowType]}`} />
      <Dialog.Body>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <Text variant="subheader-2">{partnerName}</Text>
          <Text color="secondary">
            Это демо-интерфейс партнёрского сценария. В Phase 2 кнопка откроет реальный портал
            или partner API. Сейчас действие симулируется внутри приложения.
          </Text>
          {externalUrl && (
            <Text color="secondary" variant="caption-2">
              Целевой URL Phase 2: {externalUrl}
            </Text>
          )}
          {children}
        </div>
      </Dialog.Body>
      <Dialog.Footer>
        {footer ?? (
          <Button view="flat" onClick={onClose}>
            Закрыть
          </Button>
        )}
      </Dialog.Footer>
    </Dialog>
  )
}
