'use client'

import { LineChart } from '@tinybirdco/charts'
import { useQueryState } from 'nuqs'

export function VercelDeploymentDuration(params: {
  date_from?: string
  date_to?: string
  time_range?: string
}) {
  const [token] = useQueryState('token')
  return (
    <LineChart
      endpoint="https://api.tinybird.co/v0/pipes/vercel_deployment_duration.json"
      token={token ?? ''}
      index="period"
      categories={['avg_duration', 'p95_duration']}
      colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
      stacked={true}
      height="500px"
      params={params}
    />
  )
}