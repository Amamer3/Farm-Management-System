import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Loader2 } from "lucide-react"
import { useUserRole } from "@/contexts/UserRoleContext"
import { authService } from "@/services/authService"
import {
  CROP_OPTIONS,
  FARM_ENTERPRISES,
  clearPendingFarm,
  cropLabel,
  enterpriseLabel,
  writePendingFarm,
} from "@/lib/farmProfile"

const steps = ["Farm", "Crops", "Farm details", "Account"]

export default function GetStarted() {
  const { register } = useUserRole()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [enterprises, setEnterprises] = useState<string[]>([])
  const [crops, setCrops] = useState<string[]>([])
  const [noCrops, setNoCrops] = useState(false)
  const [farmName, setFarmName] = useState("")
  const [location, setLocation] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const growsCrops = enterprises.includes("crops")

  const toggleEnterprise = (id: string) => {
    setError(null)
    setEnterprises((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      if (!next.includes("crops")) setNoCrops(false)
      return next
    })
  }

  const toggleCrop = (id: string) => {
    setError(null)
    setNoCrops(false)
    setCrops((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  const goNext = () => {
    setError(null)
    if (step === 0 && enterprises.length === 0) {
      setError("Choose at least one type of farm.")
      return
    }
    if (step === 0 && growsCrops) {
      setNoCrops(false)
    }
    if (step === 1) {
      if (growsCrops && crops.length === 0) {
        setError("Choose the crops this farm grows.")
        return
      }
      if (!growsCrops && !noCrops && crops.length === 0) {
        setError("Choose crops, or select that this farm does not grow crops.")
        return
      }
    }
    if (step === 2 && farmName.trim().length < 2) {
      setError("Enter the farm name.")
      return
    }
    setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  const submit = async () => {
    setError(null)
    if (ownerName.trim().length < 2) {
      setError("Enter your name.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    const selectedCrops = noCrops ? [] : crops
    const profile = {
      name: farmName.trim(),
      location: location.trim(),
      enterprises,
      crops: selectedCrops,
    }

    setSubmitting(true)
    try {
      await authService.setupFarm({
        name: ownerName.trim(),
        email: email.trim(),
        password,
        farmName: profile.name,
        location: profile.location,
        enterprises: profile.enterprises,
        crops: profile.crops,
      })
      clearPendingFarm()
      navigate("/", { replace: true })
    } catch (err: unknown) {
      const status = typeof err === "object" && err && "status" in err ? Number((err as { status?: number }).status) : 0
      if (status === 404) {
        try {
          writePendingFarm(profile)
          await register(ownerName.trim(), email.trim(), password, "Admin")
          navigate("/", { replace: true })
          return
        } catch (fallbackError: unknown) {
          const message = fallbackError instanceof Error ? fallbackError.message : "Could not create the account."
          setError(message)
          setSubmitting(false)
          return
        }
      }
      const message = err instanceof Error ? err.message : "Could not create the account."
      setError(message)
      setSubmitting(false)
    }
  }

  const fieldClass = "h-12 w-full rounded-2xl border border-[#E4E8E4] bg-[#F7F8F7] px-4 text-sm text-[#142018] outline-none transition focus:border-[#173528] focus:bg-white"

  return (
    <div className="min-h-screen bg-white text-[#142018]" style={{ fontFamily: "Manrope, Inter, sans-serif" }}>
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 px-4 sm:h-[84px] sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img src="/Agrocyms%20logo.png" alt="" className="h-8 w-8 shrink-0 object-contain sm:h-11 sm:w-11" />
            <span className="truncate text-base font-extrabold tracking-tight text-[#173528] sm:text-[22px]">Agrocyms</span>
          </Link>
          <Link to="/login" className="rounded-full bg-[#F3F4F2] px-4 py-2 text-sm font-semibold text-[#1c241f] transition hover:bg-[#E7EAE6]">
            Log in
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3d6b4a]">Get started</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Set up your farm</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#526057] sm:text-base">
          These answers decide which records and dashboard sections open for this farm.
        </p>

        <ol className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
          {steps.map((label, index) => (
            <li key={label} className="min-w-0">
              <div className={`mb-2 h-1.5 rounded-full ${index <= step ? "bg-[#173528]" : "bg-[#E7EAE6]"}`} />
              <p className={`truncate text-[11px] sm:text-xs ${index === step ? "font-bold text-[#142018]" : "font-medium text-[#7a877f]"}`}>
                {label}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-[28px] border border-[#E4E8E4] bg-white p-4 sm:mt-8 sm:rounded-[32px] sm:p-8">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">What does this farm do?</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#526057]">Select every enterprise you want on the dashboard. You can change this later in Farm settings.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {FARM_ENTERPRISES.map((item) => {
                  const selected = enterprises.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleEnterprise(item.id)}
                      className={`rounded-[22px] border p-4 text-left transition ${
                        selected ? "border-[#173528] bg-[#E7F3E4]" : "border-[#E4E8E4] bg-[#F7F8F7] hover:border-[#173528]/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold">{item.label}</p>
                          <p className="mt-1 text-sm leading-relaxed text-[#526057]">{item.description}</p>
                        </div>
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#173528] bg-[#173528] text-white" : "border-[#D5DBD6] bg-white"}`}>
                          {selected && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">Which crops do you grow?</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#526057]">
                {growsCrops
                  ? "Crops is already part of this farm. Choose every crop it grows."
                  : "Choose the crops, or continue without them if this farm only keeps livestock."}
              </p>
              <p className="mt-3 text-sm">
                <span className="text-[#526057]">Selected farm type: </span>
                <span className="font-bold">{enterprises.map(enterpriseLabel).join(", ")}</span>
              </p>
              <div className={`mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 ${noCrops ? "pointer-events-none opacity-40" : ""}`}>
                {CROP_OPTIONS.map((crop) => {
                  const selected = crops.includes(crop.id)
                  return (
                    <button
                      key={crop.id}
                      type="button"
                      disabled={noCrops}
                      onClick={() => toggleCrop(crop.id)}
                      className={`rounded-2xl border px-3 py-3 text-sm font-semibold ${
                        selected ? "border-[#173528] bg-[#E7F3E4] text-[#142018]" : "border-[#E4E8E4] bg-[#F7F8F7] text-[#142018]"
                      }`}
                    >
                      {crop.label}
                    </button>
                  )
                })}
              </div>
              {!growsCrops && (
                <button
                  type="button"
                  onClick={() => {
                    setError(null)
                    setNoCrops((current) => !current)
                    setCrops([])
                  }}
                  className={`mt-4 w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${
                    noCrops ? "border-[#173528] bg-[#E7F3E4]" : "border-[#E4E8E4] bg-[#F7F8F7] text-[#526057]"
                  }`}
                >
                  {noCrops ? "This farm has no crops. Tap again to choose crops." : "This farm has no crops"}
                </button>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">Name the farm</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">This is the name your team will see across the system.</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="farm-name" className="text-sm font-semibold">Farm name</label>
                <input id="farm-name" value={farmName} onChange={(e) => setFarmName(e.target.value)} placeholder="Greenfield Farm" className={fieldClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="farm-location" className="text-sm font-semibold">Location</label>
                <input id="farm-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Town or region" className={fieldClass} />
              </div>
              <div className="rounded-[22px] bg-[#E7F3E4] p-4 text-sm">
                <p className="font-bold">Dashboard will cover</p>
                <p className="mt-1 text-[#3e4b43]">
                  {enterprises.map(enterpriseLabel).join(", ")}
                  {crops.length > 0 && !noCrops ? ` · ${crops.map(cropLabel).join(", ")}` : ""}
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">Create your account</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#526057]">You will be the farm admin. Other people can be added after you sign in.</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="owner-name" className="text-sm font-semibold">Your name</label>
                <input id="owner-name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Ama Mensah" className={fieldClass} autoComplete="name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="owner-email" className="text-sm font-semibold">Email</label>
                <input id="owner-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@farm.com" className={fieldClass} autoComplete="email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="owner-password" className="text-sm font-semibold">Password</label>
                <div className="relative">
                  <input
                    id="owner-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className={`${fieldClass} pr-12`}
                    autoComplete="new-password"
                  />
                  <button type="button" className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#526057]" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="owner-confirm" className="text-sm font-semibold">Confirm password</label>
                <input id="owner-confirm" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={fieldClass} autoComplete="new-password" />
              </div>
            </div>
          )}

          {error && (
            <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step === 0 ? (
              <Link to="/" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#526057] hover:bg-[#F3F4F2]">
                <ArrowLeft className="h-4 w-4" /> Back
              </Link>
            ) : (
              <button type="button" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[#526057] hover:bg-[#F3F4F2] disabled:opacity-50" onClick={() => { setError(null); setStep((current) => current - 1) }} disabled={submitting}>
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button type="button" onClick={goNext} className="inline-flex items-center gap-3 rounded-full bg-[#173528] py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white">
                Continue
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#173528]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            ) : (
              <button type="button" onClick={submit} disabled={submitting} className="inline-flex items-center gap-3 rounded-full bg-[#173528] py-2 pl-5 pr-5 text-sm font-semibold text-white disabled:opacity-60">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account</> : "Create farm account"}
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[#526057]">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#173528]">Log in</Link>
        </p>
      </main>
    </div>
  )
}
