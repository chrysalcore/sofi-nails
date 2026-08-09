# sofi-nails — notas específicas de este repo

Preferencias generales en `~/.claude/CLAUDE.md` (que cubre solo lo transversal a todos los proyectos). Esto es lo propio de este repo.

- 100% TypeScript en `src/` (no hay `.js`/`.jsx` de código, solo configs `.mjs`).
- Formulario de reserva (`src/app/reservation/_components/form/`) con **Server Action + Resend**; errores vía `useActionState`, no try/catch.
- Zod v4 — `_lib/data/schema.ts` (`reservationSchema`), consumido con `safeParse` en `actions.tsx`. Sin validación manual inline.
- Prettier con `prettier-plugin-tailwindcss` — correr antes de commitear cambios de CSS/Tailwind. **El plugin necesita estar listado en `.prettierrc.json`** (`"plugins": [...]`); Prettier 3 no lo carga solo por estar instalado, pasó desapercibido hasta 2026-07-20.
- Badges/tabla de stack en el README deben reflejar versiones reales (`package.json`), no quedarse fijas.
- `interface` para tipos de datos importados de `_lib/data/` (`Service`, `FAQ`, `Category`, `SocialLink`, `NavLink`); props de componentes siguen el default global (tipo inline).

## Testing y CI/CD (2026-08-09)

Vitest + Testing Library + jsdom, patrón global aplicado por primera vez a un proyecto Next.js App Router (confirmado antes solo en `pokedex-app`, Vite/CRA). Config en `vitest.config.mts`/`vitest.setup.mts` (extensión `.mts`, no `.ts` — evita el warning de Vite por ESM en un package sin `"type": "module"`, mismo motivo que `eslint.config.mjs`). Alias `@` → `src/` espejando `tsconfig.json`. `restoreMocks` + `mockReset` ambos en `true` (Vitest 4, ver gotcha en el `CLAUDE.md` global).

Alcance deliberadamente chico: el único flujo con lógica de negocio real es la reserva por email. El resto del repo son server components renderizando datos tipados sin condicionales, o un `<details name="faq">` nativo sin JS propio — no ganan nada con test dedicado.

- `src/tests/app/reservation/_lib/data/schema.test.ts` — unit, `reservationSchema` (Zod) campo por campo.
- `src/tests/app/reservation/_components/form/form.test.tsx` — integration, `<Form />` real completado con `userEvent` y enviado de verdad contra `sendEmail` (la Server Action corre sin mockear, igual que el schema); solo se mockea el borde externo real (`resend`, vía `vi.mock` + `vi.hoisted`) y `next/navigation` (`useSearchParams`, porque el componente vive fuera de un App Router real en el test). Cubre éxito, fallo de validación Zod (Resend nunca se llama) y error devuelto por Resend.
  - **Gotcha:** el mock de `Resend` necesita `mockImplementation(function () {...})` con `function`, no arrow — `new` sobre una arrow function revienta con "is not a constructor", vitest no lo envuelve.
  - **Gotcha:** jsdom no implementa el bloqueo nativo de `required`/`minLength` en submit (ni con `userEvent.click` ni con `fireEvent.submit`) — no hace falta ningún truco para probar que el schema rechaza un campo inválido, un submit normal ya lo deja pasar hasta la Server Action.
- `npm run typecheck` (`tsc --noEmit`, script nuevo — no existía) / `test` / `test:run` / `test:coverage`.

`.github/workflows/ci.yml`: push a `development` → typecheck + lint + test:coverage + build, luego abre PR a `main` si no hay uno abierto (mismo shape que `pokedex-app`). **Sin `deploy.yml`** — Vercel ya despliega en push a `main` vía su integración de Git nativa (`.vercel/project.json` confirma el proyecto linkeado); un workflow de deploy paralelo sería redundante. Sin secrets en CI: `next build` no instancia `Resend` (el import es dinámico dentro de la action, solo corre en runtime real). Branch protection en `main` queda pendiente como paso manual — hoy no tiene ninguna, y el status check no aparece en el selector del ruleset hasta que corrió al menos una vez en GitHub.

## Rendimiento — cerrado (2026-07-26/28)

**Lab, producción, 5 corridas promediadas por página:**

| Página | Performance | TBT | LCP | CLS |
| :--- | :--- | :--- | :--- | :--- |
| Home | 85 (79–88) | 225ms | 3796ms | 0.000 |
| `/services/nails` | 87 (85–89) | 160ms | 3767ms | 0.000 |
| `/reservation` | 89 (87–91) | 131ms | 3563ms | 0.000 |

