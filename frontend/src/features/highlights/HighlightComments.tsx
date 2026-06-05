/**
 * SPEC-FR-14.1.3
 * SPEC-UI-6.3
 */

import {useState} from 'react'
import {Select, Text, TextArea} from '@gravity-ui/uikit'
import type {HighlightComment, HighlightCommentTag} from '@/entities/highlight/types'
import {HockeyButton} from '@/shared/ui/HockeyButton'

const TAG_OPTIONS = [
  {value: 'tip', content: 'Совет'},
  {value: 'mistake', content: 'Ошибка'},
  {value: 'good_play', content: 'Удачный ход'},
]

const TAG_LABELS: Record<HighlightCommentTag, string> = {
  tip: 'Совет',
  mistake: 'Ошибка',
  good_play: 'Удачный ход',
}

/** @spec SPEC-FR-14.1.3 - Props комментариев */
export interface HighlightCommentsProps {
  comments: HighlightComment[]
  onAddComment: (payload: {tag: HighlightCommentTag; text: string}) => void
  isPending?: boolean
}

/**
 * @spec SPEC-FR-14.1.3 - Комментарии капитана/тренера
 * @spec SPEC-UI-6.3 - Список комментариев справа на desktop
 */
export function HighlightComments({
  comments,
  onAddComment,
  isPending = false,
}: HighlightCommentsProps) {
  const [tag, setTag] = useState<HighlightCommentTag>('tip')
  const [text, setText] = useState('')

  function submitComment() {
    if (!text.trim()) return
    onAddComment({tag, text: text.trim()})
    setText('')
  }

  return (
    <div className="highlight-comments">
      <Text variant="subheader-2">Разбор команды</Text>

      <div className="highlight-comments__list">
        {comments.length === 0 ? (
          <Text color="secondary">Комментариев пока нет</Text>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="highlight-comments__item">
              <div className="highlight-comments__meta">
                <Text>{comment.authorDisplayName}</Text>
                <span className={`highlight-comments__tag highlight-comments__tag--${comment.tag}`}>
                  {TAG_LABELS[comment.tag]}
                </span>
              </div>
              <Text>{comment.text}</Text>
              <Text color="secondary" className="highlight-comments__time">
                {new Date(comment.createdAt).toLocaleString('ru-RU')}
              </Text>
            </article>
          ))
        )}
      </div>

      <div className="highlight-comments__form">
        <Select
          value={[tag]}
          onUpdate={(vals) => setTag(vals[0] as HighlightCommentTag)}
          options={TAG_OPTIONS}
          size="m"
        />
        <TextArea
          placeholder="Комментарий капитана или тренера"
          value={text}
          onUpdate={setText}
          minRows={3}
        />
        <HockeyButton size="m" onClick={submitComment} disabled={isPending || !text.trim()}>
          Оставить комментарий
        </HockeyButton>
      </div>
    </div>
  )
}
