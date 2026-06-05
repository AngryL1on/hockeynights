/**
 * SPEC-FR-3.1.1, SPEC-FR-3.1.2, SPEC-FR-3.2.1, SPEC-FR-3.2.2
 * SPEC-UI-2.3
 */

import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {Text} from '@gravity-ui/uikit'
import {fetchTeams} from '@/features/teams/api/teamsApi'
import {TeamCreateForm} from '@/features/teams/TeamCreateForm'
import {TeamRoster} from '@/features/teams/TeamRoster'
import {AddTeamMember} from '@/features/teams/AddTeamMember'
import {TeamCrest} from '@/features/teams/TeamCrest'
import {IceCard} from '@/shared/ui/IceCard'
import {ScoreboardLoader} from '@/shared/ui/ScoreboardLoader'

/**
 * @spec SPEC-UI-2.3 - Страница команд в стиле раздевалки
 * @spec SPEC-FR-3.1.1 - Страница команд
 */
export function TeamsPage() {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null)
  const {data: teams = [], isLoading} = useQuery({queryKey: ['teams'], queryFn: fetchTeams})

  const activeTeamId = selectedTeamId ?? teams[0]?.id ?? null
  const activeTeam = teams.find((t) => t.id === activeTeamId)

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
      <Text variant="header-1">Команды</Text>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20}}>
        <IceCard padding="m">
          <TeamCreateForm />
        </IceCard>

        <IceCard padding="m">
          <Text variant="subheader-2">Мои команды</Text>
          {isLoading && <ScoreboardLoader />}
          <div style={{marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8}}>
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => setSelectedTeamId(team.id)}
                style={{cursor: 'pointer'}}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedTeamId(team.id)}
              >
                <div
                  className={activeTeamId === team.id ? 'locker-room' : ''}
                  style={{
                    padding: activeTeamId === team.id ? undefined : 12,
                    borderRadius: 8,
                    border:
                      activeTeamId === team.id
                        ? undefined
                        : '1px solid var(--hockey-card-border)',
                  }}
                >
                  <TeamCrest name={team.name} city={team.city} skillLevel={team.skillLevel} />
                </div>
              </div>
            ))}
          </div>
        </IceCard>
      </div>

      {activeTeamId && activeTeam && (
        <div className="locker-room">
          <TeamCrest
            name={activeTeam.name}
            city={activeTeam.city}
            skillLevel={activeTeam.skillLevel}
          />
          <div style={{marginTop: 16, marginBottom: 12}}>
            <AddTeamMember teamId={activeTeamId} />
          </div>
          <TeamRoster teamId={activeTeamId} />
        </div>
      )}
    </div>
  )
}
