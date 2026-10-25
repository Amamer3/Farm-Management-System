"use client"

import { useState } from "react"
import Link from "next/link"
import { Bird, Egg, Package, AlertTriangle, TrendingUp, Activity, Sprout } from "lucide-react"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { AppHeader } from "@/components/layout/AppHeader"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { ProductionChart } from "@/components/dashboard/ProductionChart"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { Button } from "@/components/ui/button"
import { useUserRole } from "@/contexts/UserRoleContext"
import { useFarm } from "@/contexts/FarmContext"
import { cropLabel, enterpriseLabel, farmFocusLine } from "@/lib/farmProfile"
import { useDashboardOverview, useDashboardActivity, useDashboardPerformance, useDashboardAlerts, useProductionChart } from "@/hooks/useApiData"

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isAuthenticated } = useUserRole()
  const { farm } = useFarm()
  const enterprises = farm?.enabledEnterprises
  const crops = farm?.crops || []
  const showPoultry = !enterprises || enterprises.length === 0 || enterprises.includes("poultry")
  const livestock = [
    { id: "small_ruminants", href: "/ruminants", label: "Small ruminants" },
    { id: "cattle", href: "/cattle", label: "Cattle" },
    { id: "pigs", href: "/pigs", label: "Pigs" },
  ].filter((item) => enterprises?.includes(item.id))
   
  // Only fetch dashboard data if user is authenticated
  const { data: overview, loading: overviewLoading, error: overviewError } = useDashboardOverview()
  const { data: activities, loading: activitiesLoading, error: activitiesError } = useDashboardActivity()
  const { data: performance, loading: performanceLoading, error: performanceError } = useDashboardPerformance()
  const { data: alerts, loading: alertsLoading, error: alertsError } = useDashboardAlerts()
  const { data: productionChartData, loading: chartLoading, error: chartError } = useProductionChart('7d')

  // Loading state for any of the stats (chart loading is handled separately)
  const isLoading = overviewLoading || activitiesLoading || performanceLoading || alertsLoading
  const hasError = overviewError || activitiesError || performanceError || alertsError

  return (
    <div className="mobile-safe bg-background flex h-screen overflow-hidden">
      <AppSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col mobile-content overflow-hidden">
        <AppHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 responsive-container responsive-spacing mobile-content overflow-y-auto">
          <div className="responsive-flex items-start sm:items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="responsive-title text-foreground pt-10">{farm?.name || "Farm Dashboard"}</h1>
              <p className="responsive-subtitle">{farmFocusLine(enterprises, crops)}</p>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && !hasError && (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="ml-2 text-muted-foreground">Loading dashboard data...</span>
            </div>
          )}

          {/* Error State - Only show for critical errors (not chart errors) */}
          {(overviewError || activitiesError || performanceError || alertsError) && !isLoading && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive mb-1">Unable to load dashboard data</h3>
                  <p className="text-sm text-muted-foreground">
                    {overviewError || activitiesError || performanceError || alertsError || 'An error occurred while loading data. Please try refreshing the page.'}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => window.location.reload()}
                  >
                    Refresh Page
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Metric Cards */}
          {!isLoading && overview && (
            <div className="responsive-card-grid mb-8 gap-6">
              {showPoultry && (
                <MetricCard
                  title="Total Birds"
                  value={(overview.totalBirds ?? overview.activeBirds ?? 0).toLocaleString()}
                  change={{ value: "+0%", trend: "up" }}
                  icon={Bird}
                  gradient="blue"
                />
              )}
              {showPoultry && (
                <MetricCard
                  title="Eggs Today"
                  value={(overview.todayEggCount ?? overview.todayEggs ?? 0).toLocaleString()}
                  change={{ value: "+0%", trend: "up" }}
                  icon={Egg}
                  gradient="green"
                />
              )}
              {crops.length > 0 && (
                <MetricCard
                  title="Crops"
                  value={String(crops.length)}
                  change={{ value: crops.map(cropLabel).slice(0, 2).join(", "), trend: "up" }}
                  icon={Sprout}
                  gradient="green"
                />
              )}
              <MetricCard
                title="Feed Stock"
                value={(overview.feedItems ?? overview.feedStock ?? 0).toLocaleString()}
                change={{ value: "+0%", trend: "up" }}
                icon={Package}
                gradient="orange"
              />
              <MetricCard
                title="Health Alerts"
                value={alerts?.length?.toString() || "0"}
                change={{ value: alerts?.length > 0 ? `${alerts.length} active` : "None", trend: alerts?.length > 0 ? "down" : "up" }}
                icon={AlertTriangle}
                gradient={alerts?.length > 0 ? "red" : "green"}
              />
            </div>
          )}

          {/* Charts and actions */}
          {livestock.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-3 mb-8">
              {livestock.map((item) => (
                <Link key={item.id} href={item.href} className="rounded-xl border bg-card p-4 hover:border-primary/40">
                  <p className="text-sm text-muted-foreground">Open</p>
                  <p className="font-semibold">{item.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{enterpriseLabel(item.id)} records for this farm</p>
                </Link>
              ))}
            </div>
          )}

          <div className="responsive-chart-grid gap-6 mb-8">
            {!showPoultry ? (
              <div className="chart-container">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">This farm&apos;s focus</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Poultry production stays off this dashboard because it is not part of the farm setup.
                </p>
                <div className="space-y-2">
                  {livestock.map((item) => (
                    <Link key={item.id} href={item.href} className="block rounded-xl border px-4 py-3 text-sm font-medium hover:border-primary/40">
                      {item.label}
                    </Link>
                  ))}
                  {crops.length > 0 && (
                    <div className="rounded-xl border px-4 py-3 text-sm">
                      <p className="font-medium">Crops</p>
                      <p className="mt-1 text-muted-foreground">{crops.map(cropLabel).join(", ")}</p>
                    </div>
                  )}
                  {livestock.length === 0 && crops.length === 0 && (
                    <p className="text-sm text-muted-foreground">Add enterprises in Farm settings to shape this dashboard.</p>
                  )}
                </div>
              </div>
            ) : chartLoading ? (
              <div className="chart-container">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">Production Trends</h3>
                  <p className="text-sm text-muted-foreground">Egg production over the last 7 days</p>
                </div>
                <div className="flex flex-col items-center justify-center h-48 sm:h-64">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-sm text-muted-foreground">Loading production chart...</p>
                </div>
              </div> 
            ) : chartError ? (
              <div className="chart-container">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">Production Trends</h3>
                  <p className="text-sm text-muted-foreground">Egg production over the last 7 days</p>
                </div>
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                  <p className="text-sm font-medium text-destructive mb-1">Unable to load production chart</p>
                  <p className="text-xs text-muted-foreground mb-4 max-w-sm mx-auto">{chartError}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
                    className="border-destructive/20 hover:bg-destructive/10"
                  >
                    Retry...
                  </Button>
                </div>
              </div>
            ) : (
              <ProductionChart
                data={
                  productionChartData?.labels && productionChartData?.datasets
                    ? productionChartData.labels.map((label: string, index: number) => ({
                        day: label,
                        eggs: productionChartData.datasets?.[0]?.data?.[index] || 0,
                        target: productionChartData.datasets?.[1]?.data?.[index]
                      }))
                    : Array.isArray(productionChartData)
                    ? productionChartData
                    : productionChartData && typeof productionChartData === 'object'
                    ? (productionChartData as any).data && Array.isArray((productionChartData as any).data)
                      ? (productionChartData as any).data
                      : undefined
                    : undefined
                }
              />
            )}
            <div className="self-start w-full">
              <QuickActions />
            </div>
          </div>

          {/* Activity feed */}
          <div className="responsive-grid md-2 items-start">
            <RecentActivity activities={activities || []} />
            
            {/* Performance overview */}
            <div className="chart-container min-w-0 self-start">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">Performance Overview</h3>
                <p className="text-sm text-muted-foreground">This week's summary</p>
              </div>
              
              {performanceLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="ml-2 text-sm text-muted-foreground">Loading performance data...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {performance?.productionRate && (
                  <div className="group relative overflow-hidden rounded-xl border bg-card p-3.5 sm:p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2.5">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm sm:text-base text-foreground">Production Rate</p>
                            <p className="text-xs text-muted-foreground">{performance.productionRate.efficiency || '0'}% efficiency</p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right pl-11 sm:pl-0 shrink-0">
                          <p className={`text-lg sm:text-xl font-bold ${performance.productionRate.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {performance.productionRate.change >= 0 ? '+' : ''}{performance.productionRate.change}%
                          </p>
                          <p className="text-xs text-muted-foreground">vs last week</p>
                        </div>
                      </div>
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                          style={{ width: `${Math.min((performance.productionRate.efficiency || 0), 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {performance?.feedEfficiency && (
                  <div className="group relative overflow-hidden rounded-xl border bg-card p-3.5 sm:p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2.5">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm sm:text-base text-foreground">Feed Efficiency</p>
                            <p className="text-xs text-muted-foreground">{performance.feedEfficiency.value || '0'}kg per egg</p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right pl-11 sm:pl-0 shrink-0">
                          <p className={`text-lg sm:text-xl font-bold capitalize ${performance.feedEfficiency.status === 'optimal' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                            {performance.feedEfficiency.status || 'N/A'}
                          </p>
                          <p className="text-xs text-muted-foreground">Target: {performance.feedEfficiency.target || 'N/A'}kg</p>
                        </div>
                      </div>
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            performance.feedEfficiency.status === 'optimal' 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-400' 
                              : 'bg-gradient-to-r from-orange-500 to-orange-400'
                          }`}
                          style={{ width: `${Math.min(((performance.feedEfficiency.value || 0) / (performance.feedEfficiency.target || 1)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {performance?.mortalityRate && (
                  <div className="group relative overflow-hidden rounded-xl border bg-card p-3.5 sm:p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2.5">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                            <Bird className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm sm:text-base text-foreground">Mortality Rate</p>
                            <p className="text-xs text-muted-foreground">{performance.mortalityRate.value || '0'}% this month</p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right pl-11 sm:pl-0 shrink-0">
                          <p className={`text-lg sm:text-xl font-bold capitalize ${performance.mortalityRate.status === 'low' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                            {performance.mortalityRate.status || 'N/A'}
                          </p>
                          <p className="text-xs text-muted-foreground">Target: &lt;{performance.mortalityRate.target || '1'}%</p>
                        </div>
                      </div>
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            performance.mortalityRate.status === 'low' 
                              ? 'bg-gradient-to-r from-green-500 to-green-400' 
                              : 'bg-gradient-to-r from-orange-500 to-orange-400'
                          }`}
                          style={{ width: `${Math.min((performance.mortalityRate.value || 0) / (performance.mortalityRate.target || 1) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                  {!performance && (
                    <div className="rounded-xl border border-dashed bg-card p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                        <Activity className="w-6 h-6 text-muted-foreground/50" />
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">No performance data available</p>
                      <p className="text-xs text-muted-foreground">Performance metrics will appear here as data is collected</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
};

export default Index;
