import { spawn } from "node:child_process"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"

function loadEnv(path) {
  const text = readFileSync(path, "utf8")
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

loadEnv(".env")

const command = process.argv[2]
if (command !== "dev" && command !== "start") {
  console.error("Usage: node scripts/next-with-env.mjs <dev|start>")
  process.exit(1)
}

const port = process.env.PORT
if (!port) {
  console.error("PORT is not set. Add it to your .env file.")
  process.exit(1)
}

const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next")
const child = spawn(process.execPath, [nextBin, command, "-p", port], {
  stdio: "inherit",
  env: process.env,
})

child.on("exit", (code) => {
  process.exit(code ?? 1)
})
