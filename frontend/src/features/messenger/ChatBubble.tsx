/**
 * SPEC-UI-8.1, SPEC-UI-8.2
 */

import type {ActionableMessageData, ChatAction, Message} from '@/entities/messenger/types'
import {IceCard} from '@/shared/ui/IceCard'
import {HockeyButton} from '@/shared/ui/HockeyButton'
import {Text} from '@gravity-ui/uikit'

interface ChatBubbleProps {
  message: Message
  isOwn?: boolean
}

/**
 * @spec SPEC-UI-8.1 - Glassmorphism бабблы сообщений
 */
export function ChatBubble({ message, isOwn }: ChatBubbleProps) {
  return (
    <div className={`chat-bubble-container ${isOwn ? 'chat-bubble-container--own' : ''}`}>
      {!isOwn && (
        <Text variant="caption-1" className="chat-bubble-sender">
          {message.senderName}
        </Text>
      )}
      <div className={`chat-bubble ${isOwn ? 'chat-bubble--own' : ''}`}>
        {message.type === 'actionable' && message.actionData ? (
          <ActionableMessage data={message.actionData} />
        ) : (
          <Text variant="body-1">{message.content}</Text>
        )}
        <div className="chat-bubble-meta">
          <Text variant="caption-1" className="chat-bubble-time">
            {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
          </Text>
          {isOwn && (
            <span className="chat-bubble-status" aria-hidden>
              ✓✓
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * @spec SPEC-UI-8.2 - Actionable Messages (интерактивные карточки)
 */
function ActionableMessage({data}: {data: ActionableMessageData}) {
  return (
    <IceCard padding="s" className="actionable-card">
      <div className="actionable-card__header">
        <Text variant="subheader-1" color="primary">{data.title}</Text>
      </div>
      <div className="actionable-card__body">
        <Text variant="body-1">{data.description}</Text>
      </div>
      <div className="actionable-card__actions">
        {data.actions.map((action: ChatAction) => (
          <HockeyButton
            key={action.id}
            size="s"
            view={action.style === 'primary' ? 'action' : 'normal'}
            onClick={() => console.log(`Action: ${action.action}`)}
          >
            {action.label}
          </HockeyButton>
        ))}
      </div>
    </IceCard>
  )
}