Baseline previo: 79, TBT 392ms → **+6 de score, −43% de TBT** (la medición nueva ya incluye Speed Insights, +4K JS, así que la mejora real está algo subestimada).

**Campo, Vercel Speed Insights, P75 (ventana 7 días):**

| Métrica | P75 | Muestras | Umbral |
| :--- | :--- | :--- | :--- |
| LCP | 825ms | 28 | <2.5s ✅ |
| INP | 32ms | 26 | ≤200ms ✅ |
| CLS | 0.0025 | 6 | <0.1 ✅ |
| FCP | 692ms | 32 | — |
| TTFB | 265ms | 25 | — |

Mobile es ~toda la muestra (25/26 INP, 27/28 LCP). Por ruta, INP P75: `/` 40ms, `/services/[category]` 32ms, `/reservation` 32ms. **Cerrado como línea de trabajo** — no queda nada que optimizar que se traduzca en experiencia real; el mayor contribuyente de TBT es react-dom hidratando y no hay palanca sin sacar interactividad.

### Gotchas de medición — releer antes de auditar otro sitio

- **El modo de throttling cambia el diagnóstico.** El mismo Home midió LCP 3686ms/score 85 en `simulate` (default), pero **2072ms/score 86 en `devtools`** (throttling real) y 504ms sin throttling. `simulate` infló el LCP ~78% y generó un "render delay" de 3s que era artefacto del modelo, no medición real — se llegó a culpar a las 3 fuentes WOFF2 por eso, y era falso (todas bajaban en ~215ms). Usar `simulate` solo para comparar contra baselines históricos; `devtools` o RUM para decidir qué arreglar.
- **Con N=1 no se concluye.** Un INP de campo de 312ms se anotó como "el cuello actual" (y se le dio más crédito por "coincidir" con el TBT de lab de 448ms). Con N=26 el P75 real es 32ms; el 312ms es el máximo absoluto — la primera interacción de Ordnay en su celular. Dos métricas pueden coincidir por azar.
- **`--only-categories=performance` deja ciegas las otras categorías.** Así pasó desapercibida una regresión de SEO (ver abajo) en varias corridas. Al tocar enlaces/markup/metadata, correr también `--only-categories=seo` — sin varianza, localhost es comparable con producción ahí.
- **Verificar caché sin Lighthouse:** `curl -sI <url> | grep -iE "x-vercel-cache|x-nextjs-prerender|cache-control"`. Las 13 rutas son estáticas (antes `/services/[category]` y su OG image eran `ƒ Dynamic`, `no-store` en cada request, por faltar `generateStaticParams()`).
- **`vercel metrics` (CLI ≥ v56)** lee Speed Insights por terminal y muestra el N, que el panel esconde. Leer siempre el `_count` junto al valor (`lcp_ms`/`lcp_count`, etc.). Plan Hobby: solo 7 días de historial, exportar con `--json` para conservarlo. RES no sale por CLI, solo panel.
  ```bash
  vercel metrics vercel.speed_insights.inp_ms --aggregation p75 --group-by device_type --since 7d --prod
  ```
- Search Console CWV vienen de CrUX, que exige tráfico mínimo — un salón local puede no alcanzar ese umbral nunca (no es error de implementación). Speed Insights no tiene esa restricción.

### Estado técnico actual

- Chunk de hidratación más grande (`1eglloh0s_w8l.js`, 224K) es **react-dom**, no un tercero — Partytown descartado, no hay nada de terceros que mover a un worker.
- **Client components: 5** (`testimonials-list`, `form`, `deferred-analytics`, `aside-nav`, `nav-link`), todos con justificación real. `nav-link.tsx` debe seguir siendo client (`usePathname` sin sacar la ruta de la generación estática); `category-short.tsx` sí pasó a servidor porque el param está en `[category]/layout.tsx`.
- `ImageResponse` (satori+resvg) solo emite PNG — si se necesita texto/branding sobre una OG image hay que volver a traerlo y se pierde el JPEG actual.

**Fixes aplicados:** Elfsight del calendario archivado en `/reservation`; testimonios con `IntersectionObserver` propio; fuentes a WOFF2 (`ttf2woff2`, −38-63%); GA4 diferido a primera interacción/4s (`deferred-analytics.tsx`); `generateStaticParams()` en categorías y OG images; redirect de `/services` movido a `next.config.ts` (`permanent: true`); OG images PNG→JPEG (720KB→37-56KB); FAQ a `<details name>` nativo (trade-off: sin animación de despliegue, necesita Chrome 120+/Safari 17.2+/Firefox 130+); fuentes consolidadas en `src/lib/fonts/index.ts`; `preconnect` a `elfsightcdn.com` scoped al home (no a GA, sería contradecir su diferido); Speed Insights sin diferir (necesita registrar PerformanceObserver temprano, es first-party).

