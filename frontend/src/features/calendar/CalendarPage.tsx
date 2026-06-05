/**
 * SPEC-FR-4.2.1, SPEC-FR-4.2.2
 * SPEC-UI-2.6, SPEC-UI-3.1
 */

import {useMemo, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {Text} from '@gravity-ui/uikit'
import {fetchCalendar} from '@/features/events/api/eventsApi'
import type {CalendarFilters as CalendarFiltersType} from '@/entities/event/types'
import {CalendarFilters} from '@/features/calendar/CalendarFilters'
import {EventCard} from '@/features/events/EventCard'
import {ScoreboardLoader} from '@/shared/ui/ScoreboardLoader'
import {EmptyNetState} from '@/shared/ui/EmptyNetState'

const MONTH_SHORT = [
  'янв', 'фев', 'мар', 'апр', 'май', 'июн',
  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
]

/**
 * @spec SPEC-UI-2.6 - Календарь как расписание табло
 * @spec SPEC-FR-4.2.1 - Календарь пользователя
 */
export function CalendarPage() {
  const [filters, setFilters] = useState<CalendarFiltersType>({})

  const {data: events = [], isLoading} = useQuery({
    queryKey: ['calendar', filters],
    queryFn: () => fetchCalendar(filters),
  })

  const byDay = useMemo(() => {
    const map = new Map<string, typeof events>()
    for (const event of events) {
      const key = new Date(event.startsAt).toDateString()
      const list = map.get(key) ?? []
      list.push(event)
      map.set(key, list)
    }
    return [...map.entries()].sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
  }, [events])

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <Text variant="header-1">Календарь</Text>
      <CalendarFilters filters={filters} onChange={setFilters} />

      {isLoading && <ScoreboardLoader label="Загрузка календаря" />}

      {!isLoading && events.length > 0 && (
        <div className="scoreboard-calendar">
          {byDay.map(([dayKey, dayEvents]) => {
            const date = new Date(dayKey)
            return (
              <div key={dayKey} className="scoreboard-calendar__day">
                <div className="scoreboard-calendar__date">
                  <div className="scoreboard-calendar__date-day">{date.getDate()}</div>
                  <div className="scoreboard-calendar__date-month">
                    {MONTH_SHORT[date.getMonth()]}
                  </div>
                </div>
                <div className="scoreboard-calendar__events">
                  {dayEvents.map((event) => (
                    <EventCard key={event.id} event={event} compact />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!isLoading && events.length === 0 && (
        <EmptyNetState
          title="Пустая сетка"
          copy="События не найдены по выбранным фильтрам."
        />
      )}
    </div>
  )
}
