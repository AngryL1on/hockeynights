/**
 * SPEC-FR-6.3.1, SPEC-FR-6.3.2, SPEC-FR-6.4.2
 */

import {Card, Text} from '@gravity-ui/uikit'
import type {Arena} from '@/entities/arena/types'
import type {IceSlot} from '@/entities/arena/types'
import {ExternalBookingButton} from '@/features/arenas/ExternalBookingButton'
import {SourceMetaBadge} from '@/shared/ui/SourceMetaBadge'

/** @spec SPEC-FR-6.3.1 - Props списка слотов */
export interface IceSlotsListProps {
  /** @spec SPEC-FR-6.3.1 */
  slots: IceSlot[]
  /** @spec SPEC-FR-6.4.2 */
  arena: Arena
}

/**
 * @spec SPEC-FR-6.3.1 - Mock-слоты льда
 * @spec SPEC-FR-6.4.2 - Mock-бронирование слота
 */
export function IceSlotsList({slots, arena}: IceSlotsListProps) {
  if (slots.length === 0) {
    return <Text color="secondary">Слоты не найдены.</Text>
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      {slots.map((slot) => (
        <Card key={slot.id} view="filled" style={{padding: 12}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            <Text>
              {new Date(slot.startsAt).toLocaleString('ru-RU')} —{' '}
              {new Date(slot.endsAt).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}
            </Text>
            <Text color="secondary">
              Статус: {slot.status}
              {slot.price ? ` · ${slot.price} RUB` : ''}
            </Text>
            <SourceMetaBadge sourceMeta={slot.sourceMeta} />
            {slot.status === 'free' && (
              <ExternalBookingButton
                arena={arena}
                slot={slot}
                label="Забронировать слот"
                size="s"
              />
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
