import { useTranslations } from "next-intl"
import { Clock, Egg, Package, Syringe, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: string | number
  type: "eggs" | "feed" | "medicine" | "alert" | string
  message: string
  time: string
  status: "success" | "warning" | "error"
}

interface RecentActivityProps {
  activities?: Activity[]
}

const iconMap: Record<string, typeof Egg> = {
  eggs: Egg,
  feed: Package,
  medicine: Syringe,
  alert: AlertTriangle,
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const t = useTranslations("dashboard")
  const activityList = Array.isArray(activities) ? activities : []
  
  return (
    <div className="chart-container min-w-0 self-start">
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">{t("recentActivity")}</h3>
        <p className="text-sm text-muted-foreground">{t("latestOps")}</p>
      </div>
      
      <div className="space-y-2.5">
        {activityList.length > 0 ? (
          activityList.map((activity) => {
            const Icon = iconMap[activity.type] || AlertTriangle
            
            return (
              <div 
                key={activity.id} 
                className="group relative overflow-hidden flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl border bg-card hover:shadow-md transition-all duration-300"
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${
                  activity.status === 'success' 
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                    : activity.status === 'error' 
                    ? 'bg-red-500/10 text-red-600 dark:text-red-400' 
                    : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                }`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-snug mb-1.5 break-words">
                    {activity.message}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground truncate">{activity.time}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs font-medium shrink-0 ${
                        activity.status === 'success' 
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                          : activity.status === 'error'
                          ? 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
                          : 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800'
                      }`}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="rounded-xl border border-dashed bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">{t("noActivity")}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("noActivityHint")}</p>
          </div>
        )}
      </div>
      
      {activityList.length > 0 && (
        <div className="mt-4 pt-3 border-t border-border">
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group">
            {t("viewAllActivity")}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      )}
    </div>
  )
}
