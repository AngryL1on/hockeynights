/**
 * SPEC-FR-11.1.1
 */

import {useState} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {Button, Card, Select, Text, TextInput} from '@gravity-ui/uikit'
import type {AdminEntityType} from '@/entities/admin/types'
import {createAdminEntity} from '@/features/admin/api/adminApi'

const ENTITY_OPTIONS = [
  {value: 'arena', content: 'Арена'},
  {value: 'league', content: 'Лига'},
  {value: 'shop', content: 'Магазин'},
]

/**
 * @spec SPEC-FR-11.1.1 - Форма ручного добавления сущности
 */
export function AdminEntityForm() {
  const queryClient = useQueryClient()
  const [entityType, setEntityType] = useState<AdminEntityType>('arena')
  const [name, setName] = useState('')
  const [city, setCity] = useState('Москва')
  const [websiteUrl, setWebsiteUrl] = useState('')

  const mutation = useMutation({
    mutationFn: createAdminEntity,
    onSuccess: () => {
      setName('')
      setWebsiteUrl('')
      void queryClient.invalidateQueries({queryKey: ['admin-sources']})
      void queryClient.invalidateQueries({queryKey: ['arenas']})
      void queryClient.invalidateQueries({queryKey: ['leagues']})
      void queryClient.invalidateQueries({queryKey: ['shops']})
    },
  })

  function handleSubmit() {
    if (!name.trim()) return
    mutation.mutate({entityType, name, city, websiteUrl: websiteUrl || undefined})
  }

  return (
    <Card view="filled" style={{padding: 16, maxWidth: 480}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <Text variant="subheader-2">Добавить запись</Text>
        <Select
          label="Тип"
          value={[entityType]}
          onUpdate={(v) => setEntityType(v[0] as AdminEntityType)}
          options={ENTITY_OPTIONS}
        />
        <TextInput label="Название" value={name} onUpdate={setName} />
        <TextInput label="Город" value={city} onUpdate={setCity} />
        <TextInput label="Сайт" value={websiteUrl} onUpdate={setWebsiteUrl} />
        <Button view="action" loading={mutation.isPending} onClick={handleSubmit}>
          Создать
        </Button>
      </div>
    </Card>
  )
}
