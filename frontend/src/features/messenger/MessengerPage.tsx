/**
 * SPEC-FR-16.1.1, SPEC-UI-8.1
 */

import {useEffect, useState} from 'react'
import type {Chat, Message} from '@/entities/messenger/types'
import {ChatBubble} from './ChatBubble'
import {Text, TextInput, Button, Icon} from '@gravity-ui/uikit'
import {PaperPlane} from '@gravity-ui/icons'

const MOBILE_BREAKPOINT = '(max-width: 768px)'

function isMobileViewport(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_BREAKPOINT).matches
}

async function fetchChatMessages(chatId: string): Promise<Message[]> {
  const res = await fetch(`/mock-api/v1/messenger/chats/${chatId}/messages`)
  if (!res.ok) {
    throw new Error(`Failed to load messages for ${chatId}`)
  }
  const data: unknown = await res.json()
  return Array.isArray(data) ? (data as Message[]) : []
}

export function MessengerPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isMobile, setIsMobile] = useState(isMobileViewport)
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)

  useEffect(() => {
    fetch('/mock-api/v1/messenger/chats')
      .then(res => res.json())
      .then(setChats)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_BREAKPOINT)
    const update = () => {
      const mobile = mq.matches
      setIsMobile((prev) => {
        if (!prev && mobile) {
          setMobileView('list')
        }
        return mobile
      })
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isMobileViewport() && !selectedChatId && chats.length > 0) {
      void loadMessages(chats[0].id)
    }
  }, [chats, selectedChatId])

  const loadMessages = async (chatId: string) => {
    setSelectedChatId(chatId)
    setIsLoadingMessages(true)
    try {
      const nextMessages = await fetchChatMessages(chatId)
      setMessages(nextMessages)
    } catch {
      setMessages([])
    } finally {
      setIsLoadingMessages(false)
    }
  }

  const handleSelectChat = (chatId: string) => {
    if (isMobileViewport()) {
      setMobileView('chat')
    }
    void loadMessages(chatId)
  }

  const handleMobileBack = () => {
    setMobileView('list')
  }

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

  const layoutClass = [
    'messenger-layout',
    isMobile ? 'messenger-layout--mobile' : '',
    isMobile && mobileView === 'chat' ? 'messenger-layout--mobile-chat' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const selectedChat = chats.find((c) => c.id === selectedChatId)

  return (
    <div className={layoutClass}>
      <div className="messenger-sidebar">
        <Text variant="header-2" className="messenger-title">Мессенджер</Text>
        <div className="chat-list">
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => handleSelectChat(chat.id)}
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
              {isMobile && (
                <button
                  type="button"
                  className="messenger-back"
                  onClick={handleMobileBack}
                  aria-label="Назад к списку чатов"
                >
                  ←
                </button>
              )}
              <Text variant="subheader-2">{selectedChat?.title}</Text>
            </div>
            <div className="messenger-messages">
              {isLoadingMessages && messages.length === 0 ? (
                <Text variant="body-2" color="secondary">Загрузка сообщений...</Text>
              ) : messages.length === 0 ? (
                <Text variant="body-2" color="secondary">Сообщений пока нет</Text>
              ) : (
                messages.map(msg => (
                  <ChatBubble key={msg.id} message={msg} isOwn={msg.senderId === 'me'} />
                ))
              )}
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
