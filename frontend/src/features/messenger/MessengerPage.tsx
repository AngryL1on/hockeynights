/**
 * SPEC-FR-16.1.1, SPEC-UI-8.1
 */

import {useEffect, useState} from 'react'
import type {Chat, Message} from '@/entities/messenger/types'
import {ChatBubble} from './ChatBubble'
import {Text, TextInput, Button, Icon} from '@gravity-ui/uikit'
import {PaperPlane} from '@gravity-ui/icons'

export function MessengerPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    fetch('/mock-api/v1/messenger/chats')
      .then(res => res.json())
      .then(setChats)
  }, [])

  useEffect(() => {
    if (!selectedChatId && chats.length > 0) {
      setSelectedChatId(chats[0].id)
    }
  }, [chats, selectedChatId])

  useEffect(() => {
    if (selectedChatId) {
      fetch(`/mock-api/v1/messenger/chats/${selectedChatId}/messages`)
        .then(res => res.json())
        .then(setMessages)
    }
  }, [selectedChatId])

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedChatId) return
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      chatId: selectedChatId,
      senderId: 'me',
      senderName: 'Я',
      type: 'text',
      content: inputText,
      timestamp: new Date().toISOString(),
    }
    
    setMessages(prev => [...prev, newMessage])
    setInputText('')
  }

  return (
    <div className="messenger-layout">
      <div className="messenger-sidebar">
        <Text variant="header-2" className="messenger-title">Мессенджер</Text>
        <div className="chat-list">
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => setSelectedChatId(chat.id)}
              className={`chat-item ${selectedChatId === chat.id ? 'chat-item--selected' : ''}`}
            >
              <span className="chat-item__avatar" aria-hidden>
                {chat.title.slice(0, 1)}
              </span>
              <span className="chat-item__info">
                <Text variant="body-2" className="chat-item__title">{chat.title}</Text>
                {chat.lastMessage && (
                  <Text variant="caption-1" className="chat-item__last-msg" color="secondary">
                    {chat.lastMessage.content}
                  </Text>
                )}
              </span>
              {chat.unreadCount > 0 && (
                <span className="chat-item__unread">{chat.unreadCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="messenger-main">
        {selectedChatId ? (
          <>
            <div className="messenger-header">
              <Text variant="subheader-2">{chats.find(c => c.id === selectedChatId)?.title}</Text>
            </div>
            <div className="messenger-messages">
              {messages.map(msg => (
                <ChatBubble key={msg.id} message={msg} isOwn={msg.senderId === 'me'} />
              ))}
            </div>
            <div className="messenger-input">
              <TextInput
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Напишите сообщение..."
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              />
              <Button view="action" onClick={handleSendMessage}>
                <Icon data={PaperPlane} />
              </Button>
            </div>
          </>
        ) : (
          <div className="messenger-empty">
            <Text variant="body-2" color="secondary">Выберите чат, чтобы начать общение</Text>
          </div>
        )}
      </div>
    </div>
  )
}
