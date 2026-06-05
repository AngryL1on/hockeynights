/**
 * SPEC-FR-13.1.1
 * SPEC-UI-6.1
 */

import {Text} from '@gravity-ui/uikit'
import type {IqTest} from '@/entities/iq/types'
import {IceCard} from '@/shared/ui/IceCard'
import {HockeyButton} from '@/shared/ui/HockeyButton'
import {ScoreboardText} from '@/shared/ui/ScoreboardText'

/** @spec SPEC-FR-13.1.1 - Props карточки теста */
export interface IqTestCardProps {
  /** @spec SPEC-FR-13.1.1 */
  test: IqTest
  /** @spec SPEC-FR-13.1.1 */
  onStart: (test: IqTest) => void
}

/**
 * @spec SPEC-FR-13.1.1 - Карточка теста Hockey IQ
 * @spec SPEC-UI-6.1 - Стиль «тренерская доска»
 */
export function IqTestCard({test, onStart}: IqTestCardProps) {
  return (
    <IceCard padding="m" className="iq-test-card">
      <div className="iq-test-card__meta">
        <ScoreboardText>{test.category.toUpperCase()}</ScoreboardText>
        <Text color="secondary">{test.difficulty}</Text>
      </div>
      <Text variant="subheader-2">{test.title}</Text>
      <Text color="secondary">
        Вопросов: <ScoreboardText>{test.questionCount}</ScoreboardText> · Время:{' '}
        <ScoreboardText>{test.estimatedMinutes}м</ScoreboardText>
      </Text>
      <HockeyButton onClick={() => onStart(test)}>На доску</HockeyButton>
    </IceCard>
  )
}
