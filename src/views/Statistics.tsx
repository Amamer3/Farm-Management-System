"use client"

import { useState } from "react"
import Link from "next/link"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppSidebar } from "@/components/layout/AppSidebar"
import StatisticsDashboard from "@/components/statistics/StatisticsDashboard"
import { useFarm } from "@/contexts/FarmContext"

export default function Statistics() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { hasEnterprise, farm } = useFarm()
  const showPoultry = !farm || farm.enabledEnterprises.length === 0 || hasEnterprise("poultry")

  return (
    <div className="mobile-safe bg-background flex h-screen overflow-hidden">
      <AppSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col mobile-content overflow-hidden">
        <AppHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 responsive-container responsive-spacing mobile-content overflow-y-auto">
          {showPoultry ? (
            <StatisticsDashboard />
          ) : (
            <div className="rounded-xl border p-6">
              <h1 className="text-2xl font-bold">Statistics</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Egg-grade and pen charts stay on poultry farms. Open reports for feed, health, and financial summaries, or livestock pages for herd events.
              </p>
              <Link href="/reports" className="mt-4 inline-block text-sm font-semibold text-primary">Open reports</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}