'use client'

import { useValueUnits } from '@/hooks/useValueUnits.hook'

import { WalkStatsType } from '../../walks.types'

import { Title } from '@/components/Title/Title'

export const StatsTable = ({
  walkStatsData: { distance, time, difficulty, terrain, area },
}: {
  walkStatsData: WalkStatsType
}) => {
  const {
    value: distanceValue,
    units: distanceUnits,
    unitFullname: distanceUnitFullname,
  } = useValueUnits(distance, 'km')

  const walkStats = [
    { label: 'Distance', value: distanceValue, unit: distanceUnits, unitFullname: distanceUnitFullname },
    { label: 'Walking Time', value: time, unit: '', unitFullname: '' },
    { label: 'Difficulty', value: difficulty, unit: '', unitFullname: '' },
    { label: 'Terrain', value: terrain, unit: '', unitFullname: '' },
    { label: 'Area', value: area, unit: '', unitFullname: '' },
  ]

  return (
    <section className="min-h-full w-full sm2:w-2/4 lg:w-full">
      <table className="w-full text-base sm2:mt-0">
        <caption>
          <Title level={3} align="left" style="line" classes="opacity-70 mb-2" lightBg>
            Walk Statistics
          </Title>
        </caption>

        <tbody className="border-t dark:border-slate-600">
          {walkStats.map(({ label, value, unit, unitFullname }) => (
            <tr
              className="border-b text-gray-800 dark:border-slate-600 dark:text-slate-300"
              key={`walk-stats-table-row-${label}`}
            >
              <th className="py-3 text-left">{label}</th>

              <td className="py-3 text-left">
                {value}

                {unit && unitFullname ? (
                  <abbr title={unitFullname} className="text-sm">
                    {' '}
                    {unit}
                  </abbr>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
