import { Plus, Package, Egg, Syringe, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useUserRole } from "@/contexts/UserRoleContext"
import { useFarm } from "@/contexts/FarmContext"

export function QuickActions() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { hasPermission } = useUserRole()
  const { farm } = useFarm()
  const enterprises = farm?.enabledEnterprises
  const showPoultry = !enterprises || enterprises.length === 0 || enterprises.includes("poultry")

  const showPermissionError = () => {
    toast({
      title: "Access Denied",
      description: "You don't have permission to perform this action.",
      variant: "destructive"
    })
  }

  const actions = [
    showPoultry ? {
      label: "Add Bird Batch",
      icon: Plus,
      description: "Register new poultry batch",
      variant: "default" as const,
      onClick: () => hasPermission("manage_birds") ? navigate("/birds") : showPermissionError(),
      permission: "manage_birds"
    } : null,
    {
      label: "Log Feed Usage",
      icon: Package,
      description: "Record feed consumption",
      variant: "secondary" as const,
      onClick: () => hasPermission("manage_feed") ? navigate("/feed") : showPermissionError(),
      permission: "manage_feed"
    },
    showPoultry ? {
      label: "Record Eggs",
      icon: Egg,
      description: "Log daily egg collection",
      variant: "secondary" as const,
      onClick: () => hasPermission("collect_eggs") ? navigate("/eggs") : showPermissionError(),
      permission: "collect_eggs"
    } : null,
    enterprises?.includes("small_ruminants") ? {
      label: "Small ruminants",
      icon: Users,
      description: "Open flock records",
      variant: "default" as const,
      onClick: () => navigate("/ruminants"),
      permission: "view_dashboard"
    } : null,
    enterprises?.includes("cattle") ? {
      label: "Cattle",
      icon: Users,
      description: "Open the cattle herd",
      variant: "default" as const,
      onClick: () => navigate("/cattle"),
      permission: "view_dashboard"
    } : null,
    enterprises?.includes("pigs") ? {
      label: "Pigs",
      icon: Users,
      description: "Open pig records",
      variant: "default" as const,
      onClick: () => navigate("/pigs"),
      permission: "view_dashboard"
    } : null,
    {
      label: "Medicine Log",
      icon: Syringe,
      description: "Track vaccinations",
      variant: "secondary" as const,
      onClick: () => hasPermission("manage_medicine") ? navigate("/medicine") : showPermissionError(),
      permission: "manage_medicine"
    }
  ].filter((action): action is NonNullable<typeof action> => action !== null)

  return (
    <div className="chart-container">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Quick Actions</h3>
        <p className="text-sm text-muted-foreground">Common daily tasks</p>
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