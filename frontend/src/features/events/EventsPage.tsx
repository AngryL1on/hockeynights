/**
 * SPEC-FR-3.3.1, SPEC-FR-3.3.2, SPEC-FR-4.1.1, SPEC-FR-4.3.1, SPEC-FR-4.3.2
 * SPEC-UI-2.5, SPEC-UI-3.1
 */

import {useQuery} from '@tanstack/react-query'
import {Text} from '@gravity-ui/uikit'
import {fetchEvents} from '@/features/events/api/eventsApi'
import {EventCard} from '@/features/events/EventCard'
import {EventCreateForm} from '@/features/events/EventCreateForm'
import {IceCard} from '@/shared/ui/IceCard'
import {MatchCenterFeed} from '@/shared/ui/MatchCenterFeed'
import {ScoreboardLoader} from '@/shared/ui/ScoreboardLoader'
import {EmptyNetState} from '@/shared/ui/EmptyNetState'
import {ScrollReveal} from '@/shared/ui/ScrollStory'

/**
 * @spec SPEC-UI-2.5 - Страница событий как матч-центр
 * @spec SPEC-FR-4.1.1 - Страница событий
 */
export function EventsPage() {
  const {data: events = [], isLoading} = useQuery({queryKey: ['events'], queryFn: fetchEvents})

  const matchRows = events.map((event) => ({
    id: event.id,
    time: new Date(event.startsAt).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    title: event.title,
    subtitle: `${event.arenaName ?? event.arenaId} · ${event.type}`,
    type: (event.type === 'open_ice' ? 'open_ice' : event.type) as 'game' | 'training' | 'open_ice',
  }))

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
      <ScrollReveal direction="down">
        <Text variant="header-1" className="variable-font-header">Игры и тренировки</Text>
      </ScrollReveal>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20}}>
        <ScrollReveal direction="left">
          <IceCard padding="m">
            <EventCreateForm />
          </IceCard>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <IceCard padding="m">
            {isLoading ? (
              <ScoreboardLoader />
            ) : (
              <MatchCenterFeed
                title="Матч-центр"
                rows={matchRows}
                empty={
                  <EmptyNetState
                    title="Пустая сетка"
                    copy="Ближайших событий нет — создай игру или тренировку."
                  />
                }
              />
            )}
          </IceCard>
        </ScrollReveal>
      </div>

      {!isLoading && events.length > 0 && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <Text variant="subheader-2">Детали событий</Text>
          {events.map((event, index) => (
            <ScrollReveal key={event.id} direction={index % 2 === 0 ? 'up' : 'down'}>
              <EventCard event={event} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}
