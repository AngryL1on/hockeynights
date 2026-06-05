/**
 * SPEC-FR-7.2.1, SPEC-FR-7.2.2
 * SPEC-UI-2.7, SPEC-UI-1.5
 */

import {useMemo} from 'react'
import type {LeagueStanding} from '@/entities/league/types'
import {EmptyNetState} from '@/shared/ui/EmptyNetState'
import {ScoreboardText} from '@/shared/ui/ScoreboardText'

const RANK_MEDAL: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
}

/** @spec SPEC-FR-7.2.1 - Props таблицы */
export interface LeagueStandingsProps {
  /** @spec SPEC-FR-7.2.1 */
  standings: LeagueStanding[]
  /** @spec SPEC-UI-2.7 */
  leagueName?: string
  /** @spec SPEC-UI-2.7 */
  compact?: boolean
}

/**
 * @spec SPEC-UI-2.7 - Турнирная таблица как табло арены
 * @spec SPEC-FR-7.2.1 - Турнирная таблица лиги
 */
export function LeagueStandings({standings, leagueName, compact = false}: LeagueStandingsProps) {
  const ranked = useMemo(
    () =>
      [...standings]
        .sort((a, b) => b.points - a.points || b.wins - a.wins)
        .map((row, index) => ({...row, rank: index + 1})),
    [standings],
  )

  const maxPoints = ranked[0]?.points ?? 1

  if (ranked.length === 0) {
    return (
      <EmptyNetState
        title="Таблица пуста"
        copy="Данные турнирной таблицы пока не загружены — проверьте источник лиги."
      />
    )
  }

  const rows = compact ? ranked.slice(0, 3) : ranked

  return (
    <div
      className={`standings-board${compact ? ' standings-board--compact' : ''}`}
      role="table"
      aria-label={leagueName ? `Турнирная таблица: ${leagueName}` : 'Турнирная таблица'}
    >
      <div className="standings-board__header">
        <div className="standings-board__title">
          {compact ? 'Топ-3' : 'Турнирная таблица'}
        </div>
        {leagueName && (
          <div className="standings-board__league">{leagueName}</div>
        )}
      </div>

      {!compact && (
        <div className="standings-board__cols" role="row">
          <span role="columnheader">#</span>
          <span role="columnheader">Команда</span>
          <span role="columnheader">И</span>
          <span role="columnheader">В</span>
          <span role="columnheader">П</span>
          <span role="columnheader">О</span>
          <span role="columnheader">Форма</span>
        </div>
      )}

      {rows.map((row) => {
        const isLeader = row.rank === 1
        const rankClass =
          row.rank <= 3 ? `standings-board__rank--${row.rank}` : ''
        const fillPercent = Math.round((row.points / maxPoints) * 100)

        if (compact) {
          return (
            <div
              key={`${row.leagueId}-${row.teamName}`}
              className={`standings-board__row standings-board__row--compact${isLeader ? ' standings-board__row--leader' : ''}`}
              role="row"
            >
              <div className={`standings-board__rank ${rankClass}`} role="cell">
                {RANK_MEDAL[row.rank] ?? row.rank}
              </div>
              <div className="standings-board__team" role="cell">
                {row.teamName}
              </div>
              <div className="standings-board__stat" role="cell">
                <ScoreboardText tone={isLeader ? 'gold' : 'accent'}>
                  {row.points} О
                </ScoreboardText>
              </div>
            </div>
          )
        }

        return (
          <div
            key={`${row.leagueId}-${row.teamName}`}
            className={`standings-board__row${isLeader ? ' standings-board__row--leader' : ''}`}
            role="row"
          >
            <div
              className={`standings-board__rank ${rankClass}`}
              role="cell"
              aria-label={`Место ${row.rank}`}
            >
              {RANK_MEDAL[row.rank] ?? row.rank}
            </div>
            <div className="standings-board__team" role="cell">
              {row.teamName}
            </div>
            <div className="standings-board__stat" role="cell">
              <ScoreboardText>{row.gamesPlayed}</ScoreboardText>
            </div>
            <div className="standings-board__stat" role="cell">
              <ScoreboardText>{row.wins}</ScoreboardText>
            </div>
            <div className="standings-board__stat" role="cell">
              <ScoreboardText>{row.losses}</ScoreboardText>
            </div>
            <div className="standings-board__stat" role="cell">
              <ScoreboardText tone={isLeader ? 'gold' : 'accent'}>
                {row.points}
              </ScoreboardText>
            </div>
            <div className="standings-board__bar-cell" role="cell">
              <div className="standings-board__points-bar" aria-hidden>
                <div
                  className="standings-board__points-fill"
                  style={{width: `${fillPercent}%`}}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
