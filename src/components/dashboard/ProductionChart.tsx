import { 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { format, parseISO, isValid } from 'date-fns'
import { useTranslations } from "next-intl"
import { TrendingUp, TrendingDown, Minus, Egg } from 'lucide-react'

interface ProductionChartProps {
  data?: Array<{ day: string; eggs: number; target?: number }>
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const actualValue = payload.find((p: any) => p.dataKey === 'eggs')?.value || 0
    const targetValue = payload.find((p: any) => p.dataKey === 'target')?.value
    
    let formattedLabel = label
    try {
      if (label && typeof label === 'string') {
        const date = parseISO(label)
        if (isValid(date)) {
          formattedLabel = format(date, 'MMM dd, yyyy')
        } else {
          formattedLabel = label
        }
      }
    } catch {
      formattedLabel = label
    }

    const difference = targetValue ? actualValue - targetValue : null
    const percentageDiffNum = targetValue && targetValue > 0 && difference !== null
      ? (difference / targetValue) * 100
      : null
    const percentageDiff = percentageDiffNum !== null ? percentageDiffNum.toFixed(1) : null

    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 backdrop-blur-sm max-w-[220px]">
        <p className="text-sm font-semibold text-foreground mb-2">{formattedLabel}</p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs text-muted-foreground">Actual</span>
            </div>
            <span className="text-sm font-bold text-foreground">{actualValue.toLocaleString()} eggs</span>
          </div>
          {targetValue !== undefined && (
            <>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-muted-foreground opacity-60" style={{ borderBottom: '2px dashed' }}></div>
                  <span className="text-xs text-muted-foreground">Target</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{targetValue.toLocaleString()} eggs</span>
              </div>
              {difference !== null && (
                <div className="pt-1.5 mt-1.5 border-t border-border">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-muted-foreground">Difference</span>
                    <div className="flex items-center gap-1">
                      {difference >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs font-semibold ${difference >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {difference >= 0 ? '+' : ''}{difference.toLocaleString()} 
                        {percentageDiff && percentageDiffNum !== null && ` (${percentageDiffNum >= 0 ? '+' : ''}${percentageDiff}%)`}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
  return null
}

const formatXAxisLabel = (tickItem: string) => {
  try {
    const date = parseISO(tickItem)
    if (isValid(date)) {
      return format(date, 'MMM dd')
    }
  } catch {
    const dayNames: Record<string, string> = {
      'Mon': 'Mon', 'Tue': 'Tue', 'Wed': 'Wed', 'Thu': 'Thu', 
      'Fri': 'Fri', 'Sat': 'Sat', 'Sun': 'Sun'
    }
    return dayNames[tickItem] || tickItem
  }
  return tickItem
}

export function ProductionChart({ data }: ProductionChartProps) {
  const t = useTranslations("dashboard")
  const chartData = data || []

  const totalEggs = chartData.length > 0 ? chartData.reduce((sum, item) => sum + (item.eggs || 0), 0) : 0
  const avgEggs = chartData.length > 0 ? Math.round(totalEggs / chartData.length) : 0
  const maxEggs = chartData.length > 0 ? Math.max(...chartData.map(item => item.eggs || 0), 0) : 0
  const minEggs = chartData.length > 0 ? Math.min(...chartData.filter(item => item.eggs > 0).map(item => item.eggs || 0), maxEggs) : 0
  
  let trend: 'up' | 'down' | 'neutral' = 'neutral'
  if (chartData.length >= 6) {
    const recent = chartData.slice(-3).reduce((sum, item) => sum + (item.eggs || 0), 0)
    const previous = chartData.slice(-6, -3).reduce((sum, item) => sum + (item.eggs || 0), 0)
    if (recent > previous) trend = 'up'
    else if (recent < previous) trend = 'down'
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
  const hasTarget = chartData.some(item => item.target !== undefined && item.target !== null)

  const gradientId = 'productionGradient'
  const gradientId2 = 'targetGradient'

  if (!chartData || chartData.length === 0) {
    return (
      <div className="chart-container min-w-0">
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">{t("productionTrends")}</h3>
          <p className="text-sm text-muted-foreground">{t("eggProduction7d")}</p>
        </div>
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-muted-foreground">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-3">
            <Egg className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <div className="text-center space-y-1 px-2">
            <p className="text-sm font-medium text-foreground">{t("noProduction")}</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              {t("noProductionHint")}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="chart-container min-w-0">
      <div className="mb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">{t("productionTrends")}</h3>
            <p className="text-sm text-muted-foreground">{t("eggProduction7d")}</p>
            <div className="flex items-center gap-2 text-sm mt-2">
              <TrendIcon className={`w-4 h-4 shrink-0 ${trendColor}`} />
              <span className={`font-medium ${trendColor}`}>
                {trend === 'up' ? t("trendUp") : trend === 'down' ? t("trendDown") : t("trendStable")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="text-left sm:text-right">
              <p className="text-xs text-muted-foreground">{t("averageDaily")}</p>
              <p className="text-base sm:text-lg font-bold text-foreground">{avgEggs.toLocaleString()}</p>
            </div>
            <div className="h-8 sm:h-10 w-px bg-border" />
            <div className="text-left sm:text-right">
              <p className="text-xs text-muted-foreground">{t("totalPeriod")}</p>
              <p className="text-base sm:text-lg font-bold text-foreground">{totalEggs.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full h-48 sm:h-56 md:h-64 min-h-[12rem]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart 
            data={chartData} 
            margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id={gradientId2} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              opacity={0.5}
              vertical={false}
            />
            
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatXAxisLabel}
              interval="preserveStartEnd"
              style={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={40}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k` : value.toLocaleString()}
              style={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {hasTarget && (
              <>
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="8 4"
                  fill={`url(#${gradientId2})`}
                  fillOpacity={0.3}
                  dot={false}
                  activeDot={{ r: 4, stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="8 4"
                  dot={false}
                  activeDot={{ r: 4, stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2 }}
                />
              </>
            )}
            
            <Area
              type="monotone"
              dataKey="eggs"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              fillOpacity={0.4}
              dot={{ 
                fill: 'hsl(var(--primary))', 
                strokeWidth: 2, 
                r: 3,
                stroke: 'hsl(var(--card))'
              }}
              activeDot={{ 
                r: 6, 
                stroke: 'hsl(var(--primary))', 
                strokeWidth: 2,
                fill: 'hsl(var(--card))',
              }}
              animationDuration={800}
              animationEasing="ease-out"
            />
            
            {avgEggs > 0 && (
              <ReferenceLine 
                y={avgEggs} 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="2 2"
                strokeOpacity={0.5}
                label={{ 
                  value: 'Avg', 
                  position: 'insideTopRight',
                  fill: 'hsl(var(--muted-foreground))',
                  fontSize: 10
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4 pt-3 border-t border-border">
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary/40 border-2 border-primary"></div>
            <span className="text-muted-foreground font-medium">{t("actual")}</span>
          </div>
          {hasTarget && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-muted-foreground opacity-60" style={{ borderBottom: '2px dashed' }}></div>
              <span className="text-muted-foreground font-medium">{t("target")}</span>
            </div>
          )}
          {avgEggs > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-px bg-muted-foreground opacity-50" style={{ borderBottom: '1px dashed' }}></div>
              <span className="text-muted-foreground font-medium">{t("averageDaily")}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-muted-foreground">Peak</p>
            <p className="font-semibold text-foreground">{maxEggs.toLocaleString()}</p>
          </div>
          {minEggs < maxEggs && (
            <>
              <div className="h-6 w-px bg-border"></div>
              <div>
                <p className="text-muted-foreground">Low</p>
                <p className="font-semibold text-foreground">{minEggs.toLocaleString()}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
