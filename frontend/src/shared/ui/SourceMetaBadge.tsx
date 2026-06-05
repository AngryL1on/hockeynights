/**
 * SPEC-FR-6.3.2, SPEC-FR-7.2.2, SPEC-FR-11.2.1, SPEC-FR-11.2.2
 */

import {Label} from '@gravity-ui/uikit'
import type {SourceMeta} from '@/entities/common/types'

/** @spec SPEC-FR-6.3.2 - Props бейджа источника данных */
export interface SourceMetaBadgeProps {
  /** @spec SPEC-FR-11.2.2 */
  sourceMeta: SourceMeta
}

/**
 * @spec SPEC-FR-6.3.2 - Отображение источника и актуальности данных
 * @spec SPEC-FR-11.2.1 - Статус syncStatus
 */
export function SourceMetaBadge({sourceMeta}: SourceMetaBadgeProps) {
  const updated = new Date(sourceMeta.updatedAt).toLocaleString('ru-RU')

  return (
    <Label theme="info" size="s">
      {sourceMeta.syncStatus} · {sourceMeta.source} · {updated}
    </Label>
  )
}
