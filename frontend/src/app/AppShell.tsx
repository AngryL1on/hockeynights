/**
 * SPEC-FR-1.2.1, SPEC-FR-1.2.4
 * SPEC-UI-4.3, SPEC-UI-5.1, SPEC-UI-5.2, SPEC-UI-5.5, SPEC-UI-5.6, SPEC-UI-6.1
 */

import {useEffect, useRef, useState} from 'react'
import {Link, Outlet, useLocation} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {fetchNotifications} from '@/features/notifications/api/notificationsApi'
import {fetchChats, getTotalUnreadCount} from '@/features/messenger/api/messengerApi'
import {LAUNCH_REGION} from '@/shared/config/geo'
import {useHockeyTheme} from '@/shared/theme/HockeyThemeProvider'
import {HockeyButton} from '@/shared/ui/HockeyButton'
import {MobileNav} from '@/app/MobileNav'
import {SideBoard} from '@/app/SideBoard'
import {SosFab} from '@/app/SosFab'

/** @spec SPEC-FR-1.2.1 - Пункт навигации */
interface NavItem {
  to: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  {to: '/profile', label: 'Профиль'},
  {to: '/players', label: 'Игроки'},
  {to: '/teams', label: 'Команды'},
  {to: '/events', label: 'События'},
  {to: '/calendar', label: 'Календарь'},
  {to: '/sos', label: 'SOS'},
  {to: '/arenas', label: 'Катки'},
  {to: '/leagues', label: 'Лиги'},
  {to: '/shops', label: 'Магазины'},
  {to: '/iq', label: 'IQ'},
  {to: '/radar', label: 'Радар'},
  {to: '/highlights', label: 'Моменты'},
  {to: '/feedback', label: 'Feedback'},
  {to: '/notifications', label: 'Уведомления'},
  {to: '/messenger', label: 'Мессенджер'},
  {to: '/admin', label: 'Admin'},
]

function formatPeriodClock(): string {
  const now = new Date()
  const period = now.getHours() < 12 ? '1-й' : now.getHours() < 18 ? '2-й' : '3-й'
  return `${period} · ${now.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}`
}

/**
 * @spec SPEC-FR-1.2.1 - Базовый layout приложения
 * @spec SPEC-UI-5.1 - Desktop 3-col layout
 * @spec SPEC-UI-5.2 - Mobile bottom nav + SOS FAB
 */
export function AppShell() {
  const location = useLocation()
  const {themeId, toggleTheme} = useHockeyTheme()
  const navRef = useRef<HTMLDivElement>(null)
  const [puckTop, setPuckTop] = useState(0)
  const [periodClock, setPeriodClock] = useState(formatPeriodClock)
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false)
  const [isRightCollapsed, setIsRightCollapsed] = useState(false)

  const {data: notifications = []} = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
  })
  const {data: chats = []} = useQuery({
    queryKey: ['messenger-chats'],
    queryFn: fetchChats,
  })
  const unreadCount = notifications.filter((n) => !n.readAt).length
  const unreadChatCount = getTotalUnreadCount(chats)
  const isMessengerRoute = location.pathname === '/messenger'
  const isFocusMode = isLeftCollapsed && isRightCollapsed

  const bodyClasses = [
    'app-shell__body',
    'app-shell__body--grid',
    isLeftCollapsed ? 'app-shell__body--left-collapsed' : '',
    isRightCollapsed ? 'app-shell__body--right-collapsed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const active = nav.querySelector<HTMLElement>('[data-active="true"]')
    if (active) {
      setPuckTop(active.offsetTop + active.offsetHeight / 2 - 4)
    }
  }, [location.pathname])

  useEffect(() => {
    const timer = window.setInterval(() => setPeriodClock(formatPeriodClock()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <div className="app-shell__crest" aria-hidden>
            <span className="app-shell__crest-icon">🏒</span>
          </div>
          <div className="app-shell__brand-text">
            <span className="app-shell__title">Hockey Nights</span>
            <span className="app-shell__region">{LAUNCH_REGION}</span>
          </div>
        </div>

        <div className="app-shell__header-actions">
          <span className="app-shell__period" aria-live="polite">
            {periodClock}
          </span>
          <HockeyButton
            view="outlined"
            size="s"
            onClick={toggleTheme}
            aria-label="Переключить тему"
          >
            {themeId === 'locker' ? '🧊 Лёд' : '🏒 Раздевалка'}
          </HockeyButton>
          <div className="app-shell__panel-controls" aria-label="Управление панелями">
            <HockeyButton
              view={isLeftCollapsed ? 'action' : 'outlined'}
              size="s"
              onClick={() => setIsLeftCollapsed((prev) => !prev)}
              aria-label={isLeftCollapsed ? 'Показать левую панель' : 'Свернуть левую панель'}
            >
              {isLeftCollapsed ? 'Показать меню' : 'Свернуть меню'}
            </HockeyButton>
            <HockeyButton
              view={isRightCollapsed ? 'action' : 'outlined'}
              size="s"
              onClick={() => setIsRightCollapsed((prev) => !prev)}
              aria-label={isRightCollapsed ? 'Показать правую панель' : 'Свернуть правую панель'}
            >
              {isRightCollapsed ? 'Показать борт' : 'Свернуть борт'}
            </HockeyButton>
            {isMessengerRoute && (
              <HockeyButton
                view="outlined"
                size="s"
                onClick={() => {
                  if (isFocusMode) {
                    setIsLeftCollapsed(false)
                    setIsRightCollapsed(false)
                    return
                  }
                  setIsLeftCollapsed(true)
                  setIsRightCollapsed(true)
                }}
                aria-label={isFocusMode ? 'Выйти из фокус-режима' : 'Включить фокус-режим'}
              >
                {isFocusMode ? 'Обычный режим' : 'Фокус на чат'}
              </HockeyButton>
            )}
          </div>
        </div>
      </header>

      <div className={bodyClasses}>
        <nav className="app-shell__nav-col" aria-label="Основная навигация">
          <div className="hockey-nav" ref={navRef}>
            <span
              className="hockey-nav__puck hockey-nav-puck"
              style={{['--hockey-puck-top' as string]: `${puckTop}px`}}
              aria-hidden
            />
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.to
              const badge =
                item.to === '/notifications' && unreadCount > 0
                  ? unreadCount
                  : item.to === '/messenger' && unreadChatCount > 0
                    ? unreadChatCount > 99
                      ? '99+'
                      : unreadChatCount
                    : null
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`hockey-nav__link${active ? ' hockey-nav__link--active' : ''}`}
                  data-active={active ? 'true' : undefined}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                  {badge !== null && <span className="hockey-nav__badge">{badge}</span>}
                </Link>
              )
            })}
          </div>
        </nav>

        <main className="app-shell__main-col">
          <Outlet />
        </main>

        <div className="app-shell__board-col">{!isRightCollapsed && <SideBoard />}</div>
      </div>

      <MobileNav />
      <SosFab />
    </div>
  )
}
