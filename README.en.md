# Shaders — WebGPU effects for websites (mirror + INEMA guide)

[![Websites with Shaders](guia/assets/banner-en.jpg)](https://inematds.github.io/shaders/guia/en/)

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

## What it is

Shaders is a free, open-source library (MIT license) with more than 200 visual effects for web pages. It is for people who build websites, landing pages and apps and want an animated background, a glow or a distortion without writing graphics-card code. Each effect is a component: you stack layers and the visitor's graphics card draws everything in real time, using WebGPU. To use it, install the `shaders` package (React, Vue, Svelte, Solid or plain JavaScript) and open it in a browser with WebGPU.

## 📖 Guide

Full guide (live demo + step by step + caveats): **https://inematds.github.io/shaders/guia/en/**

## Quick start

```bash
npm install shaders
```

```jsx
import { Shader, LinearGradient, CursorTrail } from 'shaders/react'

<Shader className="w-full h-64" disableTelemetry>
  <LinearGradient colorA="#0c0c10" colorB="#E2A23B" />
  <CursorTrail />
</Shader>
```

## Before you use it

- Not every browser has WebGPU: keep a static background in place.
- Telemetry is on by default (about 5% of visits send performance data to shaders.com): use `disableTelemetry`.
- The visual editor, the connected CLI and the MCP need a shaders.com account; ready-made presets and website sections are part of the Pro plan.

## Credits

This repository is a **mirror** of [shader-effects-inc/shaders](https://github.com/shader-effects-inc/shaders) (© Shader Effects, Inc., MIT license), with the INEMA guide in the `guia/` folder. The original README is in [README.upstream.md](README.upstream.md). The author's release and test workflows were removed from the mirror; only the GitHub Pages deploy remains.

---

[INEMA.CLUB](https://inema.club)
