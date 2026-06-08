/**
 * SPEC-FR-4.3.1, SPEC-FR-4.3.2
 * SPEC-UI-2.4
 */

import {useQuery} from '@tanstack/react-query'
import {Text} from '@gravity-ui/uikit'
import {fetchRosterStatus} from '@/features/events/api/eventsApi'
import {PositionLabel} from '@/shared/ui/PositionLabel'
import {ScoreboardText} from '@/shared/ui/ScoreboardText'
import type {PlayerPosition} from '@/entities/common/types'
import {ScoreboardLoader} from '@/shared/ui/ScoreboardLoader'

/** @spec SPEC-FR-4.3.1 - Props виджета дефицита */
export interface RosterNeedsWidgetProps {
  /** @spec SPEC-FR-4.1.1 */
  eventId: string
}

function stickFillClass(percent: number): string {
  if (percent >= 80) return 'stick-progress__fill--ok'
  if (percent >= 50) return 'stick-progress__fill--warn'
  return 'stick-progress__fill--danger'
}

/**
 * @spec SPEC-UI-2.4 - Progress «полоска на клюшке»
 * @spec SPEC-FR-4.3.1 - Дефицит состава
 */
export function RosterNeedsWidget({eventId}: RosterNeedsWidgetProps) {
  const {data: status, isLoading} = useQuery({
    queryKey: ['roster-status', eventId],
    queryFn: () => fetchRosterStatus(eventId),
  })

  if (isLoading) return <ScoreboardLoader label="Загрузка дефицита" />
  if (!status) return null

  const totalRequired = status.deficits.reduce((s, d) => s + d.count, 0) + status.summary.going
  const fillPercent = totalRequired > 0 ? Math.round((status.summary.going / totalRequired) * 100) : 100

  return (
    <div className="stick-progress">
      <Text variant="subheader-2">Дефицит состава</Text>
      <Text color="secondary">
        Идут: <ScoreboardText>{status.summary.going}</ScoreboardText> · Не идут:{' '}
        <ScoreboardText>{status.summary.notGoing}</ScoreboardText> · Под вопросом:{' '}
        <ScoreboardText>{status.summary.maybe}</ScoreboardText>
      </Text>

      <div className="stick-progress__bar" role="progressbar" aria-valuenow={fillPercent} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={`stick-progress__fill hockey-fill ${stickFillClass(fillPercent)}`}
          style={{['--hockey-fill-width' as string]: `${fillPercent}%`}}
        />
      </div>

      {status.deficits.length === 0 ? (
        <Text color="positive">Состав укомплектован</Text>
      ) : (
        <div className="hockey-stack hockey-stack--gap-6">
          {status.deficits.map((slot) => (
            <div key={slot.position} className="roster-hook-slot roster-hook-slot--deficit">
              <span className="roster-hook-slot__hook" aria-hidden>
                🪝
              </span>
              <PositionLabel position={slot.position as PlayerPosition} />
              <Text>
                не хватает <ScoreboardText tone="accent">{slot.count}</ScoreboardText>
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
