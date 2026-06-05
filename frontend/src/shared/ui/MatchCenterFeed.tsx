/**
 * SPEC-UI-2.5
 */

import type {ReactNode} from 'react'
import {Text} from '@gravity-ui/uikit'

/** @spec SPEC-UI-2.5 */
export type MatchCenterEventType = 'game' | 'training' | 'sos' | 'open_ice'

/** @spec SPEC-UI-2.5 - Строка матч-центра */
export interface MatchCenterRowData {
  id: string
  time: string
  title: string
  subtitle?: string
  type: MatchCenterEventType
  isSos?: boolean
  actions?: ReactNode
}

/** @spec SPEC-UI-2.5 - Props матч-центра */
export interface MatchCenterFeedProps {
  /** @spec SPEC-UI-2.5 */
  title?: string
  /** @spec SPEC-UI-2.5 */
  rows: MatchCenterRowData[]
  /** @spec SPEC-UI-3.2 */
  empty?: ReactNode
}

const TYPE_LABELS: Record<MatchCenterEventType, string> = {
  game: 'Игра',
  training: 'Тренировка',
  sos: 'SOS',
  open_ice: 'Открытый лёд',
}

/**
 * @spec SPEC-UI-2.5 - Лента в формате матч-центра
 */
export function MatchCenterFeed({title = 'Матч-центр', rows, empty}: MatchCenterFeedProps) {
  if (rows.length === 0 && empty) {
    return <>{empty}</>
  }

  return (
    <div className="match-center">
      <div className="match-center__header">{title}</div>
      {rows.map((row) => (
        <div
          key={row.id}
          className={`match-center__row${row.isSos ? ' match-center__row--sos' : ''}${row.isSos ? ' hockey-sos-pulse' : ''}`}
        >
          <div>
            <div className="match-center__time">{row.time}</div>
            <div className={`match-center__type match-center__type--${row.type}`}>
              {TYPE_LABELS[row.type]}
              {row.isSos && ' · Goalkeeper SOS'}
            </div>
          </div>
          <div>
            <Text variant="subheader-2">{row.title}</Text>
            {row.subtitle && <Text color="secondary">{row.subtitle}</Text>}
          </div>
          {row.actions && <div>{row.actions}</div>}
        </div>
      ))}
    </div>
  )
}
