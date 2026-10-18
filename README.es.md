# Shaders — efectos WebGPU para sitios web (espejo + guía INEMA)

[![Sitios con Shaders](guia/assets/banner-es.jpg)](https://inematds.github.io/shaders/guia/es/)

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

## Qué es

Shaders es una biblioteca gratuita y de código abierto (licencia MIT) con más de 200 efectos visuales para páginas web. Sirve para quien hace sitios, landing pages y apps y quiere un fondo animado, un brillo o una distorsión sin escribir código de tarjeta gráfica. Cada efecto es un componente: apilas capas y la tarjeta gráfica del visitante lo dibuja todo en tiempo real, con la tecnología WebGPU. Para usarla, basta instalar el paquete `shaders` (React, Vue, Svelte, Solid o JavaScript puro) y abrirlo en un navegador con WebGPU.

## 📖 Guía de uso

Guía completa (demo en vivo + paso a paso + cuidados): **https://inematds.github.io/shaders/guia/es/**

## Inicio rápido

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

## Antes de usarla

- No todos los navegadores tienen WebGPU: deja un fondo estático en su lugar.
- La telemetría viene activada (cerca del 5% de las visitas envía datos de rendimiento a shaders.com): usa `disableTelemetry`.
- El editor visual, la CLI conectada y el MCP piden una cuenta en shaders.com; los presets listos y las secciones de sitio son del plan Pro.

## Créditos

Este repositorio es un **espejo** de [shader-effects-inc/shaders](https://github.com/shader-effects-inc/shaders) (© Shader Effects, Inc., licencia MIT), con la guía de INEMA en la carpeta `guia/`. El README original está en [README.upstream.md](README.upstream.md). Los workflows de release y pruebas del autor se quitaron del espejo; solo quedó el deploy de GitHub Pages.

---

[INEMA.CLUB](https://inema.club)
