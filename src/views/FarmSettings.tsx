"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { farmService } from "@/services/dataService"
import { useFarm } from "@/contexts/FarmContext"
import { useToast } from "@/hooks/use-toast"
import { getUserFriendlyMessage } from "@/utils/errorHandler"
import { useUserRole } from "@/contexts/UserRoleContext"
import { CROP_OPTIONS, clearPendingFarm } from "@/lib/farmProfile"

const ENTERPRISES = [
  { id: "poultry", labelKey: "farmSettings.poultry" },
  { id: "small_ruminants", labelKey: "farmSettings.smallRuminants" },
  { id: "cattle", labelKey: "farmSettings.cattle" },
  { id: "pigs", labelKey: "farmSettings.pigs" },
]

function readLogoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("Could not read that image"))
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const max = 512
        const scale = Math.min(1, max / Math.max(img.width, img.height))
        const width = Math.max(1, Math.round(img.width * scale))
        const height = Math.max(1, Math.round(img.height * scale))
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Could not process that image"))
          return
        }
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
        const mime = file.type === "image/jpeg" ? "image/jpeg" : "image/png"
        resolve(canvas.toDataURL(mime))
      }
      img.onerror = () => reject(new Error("Could not read that image"))
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

export default function FarmSettings() {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const { farm, refresh, setCrops, setLogo, canWrite } = useFarm()
  const { user } = useUserRole()
  const { toast } = useToast()
  const logoInputRef = useRef<HTMLInputElement>(null)
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#logo") {
      document.getElementById("farm-logo")?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [])

  const toggle = (id: string) => {
    setEnabled((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))
  }

  const save = async () => {
    if (!enabled.length && !crops.length) {
      toast({ title: t("farmSettings.keepOne"), variant: "destructive" })
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
      toast({ title: t("farmSettings.saved") })
    } catch (error) {
      toast({
        title: t("farmSettings.saveFailed"),
        description: getUserFriendlyMessage(error),
        variant: "destructive",
      })
    }
  }

  const onLogoSelected = async (file?: File) => {
    if (!file || !canEdit) return
    if (!file.type.startsWith("image/")) {
      toast({ title: t("sidebar.chooseImage"), variant: "destructive" })
      return
    }
    try {
      const logo = await readLogoFile(file)
      await setLogo(logo)
      toast({ title: t("sidebar.logoUpdated") })
    } catch (error) {
      toast({ title: t("sidebar.logoFailed"), description: getUserFriendlyMessage(error), variant: "destructive" })
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar isOpen={open} onToggle={() => setOpen(!open)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onMenuToggle={() => setOpen(!open)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h1 className="text-2xl font-bold mb-1">{t("farmSettings.title")}</h1>
          <p className="text-sm text-muted-foreground mb-6">{t("farmSettings.lead")}</p>
          <Card className="max-w-lg">
            <CardHeader><CardTitle>{farm?.name || t("farmSettings.title")}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2" id="farm-logo">
                <p className="text-sm font-medium">{t("farmSettings.logo")}</p>
                <p className="text-xs text-muted-foreground">{t("farmSettings.logoHint")}</p>
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-md border border-dashed border-border overflow-hidden bg-muted/40">
                    {farm?.logo ? (
                      <img src={farm.logo} alt="" className="h-full w-full object-contain" />
                    ) : null}
                  </div>
                  {canEdit && (
                    <>
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          e.target.value = ""
                          void onLogoSelected(file)
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => logoInputRef.current?.click()}>
                        {t("farmSettings.changeLogo")}
                      </Button>
                      {farm?.logo && (
                        <Button type="button" variant="ghost" onClick={() => void setLogo(null)}>
                          {t("farmSettings.removeLogo")}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <Input value={name || farm?.name || ""} onChange={(e) => setName(e.target.value)} placeholder={t("farmSettings.farmName")} disabled={!canEdit} />
              <Input value={location || farm?.location || ""} onChange={(e) => setLocation(e.target.value)} placeholder={t("farmSettings.location")} disabled={!canEdit} />
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("farmSettings.enterprises")}</p>
                {ENTERPRISES.map((item) => (
                  <label key={item.id} className="flex items-center gap-2 text-sm">
                    <Checkbox checked={(enabled.length ? enabled : farm?.enabledEnterprises || []).includes(item.id)} onCheckedChange={() => canEdit && toggle(item.id)} disabled={!canEdit} />
                    {t(item.labelKey)}
                  </label>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">{t("farmSettings.crops")}</p>
                <div className="grid grid-cols-2 gap-2">
                  {CROP_OPTIONS.map((crop) => (
                    <label key={crop.id} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={crops.includes(crop.id)}
                        onCheckedChange={() => canEdit && setSelectedCrops((current) => current.includes(crop.id) ? current.filter((id) => id !== crop.id) : [...current, crop.id])}
                        disabled={!canEdit}
                      />
                      {t(`crops.${crop.id}`)}
                    </label>
                  ))}
                </div>
              </div>
              {canEdit && <Button onClick={save}>{t("farmSettings.save")}</Button>}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
