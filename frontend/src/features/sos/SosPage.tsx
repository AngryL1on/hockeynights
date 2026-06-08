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
    <div className="hockey-stack hockey-stack--gap-20">
      <Text variant="header-1">Goalkeeper SOS</Text>

      <div className="hockey-grid hockey-grid--cards-280">
        <IceCard padding="m">
          <SosRequestForm />
        </IceCard>
        <IceCard padding="m">
          <Text variant="subheader-2">Открытые запросы</Text>
          <div className="hockey-mt-12">
            <SosFeed />
          </div>
        </IceCard>
      </div>
    </div>
  )
}
