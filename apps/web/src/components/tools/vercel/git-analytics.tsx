'use client'

import { BarList } from '@tinybirdco/charts'

export function GitAnalytics(params: {
  date_from?: string
  date_to?: string
}) {
  return (
    <BarList
      endpoint="https://api.tinybird.co/v0/pipes/vercel_git_analytics.json"
      token = "p.eyJ1IjogIjdjNjJiZGRjLWQ3MDItNDBiMy04YTc5LTdkYWQ4ODZmN2FhYiIsICJpZCI6ICIwYWYxMDYzMi1iMTdhLTQzMWEtYjlkOS0wZjdlZWU1M2I3ODMiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.EUq1kGyKew75WAzACmSmPLjfjDI0F5Jj0DXQAQSqhD8"
      index="author"
      categories={['commits']}
      colorPalette={['#27F795', '#008060', '#0EB1B9', '#9263AF', '#5A6FC0', '#86BFDB', '#FFC145', '#FF6B6C', '#DC82C8', '#FFC0F1']}
      title="Git Analytics"
      height="500px"
      params={params}
    />
  )
}