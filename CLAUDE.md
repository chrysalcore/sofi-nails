# sofi-nails — notas específicas de este repo

Preferencias generales en `~/.claude/CLAUDE.md`. Esto es lo propio de este repo.

- 100% TypeScript en `src/` (no hay `.js`/`.jsx` de código, solo configs `.mjs`). El README ya lo refleja correctamente (corregido 2026-07-20, antes decía "TypeScript, JavaScript").
- El formulario de reserva (`src/app/reservation/_components/form/`) usa **Server Action + Resend** para el envío de email, documentado en el README desde 2026-07-20 (sección "Reservation Form & Email Notifications"). Errores se manejan vía `useActionState`, no try/catch.
- Zod (`^4.4.3`) es dependencia directa desde el 2026-07-20 — la validación del formulario de reserva vive en `src/app/reservation/_lib/data/schema.ts` (`reservationSchema`), usada vía `safeParse` en `actions.tsx`. Ya no hay validación manual inline; el typo de gramática histórico en el mensaje de error de `name`/`subject` ("most to be") también se corrigió ese día.
- Prettier configurado con `prettier-plugin-tailwindcss` — correr `prettier` antes de commitear cambios de estilos si se toca CSS/Tailwind. Decisión tomada 2026-07-20: se generaliza al resto de repos del portafolio con Tailwind (empezando por `chrysal-core`), no queda como caso puntual de este repo. Importante: el plugin necesita estar listado en `.prettierrc.json` (`"plugins": ["prettier-plugin-tailwindcss"]`) para tener efecto — Prettier 3 no lo carga solo por estar instalado como dependencia; esto pasó desapercibido acá hasta esa fecha (plugin instalado pero inerte).
- Badges/tabla de stack en el README deben reflejar las versiones reales instaladas (`package.json`/`node_modules`), no quedarse fijas — se corrigieron Next.js (14.2.5 → 16.2.9) y TypeScript (5.5 → 5.9) el 2026-07-20 tras haber quedado desactualizadas.
- Interfaces (`interface`) se usan para los tipos de datos (`Service`, `FAQ`, `Category`, `SocialLink`, `NavLink`) importados desde `_lib/data/`; las props de componentes siguen el default global (tipo inline).

## Rendimiento — auditoría Lighthouse + axe (baseline 2026-07-20, contra producción)

| Página | Performance | Accessibility | Best Practices | SEO |
| :--- | :--- | :--- | :--- | :--- |
| Home | 56 | 91 | 75 | 100 |
| `/services/nails` | 70 | 90 | 96 | 100 |
| `/reservation` | 59 | 91 | 75 | 100 |

