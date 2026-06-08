/**
 * SPEC-FR-11.2.1, SPEC-FR-11.2.2
 */

import {Card, Text} from '@gravity-ui/uikit'
import type {SourceStatusItem} from '@/entities/admin/types'
import {VisibilityToggle} from '@/features/admin/VisibilityToggle'
import {SourceMetaBadge} from '@/shared/ui/SourceMetaBadge'

/** @spec SPEC-FR-11.2.1 - Props таблицы источников */
export interface SourceStatusTableProps {
  /** @spec SPEC-FR-11.2.1 */
  items: SourceStatusItem[]
}

const TYPE_LABELS: Record<SourceStatusItem['entityType'], string> = {
  arena: 'Арена',
  league: 'Лига',
  shop: 'Магазин',
}

/**
 * @spec SPEC-FR-11.2.1 - Статусы источников данных
 * @spec SPEC-FR-11.1.2 - Управление видимостью
 */
export function SourceStatusTable({items}: SourceStatusTableProps) {
  if (items.length === 0) {
    return <Text color="secondary">Нет данных</Text>
  }

  return (
    <Card view="outlined" className="hockey-panel">
      <div className="hockey-stack hockey-stack--gap-12">
        {items.map((item) => (
          <div key={`${item.entityType}-${item.entityId}`} className="admin-source-table__row">
            <Text color="secondary">{TYPE_LABELS[item.entityType]}</Text>
            <Text>{item.entityName}</Text>
            <SourceMetaBadge sourceMeta={item.sourceMeta} />
            <VisibilityToggle
              entityId={item.entityId}
              entityType={item.entityType}
              visible={item.visible}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
