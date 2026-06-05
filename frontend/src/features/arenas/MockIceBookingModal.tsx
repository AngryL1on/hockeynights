/**
 * SPEC-FR-6.4.2, SPEC-FR-6.2.2
 */

import {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import {Button, Text, TextArea, TextInput} from '@gravity-ui/uikit'
import type {IceSlot} from '@/entities/arena/types'
import type {Arena} from '@/entities/arena/types'
import type {IceBookingRequest} from '@/entities/external-flow/types'
import {submitIceBooking} from '@/features/external-flows/api/externalFlowsApi'
import {MockExternalFlowDialog} from '@/shared/ui/MockExternalFlowDialog'

/** @spec SPEC-FR-6.4.2 - Props mock-бронирования */
export interface MockIceBookingModalProps {
  /** @spec SPEC-FR-6.4.2 */
  open: boolean
  /** @spec SPEC-FR-6.4.2 */
  onClose: () => void
  /** @spec SPEC-FR-6.2.1 */
  arena: Arena
  /** @spec SPEC-FR-6.3.1 */
  slot?: IceSlot
}

/**
 * @spec SPEC-FR-6.4.2 - Mock-мастер записи на лёд
 * @spec SPEC-FR-6.2.2 - Замена мёртвой внешней ссылки на кликабельный сценарий
 */
export function MockIceBookingModal({open, onClose, arena, slot}: MockIceBookingModalProps) {
  const [phone, setPhone] = useState('+7 (999) 000-00-00')
  const [comment, setComment] = useState('')
  const [result, setResult] = useState<IceBookingRequest | null>(null)

  const mutation = useMutation({
    mutationFn: submitIceBooking,
    onSuccess: (booking) => setResult(booking),
  })

  function handleClose() {
    setResult(null)
    mutation.reset()
    onClose()
  }

  function handleSubmit() {
    mutation.mutate({
      arenaId: arena.id,
      slotId: slot?.id,
      contactPhone: phone,
      comment: comment || undefined,
    })
  }

  const externalUrl = slot?.bookingUrl ?? arena.bookingUrl

  return (
    <MockExternalFlowDialog
      open={open}
      onClose={handleClose}
      flowType="ice_booking"
      partnerName={arena.name}
      externalUrl={externalUrl}
      footer={
        result ? (
          <Button view="action" onClick={handleClose}>
            Готово
          </Button>
        ) : (
          <>
            <Button view="flat" onClick={handleClose}>
              Отмена
            </Button>
            <Button view="action" loading={mutation.isPending} onClick={handleSubmit}>
              Отправить заявку
            </Button>
          </>
        )
      }
    >
      {result ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <Text variant="subheader-2">Заявка принята (mock)</Text>
          <Text>Код подтверждения: {result.confirmationCode}</Text>
          {result.slotLabel && <Text color="secondary">Слот: {result.slotLabel}</Text>}
          <Text color="secondary">
            В Phase 2 заявка уйдёт на портал аренды. Сейчас это только демонстрация UX.
          </Text>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <Text color="secondary">{arena.address}</Text>
          {slot ? (
            <Text>
              Слот: {new Date(slot.startsAt).toLocaleString('ru-RU')}
              {slot.price ? ` · ${slot.price} RUB` : ''}
            </Text>
          ) : (
            <Text color="secondary">Общая заявка на аренду льда без привязки к слоту</Text>
          )}
          <TextInput label="Телефон для связи" value={phone} onUpdate={setPhone} />
          <div>
            <Text color="secondary">Комментарий</Text>
            <TextArea value={comment} onUpdate={setComment} minRows={2} />
          </div>
          {mutation.isError && (
            <Text color="danger">Не удалось отправить заявку</Text>
          )}
        </div>
      )}
    </MockExternalFlowDialog>
  )
}
