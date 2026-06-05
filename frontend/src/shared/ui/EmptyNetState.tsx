/**
 * SPEC-UI-3.2, SPEC-NFR-10
 */

import type {ReactNode} from 'react'

/** @spec SPEC-UI-3.2 - Props пустой сетки */
export interface EmptyNetStateProps {
  /** @spec SPEC-UI-3.2 */
  title?: string
  /** @spec SPEC-UI-3.2 */
  copy?: string
  /** @spec SPEC-UI-3.2 */
  action?: ReactNode
}

/**
 * @spec SPEC-UI-3.2 - Пустое состояние «пустая сетка»
 */
export function EmptyNetState({
  title = 'Пустая сетка',
  copy = 'Здесь пока ничего — время забросить первую шайбу.',
  action,
}: EmptyNetStateProps) {
  return (
    <div className="empty-net" role="status">
      <div className="empty-net__icon" aria-hidden>
        🥅
      </div>
      <div className="empty-net__title">{title}</div>
      <div className="empty-net__copy">{copy}</div>
      {action}
    </div>
  )
}
