/**
 * SPEC-UI-5.2, SPEC-FR-1.2.1, SPEC-FR-13.1.1
 */

import {Link, useLocation} from 'react-router-dom'

/** @spec SPEC-UI-5.2 */
interface MobileNavItem {
  to: string
  label: string
  icon: string
}

const MOBILE_NAV: MobileNavItem[] = [
  {to: '/events', label: 'События', icon: '🏒'},
  {to: '/players', label: 'Игроки', icon: '👤'},
  {to: '/teams', label: 'Команды', icon: '🛡'},
  {to: '/messenger', label: 'Чат', icon: '💬'},
  {to: '/iq', label: 'IQ', icon: '🎯'},
  {to: '/arenas', label: 'Катки', icon: '🧊'},
  {to: '/profile', label: 'Профиль', icon: '⚙'},
]

/**
 * @spec SPEC-UI-5.2 - Bottom navigation для mobile
 */
export function MobileNav() {
  const location = useLocation()

  return (
    <nav className="mobile-nav" aria-label="Основная навигация">
      {MOBILE_NAV.map((item) => {
        const active = location.pathname === item.to
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`mobile-nav__link${active ? ' mobile-nav__link--active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className="mobile-nav__icon" aria-hidden>
              {item.icon}
            </span>
            <span className="mobile-nav__label">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
