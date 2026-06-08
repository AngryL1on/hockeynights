/**
 * SPEC-FR-3.1.1
 */

import {useState} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {Button, Select, Text, TextArea, TextInput} from '@gravity-ui/uikit'
import {createTeam} from '@/features/teams/api/teamsApi'
import type {SkillLevel} from '@/entities/common/types'
import {DEFAULT_CITY} from '@/shared/config/geo'

const SKILL_OPTIONS = [
  {value: 'beginner', content: 'Дебютант'},
  {value: 'amateur', content: 'Любитель'},
  {value: 'advanced', content: 'Продвинутый'},
]

/**
 * @spec SPEC-FR-3.1.1 - Форма создания команды
 */
export function TeamCreateForm() {
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [city, setCity] = useState(DEFAULT_CITY)
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('amateur')
  const [description, setDescription] = useState('')

  const mutation = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      void queryClient.invalidateQueries({queryKey: ['teams']})
      setName('')
      setDescription('')
    },
  })

  /** @spec SPEC-FR-3.1.1 - Отправка формы */
  function handleSubmit() {
    if (!name.trim()) return
    mutation.mutate({name: name.trim(), city, skillLevel, description: description || undefined})
  }

  return (
    <div className="hockey-stack hockey-stack--gap-12">
      <Text variant="subheader-2">Создать команду</Text>
      <TextInput label="Название" value={name} onUpdate={setName} />
      <TextInput label="Город" value={city} onUpdate={setCity} />
      <Select
        label="Уровень"
        value={[skillLevel]}
        onUpdate={(v) => setSkillLevel(v[0] as SkillLevel)}
        options={SKILL_OPTIONS}
      />
      <div>
        <Text color="secondary">Описание</Text>
        <TextArea value={description} onUpdate={setDescription} minRows={2} />
      </div>
      <Button view="action" loading={mutation.isPending} onClick={handleSubmit}>
        Создать команду
      </Button>
    </div>
  )
}
