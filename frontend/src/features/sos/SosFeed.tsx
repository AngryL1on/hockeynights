/**
 * SPEC-FR-5.2.1, SPEC-FR-5.2.2
 * SPEC-UI-2.5, SPEC-UI-1.2, SPEC-UI-4.4
 */

import {useState} from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Checkbox, Text, TextArea} from '@gravity-ui/uikit'
import {
  fetchRecruitmentRequests,
  respondToRecruitment,
} from '@/features/sos/api/recruitmentApi'
import {SosResponseReview} from '@/features/sos/SosResponseReview'
import {HockeyButton} from '@/shared/ui/HockeyButton'
import {MatchCenterFeed, type MatchCenterRowData} from '@/shared/ui/MatchCenterFeed'
import {ScoreboardLoader} from '@/shared/ui/ScoreboardLoader'
import {EmptyNetState} from '@/shared/ui/EmptyNetState'
import {Link} from 'react-router-dom'

/**
 * @spec SPEC-UI-2.5 - SOS в формате матч-центра
 * @spec SPEC-FR-5.2.1 - Лента SOS-запросов
 */
export function SosFeed() {
  const queryClient = useQueryClient()
  const [goalieOnly, setGoalieOnly] = useState(true)
  const [message, setMessage] = useState('Готов выйти на игру')
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null)

  const {data: requests = [], isLoading} = useQuery({
    queryKey: ['recruitment-requests', goalieOnly],
    queryFn: () => fetchRecruitmentRequests({goalieOnly}),
  })

  const respondMutation = useMutation({
    mutationFn: ({requestId, msg}: {requestId: string; msg?: string}) =>
      respondToRecruitment(requestId, msg, 'Алексей Смирнов'),
    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: ['recruitment-requests']})
    },
  })

  const rows: MatchCenterRowData[] = requests.map((request) => ({
    id: request.id,
    time: request.startsAt
      ? new Date(request.startsAt).toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '—',
    title: request.eventTitle ?? request.eventId,
    subtitle: `${request.requestedPosition} · ${request.skillLevel}${request.district ? ` · ${request.district}` : ''}`,
    type: 'sos',
    isSos: request.isGoalkeeperSos,
    actions: (
      <div style={{display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200}}>
        {request.comment && <Text>{request.comment}</Text>}
        <Text color="secondary">Сообщение отклика</Text>
        <TextArea value={message} onUpdate={setMessage} minRows={2} />
        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
          <HockeyButton
            variant="sos"
            loading={respondMutation.isPending}
            onClick={() => respondMutation.mutate({requestId: request.id, msg: message})}
          >
            Откликнуться
          </HockeyButton>
          <HockeyButton
            view="outlined"
            onClick={() =>
              setExpandedRequestId(expandedRequestId === request.id ? null : request.id)
            }
          >
            Отклики
          </HockeyButton>
        </div>
        {expandedRequestId === request.id && <SosResponseReview requestId={request.id} />}
      </div>
    ),
  }))

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <Checkbox
        checked={goalieOnly}
        onUpdate={setGoalieOnly}
        content="Только Goalkeeper SOS"
      />

      {isLoading && <ScoreboardLoader label="Загрузка SOS" />}

      {!isLoading && (
        <MatchCenterFeed
          title="SOS · Матч-центр"
          rows={rows}
          empty={
            <EmptyNetState
              title="Пустая сетка"
              copy="Открытых запросов нет — капитану пора запустить SOS."
              action={
                <Link to="/sos">
                  <HockeyButton variant="sos">Запусти SOS</HockeyButton>
                </Link>
              }
            />
          }
        />
      )}
    </div>
  )
}
