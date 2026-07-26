# sofi-nails — notas específicas de este repo

Preferencias generales en `~/.claude/CLAUDE.md` (que cubre solo lo transversal a todos los proyectos). Esto es lo propio de este repo.

- 100% TypeScript en `src/` (no hay `.js`/`.jsx` de código, solo configs `.mjs`). El README ya lo refleja correctamente (corregido 2026-07-20, antes decía "TypeScript, JavaScript").
- El formulario de reserva (`src/app/reservation/_components/form/`) usa **Server Action + Resend** para el envío de email, documentado en el README desde 2026-07-20 (sección "Reservation Form & Email Notifications"). Errores se manejan vía `useActionState`, no try/catch.
- Zod (`^4.4.3`) es dependencia directa desde el 2026-07-20 — la validación del formulario de reserva vive en `src/app/reservation/_lib/data/schema.ts` (`reservationSchema`), usada vía `safeParse` en `actions.tsx`. Ya no hay validación manual inline; el typo de gramática histórico en el mensaje de error de `name`/`subject` ("most to be") también se corrigió ese día.
- Prettier configurado con `prettier-plugin-tailwindcss` — correr `prettier` antes de commitear cambios de estilos si se toca CSS/Tailwind. Decisión tomada 2026-07-20: se generaliza al resto de repos del portafolio con Tailwind (empezando por `chrysal-core`), no queda como caso puntual de este repo. Importante: el plugin necesita estar listado en `.prettierrc.json` (`"plugins": ["prettier-plugin-tailwindcss"]`) para tener efecto — Prettier 3 no lo carga solo por estar instalado como dependencia; esto pasó desapercibido acá hasta esa fecha (plugin instalado pero inerte).
- Badges/tabla de stack en el README deben reflejar las versiones reales instaladas (`package.json`/`node_modules`), no quedarse fijas — se corrigieron Next.js (14.2.5 → 16.2.9) y TypeScript (5.5 → 5.9) el 2026-07-20 tras haber quedado desactualizadas.
- Interfaces (`interface`) se usan para los tipos de datos (`Service`, `FAQ`, `Category`, `SocialLink`, `NavLink`) importados desde `_lib/data/`; las props de componentes siguen el default global (tipo inline).

## Rendimiento — estado actual y próximos pasos

**Estado confirmado (2026-07-26, contra producción, 5 corridas Lighthouse mobile-throttled promediadas por página):**

| Página | Performance | TBT | LCP | FCP | CLS |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Home | 85 (rango 79–88) | 225ms (rango 150–392ms) | 3796ms | 989ms | 0.000 |
| `/services/nails` | 87 (rango 85–89) | 160ms (rango 118–242ms) | 3767ms | 930ms | 0.000 |
| `/reservation` | 89 (rango 87–91) | 131ms (rango 73–167ms) | 3563ms | 910ms | 0.000 |

Baseline previo (2026-07-21, solo Home): **79** (rango 72–83), TBT **392ms** (rango 256–586ms). O sea +6 de score y −43% de TBT. Salvedad metodológica: la medición del 2026-07-26 **ya incluye Speed Insights** (+4K de JS), así que la mejora atribuible al resto del trabajo está algo subestimada.

### El modo de throttling cambia radicalmente el diagnóstico — leer antes de sacar conclusiones

Home medida el mismo día con los tres modos de `--throttling-method`:

| | `simulate` (default, modelo Lantern) | `devtools` (throttling real 3G + 4x CPU) | `provided` (sin throttling) |
| :--- | :--- | :--- | :--- |
| Score | 85 | 86 (rango 81–91) | 100 |
| LCP | 3686ms | **2072ms** | 504ms |
| FCP | 937ms | **2072ms** | 504ms |
| TBT | 225ms | **448ms** | 22ms |

**`simulate` inflaba el LCP ~78% y subestimaba el TBT a la mitad.** Con throttling real el LCP es 2.07s, **por debajo del umbral "bueno" de 2.5s**, y el TBT real es 448ms (sobre el umbral bueno de 200ms).

**Conclusión: el cuello de botella sigue siendo TBT, no LCP.**

**FCP == LCP en los tres modos, exactamente** (391=391 observado en simulate, 2072=2072 en devtools, 504=504 en provided). El elemento LCP es texto (el `<p>` del hero) y se pinta **una sola vez**, junto con el primer paint. No hay render delay, ni repaint por swap de fuente. `display: swap` funciona como se espera y **las fuentes no bloquean el paint del texto**.

