/**
 * SPEC-FR-3.1.2
 */

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Button, Select, Text} from '@gravity-ui/uikit'
import {addTeamMember} from '@/features/teams/api/teamsApi'
import {fetchPlayers} from '@/features/players/api/playersApi'

/** @spec SPEC-FR-3.1.2 - Props добавления игрока */
export interface AddTeamMemberProps {
  /** @spec SPEC-FR-3.1.2 */
  teamId: string
}

/**
 * @spec SPEC-FR-3.1.2 - Добавление игрока в состав из mock-пользователей
 */
export function AddTeamMember({teamId}: AddTeamMemberProps) {
  const queryClient = useQueryClient()
  const {data: players = []} = useQuery({queryKey: ['players'], queryFn: () => fetchPlayers()})

  const mutation = useMutation({
    mutationFn: (userId: string) => addTeamMember(teamId, userId),
    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: ['roster', teamId]})
    },
  })

  const options = players.map((p) => ({value: p.userId, content: p.displayName}))

  return (
    <div style={{display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'wrap'}}>
      <Select
        label="Добавить игрока"
        options={options}
        onUpdate={(v) => {
          if (v[0]) mutation.mutate(v[0])
        }}
        placeholder="Выберите игрока"
        width={240}
      />
      <Text color="secondary">или</Text>
      <Button
        view="outlined"
        loading={mutation.isPending}
        onClick={() => {
          const first = players[0]
          if (first) mutation.mutate(first.userId)
        }}
      >
        Добавить первого из списка
      </Button>
    </div>
  )
}
