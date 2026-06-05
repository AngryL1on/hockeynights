/**
 * SPEC-UI-1.4
 */

import type {PlayerPosition} from '@/entities/common/types'

const POSITION_SHORT: Record<PlayerPosition, string> = {
  goalie: 'ВР',
  defense: 'ЗЩ',
  forward: 'НП',
  any: 'УНИ',
}

const POSITION_CLASS: Record<PlayerPosition, string> = {
  goalie: 'position-label--goalie',
  defense: 'position-label--defense',
  forward: 'position-label--forward',
  any: 'position-label--any',
}

/** @spec SPEC-UI-1.4 - Props нашивки амплуа */
export interface PositionLabelProps {
  /** @spec SPEC-FR-2.2.2 */
  position: PlayerPosition
  /** @spec SPEC-UI-1.4 */
  showFull?: boolean
}

/**
 * @spec SPEC-UI-1.4 - Label-нашивка по амплуа
 */
export function PositionLabel({position, showFull = false}: PositionLabelProps) {
  const label = showFull
    ? ({goalie: 'Вратарь', defense: 'Защита', forward: 'Нападение', any: 'Универсал'}[
        position
      ] ?? position)
    : POSITION_SHORT[position]

  return (
    <span className={`position-label ${POSITION_CLASS[position]}`} aria-label={`Амплуа: ${label}`}>
      {label}
    </span>
  )
}
