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

### Datos de campo — Vercel Speed Insights (2026-07-28, vía `vercel metrics`)

P75 de producción, ventana 2026-07-22 a 2026-07-29, todas las rutas:

| Métrica | P75 | Muestras | Umbral |
| :--- | :--- | :--- | :--- |
| LCP | 825ms | 28 | bueno <2.5s |
| **INP** | **32ms** | 26 | bueno ≤200ms |
| CLS | 0.0025 | 6 | bueno <0.1 |
| FCP | 692ms | 32 | — |
| TTFB | 265ms | 25 | — |

Por dispositivo (mobile es prácticamente toda la muestra: 25 de 26 en INP, 27 de 28 en LCP):

| | Mobile | Desktop |
| :--- | :--- | :--- |
| INP P75 | 32ms | 16ms (N=1) |
| LCP P75 | 949ms | 428ms (N=1) |

Por ruta — INP P75 / muestras: `/` 40ms (15), `/services/[category]` 32ms (8), `/reservation` 32ms (3), `/contact-us` sin datos.

**Las 3 Core Web Vitals están en verde en campo, con margen amplio.** El peor corte de INP es el home con 40ms, contra un umbral de 200ms.

### El "INP 312ms" era una única muestra outlier — corregido

La lectura del 2026-07-26 tomó el panel con **N=1** y anotó 312ms como el INP de campo, concluyendo que era "el cuello actual" y la evidencia del costo de hidratación. **Era falso.** Con N=26 la distribución real es:

| avg | P75 | P90 | P99 | max |
| :--- | :--- | :--- | :--- | :--- |
| 37ms | 32ms | 40ms | **312ms** | **312ms** |

El 312ms **sigue en el dataset**: es el máximo absoluto y coincide exacto con el p99. Es decir, era esa misma muestra única — la primera interacción de Ordnay en su celular — y ahora que hay con qué compararla se ve como lo que es, la cola extrema. Entre el P90 (40ms) y el máximo (312ms) hay un salto de 7x sin nada en medio.

**Error a no repetir:** se anotó "coincide con el TBT de lab (448ms), dos métodos independientes apuntando al mismo problema, lo que le da credibilidad pese al N=1". **Una muestra no gana credibilidad por coincidir con otra métrica** — el TBT de lab y un INP outlier pueden coincidir por azar, y coincidieron. La salvedad del N estaba escrita y aun así se sacó una conclusión de acción a partir del dato. Con N=1 no se concluye, punto.

**Hipótesis de GA/`pointerdown` descartada por los datos.** Se había planteado que `deferred-analytics.tsx` inyecta `gtag.js` dentro de la ventana del tap que INP mide, convirtiendo un problema de TBT en uno de INP. Puede que ese mecanismo explique el outlier de 312ms (es justo la primera interacción), pero **el P75 de 32ms dice que no afecta la experiencia del percentil que importa**. No tocar `deferred-analytics.tsx`: el fix de GA sigue siendo correcto y su costo real es una interacción por sesión, invisible en el P75.

Descartado también en su momento: Elfsight monta con `scroll`, y **scroll no es una interacción que INP mida** (INP cuenta clicks, taps y teclas).

**Ignorar el First Input Delay** que muestra el panel: está deprecado justamente porque mide solo la demora antes de procesar el *primer* input, lo que esconde el costo de hidratación. INP es su reemplazo.

**FCP == LCP: ya no se sostiene como identidad exacta.** En campo con N real, FCP P75 (692ms) y LCP P75 (825ms) difieren. No es contradicción con lo observado antes — cada P75 se calcula sobre su propio conjunto de muestras (32 vs 28), así que no tienen por qué caer en la misma visita. La conclusión que importa sí se mantiene: el elemento LCP es texto, el LCP real está muy por debajo del umbral, **tema fuentes cerrado**.

### Cómo consultar Speed Insights sin el panel

`vercel metrics` (CLI ≥ v56) consulta Speed Insights desde la terminal, sin Observability Plus. Es la forma correcta de leer esto — el panel no muestra el N y por eso se coló el error del 312ms.

```bash
vercel metrics vercel.speed_insights.inp_count --aggregation sum --group-by route --since 7d --prod
vercel metrics vercel.speed_insights.inp_ms --aggregation p75 --group-by device_type --since 7d --prod
```

- **Leer siempre el `_count` antes que el valor.** Cada métrica tiene su par: `lcp_ms`/`lcp_count`, `inp_ms`/`inp_count`, `cls`/`cls_count`, `fcp_*`, `ttfb_*`.
- **El plan Hobby solo da los últimos 7 días.** `--since 30d` falla con `the hobby plan only grants access to the latest 7 days of data`. Para conservar historial hay que exportar periódicamente (`--json`).
- Agregaciones útiles más allá del panel: `avg`, `p90`, `p99`, `max` — son las que delatan un outlier.
- **El Real Experience Score no sale por CLI**, solo por el panel. Con N de dos dígitos tampoco significa gran cosa.
- El MCP de Vercel **no expone Speed Insights**; su `get_web_analytics` es otro producto (visitas/pageviews) y además no está habilitado en este proyecto.

