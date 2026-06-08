/**
 * SPEC-FR-2.3.1, SPEC-FR-8.2.1, SPEC-FR-8.2.2
 * SPEC-UI-2.1, SPEC-UI-1.3, SPEC-UI-1.4
 */

import {Text} from '@gravity-ui/uikit'
import type {PlayerListItem} from '@/entities/profile/types'
import {KarmaScore} from '@/features/karma/KarmaScore'
import {IceCard} from '@/shared/ui/IceCard'
import {PositionLabel} from '@/shared/ui/PositionLabel'
import {ScoreboardText} from '@/shared/ui/ScoreboardText'

const SKILL_LABELS: Record<string, string> = {
  beginner: 'Дебютант',
  amateur: 'Любитель',
  advanced: 'Продвинутый',
  league: 'Лига',
  unknown: '—',
}

/** @spec SPEC-FR-2.3.1 - Props карточки игрока */
export interface PlayerCardProps {
  /** @spec SPEC-FR-2.3.1 */
  player: PlayerListItem
}

/**
 * @spec SPEC-UI-2.1 - Hockey card с номером, амплуа, karma, надёжностью
 * @spec SPEC-FR-2.3.1 - Карточка игрока
 */
export function PlayerCard({player}: PlayerCardProps) {
  const jerseyNumber = String(player.userId.replace(/\D/g, '').slice(-2) || '00').padStart(2, '0')
  const reliability = Math.min(100, player.karmaScore)

  return (
    <IceCard padding="m">
      <div className="hockey-player-card">
        <div className="hockey-player-card__header">
          <div>
            <PositionLabel position={player.position} />
            <Text variant="subheader-2" className="hockey-text-mt-6">
              {player.displayName}
            </Text>
          </div>
          <ScoreboardText className="hockey-player-card__number">{jerseyNumber}</ScoreboardText>
        </div>

        <Text color="secondary">
          {SKILL_LABELS[player.skillLevel] ?? player.skillLevel} ·{' '}
          {player.district ?? 'район не указан'}
        </Text>
        {player.metro && <Text color="secondary">м. {player.metro}</Text>}

        <div>
          <Text color="secondary" className="hockey-text-caption">
            Надёжность
          </Text>
          <div className="hockey-player-card__reliability" aria-hidden>
            <div
              className="hockey-player-card__reliability-fill hockey-fill"
              style={{['--hockey-fill-width' as string]: `${reliability}%`}}
            />
          </div>
        </div>

        <KarmaScore score={player.karmaScore} />
      </div>
    </IceCard>
  )
}
