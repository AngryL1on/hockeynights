/**
 * SPEC-FR-7.1.1, SPEC-FR-7.1.2, SPEC-FR-7.2.1, SPEC-FR-7.2.2
 * SPEC-UI-2.7, SPEC-UI-2.8
 */

import {useEffect, useState} from 'react'
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

  useEffect(() => {
    if (!selectedLeagueId && leagues[0]?.id) {
      setSelectedLeagueId(leagues[0].id)
    }
  }, [leagues, selectedLeagueId])

  const selectedLeague = leagues.find((l) => l.id === selectedLeagueId)

  const {data: standings = [], isLoading: standingsLoading} = useQuery({
    queryKey: ['league-standings', selectedLeagueId],
    queryFn: () => fetchLeagueStandings(selectedLeagueId!),
    enabled: Boolean(selectedLeagueId),
  })

  const {data: schedule = [], isLoading: scheduleLoading} = useQuery({
    queryKey: ['league-schedule', selectedLeagueId],
    queryFn: () => fetchLeagueSchedule(selectedLeagueId!),
    enabled: Boolean(selectedLeagueId),
  })

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
      <Text variant="header-1">Любительские лиги</Text>
      <Text color="secondary">
        Данные могут быть mock, manual, imported или external — смотрите бейдж источника.
      </Text>

      {isLoading && <ScoreboardLoader label="Загрузка лиг" />}

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12}}>
        {leagues.map((league) => (
          <LeagueCard
            key={league.id}
            league={league}
            selected={selectedLeagueId === league.id}
            onSelect={setSelectedLeagueId}
          />
        ))}
      </div>

      {selectedLeagueId && selectedLeague && (
        <IceCard padding="m">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 16}}>
            <div>
              <Text variant="subheader-2">{selectedLeague.name}</Text>
              <Text color="secondary">{selectedLeague.region}</Text>
            </div>
            <SourceMetaBadge sourceMeta={selectedLeague.sourceMeta} />
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
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
