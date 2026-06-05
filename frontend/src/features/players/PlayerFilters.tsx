/**
 * SPEC-FR-2.3.2
 */

import {Checkbox, Select, TextInput} from '@gravity-ui/uikit'
import type {PlayersFilterParams} from '@/features/players/api/playersApi'
import type {PlayerPosition, SkillLevel} from '@/entities/common/types'

/** @spec SPEC-FR-2.3.2 - Props фильтров игроков */
export interface PlayerFiltersProps {
  /** @spec SPEC-FR-2.3.2 */
  filters: PlayersFilterParams
  /** @spec SPEC-FR-2.3.2 */
  onChange: (filters: PlayersFilterParams) => void
}

const POSITION_OPTIONS = [
  {value: '', content: 'Все амплуа'},
  {value: 'forward', content: 'Нападающий'},
  {value: 'defense', content: 'Защитник'},
  {value: 'goalie', content: 'Вратарь'},
]

const SKILL_OPTIONS = [
  {value: '', content: 'Все уровни'},
  {value: 'beginner', content: 'Дебютант'},
  {value: 'amateur', content: 'Любитель'},
  {value: 'advanced', content: 'Продвинутый'},
]

/**
 * @spec SPEC-FR-2.3.2 - Фильтры по амплуа, уровню, району и роли вратаря
 */
export function PlayerFilters({filters, onChange}: PlayerFiltersProps) {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12}}>
      <Select
        label="Амплуа"
        value={[filters.position ?? '']}
        onUpdate={(v) =>
          onChange({...filters, position: (v[0] || undefined) as PlayerPosition | undefined})
        }
        options={POSITION_OPTIONS}
      />
      <Select
        label="Уровень"
        value={[filters.skillLevel ?? '']}
        onUpdate={(v) =>
          onChange({...filters, skillLevel: (v[0] || undefined) as SkillLevel | undefined})
        }
        options={SKILL_OPTIONS}
      />
      <TextInput
        label="Район"
        value={filters.district ?? ''}
        onUpdate={(v) => onChange({...filters, district: v || undefined})}
      />
      <Checkbox
        checked={Boolean(filters.goalieOnly)}
        onUpdate={(checked) => onChange({...filters, goalieOnly: checked})}
        content="Только вратари"
      />
    </div>
  )
}
