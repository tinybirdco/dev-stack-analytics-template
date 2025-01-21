'use client'

import { BarList } from '@tinybirdco/charts'
import chrome from '@browser-logos/chrome/chrome.svg'
import firefox from '@browser-logos/firefox/firefox.svg'
import safari from '@browser-logos/safari/safari.svg'
import edge from '@browser-logos/edge/edge.svg'
import opera from '@browser-logos/opera/opera.svg'
import ie from '@browser-logos/internet-explorer-tile_10-11/internet-explorer-tile_10-11.svg'

export function Auth0TopBrowsers(params: {
  client_id?: string
  connection_id?: string
  tenant_name?: string
  token?: string
  date_from?: string
  date_to?: string
}) {
  const icons = {
    'Chrome': chrome,
    'Firefox': firefox,
    'Safari': safari,
    'Edge': edge,
    'Opera': opera,
    'Internet Explorer': ie,
    'Other': chrome
  }

  return <BarList 
    endpoint={`${process.env.NEXT_PUBLIC_TINYBIRD_API_HOST}/v0/pipes/auth0_top_browsers.json`}
    token={params.token ?? ''}
    index="browser"
    categories={['request_count']}
    colorPalette={['#f2f2f2']}
    height="250px"
    params={params}
    indexConfig={{
        label: <span className="font-bold normal-case">Browser</span>,
        renderBarContent: ({ label }) => {
          return (
            <span className="font-bold text-gray-500 flex items-center gap-2">
              <img src={icons[label as keyof typeof icons] || icons['Other']} width="16" height="16" alt="" /> {label}
            </span>
          )
        }
    }}
    categoryConfig={{
        request_count: {
              label: <span className="font-normal normal-case text-xs">Requests</span>,
              renderValue: ({ value }) => {
                return <span className="font-bold text-black">{value}</span>
              }
        }
    }}
  />
}