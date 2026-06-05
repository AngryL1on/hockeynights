/**
 * SPEC-FR-1.2.1, SPEC-FR-1.2.4
 * SPEC-UI-4.3, SPEC-UI-5.1, SPEC-UI-5.2, SPEC-UI-6.1
 */

import {useEffect, useRef, useState} from 'react'
import {Link, Outlet, useLocation} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {fetchNotifications} from '@/features/notifications/api/notificationsApi'
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

    const {data: notifications = []} = useQuery({
        queryKey: ['notifications'],
        queryFn: fetchNotifications,
    })
    const unreadCount = notifications.filter((n) => !n.readAt).length

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
                </div>
            </header>

            <div className="app-shell__body app-shell__body--grid">
                <nav className="app-shell__nav-col" aria-label="Основная навигация">
                    <div className="hockey-nav" ref={navRef}>
            <span
                className="hockey-nav__puck hockey-nav-puck"
                style={{top: puckTop}}
                aria-hidden
            />
                        {NAV_ITEMS.map((item) => {
                            const active = location.pathname === item.to
                            const badge =
                                item.to === '/notifications' && unreadCount > 0 ? unreadCount : null
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`hockey-nav__link${active ? ' hockey-nav__link--active' : ''}`}
                                    data-active={active ? 'true' : undefined}
                                    aria-current={active ? 'page' : undefined}
                                >
                                    {item.label}
                                    {badge !== null && (
                                        <span className="hockey-nav__badge">{badge}</span>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </nav>

                <main className="app-shell__main-col">
                    <Outlet/>
                </main>

                <div className="app-shell__board-col">
                    <SideBoard/>
                </div>
            </div>

            <MobileNav/>
            <SosFab/>
        </div>
    )
}