- **Performance** — causa principal identificada: el widget de Google Reviews de Elfsight en el home agregaba ~1.04s de Total Blocking Time y 536KB de JS; Google Tag Manager sumaba ~289ms más. Los atributos `strategy="lazyOnload"` + `data-elfsight-app-lazy` que ya traía el código **no alcanzaban**: TBT cuenta tareas largas del hilo principal durante toda la ventana de carga, sin importar si el elemento está fuera de viewport.
- **Accessibility** — dos botones sin nombre accesible (toggle de menú móvil, botón flotante de llamada) sin `aria-label`. Axe-core detectaba además ~30 instancias de contraste insuficiente en el home (ratio ~1.89 vs 4.5 requerido): texto blanco sobre el tint beige `#d5b79b` en footer/nav/FAQ. Fix sugerido y aún **pendiente**: usar `--color-dark` (#6e5b3d) como fondo de esas secciones en vez del tint claro (da 6.51:1, pasa AA).
- **Best Practices** — bajaba por errores de consola + cookies de terceros (Elfsight/GTM), nada bloqueante en sí.
- **SEO** — 100/100 en las tres páginas.

### Fixes aplicados (2026-07-20, sesión posterior al baseline)

- Widget de Elfsight del calendario en `/reservation` (`_components/calendar.tsx`) archivado: sacado el `import`/uso de `page.tsx`, el archivo se dejó sin borrar por si se retoma.
- Widget de testimonios (`_components/testimonials/testimonials-list.tsx`) se mantiene con Elfsight (decisión consciente: las reseñas se actualizan en tiempo real, el reemplazo estático que estaba comentado en el archivo no cubre ese requisito — se eliminó ese código muerto). Se reescribió como client component con `IntersectionObserver` propio (ref + `useEffect`) para que el script `platform.js` y el div del widget solo se monten cuando la sección entra en viewport por scroll real del usuario — el `<Script>` global se sacó de `layout.tsx` (ya no se necesita en ninguna otra página tras archivar el calendario).
- `aria-label` agregado al toggle de menú móvil (`components/nav/aside-nav.tsx`, con `aria-expanded` también) y al botón flotante de llamada (`components/global/body-cta.tsx`).
- Pendiente: fix de contraste (footer/nav/FAQ).

### Re-medición (2026-07-21, contra el deployment de `preview` en Vercel)

| Página | Performance | Accessibility | Best Practices | SEO |
| :--- | :--- | :--- | :--- | :--- |
| Home | 59 (56) | 96 (91) | 100 (75) | 69\* (100) |
| `/services/nails` | 64 (70) | 96 (90) | 100 (96) | 69\* (100) |
| `/reservation` | 66 (59) | 96 (91) | 100 (75) | 69\* (100) |

*(entre paréntesis, el baseline contra producción)*

- **Metodología distinta al baseline** — esta vez se corrió Lighthouse + axe-core localmente vía Playwright/puppeteer-core contra el deployment real de `preview`, no PageSpeed Insights contra producción. Los deployments de preview de Vercel están protegidos por Deployment Protection (SSO); hubo que generar un shareable link (`get_access_to_vercel_url` del MCP de Vercel) para setear la cookie `_vercel_jwt` y auditar el sitio real en vez de la pantalla de login de Vercel.
- **SEO (69, marcado con \*)** — no es una regresión real: el único audit que falla es `is-crawlable`, causado por el header `X-Robots-Tag: noindex` que Vercel agrega automáticamente a *todos* los preview deployments (para que no los indexe Google). Ese header no existe en producción; ahí debería seguir en 100.
- **Accessibility (96, sube de 90-91)** — confirma que los `aria-label` sí resolvieron los nombres accesibles faltantes. axe-core ya no reporta violaciones de nombre accesible.
- **Best Practices (100 en las tres páginas, sube de 75-96)** — mejora fuerte, consistente con archivar el widget de Elfsight del calendario y quitar el `<Script>` global de GTM/Elfsight de páginas que no lo usan.
- **Performance (mixto: +3 Home, −6 `/services/nails`, +7 `/reservation`)** — una sola corrida de Lighthouse mobile-throttled tiene varianza alta; no alcanza para concluir que `/services/nails` empeoró de verdad. Si se quiere una lectura confiable, correr 3-5 veces y promediar (`--output=json` + script, no a mano).
- **Accesibilidad pendiente confirmada** — axe-core sigue reportando exactamente `color-contrast` (serious) como única violación: 30 nodos en Home, 18 en `/services/nails`, 18 en `/reservation`. Coincide con el fix de contraste (footer/nav/FAQ, `--color-dark` de fondo) que sigue sin aplicarse.
- **Diagnóstico de performance** — el breakdown de LCP mostró un salto sospechoso (red termina a los ~1.4s, pero las long tasks que cierran el LCP corren recién a los ~5.2-5.8s): probablemente el CPU throttling 4x de Lighthouse mobile golpeando fuerte sobre la máquina compartida donde se corrió la auditoría, no necesariamente algo que vería un usuario real. Los scores de Performance de la tabla de arriba son direccionales, no confiables al 100% — remedir contra producción una vez mergeado a `main` para un número limpio.

### Fuentes convertidas a WOFF2 (2026-07-21)

- `src/lib/fonts/` tenía los 3 archivos en TTF/OTF crudo (`WorkSans.ttf` 362KB, `Allura.ttf` 234KB, `Konseric.otf` 32KB en disco) con `preload: true` en los tres `localFont()` (`layout.tsx`, `title.tsx`, `section-header.tsx`) — competían por prioridad en el critical path simultáneamente.
- Convertidos a `.woff2` (vía `ttf2woff2`): `WorkSans.woff2` 134KB (-63%), `Allura.woff2` 86KB (-63%), `Konseric.woff2` 20KB (-38%). Mismo glyph set, `display: "swap"` ya estaba bien puesto en los tres así que no había FOIT, esto es puramente ahorro de bytes/prioridad de red.
- Verificado: build limpio, sin requests de fuente fallidos, render visual idéntico (Playwright screenshot).
