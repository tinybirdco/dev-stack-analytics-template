"use client"

import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TimeRange, type TimeRange as TR } from '@/components/time-range'
import MetricCard from '@/components/metric-card'
import { VercelDeploymentDuration } from './deployment-duration-ts'
import { VercelDeploymentsOverTime } from './deployments-over-time'
import { GitAnalytics } from './git-analytics'
import { VercelProjects } from './project-stats'
import { pipe } from '@/lib/tinybird'

interface VercelMetrics {
    total_deployments: number
    success_rate: number
    error_rate: number
}

export default function VercelDashboard() {
    const [token] = useQueryState('token')
    const [timeRange, setTimeRange] = useState<TR>('daily')
    const [dateRange, setDateRange] = useState<DateRange>({
        from: addDays(new Date(), -7),
        to: new Date()
    })
    const [metrics, setMetrics] = useState<VercelMetrics>()

    const [, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            if (!token) return

            const params = {
                time_range: timeRange,
                ...(dateRange?.from && { date_from: format(dateRange.from, 'yyyy-MM-dd HH:mm:ss') }),
                ...(dateRange?.to && { date_to: format(dateRange.to, 'yyyy-MM-dd 23:59:59') })
            }

            try {
                setIsLoading(true)
                const [
                    metricsResult,
                ] = await Promise.all([
                    pipe<{ data: VercelMetrics[] }>(token, 'vercel_deployment_metrics', params),
                ])
                setMetrics(metricsResult?.data?.[0])
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [token, timeRange, dateRange])

    return (
        <div className="space-y-8">
            <div className="flex gap-2">
                <TimeRange
                    timeRange={timeRange}
                    onTimeRangeChange={setTimeRange}
                    dateRange={dateRange}
                    onDateRangeChange={(range) => setDateRange(range || { from: addDays(new Date(), -7), to: new Date() })}
                    className="mb-8"
                />
            </div>

            {/* Metrics Row */}
            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard
                    title="Total Deployments"
                    value={metrics?.total_deployments ?? 'N/A'}
                />
                <MetricCard
                    title="Success Rate"
                    value={metrics?.success_rate ?? 'N/A'}
                />
                <MetricCard
                    title="Error Rate"
                    value={metrics?.error_rate ?? 'N/A'}
                />
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Deployments Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Deployments Over Time chart */}
                        <VercelDeploymentsOverTime
                            time_range={timeRange}
                            date_from={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd HH:mm:ss') : undefined}
                            date_to={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd HH:mm:ss') : undefined}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Deploy Duration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Deploy Duration chart */}
                        <VercelDeploymentDuration
                            time_range={timeRange}
                            date_from={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd HH:mm:ss') : undefined}
                            date_to={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd HH:mm:ss') : undefined}
                        />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Top Projects table */}
                        <VercelProjects
                            date_from={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd HH:mm:ss') : undefined}
                            date_to={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd HH:mm:ss') : undefined}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Git Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Git Analytics chart */}
                        <GitAnalytics
                            date_from={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd HH:mm:ss') : undefined}
                            date_to={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd HH:mm:ss') : undefined}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
