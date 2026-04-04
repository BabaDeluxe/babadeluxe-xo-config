import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./xo.config.ts'],
  declaration: 'compatible',
  rollup: {
    emitCJS: true,
    esbuild: {
      treeShaking: true,
    },
  },
})
