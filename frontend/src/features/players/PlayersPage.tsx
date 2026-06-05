/**
 * SPEC-FR-2.3.1, SPEC-FR-2.3.2
 * SPEC-UI-2.1, SPEC-UI-3.1, SPEC-UI-3.3
 */

import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {Text} from '@gravity-ui/uikit'
import {fetchPlayers, type PlayersFilterParams} from '@/features/players/api/playersApi'
import {PlayerCard} from '@/features/players/PlayerCard'
import {PlayerFilters} from '@/features/players/PlayerFilters'
import {ScoreboardLoader} from '@/shared/ui/ScoreboardLoader'
import {IceSkeleton} from '@/shared/ui/IceSkeleton'
import {EmptyNetState} from '@/shared/ui/EmptyNetState'

/**
 * @spec SPEC-FR-2.3.1 - Страница списка игроков
 */
export function PlayersPage() {
  const [filters, setFilters] = useState<PlayersFilterParams>({})

  const {data: players = [], isLoading} = useQuery({
    queryKey: ['players', filters],
    queryFn: () => fetchPlayers(filters),
  })

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <Text variant="header-1">Игроки</Text>
      <PlayerFilters filters={filters} onChange={setFilters} />

      {isLoading && (
        <>
          <ScoreboardLoader />
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12}}>
            <IceSkeleton count={3} height={180} />
          </div>
        </>
      )}

      {!isLoading && (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12}}>
          {players.map((player) => (
            <PlayerCard key={player.userId} player={player} />
          ))}
        </div>
      )}

      {!isLoading && players.length === 0 && (
        <EmptyNetState
          title="Пустая сетка"
          copy="Игроки не найдены по выбранным фильтрам."
        />
      )}
    </div>
  )
}
