import { http, HttpResponse } from 'msw'
import { mockChats, mockMessages } from '@/mocks/data/messenger'

/** @spec SPEC-FR-16.1.1, SPEC-FR-16.1.2, SPEC-FR-16.1.3 */
export const messengerHandlers = [
  http.get('/mock-api/v1/messenger/chats', () => {
    return HttpResponse.json(mockChats)
  }),

  http.get('/mock-api/v1/messenger/chats/:chatId/messages', ({ params }) => {
    const messages = mockMessages[params.chatId as string] || []
    return HttpResponse.json(messages)
  }),

  /** @spec SPEC-FR-16.1.4 - Обработка действий в сообщениях */
  http.post('/mock-api/v1/messenger/actions/:actionId', ({ params }) => {
    return HttpResponse.json({ success: true, actionId: params.actionId })
  }),
]
