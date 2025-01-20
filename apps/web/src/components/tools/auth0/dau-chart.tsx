"use client"

import { AreaChart } from '@tinybirdco/charts'
import { format } from 'date-fns'
import * as echarts from 'echarts'

export function Auth0Dau(params: {
  client_id?: string
  connection_id?: string
  tenant_name?: string
  token?: string
  date_from?: string
  date_to?: string
  time_range?: string
}) {
  return <AreaChart
    endpoint={`${process.env.NEXT_PUBLIC_TINYBIRD_API_HOST}/v0/pipes/auth0_dau_ts.json`}
    token={params.token ?? ''}
    index="day"
    categories={['active']}
    height="200px"
    params={params}
    stacked={true}
    // colorPalette={['#2563eb']}
    options={{
      legend: {
        data: ['Active Users']
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          magicType: {
            type: ['line', 'bar', 'stack']
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        borderRadius: 0,
        padding: [8, 12],
        formatter: (parameters: any) => {
          const data = parameters[0];
          if (params.time_range === 'daily') {
            return `${format(data.value[0], 'MMM dd, yyyy')}: ${data.value[1].toLocaleString()} active users`;
          } else if (params.time_range === 'hourly') {
            return `${format(data.value[0], 'MMM dd, yyyy HH:mm')}: ${data.value[1].toLocaleString()} active users`;
          }
          return `${format(data.value[0], 'MMM yyyy')}: ${data.value[1].toLocaleString()} active users`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'time',
        axisLine: {
          lineStyle: { color: '#e2e8f0' }
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          color: '#64748b',
          fontSize: 12,
          formatter: (value: number) => {
            if (params.time_range === 'daily') {
              return format(new Date(value), 'MMM dd, yyyy');
            } else if (params.time_range === 'hourly') {
              return format(new Date(value), 'MMM dd, yyyy HH:mm');
            }
            return format(new Date(value), 'MMM yyyy');
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#e2e8f0',
            type: 'dotted'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#64748b',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: '#e2e8f0',
            type: 'dotted'
          }
        }
      },
      // series: [{
      //   name: 'Active Users',
      //   type: 'line',
      //   smooth: true,
      //   lineStyle: {
      //     width: 0
      //   },
      //   showSymbol: false,
      //   areaStyle: {
      //     opacity: 0.8,
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       {
      //         offset: 0,
      //         color: 'rgb(55, 162, 255)'
      //       },
      //       {
      //         offset: 1,
      //         color: 'rgb(116, 21, 219)'
      //       }
      //     ])
      //   }
      // }]
    }}
  />
}