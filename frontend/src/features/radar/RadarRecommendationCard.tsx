/**
 * SPEC-FR-15.1.2, SPEC-FR-15.1.3
 * SPEC-UI-6.5, SPEC-UI-6.6
 */

import {Text} from '@gravity-ui/uikit'
import type {RadarRecommendation} from '@/entities/radar/types'
import {IceCard} from '@/shared/ui/IceCard'
import {HockeyButton} from '@/shared/ui/HockeyButton'
import {ScoreboardText} from '@/shared/ui/ScoreboardText'

const TYPE_LABELS: Record<RadarRecommendation['type'], string> = {
  sos: 'SOS',
  event: 'Игра',
  ice_slot: 'Слот льда',
  league: 'Лига',
  training: 'Тренировка',
}

/** @spec SPEC-FR-15.1.2 - Props карточки рекомендации */
export interface RadarRecommendationCardProps {
  recommendation: RadarRecommendation
  onNavigate: (recommendation: RadarRecommendation) => void
  onDismiss: (recommendation: RadarRecommendation) => void
  isPending?: boolean
}

/**
 * @spec SPEC-FR-15.1.2 - Карточка рекомендации с причиной и приоритетом
 * @spec SPEC-UI-6.6 - Причина рядом с CTA
 */
export function RadarRecommendationCard({
  recommendation,
  onNavigate,
  onDismiss,
  isPending = false,
}: RadarRecommendationCardProps) {
  const timeLabel = recommendation.startsAt
    ? new Date(recommendation.startsAt).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  return (
    <IceCard
      className={`radar-card radar-card--${recommendation.priority}`}
      padding="s"
    >
      <div className="radar-card__head">
        <span className="radar-card__type">{TYPE_LABELS[recommendation.type]}</span>
        <span className={`radar-card__priority radar-card__priority--${recommendation.priority}`}>
          {recommendation.priority === 'high' ? '🔴' : recommendation.priority === 'medium' ? '🟡' : '⚪'}
        </span>
      </div>

      <Text variant="subheader-2">{recommendation.title}</Text>

      <div className="radar-card__meta">
        {recommendation.district && (
          <Text color="secondary">{recommendation.district}</Text>
        )}
        {timeLabel && <ScoreboardText>{timeLabel}</ScoreboardText>}
      </div>

      <div className="radar-card__cta-row">
        <Text className="radar-card__reason" color="secondary">
          {recommendation.reasonText}
        </Text>
        <div className="radar-card__actions">
          <HockeyButton
            size="s"
            view="outlined"
            onClick={() => onDismiss(recommendation)}
            disabled={isPending}
          >
            Скрыть
          </HockeyButton>
          <HockeyButton
            size="m"
            onClick={() => onNavigate(recommendation)}
            disabled={isPending}
          >
            Выйти на лёд
          </HockeyButton>
        </div>
      </div>
    </IceCard>
  )
}
