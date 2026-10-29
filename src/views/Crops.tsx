"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { farmService } from "@/services/dataService"
import { useFarm } from "@/contexts/FarmContext"
import { useToast } from "@/hooks/use-toast"

const ACTIVITIES = ["planting", "fertilizer", "pesticide", "irrigation", "harvest", "loss"] as const

type CropEvent = {
  id?: string
  date?: string
  cropId?: string
  activity?: string
  field?: string
  quantity?: string | number
  notes?: string
}

function asList(data: unknown): CropEvent[] {
  if (Array.isArray(data)) return data
  if (data && typeof data === "object" && Array.isArray((data as { data?: unknown }).data)) {
    return (data as { data: CropEvent[] }).data
  }
  return []
}

function localKey(farmId?: string) {
  return `agrocyms.cropEvents.${farmId || "current"}`
}

function readLocal(farmId?: string): CropEvent[] {
  try {
    const raw = localStorage.getItem(localKey(farmId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeLocal(farmId: string | undefined, events: CropEvent[]) {
  try {
    localStorage.setItem(localKey(farmId), JSON.stringify(events.slice(0, 200)))
  } catch {
    /* ignore quota */
  }
}

export default function Crops() {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const { farm, hasEnterprise } = useFarm()
  const { toast } = useToast()
  const enabled = hasEnterprise("crops") || (farm?.crops?.length ?? 0) > 0
  const crops = farm?.crops?.length ? farm.crops : []
  const [events, setEvents] = useState<CropEvent[]>([])
  const [form, setForm] = useState({
    cropId: "",
    activity: "planting",
    field: "",
    quantity: "",
    notes: "",
  })

  const cropName = (id: string) => t(`crops.${id}` as never) || id

  const load = useCallback(async () => {
    if (!enabled) return
    try {
      const data = await farmService.cropEvents()
      const list = asList(data)
      setEvents(list)
      writeLocal(farm?.id, list)
    } catch {
      setEvents(readLocal(farm?.id))
    }
  }, [enabled, farm?.id])

  useEffect(() => {
    if (crops[0] && !form.cropId) setForm((current) => ({ ...current, cropId: crops[0] }))
  }, [crops, form.cropId])

  useEffect(() => {
    void load()
  }, [load])

  const save = async () => {
    const body = {
      cropId: form.cropId || crops[0],
      activity: form.activity,
      field: form.field,
      quantity: form.quantity,
      notes: form.notes,
      date: new Date().toISOString().slice(0, 10),
    }
    try {
      await farmService.createCropEvent(body)
      setForm((current) => ({ ...current, field: "", quantity: "", notes: "" }))
      await load()
      toast({ title: t("cropsPage.saved") })
    } catch {
      const next = [{ id: crypto.randomUUID(), ...body }, ...readLocal(farm?.id)]
      writeLocal(farm?.id, next)
      setEvents(next)
      setForm((current) => ({ ...current, field: "", quantity: "", notes: "" }))
      toast({ title: t("cropsPage.saved") })
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar isOpen={open} onToggle={() => setOpen(!open)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onMenuToggle={() => setOpen(!open)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{t("cropsPage.title")}</h1>
            <p className="text-muted-foreground text-sm">{t("cropsPage.lead")}</p>
          </div>
          {!enabled ? (
            <Card>
              <CardContent className="py-8 text-sm">
                <p>{t("cropsPage.disabled")}</p>
                <Link href="/farm" className="mt-3 inline-block font-semibold text-primary">
                  {t("cropsPage.enableInSettings")}
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{t("cropsPage.recordActivity")}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label>{t("cropsPage.crop")}</Label>
                    <Select value={form.cropId || crops[0]} onValueChange={(v) => setForm({ ...form, cropId: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {crops.map((id) => (
                          <SelectItem key={id} value={id}>{cropName(id)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("cropsPage.activity")}</Label>
                    <Select value={form.activity} onValueChange={(v) => setForm({ ...form, activity: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {ACTIVITIES.map((id) => (
                          <SelectItem key={id} value={id}>{t(`cropsPage.${id}`)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="crop-field">{t("cropsPage.field")}</Label>
                    <Input id="crop-field" value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} placeholder={t("cropsPage.fieldPlaceholder")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="crop-qty">{t("cropsPage.quantity")}</Label>
                    <Input id="crop-qty" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder={t("cropsPage.quantityPlaceholder")} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="crop-notes">{t("cropsPage.notes")}</Label>
                    <Input id="crop-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={() => void save()} disabled={!crops.length}>{t("cropsPage.save")}</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("cropsPage.recent")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("cropsPage.date")}</TableHead>
                        <TableHead>{t("cropsPage.crop")}</TableHead>
                        <TableHead>{t("cropsPage.activity")}</TableHead>
                        <TableHead>{t("cropsPage.field")}</TableHead>
                        <TableHead>{t("cropsPage.details")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                            {t("cropsPage.empty")}
                          </TableCell>
                        </TableRow>
                      ) : events.slice(0, 40).map((ev) => (
                        <TableRow key={ev.id || `${ev.date}-${ev.cropId}-${ev.activity}`}>
                          <TableCell>{ev.date}</TableCell>
                          <TableCell>{ev.cropId ? cropName(ev.cropId) : "—"}</TableCell>
                          <TableCell>{ev.activity ? t(`cropsPage.${ev.activity}` as never) : "—"}</TableCell>
                          <TableCell>{ev.field || "—"}</TableCell>
                          <TableCell>{[ev.quantity, ev.notes].filter(Boolean).join(" · ")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
