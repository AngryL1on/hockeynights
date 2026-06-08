/**
 * SPEC-FR-7.1.3
 */

import {Button, Text} from '@gravity-ui/uikit'
import type {League} from '@/entities/league/types'
import {MockExternalFlowDialog} from '@/shared/ui/MockExternalFlowDialog'

/** @spec SPEC-FR-7.1.3 - Props mock-портала лиги */
export interface MockLeaguePortalModalProps {
  /** @spec SPEC-FR-7.1.3 */
  open: boolean
  /** @spec SPEC-FR-7.1.3 */
  onClose: () => void
  /** @spec SPEC-FR-7.1.2 */
  league: League
}

/**
 * @spec SPEC-FR-7.1.3 - Mock-превью сайта лиги
 */
export function MockLeaguePortalModal({open, onClose, league}: MockLeaguePortalModalProps) {
  return (
    <MockExternalFlowDialog
      open={open}
      onClose={onClose}
      flowType="league_portal"
      partnerName={league.name}
      externalUrl={league.websiteUrl}
      footer={
        <Button view="action" onClick={onClose}>
          Закрыть
        </Button>
      }
    >
      <div className="hockey-stack hockey-stack--gap-8">
        <Text>{league.region}</Text>
        {league.level && <Text color="secondary">Уровень: {league.level}</Text>}
        <Text color="secondary">Интеграция: {league.integrationStatus}</Text>
        <Text color="secondary">
          Mock-портал лиги: расписание, заявки, статистика. В Phase 2 — import/API партнёра.
        </Text>
      </div>
    </MockExternalFlowDialog>
  )
}
