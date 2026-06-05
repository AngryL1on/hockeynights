/**
 * SPEC-FR-8.1.1, SPEC-FR-8.1.2
 */

import {useState} from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {Button, Card, Select, Text, TextArea} from '@gravity-ui/uikit'
import type {CreateFeedbackPayload} from '@/entities/feedback/types'
import {submitFeedback} from '@/features/feedback/api/feedbackApi'
import {useFeedbackEligibleEvents} from '@/features/feedback/useFeedbackEligibility'
import {fetchPlayers} from '@/features/players/api/playersApi'

const ATTENDANCE_OPTIONS = [
  {value: 'confirmed', content: 'Пришёл вовремя'},
  {value: 'late', content: 'Опоздал'},
  {value: 'no_show', content: 'Не пришёл'},
]

const SKILL_OPTIONS = [
  {value: 'too_low', content: 'Уровень ниже заявленного'},
  {value: 'matched', content: 'Уровень совпал'},
  {value: 'too_high', content: 'Уровень выше заявленного'},
]

const BEHAVIOR_OPTIONS = [
  {value: 'positive', content: 'Позитивное'},
  {value: 'neutral', content: 'Нейтральное'},
  {value: 'negative', content: 'Негативное'},
]

/**
 * @spec SPEC-FR-8.1.1 - Форма post-game feedback
 * @spec SPEC-FR-8.1.2 - Только для участников события
 */
export function PostGameFeedbackForm() {
  const queryClient = useQueryClient()
  const {data: events = []} = useFeedbackEligibleEvents()
  const {data: players = []} = useQuery({
    queryKey: ['players'],
    queryFn: () => fetchPlayers(),
  })

  const [eventId, setEventId] = useState('')
  const [toUserId, setToUserId] = useState('')
  const [attendanceRating, setAttendanceRating] =
    useState<CreateFeedbackPayload['attendanceRating']>('confirmed')
  const [skillMatchRating, setSkillMatchRating] =
    useState<CreateFeedbackPayload['skillMatchRating']>('matched')
  const [behaviorRating, setBehaviorRating] =
    useState<CreateFeedbackPayload['behaviorRating']>('positive')
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      setError(null)
      setComment('')
      void queryClient.invalidateQueries({queryKey: ['players']})
      void queryClient.invalidateQueries({queryKey: ['profile']})
    },
    onError: (err: Error) => setError(err.message),
  })

  const selectedEvent = events.find((e) => e.id === eventId)
  const participantOptions = selectedEvent
    ? selectedEvent.participation
        .filter((p) => p.userId !== 'user-001')
        .map((p) => ({value: p.userId, content: p.displayName}))
    : players.map((p) => ({value: p.userId, content: p.displayName}))

  function handleSubmit() {
    if (!eventId || !toUserId) {
      setError('Выберите событие и игрока')
      return
    }
    mutation.mutate({
      eventId,
      toUserId,
      attendanceRating,
      skillMatchRating,
      behaviorRating,
      comment: comment || undefined,
    })
  }

  if (events.length === 0) {
    return (
      <Text color="secondary">
        Feedback доступен только после участия в событии со статусом «иду».
      </Text>
    )
  }

  return (
    <Card view="outlined" style={{padding: 16, maxWidth: 560}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <Text variant="subheader-2">Post-game feedback</Text>

        <Select
          label="Событие"
          value={[eventId]}
          onUpdate={(v) => setEventId(v[0] ?? '')}
          options={events.map((e) => ({value: e.id, content: e.title}))}
        />
        <Select
          label="Игрок"
          value={[toUserId]}
          onUpdate={(v) => setToUserId(v[0] ?? '')}
          options={participantOptions}
        />
        <Select
          label="Явка"
          value={[attendanceRating]}
          onUpdate={(v) => setAttendanceRating(v[0] as CreateFeedbackPayload['attendanceRating'])}
          options={ATTENDANCE_OPTIONS}
        />
        <Select
          label="Уровень"
          value={[skillMatchRating]}
          onUpdate={(v) => setSkillMatchRating(v[0] as CreateFeedbackPayload['skillMatchRating'])}
          options={SKILL_OPTIONS}
        />
        <Select
          label="Поведение"
          value={[behaviorRating]}
          onUpdate={(v) => setBehaviorRating(v[0] as CreateFeedbackPayload['behaviorRating'])}
          options={BEHAVIOR_OPTIONS}
        />
        <div>
          <Text color="secondary">Комментарий</Text>
          <TextArea value={comment} onUpdate={setComment} minRows={3} />
        </div>

        {error && <Text color="danger">{error}</Text>}
        {mutation.isSuccess && <Text color="positive">Feedback отправлен</Text>}

        <Button view="action" loading={mutation.isPending} onClick={handleSubmit}>
          Отправить feedback
        </Button>
      </div>
    </Card>
  )
}
