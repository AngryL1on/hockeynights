/**
 * SPEC-UI-3.1, SPEC-NFR-10
 */

const TICKER_LINES = [
  'МЕДВЕДИ 3:2 · слот 20:00 свободен',
  'ДИНАМО 1:1 · ищем вратаря SOS',
  'ТРЕНИРОВКА 19:30 · Ходынка · 4/6 идут',
  'ЛЕД СВОБОДЕН 21:00 · ЦСКА арена',
]

/** @spec SPEC-UI-3.1 - Props loader табло */
export interface ScoreboardLoaderProps {
  /** @spec SPEC-UI-3.1 */
  label?: string
}

/**
 * @spec SPEC-UI-3.1 - Бегущая строка табло при загрузке
 */
export function ScoreboardLoader({label = 'Загрузка данных'}: ScoreboardLoaderProps) {
  const line = TICKER_LINES.join('   ◆   ')
  const duplicated = `${line}   ◆   ${line}`

  return (
    <div
      className="scoreboard-loader"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="scoreboard-loader__track hockey-scoreboard-ticker">
        <span>{duplicated}</span>
      </div>
    </div>
  )
}
