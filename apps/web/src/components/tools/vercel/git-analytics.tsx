'use client'

import { BarList } from '@tinybirdco/charts'
import { useQueryState } from 'nuqs'

export function GitAnalytics(params: {
  date_from?: string
  date_to?: string
}) {
  const [token] = useQueryState('token')
  return (
    <BarList
      endpoint="https://api.tinybird.co/v0/pipes/vercel_git_analytics.json"
      token={token ?? ''}
      index="author"
      categories={['commits']}
      colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
      height="500px"
      params={params}
    />
  )
}