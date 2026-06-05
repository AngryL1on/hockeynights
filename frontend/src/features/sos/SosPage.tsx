/**
 * SPEC-FR-5.1.1, SPEC-FR-5.1.2, SPEC-FR-5.1.3, SPEC-FR-5.2.1, SPEC-FR-5.2.2, SPEC-FR-5.2.3
 * SPEC-UI-2.5
 */

import {Text} from '@gravity-ui/uikit'
import {SosRequestForm} from '@/features/sos/SosRequestForm'
import {SosFeed} from '@/features/sos/SosFeed'
import {IceCard} from '@/shared/ui/IceCard'

/**
 * @spec SPEC-FR-5.1.1 - Страница Goalkeeper SOS
 */
export function SosPage() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
      <Text variant="header-1">Goalkeeper SOS</Text>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20}}>
        <IceCard padding="m">
          <SosRequestForm />
        </IceCard>
        <IceCard padding="m">
          <Text variant="subheader-2">Открытые запросы</Text>
          <div style={{marginTop: 12}}>
            <SosFeed />
          </div>
        </IceCard>
      </div>
    </div>
  )
}