**Error a no repetir:** en `simulate`, Lighthouse reporta un "render delay" enorme para elementos de texto (acá 3075ms de 3796ms, 81%) porque asigna a esa fase todo lo que no es TTFB/load, arrastrando la proyección completa de la timeline modelada. **No es una medición de render.** Se llegó a plantear que las 3 WOFF2 (235KB, 38% del peso de la página: WorkSans 131KB + Allura 84KB + Konseric 20KB, las tres preloadeadas) eran la causa del LCP alto — **era falso**, se estaba persiguiendo un artefacto del modelo. En las corridas, todas las descargas terminaban a los ~215ms observados y el LCP observado era 391ms.

Subsetear las fuentes sigue siendo una reducción de bytes legítima (y ayudaría a usuarios en conexiones lentas a recibir la tipografía real antes), pero **no es un fix de LCP** y probablemente solo suba el número de Lighthouse en modo `simulate`, que es optimizar la métrica y no la experiencia. Sin verificar todavía la cobertura de glyphs (falta `fonttools`).

**Qué modo usar:** `simulate` para comparar contra baselines históricos (es el default y lo que usó el baseline del 2026-07-21). `devtools` o RUM para decidir *qué* arreglar. Speed Insights es lo que resuelve la ambigüedad de forma definitiva: da el LCP de usuarios reales sin modelo de por medio.

Cero recursos bloqueando el render, `font-display` score 1, `third-party-summary` **vacío** (el fix de GA sigue funcionando). CLS es 0.000 en las 3 páginas: ahí no hay nada que hacer. El long task más grande es `1eglloh0s_w8l.js` (react-dom) con 245ms.

### Datos de campo — Vercel Speed Insights (2026-07-26, primeras muestras)

| Métrica | Desktop | Mobile | Umbral |
| :--- | :--- | :--- | :--- |
| FCP | 0.43s | 1.18s | — |
| LCP | 0.43s | 1.18s | bueno <2.5s |
| **INP** | sin datos | **312ms** | bueno ≤200ms, NI 200–500ms |
| CLS | sin datos | 0 | bueno <0.1 |
| TTFB | 0.08s | 0.04s | — |
| RES | sin datos | 95 | bueno >90 |

**Salvedad grande: N=1 en ambas.** Una sola visita por plataforma (desktop desde la PC de Ordnay, mobile desde su celular en WiFi en Brasil). El P75 de una muestra es esa muestra; el RES de 95 no significa nada con ese N. El "No data available" del RES en desktop **no es problema del paquete** — `2.0.0` es la última estable, verificado en npm; es falta de muestras.

**FCP == LCP también en campo, en ambas plataformas.** Ya son 3 métodos independientes con la misma firma (Lighthouse simulate observado 391=391, devtools 2072=2072, campo 0.43=0.43 y 1.18=1.18). El elemento LCP es texto y se pinta una sola vez. **Tema fuentes cerrado definitivamente**: el LCP real está muy por debajo del umbral bueno y no hay nada que optimizar ahí.

**INP 312ms es la primera evidencia de campo del costo de hidratación**, y coincide con el TBT de lab (448ms con throttling real). Dos métodos independientes apuntando al mismo problema, lo que le da credibilidad pese al N=1.

**Hipótesis a verificar sobre el INP:** `deferred-analytics.tsx` dispara la carga de GA con `["pointerdown", "keydown", "scroll", "touchstart"]`. `pointerdown` y `touchstart` **son parte del tap que INP mide**, así que el primer toque inyecta `gtag.js` y su descarga/ejecución cae dentro de la ventana que INP mide para esa interacción. **El fix de GA pudo haber convertido un problema de TBT en carga en un problema de INP en interacción.** Si se confirma, el arreglo es chico: mantener el trigger pero diferir la inyección real a un `requestIdleCallback` para que el trabajo del script no caiga dentro de la interacción. Falta el desglose de INP (input delay / processing / presentation delay) para confirmarlo; el panel de Speed Insights no lo muestra.

Descartado como causa del INP: Elfsight monta con `scroll`, y **scroll no es una interacción que INP mida** (INP cuenta clicks, taps y teclas).

**Ignorar el First Input Delay** que muestra el panel (2ms desktop / 163ms mobile): está deprecado justamente porque mide solo la demora antes de procesar el *primer* input, lo que esconde el costo de hidratación. INP es su reemplazo.

**Sobre Search Console:** sus Core Web Vitals vienen de CrUX, que exige un mínimo de tráfico para que un origen aparezca. Un salón local puede no alcanzar nunca ese umbral y el reporte quedaría vacío de forma permanente — no sería un error de implementación. Speed Insights no tiene esa restricción porque mide el tráfico propio directamente.

**Caché y renderizado (verificado contra producción el 2026-07-26, vía headers):** las 13 rutas del proyecto son estáticas. No queda ninguna ruta dinámica (`ƒ`) en el build. Las 8 categorías y sus 8 OG images responden `x-vercel-cache: HIT` + `x-nextjs-prerender: 1`.

