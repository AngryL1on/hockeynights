/**
 * SPEC-FR-13.1.3
 * SPEC-UI-6.2
 */

import {Text} from '@gravity-ui/uikit'
import type {IqLeaderboardRow} from '@/entities/iq/types'
import {IceCard} from '@/shared/ui/IceCard'
import {ScoreboardText} from '@/shared/ui/ScoreboardText'

/** @spec SPEC-FR-13.1.3 - Props лидерборда */
export interface IqLeaderboardProps {
  /** @spec SPEC-FR-13.1.3 */
  rows: IqLeaderboardRow[]
}

/**
 * @spec SPEC-FR-13.1.3 - Лидерборд Hockey IQ
 * @spec SPEC-UI-6.2 - Рейтинг с LED-числами
 */
export function IqLeaderboard({rows}: IqLeaderboardProps) {
  return (
    <IceCard padding="m">
      <Text variant="subheader-2">IQ Leaderboard</Text>
      <div className="iq-leaderboard" role="table" aria-label="Hockey IQ leaderboard">
        {rows.map((row) => (
          <div key={row.userId} className="iq-leaderboard__row" role="row">
            <span role="cell" className="iq-leaderboard__rank">
              {row.rank}
            </span>
            <span role="cell">{row.displayName}</span>
            <span role="cell">
              <ScoreboardText tone={row.rank === 1 ? 'gold' : 'accent'}>
                {row.score}
              </ScoreboardText>
            </span>
            <span role="cell" className="iq-leaderboard__streak">
              x{row.streak}
            </span>
          </div>
        ))}
      </div>
    </IceCard>
  )
}
