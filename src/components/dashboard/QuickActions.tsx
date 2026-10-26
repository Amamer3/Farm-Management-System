"use client"

import { Plus, Package, Egg, Syringe, Users } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useUserRole } from "@/contexts/UserRoleContext"
import { useFarm } from "@/contexts/FarmContext"

export function QuickActions() {
  const t = useTranslations()
  const router = useRouter()
  const { toast } = useToast()
  const { hasPermission } = useUserRole()
  const { farm } = useFarm()
  const enterprises = farm?.enabledEnterprises
  const showPoultry = !enterprises || enterprises.length === 0 || enterprises.includes("poultry")

  const showPermissionError = () => {
    toast({
      title: t("common.accessDenied"),
      description: t("common.noPermission"),
      variant: "destructive"
    })
  }

  const actions = [
    showPoultry ? {
      label: t("dashboard.addBirdBatch"),
      icon: Plus,
      description: t("dashboard.addBirdBatchHint"),
      variant: "default" as const,
      onClick: () => hasPermission("manage_birds") ? router.push("/birds") : showPermissionError(),
      permission: "manage_birds"
    } : null,
    {
      label: t("dashboard.logFeed"),
      icon: Package,
      description: t("dashboard.logFeedHint"),
      variant: "secondary" as const,
      onClick: () => hasPermission("manage_feed") ? router.push("/feed") : showPermissionError(),
      permission: "manage_feed"
    },
    showPoultry ? {
      label: t("dashboard.recordEggs"),
      icon: Egg,
      description: t("dashboard.recordEggsHint"),
      variant: "secondary" as const,
      onClick: () => hasPermission("collect_eggs") ? router.push("/eggs") : showPermissionError(),
      permission: "collect_eggs"
    } : null,
    enterprises?.includes("small_ruminants") ? {
      label: t("enterprises.small_ruminants.label"),
      icon: Users,
      description: t("dashboard.ruminantsHint"),
      variant: "default" as const,
      onClick: () => router.push("/ruminants"),
      permission: "view_dashboard"
    } : null,
    enterprises?.includes("cattle") ? {
      label: t("enterprises.cattle.label"),
      icon: Users,
      description: t("dashboard.cattleHint"),
      variant: "default" as const,
      onClick: () => router.push("/cattle"),
      permission: "view_dashboard"
    } : null,
    enterprises?.includes("pigs") ? {
      label: t("enterprises.pigs.label"),
      icon: Users,
      description: t("dashboard.pigsHint"),
      variant: "default" as const,
      onClick: () => router.push("/pigs"),
      permission: "view_dashboard"
    } : null,
    {
      label: t("dashboard.medicineLog"),
      icon: Syringe,
      description: t("dashboard.medicineLogHint"),
      variant: "secondary" as const,
      onClick: () => hasPermission("manage_medicine") ? router.push("/medicine") : showPermissionError(),
      permission: "manage_medicine"
    }
  ].filter((action): action is NonNullable<typeof action> => action !== null)

  return (
    <div className="chart-container">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{t("dashboard.quickActions")}</h3>
        <p className="text-sm text-muted-foreground">{t("dashboard.quickActionsLead")}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          const hasAccess = hasPermission(action.permission)
          
          return (
            <button
              key={action.label}
              onClick={action.onClick}
              disabled={!hasAccess}
              className={`group relative overflow-hidden rounded-xl border bg-card p-4 text-left transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
                !hasAccess ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              } ${
                action.variant === 'default'
                  ? 'border-primary/20 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent'
                  : 'hover:border-primary/30'
              }`}
            >
              {action.variant === 'default' && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              <div className="relative flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 ${
                  action.variant === 'default'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-foreground'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm mb-1 ${
                    action.variant === 'default' ? 'text-primary' : 'text-foreground'
                  }`}>
                    {action.label}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    {action.description}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}