import { copyFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { defineBuildConfig } from 'unbuild'
import { globby } from 'globby'
import { colorino } from 'colorino'

export default defineBuildConfig({
  entries: ['./xo.config.ts'],
  declaration: 'compatible',
  rollup: {
    emitCJS: true,
    esbuild: {
      treeShaking: true,
    },
  },
  hooks: {
    async 'build:done'(_ctx) {
      const mdFiles = await globby('*.md', { ignore: ['node_modules', 'dist'] })
      await mkdir('dist', { recursive: true })
      await Promise.all(
        mdFiles.map(async (file) => {
          await copyFile(file, join('dist', file))
        })
      )
      colorino.log(`✅ Copied ${mdFiles.length} markdown file(s) to dist/`)
    },
  },
})
