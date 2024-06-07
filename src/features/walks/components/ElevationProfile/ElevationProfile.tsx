'use client'

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

import { useValueUnits } from '@/hooks/useValueUnits.hook'

import { AltitudeDataType } from '../../walks.types'

import { Title } from '@/components/Title/Title'

export const ElevationProfile = ({
  altitudeData: { distanceElevation, maxAltitude, minAltitude, totalAscent },
}: {
  altitudeData: AltitudeDataType
}) => {
  const {
    value: maxAltitudeValue,
    units: maxAltitudeUnits,
    unitFullname: maxAltitudeUnitFullname,
  } = useValueUnits(maxAltitude, 'm')
  const {
    value: minAltitudeValue,
    units: minAltitudeUnits,
    unitFullname: minAltitudeUnitFullname,
  } = useValueUnits(minAltitude, 'm')
  const {
    value: totalAscentValue,
    units: totalAscentUnits,
    unitFullname: totalAscentUnitFullname,
  } = useValueUnits(totalAscent, 'm')

  const elevationData = [
    { label: 'Max Altitude', value: maxAltitudeValue, unit: maxAltitudeUnits, unitFullname: maxAltitudeUnitFullname },
    { label: 'Min Altitude', value: minAltitudeValue, unit: minAltitudeUnits, unitFullname: minAltitudeUnitFullname },
    { label: 'Total Ascent', value: totalAscentValue, unit: totalAscentUnits, unitFullname: totalAscentUnitFullname },
  ]

  return (
    <section className="min-h-full w-full sm2:ml-5 sm2:w-2/4 lg:ml-0 lg:w-full">
      <Title level={3} align="left" style="line" classes="opacity-70 mb-2 lg:-mt-[7px]" lightBg>
        Elevation Profile
      </Title>

      <ResponsiveContainer width="100%" height="auto" aspect={2.6} className="mb-2 aspect-[2.6] bg-transparent">
        <LineChart data={distanceElevation} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis dataKey="distance" axisLine={false} hide />
          <YAxis dataKey="elevation" domain={['auto', 'auto']} axisLine={false} hide />
          <Line dot={false} dataKey="elevation" strokeWidth={4} className="stroke-polyline dark:opacity-90" />
        </LineChart>
      </ResponsiveContainer>

      <ul className="mb-4 mt-1 flex justify-between text-xs text-gray-800 dark:text-slate-300 xs2:text-sm sm2:text-xs lg:text-sm">
        {elevationData.map(({ label, value, unit, unitFullname }) => (
          <li className="mr-4 last:mr-0" key={`elevation-data-${label}`}>
            <strong>{`${label}: `}</strong>
            <abbr title={unitFullname} className="whitespace-nowrap">{`${value} ${unit}`}</abbr>
          </li>
        ))}
      </ul>
    </section>
  )
}