**Sobre el N en general:** con ~4 visitas/día el dataset crece lento. Estos números son de dos dígitos de muestras — sirven para descartar un problema grosero (y lo descartaron), no para detectar una regresión de 20ms.

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
- **Performance está cerrado por ahora.** Las 3 Core Web Vitals están en verde en campo con margen amplio (INP P75 32ms, LCP 825ms, CLS 0.0025). No hay nada que optimizar que se traduzca en experiencia real. **La palanca pendiente con retorno claro es el copywriting** (ver sección de Search Console), no performance.
- **El TBT de lab (448ms con throttling real) ya no justifica trabajo.** Se lo tenía como la contracara del INP alto; ahora que el INP de campo es 32ms, ese TBT es un número de lab bajo throttling agresivo que no se manifiesta en usuarios reales. El mayor contribuyente sigue siendo react-dom hidratando y no hay palanca sin sacar interactividad — pero tampoco hace falta. **No perseguir el número de Lighthouse cuando el campo dice que está bien.**
- Fuentes: subsetear sigue siendo una reducción de bytes legítima, pero con el LCP de campo en 825ms no compra nada medible. Baja prioridad.
- Fix de contraste (footer/nav/FAQ): usar `--color-dark` (#6e5b3d) como fondo en vez del tint `#d5b79b` (ratio ~1.89, falla AA) — axe-core lo reporta como única violación de accesibilidad en las 3 páginas. Separado a propósito por implicar cambio visual.
- Dependabot: **11 vulnerabilidades abiertas en la rama default (6 high, 5 moderate)** — el número lo reporta GitHub en la salida de cada `git push`. Antes se había anotado solo la #27; creció.
- OG images: no hay `export const alt`, así que las previews sociales no tienen texto alternativo (tampoco lo tenían antes — el `alt` del `<img>` dentro del `ImageResponse` se rasterizaba y se perdía).

## SEO y Search Console — historial y diagnóstico (2026-07-27)

Analizado el export completo de 16 meses de GSC (**2025-08-08 a 2026-07-24**, tipo Web). Antes se había mirado solo el de 3 meses y **dio una lectura equivocada** — ver la sección de errores metodológicos abajo.

### La tendencia real es fuertemente ascendente

| Mes | Clics/día | Impr/día | Posición |
| :--- | :--- | :--- | :--- |
| 2025-08 | 1.6 | 18 | 12.41 |
| 2025-09 | 1.6 | 21 | 12.09 |
| **2025-10** | **2.5** | **37** | **7.99** ← inflexión |
| 2025-11 | 2.1 | 52 | 8.07 |
| 2025-12 | 2.2 | 71 | 9.10 |
| 2026-01 | 2.3 | 68 | 8.77 |
| 2026-02 | 2.9 | 80 | 8.42 |
| 2026-03 | 3.3 | 78 | 7.97 |
| 2026-04 | 3.6 | 86 | 7.52 |
| 2026-05 | 5.0 | 106 | 7.50 |
| 2026-06 | 4.2 | 103 | **6.80** ← mejor posición histórica |
| 2026-07 (24d) | 4.0 | 89 | 8.24 |

En 12 meses: clics/día **+150%** (1.6 → 4.0), impresiones/día **+394%** (18 → 89). Julio 2026, incluso "caído", es el **tercer mejor mes** del historial.

### Errores metodológicos cometidos acá — no repetir

- **Comparar una ventana de 7 días contra una base que incluye un pico da un número inventado.** Se midió la última semana contra los 66 días previos (que contenían el pico de mayo) y dio **−31%**. Con ventanas de 28 días la caída real es **−6%** contra la ventana anterior, y la última ventana sigue siendo la 3ª mejor de 6 y está **por encima de todas las anteriores a mayo** (+22% vs abril, +29% vs marzo).
- **Con 3-4 clics/día el ruido semanal es enorme.** Usar ventanas de 28 días como mínimo; nunca concluir de 7 días.
- **Exportar siempre los 16 meses, no los 3 por defecto.** GSC guarda 16 y el filtro por defecto oculta justo el contexto que decide si algo es caída o regresión a la media.

### Core updates de Google — el sitio ya pasó por varios

Rodadas confirmadas, verificadas contra la serie: **marzo 2026** (27/3–8/4), **mayo 2026** (21/5–2/6), **junio 2026** (30/6–17/7).

| Update | Antes | Durante | Después |
| :--- | :--- | :--- | :--- |
| Marzo 2026 | 3.6 clics/d | **2.4** (−33%) | **4.1** (+14% sobre el nivel previo) |
| Mayo 2026 | 4.1 | 5.4 | 4.3 |
| Junio 2026 | 4.3 | 4.4 | 3.1 (solo 7 días de datos) |

**En marzo el sitio cayó un tercio durante el rollout y salió por encima de donde entró.** Es el mismo patrón que se está viviendo ahora; la recuperación de marzo tardó ~42 días. No hay nada que "arreglar" tras un core update: no es una penalización, es una recalibración de todo el índice a la vez.

Cadencia histórica: 3-4 core updates al año (4 en 2023, 4 en 2024, 3 en 2025), cada 3-4 meses, con rollouts de 2 a 6 semanas. 2026 va más rápido: 3 en 5 meses. **Desde el 2026-07-09 Google confirmó que los updates menores corren de forma continua y sin anuncio** — solo los grandes con nombre entran al [Search Status Dashboard](https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history). Consultarlo **antes** de buscar la causa de una caída en el código.

### El salto de octubre 2025 no fue Next.js

La inflexión (posición ~11-15 estancada seis semanas → ~8 en dos semanas, arrancando entre el **25 y el 28 de septiembre de 2025**) ocurrió **seis meses antes** de la migración. Todo el crecimiento ya estaba en marcha con el sitio React andando.

Se revisaron los 4 commits del 2025-09-25 en el repo viejo (`/home/ordnay/Proyectos/React/sofispa`) y **ninguno explica un salto de 3 puntos de posición**: `98fbc89` "SEO enhanced" es sobre todo un refactor (extrajo `SectionHeader.jsx`, los `<h2>` ya existían); `f914194` agregó `public/robots.txt` **vacío** (equivale a no tenerlo); `4c9bf71` cambió `base: './'` → `'/'` en Vite, que en un SPA servido en la raíz resuelve igual; el resto es URL de OG y logo minificado.

**Explicación más probable: maduración natural de un sitio nuevo** (primeros datos 2025-08-08, arranca en posición ~12). No está demostrado — con estos datos no se pueden separar maduración, cambios de septiembre y core updates.

### Qué aportó Next.js, medido

El sitio React era **una sola página con anclas** (`/#services`, `/#faq`, `/#gallery`, `/#testimonials` — todavía aparecen en GSC como sitelinks, 91 impresiones c/u). Next introdujo rutas reales:

| URL (solo existe en Next) | Impresiones | Clics | CTR |
| :--- | :--- | :--- | :--- |
| `/about` | 1123 | 2 | 0.18% |
| `/reservation` | 660 | 1 | 0.15% |
| `/services` | 659 | 0 | 0% |
| `/services/nails` | 35 | 0 | 0% |
| `/services/full-hr` | 17 | 0 | 0% |
| **Total** | **2494** | **3** | — |

~2.500 impresiones nuevas (≈**22% de las impresiones del período Next**) que generaron **3 clics**. Next amplió la superficie indexable; no la convirtió. **Tampoco hizo daño**: no hay escalón hacia abajo en marzo-abril pese a haber migrado en pleno core update.

El home concentra **1026 de 1029 clics (99.7%)** con CTR 4.34%.

### Copywriting — objetivo declarado, mayor palanca identificada

Ordnay quiere **mejorar el copywriting del sitio en general** (pedido 2026-07-27, a encarar más adelante). El dato que lo respalda: `/about` (1123 impresiones, CTR **0.18%**) y `/reservation` (660, **0.15%**) contra el 4.34% del home. Son páginas que **ya ganaron visibilidad en resultados y nadie clickea** — problema de `title`/`description`, no de ranking. Es el trabajo con retorno más claro pendiente, por encima de cualquier optimización técnica restante.

### Verificado y descartado como causa de caídas

Canonicals autorreferenciales y correctos en las 6 páginas probadas; sin `noindex` (ni meta ni header `X-Robots-Tag`); `robots.txt` con `Allow: /` y sitemap declarado; sitemap con las 11 URLs en 200; JSON-LD `BeautySalon` válido y completo (dirección, geo, horarios, teléfono correcto, `sameAs`).

Las consultas son **locales** (`nail salon salem va`, `nail salon near me`, `pedicure near me`): ahí manda el **perfil de Google Business**, no el sitio. Reseñas, fotos y competencia mueven más que cualquier cambio en el repo.

`/services` tenía 659 impresiones en posición 5.30 con 0 clics y desde el 2026-07-26 es un 308 permanente → Google la va a consolidar en `/services/nails`. **Es esperado que desaparezca del informe**; no es una regresión.

### Bug pendiente

`src/components/hero/award.tsx:6` — el JSON-LD del premio usa `"@type": "Award"`, que **no existe en schema.org** (`schema.org/Award` → 404; `award` existe pero como *propiedad*, no como tipo), y su `url` apunta a `/awards/reviews.jpg`, que **responde 404** (la imagen real es `/imgs/award.png`). Google ignora los tipos que no reconoce, así que no afecta ranking, pero es markup muerto hacia un recurso inexistente.
