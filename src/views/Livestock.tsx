"use client"

import { useEffect, useState } from "react"
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
import { useUserRole } from "@/contexts/UserRoleContext"
import { useToast } from "@/hooks/use-toast"

export type LivestockConfig = {
  enterprise: string
  module: "ruminants" | "pigs" | "cattle"
  titleKey: string
  species: string[]
  events: string[]
}

function asList(data: unknown): any[] {
  if (Array.isArray(data)) return data
  if (data && typeof data === "object" && Array.isArray((data as { data?: unknown }).data)) {
    return (data as { data: any[] }).data
  }
  return []
}

const STAT_KEYS = [
  "herdSize", "goats", "sheep", "births", "deaths", "sales", "salesRevenue",
  "liveborn", "stillborn", "farrowings", "milkLiters", "calvings", "weaned", "pigletsPerLitter",
]

export default function Livestock({ config }: { config: LivestockConfig }) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const { hasEnterprise } = useFarm()
  const { toast } = useToast()
  const { user } = useUserRole()
  const canManage = user?.role === "Admin" || user?.role === "Manager"
  const enabled = hasEnterprise(config.enterprise)
  const [stats, setStats] = useState<Record<string, number> | null>(null)
  const [groups, setGroups] = useState<any[]>([])
  const [animals, setAnimals] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [showHerdForms, setShowHerdForms] = useState(false)
  const [groupForm, setGroupForm] = useState({ name: "", species: config.species[0] || "", breed: "", count: "1" })
  const [animalForm, setAnimalForm] = useState({ tagId: "", name: "", sex: "female", breed: "", purpose: "dairy", species: config.species[0] || "", animalGroupId: "" })
  const [eventForm, setEventForm] = useState({ eventType: config.events[0] || "", animalGroupId: "", quantity: "1", weightKg: "", volumeLiters: "", stillborn: "0", price: "", notes: "" })

  const speciesLabel = (value: string) => t(`livestock.speciesLabel.${value}` as never)
  const eventLabel = (value: string) => t(`livestock.events.${value}` as never)

  const load = async () => {
    if (!enabled) return
    const [s, g, a, e] = await Promise.all([
      farmService.stats(config.module),
      farmService.groups({ enterprise: config.enterprise }),
      farmService.animals({ enterprise: config.enterprise }),
      farmService.events(config.module),
    ])
    setStats(s)
    setGroups(asList(g))
    setAnimals(asList(a))
    setEvents(asList(e))
  }

  useEffect(() => {
    load().catch(() => {})
  }, [enabled, config.module])

  const addGroup = async () => {
    try {
      await farmService.createGroup({
        name: groupForm.name,
        species: groupForm.species,
        breed: groupForm.breed,
        count: Number(groupForm.count) || 0,
        enterprise: config.enterprise,
      })
      setGroupForm({ ...groupForm, name: "" })
      await load()
      toast({ title: t("livestock.groupSaved") })
    } catch {
      toast({ title: t("livestock.groupFailed"), variant: "destructive" })
    }
  }

  const addAnimal = async () => {
    try {
      await farmService.createAnimal({
        tagId: animalForm.tagId,
        name: animalForm.name,
        sex: animalForm.sex,
        breed: animalForm.breed,
        species: animalForm.species,
        purpose: config.module === "cattle" ? animalForm.purpose : undefined,
        animalGroupId: animalForm.animalGroupId || undefined,
        enterprise: config.enterprise,
      })
      setAnimalForm({ ...animalForm, tagId: "", name: "" })
      await load()
      toast({ title: t("livestock.animalSaved") })
    } catch {
      toast({ title: t("livestock.animalFailed"), variant: "destructive" })
    }
  }

  const addEvent = async () => {
    try {
      const body: Record<string, unknown> = {
        eventType: eventForm.eventType,
        animalGroupId: eventForm.animalGroupId,
        quantity: Number(eventForm.quantity) || 1,
        notes: eventForm.notes,
      }
      if (eventForm.weightKg) body.weightKg = Number(eventForm.weightKg)
      if (eventForm.volumeLiters) body.volumeLiters = Number(eventForm.volumeLiters)
      if (eventForm.stillborn) body.stillborn = Number(eventForm.stillborn)
      if (eventForm.price) body.price = Number(eventForm.price)
      await farmService.createEvent(config.module, body)
      await load()
      toast({ title: t("livestock.eventSaved") })
    } catch {
      toast({ title: t("livestock.eventFailed"), variant: "destructive" })
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar isOpen={open} onToggle={() => setOpen(!open)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onMenuToggle={() => setOpen(!open)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{t(config.titleKey)}</h1>
            <p className="text-muted-foreground text-sm">
              {enabled ? t("livestock.herdLead") : t("livestock.disabled")}
            </p>
            {!enabled && (
              <Link href="/farm" className="mt-2 inline-block text-sm font-semibold text-primary">
                {t("livestock.enableInSettings")}
              </Link>
            )}
          </div>
          {enabled && (
            <>
              {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {STAT_KEYS.filter((k) => typeof stats[k] === "number").map((k) => (
                    <Card key={k}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs text-muted-foreground">{t(`livestock.stats.${k}`)}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xl font-semibold">{String(stats[k])}</CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <Card>
                <CardHeader><CardTitle>{t("livestock.recordEvent")}</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <Label>{t("livestock.type")}</Label>
                    <Select value={eventForm.eventType} onValueChange={(v) => setEventForm({ ...eventForm, eventType: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {config.events.map((ev) => <SelectItem key={ev} value={ev}>{eventLabel(ev)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("livestock.group")}</Label>
                    <Select value={eventForm.animalGroupId || undefined} onValueChange={(v) => setEventForm({ ...eventForm, animalGroupId: v })}>
                      <SelectTrigger><SelectValue placeholder={t("livestock.group")} /></SelectTrigger>
                      <SelectContent>{groups.map((g) => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qty">{t("livestock.quantity")}</Label>
                    <Input id="qty" value={eventForm.quantity} onChange={(e) => setEventForm({ ...eventForm, quantity: e.target.value })} />
                  </div>
                  {eventForm.eventType === "weight" && (
                    <div className="space-y-2">
                      <Label>{t("livestock.weightKg")}</Label>
                      <Input value={eventForm.weightKg} onChange={(e) => setEventForm({ ...eventForm, weightKg: e.target.value })} />
                    </div>
                  )}
                  {eventForm.eventType === "milk" && (
                    <div className="space-y-2">
                      <Label>{t("livestock.liters")}</Label>
                      <Input value={eventForm.volumeLiters} onChange={(e) => setEventForm({ ...eventForm, volumeLiters: e.target.value })} />
                    </div>
                  )}
                  {eventForm.eventType === "farrowing" && (
                    <div className="space-y-2">
                      <Label>{t("livestock.stillborn")}</Label>
                      <Input value={eventForm.stillborn} onChange={(e) => setEventForm({ ...eventForm, stillborn: e.target.value })} />
                    </div>
                  )}
                  {eventForm.eventType === "sale" && (
                    <div className="space-y-2">
                      <Label>{t("livestock.price")}</Label>
                      <Input value={eventForm.price} onChange={(e) => setEventForm({ ...eventForm, price: e.target.value })} />
                    </div>
                  )}
                  <div className="flex items-end">
                    <Button onClick={addEvent}>{t("livestock.saveEvent")}</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>{t("livestock.recentEvents")}</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("livestock.date")}</TableHead>
                        <TableHead>{t("livestock.type")}</TableHead>
                        <TableHead>{t("livestock.quantity")}</TableHead>
                        <TableHead>{t("livestock.details")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">{t("livestock.noEvents")}</TableCell>
                        </TableRow>
                      ) : events.slice(0, 20).map((ev) => (
                        <TableRow key={ev.id}>
                          <TableCell>{ev.date}</TableCell>
                          <TableCell>{eventLabel(ev.eventType)}</TableCell>
                          <TableCell>{ev.quantity}</TableCell>
                          <TableCell>{[ev.weightKg && `${ev.weightKg} kg`, ev.volumeLiters && `${ev.volumeLiters} L`, ev.stillborn ? `${t("livestock.stillborn")} ${ev.stillborn}` : "", ev.price && ev.price].filter(Boolean).join(" · ")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>{t("livestock.animals")}</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("livestock.tag")}</TableHead>
                        <TableHead>{t("livestock.name")}</TableHead>
                        <TableHead>{t("livestock.species")}</TableHead>
                        <TableHead>{t("livestock.purpose")}</TableHead>
                        <TableHead>{t("livestock.status")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {animals.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">{t("livestock.noAnimals")}</TableCell>
                        </TableRow>
                      ) : animals.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell>{a.tagId}</TableCell>
                          <TableCell>{a.name}</TableCell>
                          <TableCell>{a.species ? speciesLabel(a.species) : "—"}</TableCell>
                          <TableCell>{a.purpose ? t(`livestock.${a.purpose}` as never) : "—"}</TableCell>
                          <TableCell>{a.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {canManage && (
                <div className="space-y-3">
                  <Button variant="outline" onClick={() => setShowHerdForms((v) => !v)}>
                    {t("livestock.addToHerd")}
                  </Button>
                  {showHerdForms && (
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Card>
                        <CardHeader><CardTitle>{t("livestock.addGroup")}</CardTitle></CardHeader>
                        <CardContent className="grid gap-3">
                          <div className="space-y-2">
                            <Label>{t("livestock.name")}</Label>
                            <Input value={groupForm.name} onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("livestock.species")}</Label>
                            <Select value={groupForm.species} onValueChange={(v) => setGroupForm({ ...groupForm, species: v })}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>{config.species.map((s) => <SelectItem key={s} value={s}>{speciesLabel(s)}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>{t("livestock.breed")}</Label>
                            <Input value={groupForm.breed} onChange={(e) => setGroupForm({ ...groupForm, breed: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("livestock.count")}</Label>
                            <Input value={groupForm.count} onChange={(e) => setGroupForm({ ...groupForm, count: e.target.value })} />
                          </div>
                          <Button onClick={addGroup}>{t("livestock.saveGroup")}</Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader><CardTitle>{t("livestock.addAnimal")}</CardTitle></CardHeader>
                        <CardContent className="grid gap-3">
                          <div className="space-y-2">
                            <Label>{t("livestock.tag")}</Label>
                            <Input value={animalForm.tagId} onChange={(e) => setAnimalForm({ ...animalForm, tagId: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("livestock.name")}</Label>
                            <Input value={animalForm.name} onChange={(e) => setAnimalForm({ ...animalForm, name: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("livestock.group")}</Label>
                            <Select value={animalForm.animalGroupId || undefined} onValueChange={(v) => setAnimalForm({ ...animalForm, animalGroupId: v })}>
                              <SelectTrigger><SelectValue placeholder={t("livestock.group")} /></SelectTrigger>
                              <SelectContent>{groups.map((g) => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                          {config.module === "cattle" && (
                            <div className="space-y-2">
                              <Label>{t("livestock.purpose")}</Label>
                              <Select value={animalForm.purpose} onValueChange={(v) => setAnimalForm({ ...animalForm, purpose: v })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="dairy">{t("livestock.dairy")}</SelectItem>
                                  <SelectItem value="beef">{t("livestock.beef")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          <Button onClick={addAnimal}>{t("livestock.saveAnimal")}</Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
