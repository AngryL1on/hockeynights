/**
 * SPEC-FR-16.1.1
 */

import {apiRequest} from '@/shared/api/client'
import type {Chat} from '@/entities/messenger/types'

/** @spec SPEC-FR-16.1.1 - Список чатов пользователя */
export function fetchChats(): Promise<Chat[]> {
  return apiRequest<Chat[]>('/messenger/chats')
}

export function getTotalUnreadCount(chats: Chat[]): number {
  return chats.reduce((total, chat) => total + Math.max(0, chat.unreadCount), 0)
}
