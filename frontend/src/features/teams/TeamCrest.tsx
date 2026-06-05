/**
 * SPEC-UI-2.3
 */

import {Text} from '@gravity-ui/uikit'

/** @spec SPEC-UI-2.3 - Props шеврона команды */
export interface TeamCrestProps {
  /** @spec SPEC-FR-3.1.1 */
  name: string
  /** @spec SPEC-FR-3.1.1 */
  city?: string
  /** @spec SPEC-FR-3.1.1 */
  skillLevel?: string
}

/**
 * @spec SPEC-UI-2.3 - Шеврон команды в стиле раздевалки
 */
export function TeamCrest({name, city, skillLevel}: TeamCrestProps) {
  const initial = name.trim().charAt(0).toUpperCase() || '?'

  return (
    <div className="team-crest">
      <div className="team-crest__chevron" aria-hidden>
        {initial}
      </div>
      <div>
        <Text variant="subheader-2">{name}</Text>
        {(city || skillLevel) && (
          <Text color="secondary">
            {[city, skillLevel].filter(Boolean).join(' · ')}
          </Text>
        )}
      </div>
    </div>
  )
}
