import { execSync } from 'node:child_process'
import process from 'node:process'
// @ts-expect-error no declaration file
// eslint-disable-next-line import-x/no-unassigned-import
import 'dotenv/config'

const bump = process.argv[2] ?? 'patch'

if (!process.env['NPM_TOKEN']) {
  throw new Error('Missing NPM_TOKEN in .env or environment')
}

execSync('npm run build', { stdio: 'inherit', env: process.env })
// execSync(`npm version ${bump}`, { stdio: 'inherit', env: process.env })
// execSync('npm publish', { stdio: 'inherit', env: process.env })
