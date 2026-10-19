// Mede as 4 versões da hero (sem / fundo / botao / css) em 3 perfis.
// Uso: node comparacao/medir.mjs
// Saída: comparacao/resultados.json + comparacao/prints/*.jpg
import { createRequire } from 'node:module';
import os from 'node:os';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(path0(os.homedir(), '.npm-global/lib/node_modules/playwright')); }
function path0(...p) { return p.join('/'); }
const { chromium } = pw;
import { writeFileSync, mkdirSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PRINTS = path.join(DIR, 'prints');
mkdirSync(PRINTS, { recursive: true });
const URL0 = 'file://' + path.join(DIR, 'hero.html');

const VERSOES = ['sem', 'fundo', 'botao', 'css'];
// "fraco" e "celular" são emulação: só a CPU é freada (4x). A GPU continua a desta máquina.
const PERFIS = {
  desktop: { viewport: { width: 1440, height: 900 }, dpr: 1, cpu: 1 },
  fraco:   { viewport: { width: 1366, height: 768 }, dpr: 1, cpu: 4 },
  celular: { viewport: { width: 390, height: 844 }, dpr: 3, cpu: 4, mobile: true },
};
const JANELA_MS = 5000;

const browser = await chromium.launch({
  headless: true,
  args: ['--enable-unsafe-webgpu', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist'],
});

// Contraste WCAG entre a cor do texto e cada pixel de fundo (texto escondido).
const PY_CONTRASTE = `
import sys, json, numpy as np
from PIL import Image
def lin(c):
    c = c/255.0
    return np.where(c<=0.03928, c/12.92, ((c+0.055)/1.055)**2.4)
def lum(rgb): r,g,b = lin(rgb[...,0]),lin(rgb[...,1]),lin(rgb[...,2]); return 0.2126*r+0.7152*g+0.0722*b
out=[]
for item in json.loads(sys.argv[1]):
    a = np.asarray(Image.open(item['png']).convert('RGB')).astype(float)
    t = np.array(item['cor'],float)
    Lb = lum(a); Lt = lum(t[None,None,:])[0,0]
    hi = np.maximum(Lb,Lt); lo = np.minimum(Lb,Lt)
    ratio = (hi+0.05)/(lo+0.05)
    out.append({'p1': float(np.percentile(ratio,1)), 'abaixo45': float((ratio<4.5).mean())})
print(json.dumps(out))
`;

const ESCONDE = `h1,.lead,.chip,.amb{color:transparent !important}`;
const ALVOS = [ { sel: 'h1', cor: [233,233,238], nome: 'titulo' }, { sel: '.lead', cor: [154,154,166], nome: 'paragrafo' } ];

const resultados = [];
for (const [perfil, p] of Object.entries(PERFIS)) {
  for (const v of VERSOES) {
    const ctx = await browser.newContext({ viewport: p.viewport, deviceScaleFactor: p.dpr, isMobile: !!p.mobile, hasTouch: !!p.mobile });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Performance.enable');
    if (p.cpu > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: p.cpu });
    await page.goto(`${URL0}?v=${v}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__pronto === true, null, { timeout: 60000 });
    await page.waitForTimeout(2000);
    const status = await page.textContent('#tag');

    // Print da versão como a pessoa vê
    const print = path.join(PRINTS, `${perfil}-${v}.jpg`);
    await page.screenshot({ path: print, quality: 80 });

    // FPS e CPU do processo da página numa janela de 5 s
    const m0 = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
    const fps = await page.evaluate(ms => new Promise(res => {
      let n = 0; const t0 = performance.now();
      const tick = t => { n++; if (t - t0 < ms) requestAnimationFrame(tick); else res(n * 1000 / (t - t0)); };
      requestAnimationFrame(tick);
    }), JANELA_MS);
    const m1 = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
    const cpu = 100 * (m1.TaskDuration - m0.TaskDuration) / (m1.Timestamp - m0.Timestamp);

    // Contraste: esconde o texto e fotografa o fundo atrás dele em 10 momentos
    await page.addStyleTag({ content: ESCONDE });
    const lote = [];
    for (let i = 0; i < 10; i++) {
      for (const a of ALVOS) {
        const png = path.join(PRINTS, `_fundo-${perfil}-${v}-${a.nome}-${i}.png`);
        await page.locator(a.sel).screenshot({ path: png });
        lote.push({ png, cor: a.cor, alvo: a.nome });
      }
      await page.waitForTimeout(500);
    }
    const medidas = JSON.parse(execFileSync('python3', ['-c', PY_CONTRASTE, JSON.stringify(lote)]).toString());
    lote.forEach(l => unlinkSync(l.png));
    const contraste = {};
    for (const a of ALVOS) {
      const ms = medidas.filter((_, i) => lote[i].alvo === a.nome);
      contraste[a.nome] = {
        pior: Math.min(...ms.map(m => m.p1)),
        abaixo45_max: Math.max(...ms.map(m => m.abaixo45)),
      };
    }
    const r = { perfil, versao: v, status, fps: +fps.toFixed(1), cpu: +cpu.toFixed(1), contraste, print: path.relative(DIR, print) };
    console.log(JSON.stringify(r));
    resultados.push(r);
    await ctx.close();
  }
}
await browser.close();
writeFileSync(path.join(DIR, 'resultados.json'), JSON.stringify(resultados, null, 2));
