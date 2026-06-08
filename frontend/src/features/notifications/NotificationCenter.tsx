/**
 * SPEC-FR-10.1.1, SPEC-FR-10.1.2
 */

import {Card, Label, Text} from '@gravity-ui/uikit'
import type {Notification} from '@/entities/notification/types'
import {MarkNotificationReadButton} from '@/features/notifications/MarkNotificationReadButton'

/** @spec SPEC-FR-10.1.1 - Props центра уведомлений */
export interface NotificationCenterProps {
  /** @spec SPEC-FR-10.1.1 */
  notifications: Notification[]
}

const TYPE_LABELS: Record<Notification['type'], string> = {
  sos: 'SOS',
  roster: 'Состав',
  response: 'Отклик',
  event_reminder: 'Событие',
}

/**
 * @spec SPEC-FR-10.1.1 - Список in-app уведомлений
 * @spec SPEC-FR-10.1.2 - Действие mark as read
 */
export function NotificationCenter({notifications}: NotificationCenterProps) {
  if (notifications.length === 0) {
    return <Text color="secondary">Нет уведомлений</Text>
  }

  return (
    <div className="hockey-stack hockey-stack--gap-12">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          view={notification.readAt ? 'outlined' : 'filled'}
          className="hockey-panel"
        >
          <div className="hockey-row hockey-row--gap-12 hockey-row--between">
            <div className="hockey-stack hockey-stack--gap-4">
              <div className="hockey-row hockey-row--gap-8 hockey-row--center">
                <Label size="s">{TYPE_LABELS[notification.type]}</Label>
                <Text variant="subheader-2">{notification.title}</Text>
              </div>
              <Text>{notification.body}</Text>
              <Text color="secondary" variant="caption-2">
                {new Date(notification.createdAt).toLocaleString('ru-RU')}
              </Text>
            </div>
            {!notification.readAt && (
              <MarkNotificationReadButton notificationId={notification.id} />
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