Antes del 2026-07-26 `/services/[category]` y su `opengraph-image` eran `ƒ (Dynamic)`: respondían `x-vercel-cache: MISS` con `cache-control: private, no-cache, no-store` **en cada request** (nunca cacheaban, no era un miss de primera visita), invocando una función serverless por visita. Causa: faltaba `generateStaticParams()`. Son las páginas con `priority: 0.9` en el sitemap.

**Cómo verificar el estado de caché sin Lighthouse** — más rápido y sin varianza:
```bash
curl -sI https://sofinailsandlashesspa.com/services/nails | grep -iE "x-vercel-cache|x-nextjs-prerender|cache-control"
```

**Chunk de hidratación: diagnosticado.** `1eglloh0s_w8l.js` (224K, el más grande) contiene `hydrateRoot`, `createRoot`, `Fiber` y `reconciler`: **es react-dom**, no un tercero. Por eso **Partytown quedó descartado** — no hay JS de terceros en ese chunk que mover a un worker. La única palanca es hidratar menos, y react-dom no se va mientras exista cualquier interactividad.

**Client components: 5** (eran 9). Los que quedan lo necesitan genuinamente: `testimonials-list` (IntersectionObserver), `form` (useActionState/useSearchParams), `deferred-analytics`, `aside-nav` (toggle) y `nav-link`.

`nav-link.tsx` **debe seguir siendo client**: obtener el pathname en un server component del root layout exigiría `headers()`/middleware, lo que saca la ruta de la generación estática. `usePathname` en un componente hoja chico es el patrón correcto acá. `category-short.tsx` sí se pudo pasar a servidor porque el param está disponible en `[category]/layout.tsx`.

**Fixes aplicados (previos):**
- Elfsight del calendario en `/reservation` archivado (`_components/calendar.tsx` sin uso, no borrado).
- Testimonios (home) con mount diferido vía `IntersectionObserver` propio en vez del lazy attribute de Elfsight (que no sacaba su TBT de la ventana de carga).
- `aria-label`/`aria-expanded` en toggle de menú móvil y botón flotante de llamada.
- Fuentes convertidas de TTF/OTF a WOFF2 (`ttf2woff2`, -38% a -63% de peso).
- GA4 diferido hasta primera interacción o timeout de 4s (`src/components/global/deferred-analytics.tsx`) — sacó a Google Analytics de `third-party-summary` en producción.

**Fixes aplicados (2026-07-26):**
- `generateStaticParams()` en `services/[category]/page.tsx` y `opengraph-image.tsx`.
- Redirect de `/services` movido a `redirects()` en `next.config.ts` con `permanent: true` (antes era `redirect()` en runtime: 307 con `Location` relativo sin barra inicial). `services/page.tsx` eliminado por quedar inalcanzable.
- OG images de PNG a JPEG: 720KB → 37-56KB cada una. Se sacó `ImageResponse` (satori+resvg) porque rasterizaba de nuevo un PNG que `sharp` ya generaba, sin agregar texto ni overlay. **Ojo: `ImageResponse` solo emite PNG** — si algún día se quiere texto/branding sobre la OG, hay que volver a traerlo y se pierde el JPEG.
- FAQ a `<details name="faq">` con variantes `group-open:`. Cero JS. Trade-offs aceptados: se perdió la animación de despliegue (`max-h-0`→`max-h-52`, no replicable sin `::details-content`, que es Chrome 131+); las respuestas largas ya no se recortan a 13rem; el acordeón exclusivo necesita Chrome 120+/Safari 17.2+/Firefox 130+ (degradación elegante: se abren varias).
- `category-cta.tsx` de `<button onClick={router.push}>` a `<Link>`: recupera el prefetch en la navegación home → categoría. **Regresión que trajo, detectada recién el 2026-07-27:** al volverse anchors reales, las 8 CTAs del home pasaron a tener anchor text genérico idéntico ("See More") y el audit `link-text` empezó a fallar — SEO del home 100 → **92** en producción (`/services/nails` y `/reservation` siguieron en 100). Como `<button>` el audit ni las miraba: filtra por `link.href`. Corregido agregando `<span className="sr-only">{` about ${title}`}</span>`, que deja el texto visible intacto y el anchor text en "See More about Luxe Hands & Feet Rituals". Verificado: home local vuelve a 100, cero items flagged.
- Fuentes consolidadas en `src/lib/fonts/index.ts` — `allura` generaba dos `@font-face` por estar declarada en `title.tsx` y `section-header.tsx`. El `preload: true` de las 3 es **correcto y se mantiene**: `layout.tsx` renderiza `Hero` en toda página y `Title isMainTitle` usa konseric y allura above-the-fold.
- `preconnect` a `elfsightcdn.com` (scoped al home vía `testimonials-list.tsx`). **GA descartado a propósito**: preconectar en la carga inicial a un origen deliberadamente diferido contradice el fix de GA, y hacerlo al momento del trigger no aporta porque el script ya abre la conexión.
- Vercel Speed Insights (`@vercel/speed-insights`, +4K de JS sin comprimir). **No se difiere como GA**: necesita registrar sus PerformanceObserver temprano para capturar LCP/FCP/CLS. Es first-party (`/_vercel/speed-insights/script.js`), así que no suma DNS/TCP/TLS a un tercero. Requiere estar habilitado en el dashboard de Vercel; el script se inyecta al hidratar, no aparece en el HTML server-rendered.

