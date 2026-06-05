/**
 * SPEC-FR-10.1.1, SPEC-FR-10.1.2
 */

import {useQuery} from '@tanstack/react-query'
import {Text} from '@gravity-ui/uikit'
import {fetchNotifications} from '@/features/notifications/api/notificationsApi'
import {NotificationCenter} from '@/features/notifications/NotificationCenter'

/**
 * @spec SPEC-FR-10.1.1 - Страница уведомлений
 */
export function NotificationsPage() {
  const {data: notifications = [], isLoading} = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
  })

  const unreadCount = notifications.filter((n) => !n.readAt).length

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <Text variant="header-1">Уведомления</Text>
      {unreadCount > 0 && (
        <Text color="secondary">Непрочитанных: {unreadCount}</Text>
      )}
      {isLoading && <Text>Загрузка...</Text>}
      <NotificationCenter notifications={notifications} />
    </div>
  )
}
