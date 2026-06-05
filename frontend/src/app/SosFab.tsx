/**
 * SPEC-UI-5.2, SPEC-FR-5.2.2
 */

import {Link} from 'react-router-dom'

/**
 * @spec SPEC-UI-5.2 - Sticky FAB для SOS на mobile
 * @spec SPEC-UI-5.4 - Текст дублирует красный цвет
 */
export function SosFab() {
  return (
    <Link to="/sos" className="sos-fab hockey-sos-pulse" aria-label="Goalkeeper SOS — срочный добор">
      SOS
    </Link>
  )
}
