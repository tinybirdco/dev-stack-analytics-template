'use client'


import { useQuery } from '@tinybirdco/charts'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { format } from 'date-fns'

export function Auth0CumulativeSignups(params: {
  client_id?: string
  connection_id?: string
  tenant_name?: string
  token?: string
  date_from?: string
  date_to?: string
}) {
  const { data, meta, error, loading } = useQuery({
    endpoint: `${process.env.NEXT_PUBLIC_TINYBIRD_API_HOST}/v0/pipes/auth0_cumulative_users.json`,
    token: params.token ?? '',
    params: {
      client_id: params.client_id ?? '',
      connection_id: params.connection_id ?? '',
      tenant_name: params.tenant_name ?? '',
      date_from: params.date_from ?? '',
      date_to: params.date_to ?? ''
    }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const option = {
    color: ['rgb(128, 255, 165)', 'rgb(255, 0, 135)'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Cumulative Users', 'New Users']
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {},
        magicType: {
          type: ['line', 'bar', 'stack']
        },
        brush: {
          type: ['rect', 'polygon', 'lineX', 'lineY']
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data?.map((item: any) => item.day) ?? []
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Cumulative Users',
        type: 'line',
        // stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 2,
          color: 'rgb(138 98 235)'
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(138, 98, 235, 0.7)'
            },
            {
              offset: 0.5,
              color: 'rgba(138, 98, 235, 0.3)'
            },
            {
              offset: 1,
              color: 'rgba(138, 98, 235, 0)'
            }
          ]),
          // shadowOffsetX: 0,
          // shadowOffsetY: 10,
          // shadowBlur: 20
        },
        emphasis: {
          focus: 'series'
        },
        data: data?.map((item: any) => item.cumulative_users) ?? []
      },
      {
        name: 'New Users',
        type: 'line',
        // stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 135)'
            },
            {
              offset: 1,
              color: 'rgb(135, 0, 157)'
            }
          ]),
          // shadowOffsetX: 0,
          // shadowOffsetY: 10,
          // shadowBlur: 20
        },
        emphasis: {
          focus: 'series',
          lineStyle: {
            width: 20
          }
        },
        data: data?.map((item: any) => item.new_users) ?? []
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '200px' }} />

}