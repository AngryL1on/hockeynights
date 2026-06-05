/**
 * SPEC-FR-5.2.3
 */

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Button, Card, Text} from '@gravity-ui/uikit'
import {
  fetchRecruitmentResponses,
  reviewRecruitmentResponse,
} from '@/features/sos/api/recruitmentApi'

/** @spec SPEC-FR-5.2.3 - Props просмотра откликов */
export interface SosResponseReviewProps {
  /** @spec SPEC-FR-5.1.1 */
  requestId: string
}

/**
 * @spec SPEC-FR-5.2.3 - Подтверждение или отклонение отклика капитаном
 */
export function SosResponseReview({requestId}: SosResponseReviewProps) {
  const queryClient = useQueryClient()
  const {data: responses = [], isLoading} = useQuery({
    queryKey: ['recruitment-responses', requestId],
    queryFn: () => fetchRecruitmentResponses(requestId),
  })

  const mutation = useMutation({
    mutationFn: ({responseId, status}: {responseId: string; status: 'accepted' | 'declined'}) =>
      reviewRecruitmentResponse(responseId, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: ['recruitment-responses', requestId]})
      void queryClient.invalidateQueries({queryKey: ['recruitment-requests']})
    },
  })

  if (isLoading) return <Text color="secondary">Загрузка откликов...</Text>
  if (responses.length === 0) return <Text color="secondary">Откликов пока нет.</Text>

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      {responses.map((response) => (
        <Card key={response.id} view="outlined" style={{padding: 12}}>
          <Text variant="subheader-2">{response.displayName ?? response.userId}</Text>
          {response.message && <Text color="secondary">{response.message}</Text>}
          <Text color="secondary">Статус: {response.status}</Text>
          {response.status === 'pending' && (
            <div style={{display: 'flex', gap: 8, marginTop: 8}}>
              <Button
                view="action"
                size="s"
                loading={mutation.isPending}
                onClick={() => mutation.mutate({responseId: response.id, status: 'accepted'})}
              >
                Принять
              </Button>
              <Button
                view="outlined-danger"
                size="s"
                loading={mutation.isPending}
                onClick={() => mutation.mutate({responseId: response.id, status: 'declined'})}
              >
                Отклонить
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
