"use client"

import { useEffect, useState } from "react"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { farmService } from "@/services/dataService"
import { useFarm } from "@/contexts/FarmContext"
import { useToast } from "@/hooks/use-toast"
import { useUserRole } from "@/contexts/UserRoleContext"
import { CROP_OPTIONS, clearPendingFarm } from "@/lib/farmProfile"

const ALL = [
  { id: "poultry", label: "Poultry" },
  { id: "small_ruminants", label: "Small ruminants (goats & sheep)" },
  { id: "cattle", label: "Cattle" },
  { id: "pigs", label: "Pigs" },
]

export default function FarmSettings() {
  const [open, setOpen] = useState(false)
  const { farm, refresh, setCrops, canWrite } = useFarm()
  const { user } = useUserRole()
  const { toast } = useToast()
  const [name, setName] = useState(farm?.name || "")
  const [location, setLocation] = useState(farm?.location || "")
  const [enabled, setEnabled] = useState<string[]>(farm?.enabledEnterprises || ["poultry"])
  const [crops, setSelectedCrops] = useState<string[]>(farm?.crops || [])
  const canEdit = (user?.role === "Admin" || user?.role === "Manager") && canWrite

  useEffect(() => {
    if (!farm) return
    setName(farm.name || "")
    setLocation(farm.location || "")
    setEnabled((farm.enabledEnterprises || ["poultry"]).filter((id) => id !== "crops"))
    setSelectedCrops(farm.crops || [])
  }, [farm])

  const toggle = (id: string) => {
    setEnabled((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))
  }

  const save = async () => {
    if (!enabled.length && !crops.length) {
      toast({ title: "Keep at least one enterprise or crop", variant: "destructive" })
      return
    }
    try {
      await farmService.update({
        name,
        location,
        enabledEnterprises: enabled.length ? enabled : ["crops"],
        crops,
      })
      setCrops(crops)
      clearPendingFarm()
      await refresh()
      toast({ title: "Farm updated" })
    } catch {
      toast({ title: "Could not update farm", variant: "destructive" })
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar isOpen={open} onToggle={() => setOpen(!open)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onMenuToggle={() => setOpen(!open)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h1 className="text-2xl font-bold mb-1">Farm settings</h1>
          <p className="text-sm text-muted-foreground mb-6">Choose the livestock and crops this dashboard should follow.</p>
          <Card className="max-w-lg">
            <CardHeader><CardTitle>{farm?.name || "Farm"}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input value={name || farm?.name || ""} onChange={(e) => setName(e.target.value)} placeholder="Farm name" disabled={!canEdit} />
              <Input value={location || farm?.location || ""} onChange={(e) => setLocation(e.target.value)} placeholder="Location" disabled={!canEdit} />
              <div className="space-y-2">
                {ALL.map((item) => (
                  <label key={item.id} className="flex items-center gap-2 text-sm">
                    <Checkbox checked={(enabled.length ? enabled : farm?.enabledEnterprises || []).includes(item.id)} onCheckedChange={() => canEdit && toggle(item.id)} disabled={!canEdit} />
                    {item.label}
                  </label>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Crops</p>
                <div className="grid grid-cols-2 gap-2">
                  {CROP_OPTIONS.map((crop) => (
                    <label key={crop.id} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={crops.includes(crop.id)}
                        onCheckedChange={() => canEdit && setSelectedCrops((current) => current.includes(crop.id) ? current.filter((id) => id !== crop.id) : [...current, crop.id])}
                        disabled={!canEdit}
                      />
                      {crop.label}
                    </label>
                  ))}
                </div>
              </div>
              {canEdit && <Button onClick={save}>Save</Button>}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
