'use client'

import { BarList } from '@tinybirdco/charts'
import { Laptop, Bot, SmartphoneIcon } from 'lucide-react'
import { FaApple } from 'react-icons/fa'

export function Auth0TopDevices(params: {
  client_id?: string
  connection_id?: string
  tenant_name?: string
  token?: string
  date_from?: string
  date_to?: string
}) {
  const icons = {
    'Desktop': Laptop,
    'Mobile (Android)': SmartphoneIcon,
    'Mobile (iOS)': FaApple,
    'Bot': Bot
  }

  return <BarList 
    endpoint={`${process.env.NEXT_PUBLIC_TINYBIRD_API_HOST}/v0/pipes/auth0_top_devices.json`}
    token={params.token ?? ''}
    index="device"
    categories={['request_count']}
    colorPalette={['#f2f2f2']}
    height="250px"
    params={params}
    indexConfig={{
        label: 'DEVICE',
        renderBarContent: ({ label }) => {
          const Icon = icons[label as keyof typeof icons] || Laptop
          return (
            <span className="font-bold text-black flex items-center gap-2">
              <Icon size={16} className={label === 'Mobile (iOS)' ? 'stroke-[36] stroke-black fill-white' : ''} />
              {label}
            </span>
          )
        }
    }}
    categoryConfig={{
        request_count: {
            label: <span className="font-normal normal-case text-xs">Requests</span>
        }
    }}
  />
}