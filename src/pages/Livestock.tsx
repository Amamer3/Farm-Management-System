import { useEffect, useState } from "react"
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
  title: string
  species: { value: string; label: string }[]
  events: { value: string; label: string }[]
  housingKind: string
}

function asList(data: any): any[] {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.data)) return data.data
  return []
}

export default function Livestock({ config }: { config: LivestockConfig }) {
  const [open, setOpen] = useState(false)
  const { hasEnterprise } = useFarm()
  const { toast } = useToast()
  const { user } = useUserRole()
  const canManage = user?.role === "Admin" || user?.role === "Manager"
  const enabled = hasEnterprise(config.enterprise)
  const [stats, setStats] = useState<any>(null)
  const [groups, setGroups] = useState<any[]>([])
  const [animals, setAnimals] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [groupForm, setGroupForm] = useState({ name: "", species: config.species[0]?.value || "", breed: "", count: "1" })
  const [animalForm, setAnimalForm] = useState({ tagId: "", name: "", sex: "female", breed: "", purpose: "dairy", species: config.species[0]?.value || "", animalGroupId: "" })
  const [eventForm, setEventForm] = useState({ eventType: config.events[0]?.value || "", animalGroupId: "", quantity: "1", weightKg: "", volumeLiters: "", stillborn: "0", price: "", notes: "" })

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
      toast({ title: "Group saved" })
    } catch {
      toast({ title: "Could not save group", variant: "destructive" })
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
      toast({ title: "Animal saved" })
    } catch {
      toast({ title: "Could not save animal", variant: "destructive" })
    }
  }

  const addEvent = async () => {
    try {
      const body: any = {
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
      toast({ title: "Event recorded" })
    } catch {
      toast({ title: "Could not record event", variant: "destructive" })
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar isOpen={open} onToggle={() => setOpen(!open)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader onMenuToggle={() => setOpen(!open)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{config.title}</h1>
            <p className="text-muted-foreground text-sm">{enabled ? "Herd, animals, and production events" : "This enterprise is not enabled on the farm"}</p>
          </div>
          {!enabled ? null : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats && ["herdSize", "goats", "sheep", "births", "deaths", "sales", "salesRevenue", "liveborn", "stillborn", "farrowings", "milkLiters", "calvings", "weaned", "pigletsPerLitter"].filter((k) => typeof stats[k] === "number").map((k) => (
                  <Card key={k}>
                    <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1")}</CardTitle></CardHeader>
                    <CardContent className="text-xl font-semibold">{String(stats[k])}</CardContent>
                  </Card>
                ))}
              </div>

              {canManage && (
              <>
              <Card>
                <CardHeader><CardTitle>Add group</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-5 gap-2">
                  <Input placeholder="Name" value={groupForm.name} onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })} />
                  <Select value={groupForm.species} onValueChange={(v) => setGroupForm({ ...groupForm, species: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{config.species.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input placeholder="Breed" value={groupForm.breed} onChange={(e) => setGroupForm({ ...groupForm, breed: e.target.value })} />
                  <Input placeholder="Count" value={groupForm.count} onChange={(e) => setGroupForm({ ...groupForm, count: e.target.value })} />
                  <Button onClick={addGroup}>Save group</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Add animal</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-4 gap-2">
                  <Input placeholder="Tag" value={animalForm.tagId} onChange={(e) => setAnimalForm({ ...animalForm, tagId: e.target.value })} />
                  <Input placeholder="Name" value={animalForm.name} onChange={(e) => setAnimalForm({ ...animalForm, name: e.target.value })} />
                  <Select value={animalForm.animalGroupId || undefined} onValueChange={(v) => setAnimalForm({ ...animalForm, animalGroupId: v })}>
                    <SelectTrigger><SelectValue placeholder="Group" /></SelectTrigger>
                    <SelectContent>{groups.map((g) => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}</SelectContent>
                  </Select>
                  {config.module === "cattle" && (
                    <Select value={animalForm.purpose} onValueChange={(v) => setAnimalForm({ ...animalForm, purpose: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dairy">Dairy</SelectItem>
                        <SelectItem value="beef">Beef</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <Button onClick={addAnimal}>Save animal</Button>
                </CardContent>
              </Card>
              </>
              )}

              <Card>
                <CardHeader><CardTitle>Record event</CardTitle></CardHeader>
                <CardContent className="grid sm:grid-cols-4 gap-2">
                  <div>
                    <Label>Type</Label>
                    <Select value={eventForm.eventType} onValueChange={(v) => setEventForm({ ...eventForm, eventType: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{config.events.map((ev) => <SelectItem key={ev.value} value={ev.value}>{ev.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Group</Label>
                    <Select value={eventForm.animalGroupId || undefined} onValueChange={(v) => setEventForm({ ...eventForm, animalGroupId: v })}>
                      <SelectTrigger><SelectValue placeholder="Group" /></SelectTrigger>
                      <SelectContent>{groups.map((g) => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <Input placeholder="Quantity" value={eventForm.quantity} onChange={(e) => setEventForm({ ...eventForm, quantity: e.target.value })} />
                  {eventForm.eventType === "weight" && <Input placeholder="Weight kg" value={eventForm.weightKg} onChange={(e) => setEventForm({ ...eventForm, weightKg: e.target.value })} />}
                  {eventForm.eventType === "milk" && <Input placeholder="Liters" value={eventForm.volumeLiters} onChange={(e) => setEventForm({ ...eventForm, volumeLiters: e.target.value })} />}
                  {eventForm.eventType === "farrowing" && <Input placeholder="Stillborn" value={eventForm.stillborn} onChange={(e) => setEventForm({ ...eventForm, stillborn: e.target.value })} />}
                  {eventForm.eventType === "sale" && <Input placeholder="Price GHS" value={eventForm.price} onChange={(e) => setEventForm({ ...eventForm, price: e.target.value })} />}
                  <Button onClick={addEvent}>Record</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Animals</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader><TableRow><TableHead>Tag</TableHead><TableHead>Name</TableHead><TableHead>Species</TableHead><TableHead>Purpose</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {animals.map((a) => (
                        <TableRow key={a.id}><TableCell>{a.tagId}</TableCell><TableCell>{a.name}</TableCell><TableCell>{a.species}</TableCell><TableCell>{a.purpose || "—"}</TableCell><TableCell>{a.status}</TableCell></TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Recent events</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Type</TableHead><TableHead>Qty</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {events.slice(0, 20).map((ev) => (
                        <TableRow key={ev.id}>
                          <TableCell>{ev.date}</TableCell>
                          <TableCell>{ev.eventType}</TableCell>
                          <TableCell>{ev.quantity}</TableCell>
                          <TableCell>{[ev.weightKg && `${ev.weightKg} kg`, ev.volumeLiters && `${ev.volumeLiters} L`, ev.stillborn ? `stillborn ${ev.stillborn}` : "", ev.price && `GHS ${ev.price}`].filter(Boolean).join(" · ")}</TableCell>
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
