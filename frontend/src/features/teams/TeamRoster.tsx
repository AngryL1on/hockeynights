/**
 * SPEC-FR-3.2.1, SPEC-FR-3.2.2
 * SPEC-UI-2.3
 */

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Select, Text} from '@gravity-ui/uikit'
import {fetchTeamRoster, updateRosterMemberStatus} from '@/features/teams/api/teamsApi'
import type {RosterMember} from '@/entities/team/types'
import {PositionLabel} from '@/shared/ui/PositionLabel'
import {ScoreboardLoader} from '@/shared/ui/ScoreboardLoader'

const STATUS_OPTIONS = [
  {value: 'active', content: 'Активен'},
  {value: 'bench', content: 'Запасной'},
  {value: 'invited', content: 'Приглашён'},
  {value: 'removed', content: 'Удалён'},
]

const POSITION_ORDER = ['goalie', 'defense', 'forward', 'any'] as const

/** @spec SPEC-FR-3.2.1 - Props состава */
export interface TeamRosterProps {
  /** @spec SPEC-FR-3.2.1 */
  teamId: string
}

/**
 * @spec SPEC-UI-2.3 - Состав по позициям (крючки-слоты)
 * @spec SPEC-FR-3.2.1 - Отображение состава
 */
export function TeamRoster({teamId}: TeamRosterProps) {
  const queryClient = useQueryClient()
  const {data: roster = [], isLoading} = useQuery({
    queryKey: ['roster', teamId],
    queryFn: () => fetchTeamRoster(teamId),
  })

  const mutation = useMutation({
    mutationFn: ({userId, rosterStatus}: {userId: string; rosterStatus: RosterMember['rosterStatus']}) =>
      updateRosterMemberStatus(teamId, userId, rosterStatus),
    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: ['roster', teamId]})
    },
  })

  if (isLoading) return <ScoreboardLoader label="Загрузка состава" />

  const byPosition = POSITION_ORDER.map((pos) => ({
    position: pos,
    members: roster.filter((m) => m.position === pos && m.rosterStatus !== 'removed'),
  }))

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      {byPosition.map(({position, members}) => (
        <div key={position}>
          <PositionLabel position={position} showFull />
          <div style={{marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6}}>
            {members.length === 0 ? (
              <div className="roster-hook-slot roster-hook-slot--deficit">
                <span className="roster-hook-slot__hook" aria-hidden>
                  🪝
                </span>
                <Text color="secondary">Слот пуст — нужен игрок</Text>
              </div>
            ) : (
              members.map((member) => (
                <div key={member.userId} className="roster-hook-slot">
                  <span className="roster-hook-slot__hook" aria-hidden>
                    🪝
                  </span>
                  <div style={{flex: 1}}>
                    <Text variant="subheader-2">{member.displayName}</Text>
                  </div>
                  <Select
                    value={[member.rosterStatus]}
                    onUpdate={(v) =>
                      mutation.mutate({
                        userId: member.userId,
                        rosterStatus: v[0] as RosterMember['rosterStatus'],
                      })
                    }
                    options={STATUS_OPTIONS}
                    width={160}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
