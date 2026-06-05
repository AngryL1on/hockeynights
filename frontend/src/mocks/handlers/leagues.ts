/**
 * SPEC-FR-7.1.1, SPEC-FR-7.1.2, SPEC-FR-7.2.1, SPEC-FR-7.2.2
 */

import {http, HttpResponse} from 'msw'
import {mockLeagues, mockSchedule, mockStandings} from '@/mocks/data/leagues'

/** @spec SPEC-FR-7.1.1 - Handlers лиг */
export const leagueHandlers = [
  http.get('/mock-api/v1/leagues', () => {
    const visible = mockLeagues.filter((l) => l.visible !== false)
    return HttpResponse.json(visible)
  }),

  http.get('/mock-api/v1/leagues/:leagueId', ({params}) => {
    const league = mockLeagues.find((l) => l.id === params.leagueId)
    if (!league || league.visible === false) {
      return HttpResponse.json({message: 'League not found'}, {status: 404})
    }
    return HttpResponse.json(league)
  }),

  http.get('/mock-api/v1/leagues/:leagueId/standings', ({params}) => {
    const standings = mockStandings.filter((s) => s.leagueId === params.leagueId)
    return HttpResponse.json(standings)
  }),

  http.get('/mock-api/v1/leagues/:leagueId/schedule', ({params}) => {
    const schedule = mockSchedule.filter((s) => s.leagueId === params.leagueId)
    return HttpResponse.json(schedule)
  }),
]
