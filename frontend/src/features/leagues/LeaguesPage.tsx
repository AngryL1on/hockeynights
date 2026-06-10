/**
 * SPEC-FR-7.1.1, SPEC-FR-7.1.2, SPEC-FR-7.2.1, SPEC-FR-7.2.2
 * SPEC-UI-2.7, SPEC-UI-2.8
 */

import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {Text} from '@gravity-ui/uikit'
import {fetchLeagues, fetchLeagueSchedule, fetchLeagueStandings} from '@/features/leagues/api/leaguesApi'
import {LeagueCard} from '@/features/leagues/LeagueCard'
import {LeagueSchedule} from '@/features/leagues/LeagueSchedule'
import {LeagueStandings} from '@/features/leagues/LeagueStandings'
import {IceCard} from '@/shared/ui/IceCard'
import {ScoreboardLoader} from '@/shared/ui/ScoreboardLoader'
import {SourceMetaBadge} from '@/shared/ui/SourceMetaBadge'

/**
 * @spec SPEC-UI-2.7 - Табло турнирной таблицы с автовыбором лиги
 * @spec SPEC-FR-7.1.1 - Страница списка лиг
 */
export function LeaguesPage() {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null)

  const {data: leagues = [], isLoading} = useQuery({
    queryKey: ['leagues'],
    queryFn: fetchLeagues,
  })

  const activeLeagueId = selectedLeagueId ?? leagues[0]?.id ?? null
  const selectedLeague = leagues.find((l) => l.id === activeLeagueId)

  const {data: standings = [], isLoading: standingsLoading} = useQuery({
    queryKey: ['league-standings', activeLeagueId],
    queryFn: () => fetchLeagueStandings(activeLeagueId!),
    enabled: Boolean(activeLeagueId),
  })

  const {data: schedule = [], isLoading: scheduleLoading} = useQuery({
    queryKey: ['league-schedule', activeLeagueId],
    queryFn: () => fetchLeagueSchedule(activeLeagueId!),
    enabled: Boolean(activeLeagueId),
  })

  return (
    <div className="hockey-stack hockey-stack--gap-20">
      <Text variant="header-1">Любительские лиги</Text>
      <Text color="secondary">
        Данные могут быть mock, manual, imported или external — смотрите бейдж источника.
      </Text>

      {isLoading && <ScoreboardLoader label="Загрузка лиг" />}

      <div className="hockey-grid hockey-grid--cards-300">
        {leagues.map((league) => (
          <LeagueCard
            key={league.id}
            league={league}
            selected={activeLeagueId === league.id}
            onSelect={setSelectedLeagueId}
          />
        ))}
      </div>

      {activeLeagueId && selectedLeague && (
        <IceCard padding="m">
          <div className="hockey-row hockey-row--gap-12 hockey-row--between hockey-mb-16">
            <div>
              <Text variant="subheader-2">{selectedLeague.name}</Text>
              <Text color="secondary">{selectedLeague.region}</Text>
            </div>
            <SourceMetaBadge sourceMeta={selectedLeague.sourceMeta} />
          </div>

          <div className="hockey-stack hockey-stack--gap-20">
            {standingsLoading ? (
              <ScoreboardLoader label="Загрузка таблицы" />
            ) : (
              <LeagueStandings
                standings={standings}
                leagueName={selectedLeague.name}
              />
            )}

            {scheduleLoading ? (
              <ScoreboardLoader label="Загрузка расписания" />
            ) : (
              <LeagueSchedule schedule={schedule} />
            )}
          </div>
        </IceCard>
      )}
    </div>
  )
}