**Cómo funciona el audit `link-text` (verificado leyendo el fuente de Lighthouse y probándolo aislado):** `core/audits/seo/link-text.js` evalúa **solo** `link.text`, y el gatherer (`anchor-elements.js`) lo obtiene de `node.innerText`. **Un `aria-label` descriptivo NO satisface el audit** — probado: un anchor "See More" con `aria-label="See more about Nails"` se sigue reportando con `text: "See More"`. Coincide con el señal real: Google usa el anchor text, no el `aria-label`. `sr-only` sí entra en `innerText` (está clippeado, no `display:none`), así que arregla la métrica y la señal a la vez. Ojo con el espacio: en JSX, `{children}` seguido de un `<span>` en otra línea no emite separador — usar template literal (`{` about ${title}`}`) o el nombre accesible queda pegado ("See Moreabout Nails").

**Correr Lighthouse con `--only-categories=performance` deja ciegas las otras categorías.** Todo el trabajo del 2026-07-26 se midió solo en performance, y por eso la regresión de `link-text` pasó desapercibida pese a varias corridas. Al tocar enlaces, markup semántico o metadata, correr también `--only-categories=seo` — no tiene varianza (son checks sobre el DOM estático, no timing), así que **una sola corrida basta y localhost es comparable con producción**, a diferencia de las métricas de performance.

**Bugs reales encontrados y corregidos (2026-07-26):**
- `body-cta.tsx` (botón flotante de llamada en móvil) marcaba `tel:12144159107` — código de área de Dallas, no el del negocio. Ahora se deriva de `contactItemList` para que no pueda volver a divergir. De paso dejó de ser client component (era `"use client"` solo para `window.open`).
- `award.tsx` usaba `preload` en `next/image`, prop que no existe: era un no-op silencioso. Ahora `priority`. Se confirmó comparando el header `link:` de producción antes/después.
- `metadata.icons` en `layout.tsx` apuntaba a `../../public/favicon/favicon.ico` y `.../apple-icon.png`: rutas de filesystem emitidas como URL, hacia archivos inexistentes, y pisando la convención de archivos de `src/app/`. Eliminado; los tres iconos ahora responden 200 (antes 404).
- `globals.css` declaraba `--font-quicksand` (fuente que no existe en el repo) y `--font-worksans`, ninguna usada. `title.tsx` usaba `font-konseric`/`font-allura`, clases inertes por no tener variable en `@theme` (la tipografía aplicaba por el `className` de `next/font`).

**Pendiente / próximos pasos (en orden de impacto esperado):**
- **INP (312ms en campo, "needs improvement") — es el cuello actual.** Primero juntar más muestras en Speed Insights (mobile, rango que incluya post-2026-07-26); con N=1 no se puede concluir. Si se sostiene sobre 200ms, empezar por la hipótesis de GA/`pointerdown` descrita arriba, que es barata de probar. LCP y CLS ya están en rango bueno en campo: no tocarlos.
- **TBT (448ms con throttling real).** Es la contracara en lab del INP. El mayor contribuyente es react-dom hidratando; ya se bajó de 9 a 5 client components y los que quedan son necesarios. No hay palanca obvia restante sin sacar interactividad.
- Fix de contraste (footer/nav/FAQ): usar `--color-dark` (#6e5b3d) como fondo en vez del tint `#d5b79b` (ratio ~1.89, falla AA) — axe-core lo reporta como única violación de accesibilidad en las 3 páginas. Separado a propósito por implicar cambio visual.
- Vulnerabilidad Dependabot #27 (high) abierta en la rama default.
- OG images: no hay `export const alt`, así que las previews sociales no tienen texto alternativo (tampoco lo tenían antes — el `alt` del `<img>` dentro del `ImageResponse` se rasterizaba y se perdía).
