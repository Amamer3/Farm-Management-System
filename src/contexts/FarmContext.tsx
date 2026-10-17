import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react"
import { farmService } from "@/services/dataService"
import { useUserRole } from "@/contexts/UserRoleContext"
import {
  clearPendingFarm,
  enabledEnterprisesForProfile,
  readPendingFarm,
  readStoredCrops,
  writePendingFarm,
  writeStoredCrops,
} from "@/lib/farmProfile"

export type FarmModule = {
  id: string
  label: string
  description: string
  enabled: boolean
  routes: string[]
  species: string[]
}

type FarmState = {
  id?: string
  name?: string
  location?: string
  logo?: string
  enabledEnterprises: string[]
  crops: string[]
  modules: FarmModule[]
}

type FarmContextValue = {
  farm: FarmState | null
  loading: boolean
  refresh: () => Promise<void>
  hasEnterprise: (id: string) => boolean
  setLogo: (logo: string | null) => Promise<void>
  setCrops: (crops: string[]) => void
}

const logoKey = (id: string) => `agrocyms.farmLogo.${id}`

function readStoredLogo(id?: string) {
  try {
    if (id) {
      const specific = localStorage.getItem(logoKey(id))
      if (specific) return specific
    }
    return localStorage.getItem(logoKey("current")) || undefined
  } catch {
    return undefined
  }
}

const FarmContext = createContext<FarmContextValue>({
  farm: null,
  loading: false,
  refresh: async () => {},
  hasEnterprise: () => false,
  setLogo: async () => {},
  setCrops: () => {},
})

export function FarmProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useUserRole()
  const [farm, setFarm] = useState<FarmState | null>(null)
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setFarm(null)
      return
    }
    setLoading(true)
    try {
      const data = await farmService.current()
      const pending = readPendingFarm()
      let name = data?.name
      let location = data?.location
      let enabledEnterprises = data?.enabledEnterprises || []
      let crops = Array.isArray(data?.crops) ? data.crops : readStoredCrops(data?.id)

      if (pending) {
        name = pending.name || name
        location = pending.location || location
        enabledEnterprises = enabledEnterprisesForProfile(pending.enterprises)
        crops = pending.crops
        writeStoredCrops(data?.id, crops)
        try {
          await farmService.update({
            name: pending.name,
            location: pending.location,
            enabledEnterprises,
            crops,
          })
          clearPendingFarm()
        } catch {
          writePendingFarm(pending)
        }
      }

      setFarm({
        id: data?.id,
        name,
        location,
        logo: data?.logo || readStoredLogo(data?.id),
        enabledEnterprises,
        crops,
        modules: data?.modules || [],
      })
    } catch {
      const pending = readPendingFarm()
      if (pending) {
        const crops = pending.crops
        writeStoredCrops(undefined, crops)
        setFarm({
          name: pending.name,
          location: pending.location,
          enabledEnterprises: enabledEnterprisesForProfile(pending.enterprises),
          crops,
          modules: [],
        })
      } else {
        setFarm(null)
      }
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    refresh()
  }, [refresh])

  const hasEnterprise = useCallback(
    (id: string) => !!farm?.enabledEnterprises?.includes(id),
    [farm]
  )

  const setCrops = useCallback((crops: string[]) => {
    writeStoredCrops(farm?.id, crops)
    setFarm((prev) => (prev ? { ...prev, crops } : prev))
  }, [farm?.id])

  const setLogo = useCallback(async (logo: string | null) => {
    const id = farm?.id || "current"
    try {
      if (logo) localStorage.setItem(logoKey(id), logo)
      else localStorage.removeItem(logoKey(id))
      if (id !== "current") localStorage.removeItem(logoKey("current"))
    } catch {
      // Storage can be unavailable; the in-memory logo still updates.
    }
    setFarm((prev) => (prev ? { ...prev, logo: logo || undefined } : prev))
    try {
      await farmService.update({ logo })
    } catch {
      // The logo stays on this device when the farm record has no logo field yet.
    }
  }, [farm?.id])

  return (
    <FarmContext.Provider value={{ farm, loading, refresh, hasEnterprise, setLogo, setCrops }}>
      {children}
    </FarmContext.Provider>
  )
}

export function useFarm() {
  return useContext(FarmContext)
}
