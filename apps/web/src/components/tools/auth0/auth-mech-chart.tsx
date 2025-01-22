'use client'

import { BarList } from '@tinybirdco/charts'
import { FaGoogle, FaGithub, FaWindows, FaKey } from 'react-icons/fa'
import { SiAuth0 } from 'react-icons/si'
import { ShieldCheck } from 'lucide-react'

export function Auth0TopAuth(params: {
  client_id?: string
  connection_id?: string
  tenant_name?: string
  token?: string
  date_from?: string
  date_to?: string
}) {
  const icons = {
    'google-oauth2': FaGoogle,
    'auth0': SiAuth0,
    'samlp': ShieldCheck,
    'github': FaGithub,
    'waad': FaKey,
    'windowslive': FaWindows
  }

  return <BarList 
    endpoint={`${process.env.NEXT_PUBLIC_TINYBIRD_API_HOST}/v0/pipes/auth0_mech_usage.json`}
    token={params.token ?? ''}
    index="mech"
    categories={['logins']}
    colorPalette={['#f2f2f2']}
    height="250px"
    params={params}
    indexConfig={{
        label: <span className="font-bold normal-case">Auth Mechanism</span>,
        renderBarContent: ({ label }) => {
          const Icon = icons[label as keyof typeof icons] || ShieldCheck
          return (
            <span className="font-bold text-gray-700 flex items-center gap-2">
              <Icon size={16} className="text-gray-700" />
              {label}
            </span>
          )
        }
      }}
    categoryConfig={{
        logins: {
            label: <span className="font-normal normal-case text-xs">Logins</span>,
            renderValue: ({ value }) => {
              return <span className="font-bold text-black">{value}</span>
            }
        }
    }}
  />
}