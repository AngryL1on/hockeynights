/**
 * SPEC-FR-8.1.1, SPEC-FR-8.1.2, SPEC-FR-8.2.2
 */

import {Text} from '@gravity-ui/uikit'
import {PostGameFeedbackForm} from '@/features/feedback/PostGameFeedbackForm'
import {KarmaHint} from '@/features/karma/KarmaHint'

/**
 * @spec SPEC-FR-8.1.1 - Страница feedback
 */
export function FeedbackPage() {
  return (
    <div className="hockey-stack hockey-stack--gap-16">
      <Text variant="header-1">Feedback после игры</Text>
      <KarmaHint />
      <PostGameFeedbackForm />
    </div>
  )
}
