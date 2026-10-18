# Shaders — efeitos WebGPU para sites (espelho + guia INEMA)

[![Sites com Shaders](guia/assets/banner.jpg)](https://inematds.github.io/shaders/guia/)

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

## O que é

Shaders é uma biblioteca gratuita e de código aberto (licença MIT) com mais de 200 efeitos visuais para páginas web. Ela serve para quem faz sites, landing pages e apps e quer um fundo animado, um brilho ou uma distorção sem escrever código de placa de vídeo. Cada efeito é um componente: você empilha camadas e a placa de vídeo do visitante desenha tudo em tempo real, pela tecnologia WebGPU. Para usar, basta instalar o pacote `shaders` (React, Vue, Svelte, Solid ou JavaScript puro) e abrir num navegador com WebGPU.

## 📖 Guia de uso

Guia completo (demo ao vivo + passo a passo + cuidados): **https://inematds.github.io/shaders/guia/**

## Início rápido

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

## Antes de usar

- Nem todo navegador tem WebGPU: deixe um fundo estático no lugar.
- A telemetria vem ligada (cerca de 5% das visitas mandam dados de desempenho para o shaders.com): use `disableTelemetry`.
- Editor visual, CLI conectada e MCP pedem conta no shaders.com; presets prontos e seções de site são do plano Pro.

## Créditos

Este repositório é um **espelho** de [shader-effects-inc/shaders](https://github.com/shader-effects-inc/shaders) (© Shader Effects, Inc., licença MIT), com o guia do INEMA na pasta `guia/`. O README original está em [README.upstream.md](README.upstream.md). Os workflows de release e teste do autor foram removidos do espelho; ficou só o deploy do GitHub Pages.

---

[INEMA.CLUB](https://inema.club)
