"use client"

import { FormEvent, useState } from "react"
import { getContactEmail } from "@/lib/env"
import { CONTACT_TOPICS } from "@/lib/siteContent"

type ContactTopic = (typeof CONTACT_TOPICS)[number]

const empty: {
  name: string
  email: string
  farm: string
  country: string
  topic: ContactTopic
  message: string
} = {
  name: "",
  email: "",
  farm: "",
  country: "",
  topic: CONTACT_TOPICS[0],
  message: "",
}

export function ContactForm() {
  const [values, setValues] = useState(empty)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    if (!values.name.trim() || !values.email.trim() || !values.country.trim() || !values.message.trim()) {
      setError("Please complete name, work email, country, and message.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setError("Enter a valid work email.")
      return
    }

    const to = getContactEmail()
    const subject = `Agrocyms contact: ${values.topic}`
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Farm or company: ${values.farm.trim() || "Not provided"}`,
      `Country: ${values.country.trim()}`,
      `Topic: ${values.topic}`,
      "",
      values.message.trim(),
    ].join("\n")

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-[28px] border border-[#E4E8E4] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold">Message ready to send</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#526057]">
          Your email app should open with the message. If it did not, write to {getContactEmail()} and include the same details.
        </p>
        <button
          type="button"
          className="mt-6 text-sm font-semibold text-[#173528] underline-offset-4 hover:underline"
          onClick={() => {
            setSent(false)
            setValues(empty)
          }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-[#E4E8E4] bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Full name
          <input
            required
            value={values.name}
            onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
            className="mt-2 w-full rounded-2xl bg-[#F3F4F2] px-4 py-3 text-sm font-normal outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#173528]"
          />
        </label>
        <label className="block text-sm font-semibold">
          Work email
          <input
            required
            type="email"
            value={values.email}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
            className="mt-2 w-full rounded-2xl bg-[#F3F4F2] px-4 py-3 text-sm font-normal outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#173528]"
          />
        </label>
        <label className="block text-sm font-semibold">
          Company or farm name <span className="font-normal text-[#66756c]">optional</span>
          <input
            value={values.farm}
            onChange={(event) => setValues((current) => ({ ...current, farm: event.target.value }))}
            className="mt-2 w-full rounded-2xl bg-[#F3F4F2] px-4 py-3 text-sm font-normal outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#173528]"
          />
        </label>
        <label className="block text-sm font-semibold">
          Country
          <input
            required
            value={values.country}
            onChange={(event) => setValues((current) => ({ ...current, country: event.target.value }))}
            className="mt-2 w-full rounded-2xl bg-[#F3F4F2] px-4 py-3 text-sm font-normal outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#173528]"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold">
        What can we help you with?
        <select
          value={values.topic}
          onChange={(event) => setValues((current) => ({ ...current, topic: event.target.value as (typeof CONTACT_TOPICS)[number] }))}
          className="mt-2 w-full rounded-2xl bg-[#F3F4F2] px-4 py-3 text-sm font-normal outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#173528]"
        >
          {CONTACT_TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block text-sm font-semibold">
        Message
        <textarea
          required
          rows={6}
          value={values.message}
          onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
          className="mt-2 w-full rounded-2xl bg-[#F3F4F2] px-4 py-3 text-sm font-normal outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#173528]"
        />
      </label>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      <p className="mt-4 text-xs leading-relaxed text-[#66756c]">
        Please do not include passwords, payment card details, or other sensitive information in this form.
      </p>
      <button type="submit" className="mt-6 rounded-full bg-[#173528] px-5 py-3 text-sm font-semibold text-white">
        Send Message
      </button>
    </form>
  )
}
