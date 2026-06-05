/**
 * SPEC-FR-14.1.1, SPEC-FR-14.1.4
 */

import {Text} from '@gravity-ui/uikit'
import type {Highlight} from '@/entities/highlight/types'
import {IceCard} from '@/shared/ui/IceCard'
import {ScoreboardText} from '@/shared/ui/ScoreboardText'

/** @spec SPEC-FR-14.1.1 */
export interface HighlightCardProps {
  highlight: Highlight
  selected?: boolean
  onSelect: (highlight: Highlight) => void
}

/**
 * @spec SPEC-FR-14.1.1 - Карточка момента в каталоге
 */
export function HighlightCard({highlight, selected = false, onSelect}: HighlightCardProps) {
  return (
    <button
      type="button"
      className={`highlight-card${selected ? ' highlight-card--selected' : ''}`}
      onClick={() => onSelect(highlight)}
      aria-pressed={selected}
    >
      <IceCard padding="s">
        <div className="highlight-card__head">
          <Text variant="subheader-2">{highlight.title}</Text>
          <span className="highlight-card__badge">mock</span>
        </div>
        <Text color="secondary">{highlight.authorDisplayName}</Text>
        <div className="highlight-card__meta">
          <ScoreboardText>{highlight.durationSeconds} с</ScoreboardText>
          {highlight.eventId && <Text color="secondary">Событие</Text>}
        </div>
      </IceCard>
    </button>
  )
}
