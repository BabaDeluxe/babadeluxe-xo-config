import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseEnv } from 'node:util'
import { execSync } from 'node:child_process'
import process from 'node:process'
import { BaseError } from '@babadeluxe/shared'

const bump = process.argv[2] ?? 'patch'

const workspaceRoot = process.argv[2] ?? dirname(fileURLToPath(import.meta.url))
console.log('Workspace root:', workspaceRoot)

class SetupError extends BaseError {}

function applyEnvFile(
  filePath: string,
  target: Record<string, string>,
  label: string
): Record<string, string> {
  if (!existsSync(filePath)) {
    console.error('No env file found. Please create one.')
    throw new SetupError('Missing env file')
  }

  const myEnv = parseEnv(readFileSync(filePath).toString())

  const finalEnv: Record<string, string> = {}
  for (const [key, value] of Object.entries(target)) if (value) finalEnv[key] = value
  for (const [key, value] of Object.entries(myEnv))
    if (value && typeof value === 'string') finalEnv[key] = value

  console.log(`✔ ${label} loaded → ${filePath}`)

  return finalEnv
}

// Cascade: .env (base) → .env.local (overrides) → shell env (wins over both)
let merged: Record<string, string> = {}

const envPath = join(workspaceRoot, '.env')
const envLocalPath = join(workspaceRoot, '.env.local')

merged = applyEnvFile(envPath, merged, '.env')
merged = applyEnvFile(envLocalPath, merged, '.env.local (overrides .env)')

// Shell env wins — only set keys not already present
for (const [key, value] of Object.entries(merged)) {
  process.env[key] ||= value
  // console.log(`process.env[${key}] = ${value}`)
}

execSync('npm run build', { stdio: 'inherit', env: process.env })
execSync(`npm version ${bump}`, { stdio: 'inherit', env: process.env })
execSync('npm publish', { stdio: 'inherit', env: process.env })