## SEO — Search Console, 16 meses (2026-07-27)

**Exportar siempre los 16 meses, no los 3 por defecto** — el filtro corto oculta el contexto que decide si algo es caída o regresión a la media. Con 3-4 clics/día el ruido semanal es enorme: comparar 7 días contra una base con un pico dio −31% inventado; con ventanas de 28 días la caída real era −6%.

| Mes | Clics/día | Impr/día | Posición |
| :--- | :--- | :--- | :--- |
| 2025-08 | 1.6 | 18 | 12.41 |
| 2025-10 | 2.5 | 37 | 7.99 ← inflexión |
| 2026-01 | 2.3 | 68 | 8.77 |
| 2026-04 | 3.6 | 86 | 7.52 |
| 2026-06 | 4.2 | 103 | 6.80 ← mejor histórica |
| 2026-07 (24d) | 4.0 | 89 | 8.24 |

12 meses: clics/día **+150%**, impresiones/día **+394%**.

**Core updates de Google** (marzo/mayo/junio 2026, verificados contra la serie): en marzo el sitio cayó un tercio durante el rollout (3.6→2.4 clics/día) y salió **por encima** de donde entró (4.1), recuperación en ~42 días. No hay nada que "arreglar" tras un core update — es recalibración del índice, no penalización. Desde 2026-07-09 los updates menores corren sin anuncio; consultar el [Search Status Dashboard](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history) antes de buscar causa en el código.

**El salto de posición de octubre 2025 no fue la migración a Next.js** — ocurrió 6 meses antes (arranca 25-28/09/2025); se revisaron los commits del repo viejo de esa fecha y ninguno lo explica. Probable maduración natural de un sitio nuevo, no demostrado.

**Qué aportó Next.js, medido:** las rutas nuevas (`/about`, `/reservation`, `/services/*`) sumaron ~2.500 impresiones (22% del período) con **3 clics** — amplió superficie indexable, no conversión. Tampoco hizo daño (sin escalón hacia abajo pese a migrar en pleno core update). El home concentra 99.7% de los clics con CTR 4.34%.

**Palanca pendiente de mayor retorno: copywriting de `/about` (1123 impr., CTR 0.18%) y `/reservation` (660, 0.15%)** — páginas que ya ganaron visibilidad y nadie clickea, problema de `title`/`description`, no de ranking.

**Descartado como causa de caídas:** canonicals, `noindex`, `robots.txt`/sitemap, JSON-LD — todo correcto. Consultas son locales (`nail salon salem va`), ahí manda el perfil de Google Business, no el sitio. `/services` (659 impr., 0 clics) es 308 permanente desde 2026-07-26 → se consolidará en `/services/nails`, es esperado que desaparezca del informe.

### Regresión de SEO propia — detectada y corregida

`category-cta.tsx` pasó de `<button onClick={router.push}>` a `<Link>` (para recuperar prefetch). Las 8 CTAs del home quedaron con anchor text genérico idéntico ("See More"), el audit `link-text` empezó a fallar: SEO del home 100 → 92 en producción. **`core/audits/seo/link-text.js` evalúa solo `innerText`; un `aria-label` no lo satisface** (verificado leyendo el fuente y probándolo aislado) — coincide con la señal real, Google usa el anchor text. Corregido con `<span className="sr-only">{` about ${title}`}</span>` (ojo: `{children}` + `<span>` en líneas separadas no emite espacio en JSX, usar template literal).

## Pendiente (orden de impacto)

- **Copywriting de `/about` y `/reservation`** — mayor retorno del proyecto ahora que performance está cerrado.
- **Fix de contraste** (footer/nav/FAQ, `#d5b79b` da ratio ~1.89 vs 4.5 requerido → usar `--color-dark` `#6e5b3d`, da 6.51:1). Única violación de axe-core en las 3 páginas, separado a propósito por implicar cambio visual.
- **Dependabot:** 11 vulnerabilidades abiertas en la rama default (6 high, 5 moderate).
- `award.tsx:6` — JSON-LD con `"@type": "Award"` (no existe en schema.org) apuntando a `/awards/reviews.jpg` (404, la imagen real es `/imgs/award.png`). No afecta ranking, es markup muerto.
- OG images sin `export const alt`.
