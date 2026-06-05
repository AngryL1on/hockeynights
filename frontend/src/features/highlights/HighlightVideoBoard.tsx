/**
 * SPEC-FR-14.1.1, SPEC-FR-14.1.2, SPEC-FR-14.1.4
 * SPEC-UI-6.3, SPEC-UI-6.4
 */

import {useMemo, useState} from 'react'
import {Text} from '@gravity-ui/uikit'
import type {
  AnnotationType,
  HighlightCommentTag,
  HighlightDetail,
} from '@/entities/highlight/types'
import {AnnotationLayer} from '@/features/highlights/AnnotationLayer'
import {HighlightComments} from '@/features/highlights/HighlightComments'
import {MockUploadNotice} from '@/features/highlights/MockUploadNotice'
import {ScoreboardText} from '@/shared/ui/ScoreboardText'

/** @spec SPEC-FR-14.1.1 - Props video-board */
export interface HighlightVideoBoardProps {
  highlight: HighlightDetail
  onAddAnnotation: (payload: {
    timestampMs: number
    type: AnnotationType
    payload: Record<string, unknown>
  }) => void
  onAddComment: (payload: {tag: HighlightCommentTag; text: string}) => void
  isAnnotationPending?: boolean
  isCommentPending?: boolean
}

function formatMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

/**
 * @spec SPEC-UI-6.3 - Video-board: просмотр, разметка, комментарии
 */
export function HighlightVideoBoard({
  highlight,
  onAddAnnotation,
  onAddComment,
  isAnnotationPending = false,
  isCommentPending = false,
}: HighlightVideoBoardProps) {
  const [timestampMs, setTimestampMs] = useState(0)
  const maxMs = highlight.durationSeconds * 1000

  const sortedComments = useMemo(
    () =>
      [...highlight.comments].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [highlight.comments],
  )

  return (
    <div className="video-board">
      <MockUploadNotice />

      <div className="video-board__head">
        <Text variant="header-2">{highlight.title}</Text>
        <Text color="secondary">
          {highlight.authorDisplayName} · {highlight.durationSeconds} с ·{' '}
          <ScoreboardText>{highlight.uploadStatus}</ScoreboardText>
        </Text>
      </div>

      <div className="video-board__layout">
        <div className="video-board__main">
          <div className="video-board__preview" aria-label="Mock preview момента">
            <div className="video-board__rink" />
            <AnnotationLayer
              annotations={highlight.annotations}
              currentTimestampMs={timestampMs}
              durationSeconds={highlight.durationSeconds}
              onAddAnnotation={onAddAnnotation}
              isPending={isAnnotationPending}
            />
          </div>

          <label className="video-board__scrubber">
            <span className="video-board__scrubber-label">
              Таймкод: <ScoreboardText>{formatMs(timestampMs)}</ScoreboardText>
            </span>
            <input
              type="range"
              min={0}
              max={maxMs}
              step={100}
              value={timestampMs}
              onChange={(e) => setTimestampMs(Number(e.target.value))}
              aria-label="Позиция на таймлайне"
            />
          </label>
        </div>

        <aside className="video-board__aside">
          <HighlightComments
            comments={sortedComments}
            onAddComment={onAddComment}
            isPending={isCommentPending}
          />
        </aside>
      </div>
    </div>
  )
}
