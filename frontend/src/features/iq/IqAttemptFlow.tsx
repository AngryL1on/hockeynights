/**
 * SPEC-FR-13.1.2
 * SPEC-UI-6.1
 */

import {useMemo, useState} from 'react'
import {Text} from '@gravity-ui/uikit'
import type {IqAttemptResult, IqQuestion, IqTest} from '@/entities/iq/types'
import {HockeyButton} from '@/shared/ui/HockeyButton'
import {IceCard} from '@/shared/ui/IceCard'
import {ScoreboardText} from '@/shared/ui/ScoreboardText'

/** @spec SPEC-FR-13.1.2 - Props прохождения теста */
export interface IqAttemptFlowProps {
  /** @spec SPEC-FR-13.1.1 */
  test: IqTest
  /** @spec SPEC-FR-13.1.2 */
  questions: IqQuestion[]
  /** @spec SPEC-FR-13.1.2 */
  isSubmitting?: boolean
  /** @spec SPEC-FR-13.1.2 */
  result?: IqAttemptResult | null
  /** @spec SPEC-FR-13.1.2 */
  onSubmit: (answers: Array<{questionId: string; optionId: string}>) => void
  /** @spec SPEC-FR-13.1.1 */
  onExit: () => void
}

/**
 * @spec SPEC-FR-13.1.2 - Интерактивный проход теста
 * @spec SPEC-UI-6.1 - UI в формате «тренерская доска»
 */
export function IqAttemptFlow({
  test,
  questions,
  isSubmitting = false,
  result,
  onSubmit,
  onExit,
}: IqAttemptFlowProps) {
  const [cursor, setCursor] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const currentQuestion = questions[cursor]

  /** @spec SPEC-FR-13.1.2 - Текущее состояние прогресса попытки */
  const answeredCount = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers],
  )

  /** @spec SPEC-FR-13.1.2 - Выбор ответа для вопроса */
  function selectAnswer(questionId: string, optionId: string) {
    setAnswers((prev) => ({...prev, [questionId]: optionId}))
  }

  /** @spec SPEC-FR-13.1.2 - Отправка завершённой попытки */
  function finishAttempt() {
    const payload = questions.map((q) => ({
      questionId: q.id,
      optionId: answers[q.id] ?? '',
    }))
    onSubmit(payload)
  }

  if (!currentQuestion) {
    return (
      <IceCard padding="m">
        <Text color="secondary">Вопросы пока недоступны.</Text>
        <div style={{marginTop: 8}}>
          <HockeyButton view="outlined" onClick={onExit}>
            Назад к каталогу
          </HockeyButton>
        </div>
      </IceCard>
    )
  }

  if (result) {
    return (
      <IceCard padding="m" className="iq-board">
        <Text variant="header-1">Результат теста</Text>
        <Text>
          <ScoreboardText tone="accent">{result.score}</ScoreboardText> /{' '}
          <ScoreboardText>{result.maxScore}</ScoreboardText>
        </Text>
        <Text color="secondary">
          Серия: <ScoreboardText>{result.streak}</ScoreboardText>
        </Text>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8}}>
          {result.details.map((detail, index) => (
            <div key={detail.questionId} className="iq-result-row">
              <Text>
                {index + 1}. {detail.userOptionId === detail.correctOptionId ? 'Верно' : 'Ошибка'}
              </Text>
              <Text color="secondary">{detail.explanation}</Text>
            </div>
          ))}
        </div>
        <div style={{display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap'}}>
          <HockeyButton onClick={onExit}>К каталогу</HockeyButton>
        </div>
      </IceCard>
    )
  }

  return (
    <IceCard padding="m" className="iq-board">
      <div className="iq-board__head">
        <Text variant="subheader-2">{test.title}</Text>
        <ScoreboardText>
          {cursor + 1}/{questions.length}
        </ScoreboardText>
      </div>

      <Text color="secondary">
        Отвечено: <ScoreboardText>{answeredCount}</ScoreboardText>
      </Text>
      <Text style={{marginTop: 8}}>{currentQuestion.prompt}</Text>

      <div className="iq-board__options">
        {currentQuestion.options.map((option) => {
          const selected = answers[currentQuestion.id] === option.id
          return (
            <button
              key={option.id}
              type="button"
              className={`iq-option${selected ? ' iq-option--selected' : ''}`}
              onClick={() => selectAnswer(currentQuestion.id, option.id)}
            >
              {option.text}
            </button>
          )
        })}
      </div>

      <div className="iq-board__actions">
        <HockeyButton
          view="outlined"
          disabled={cursor === 0}
          onClick={() => setCursor((prev) => Math.max(0, prev - 1))}
        >
          Назад
        </HockeyButton>
        {cursor < questions.length - 1 ? (
          <HockeyButton onClick={() => setCursor((prev) => prev + 1)}>Дальше</HockeyButton>
        ) : (
          <HockeyButton
            variant="sos"
            loading={isSubmitting}
            disabled={answeredCount !== questions.length}
            onClick={finishAttempt}
          >
            Завершить тест
          </HockeyButton>
        )}
      </div>
    </IceCard>
  )
}
