import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./xo.config.ts'],
  declaration: 'compatible', // generates .d.ts, .d.mts AND .d.cts
  rollup: {
    emitCJS: true,
    esbuild: {
      treeShaking: true,
    },
  },
})
