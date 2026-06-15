![babadeluxe-xo-config banner](banner.svg)

# @babadeluxe/xo-config

<p align="left">
  <img src="https://img.shields.io/badge/license-MIT-6a5acd?style=flat-rounded" alt="license">
  <img src="https://img.shields.io/badge/code_style-XO-8a2be2?style=flat-rounded" alt="code style: xo">
  <img src="https://img.shields.io/badge/node-%3E%3D18-b06ab3?style=flat-rounded" alt="node version">
</p>

> **Shared XO linting configuration for all BabaDeluxe TypeScript and Vue projects.** One config, consistent rules across the ecosystem.

## Overview

`@babadeluxe/xo-config` provides a pre-tuned [XO](https://github.com/xojs/xo) configuration as a single shareable package. All BabaDeluxe repos extend it rather than maintaining their own diverging rule sets.

## What’s configured

- **TypeScript** — deep `@typescript-eslint` integration, strict mode rules
- **Vue** — tailored rules for `.vue` single-file components
- **Prettier** — formatting alignment to avoid rule conflicts
- **Modern standards** — ESM enforcement, modern syntax, consistent naming conventions

## Installation

```bash
npm i -g pnpm && pnpm install --save-dev @babadeluxe/xo-config xo @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

## Usage

### Via `package.json`

```json
{
  "xo": {
    "extends": "@babadeluxe/xo-config"
  }
}
```

### Via dedicated config file

```typescript
// xo.config.ts
import babadeluxeConfig from '@babadeluxe/xo-config'

export default babadeluxeConfig
```

## License

This project is released under the [MIT License](LICENSE).

---

**BabaDeluxe** — _Redefining the Future of Software Development._
