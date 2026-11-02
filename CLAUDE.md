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

## Estilos y movimiento (pasada del 2026-10-22 al 27)

**Ramas:** los arreglos de bugs de la pasada están en `development` (6 commits del 2026-10-26 más la validación de horario del 2026-10-28). Lo visual vive en la rama **`styles`**, creada desde `development` y **pendiente de aprobación** por Ordnay: no mergear a `development` hasta que lo apruebe. Los bugs nuevos se arreglan en `development` y se mergean en `styles` (no al revés).

### Paleta (`@theme` en `globals.css`)

El logo (`public/icons/sofi-logo.svg`) usa solo dos colores: `#c39870` (beige) y `#ff4030` (labios). Todo lo demás sale de ahí:

| Token | Valor | Uso |
|---|---|---|
| `main` | `#ff4030` | **Solo acciones**: Book, Book Now, See More, Submit, llamada |
| `secondary` | `#c39870` | Beige del logo: títulos de tarjeta, títulos de sección claros, eyebrows, logo |
| `dark` | `#90643c` | Texto. Sombra del beige del logo (mismo tono 29°, luz 40%) |
| `deep` | `#976a3f` | Fondo de banner, FAQ y footer, con texto blanco. Sombra del beige del logo (luz 42%) |
| `danger` / `success` | `#b3261e` / `#4d7c5a` | Mensajes del formulario, separados de `main` |

- El `dark` viejo (`#6e5b3d`) venía del repo React original y no estaba en el logo (tiraba a oliva): reemplazado el 2026-10-26.
- **Contraste medido:** `dark` sobre blanco 5.14:1, sobre tarjeta (`secondary/15`) 4.53:1; blanco sobre `deep` 4.72:1. Es el piso: Ordnay pidió bajar el contraste "todo lo posible" y estos son los tonos más claros que pasan 4.5:1 en todos los fondos. `secondary` sobre blanco da 2.6:1: aceptado solo en títulos.
- No usar opacidad en texto (`text-dark/80` daba 4.0:1). La jerarquía se arma con tamaño y peso.
- `email.tsx` repite `dark` como hex literal (los clientes de correo no leen variables CSS): actualizarlo si cambia el token.

### Formas y fondos

- **`global/curve-divider.tsx`:** tres capas blancas (opacidad 25/50/100%) con curvas asimétricas, `preserveAspectRatio="none"`. **Viven solo en las bandas oscuras** (banner, secciones `Section` sin `isLight`, footer), arriba y abajo: lo claro monta sobre lo oscuro. Las secciones claras no llevan curva. `edge="top"` rota 180° y por eso espeja la asimetría.
- Paddings calculados para la curva (`h-16` → `md:h-28`): claras `py-24 md:py-32`; oscuras `py-32 md:py-48`; banner `py-28 md:py-40`; footer `pt-32 md:pt-44`.
- Hero: los dos `@utility bg-hero-*` llevan una capa `linear-gradient(transparent 70%, white)` encima, para que la foto se funda en la curva del banner sin línea de corte.
- Header y menú móvil blancos; sombra solo al scrollear con `@utility shadow-on-scroll` (`animation-timeline: scroll(root)`, sin JS; Firefox no la soporta y queda sin sombra).

### Tipografía y componentes

- Work Sans cuerpo (**fuente variable: declarada con `weight: "100 900"`**, ver bugs), Konseric solo en "Sofi", Allura en los títulos de sección.
- Encabezados de sección: `<hgroup>` con eyebrow (rayita a cada lado) + título completo en Allura (sentence case) + descripción.
- Tarjetas (categoría y servicio): título `secondary`, precio y descripción `dark`, botón rojo relleno. "See More" separa la flecha al hover (`hover:gap-5`, `transition-[gap,scale]`).
- FAQ: sin tarjetas, sobre `deep`. Grupo como etiqueta (`text-sm` mayúscula, `white/85`, línea `white/40`); preguntas `font-medium` separadas por `gap-6`, sin líneas.
- Movimiento: `ease-smooth` / `ease-soft` en `@theme` (mismas que `molino_rojo`); entrada del hero con `@utility animate-enter` + `enter-delay-*` solo en botón y tarjeta del premio. **Logo, título y párrafo del hero quedan fijos: candidatos a LCP.** Todo con `motion-safe:`.
- `:focus-visible` global: contorno `dark` 2px, offset 2px.
- **Íconos:** un solo set relleno y redondeado en `global/icon.tsx` (`<Icon name>`): Material Symbols Rounded para la interfaz y glifos rellenos para las marcas, con el tipo `IconName` derivado de los dos mapas. Los datos (`contact.tsx`, `social-links.ts`) guardan el nombre del ícono, no el SVG. Los `.svg` sueltos de `public/icons/` se borraron (queda solo el logo).
- **Aparición al scrollear (D):** `@utility animate-reveal` con `animation-timeline: view()` y `animation-range: entry 0% cover 25%`, dentro de `@supports` y `prefers-reduced-motion: no-preference`. Sin JS, así `Section` sigue siendo Server Component; sin soporte o con movimiento reducido el contenido se ve fijo. Aplicado a encabezados, tarjetas, grupos del FAQ y fotos de la galería. Se descartó el `useReveal` de `molino_rojo`.
- **Cambio de categoría en `/services` (E):** la grilla va dentro de `<ViewTransition key={category}>` de React, que hace un fundido cruzado entre categorías. Menú móvil con `translate` + `invisible` en vez de `max-height`: cerrado queda fuera del orden de tabulación.
- **Reserva enviada (F):** el formulario se reemplaza por `appointment-card.tsx`, una ficha de cita con nombre, servicio, fecha y hora, firmada "— Belkis" con `role="status"`. Dice "Appointment request" y "We'll confirm your appointment by email shortly", no "Confirmed": el salón confirma después. La action devuelve una unión discriminada (`idle` / `error` / `sent` con los datos ya validados por Zod).

### Bugs encontrados y corregidos (en `development`)

- **Work Sans es variable (eje `wght` 100–900) pero se declaraba sin `weight`:** Next generaba el `@font-face` con peso 400, y `font-medium`/`font-semibold` se veían regulares y `font-bold` sintético. Se detecta con `document.fonts` o leyendo la tabla `fvar` del woff2.
- **`lg:bg-hero-horizontal` nunca funcionó:** en Tailwind v4 las variantes solo aplican a clases declaradas con `@utility`. Cualquier clase propia que necesite `lg:`/`hover:` tiene que ser `@utility`.
- **`invalid:not-empty:` en inputs nunca coincidió:** `:empty` mira hijos, no valor. Reemplazado por `user-invalid:`.
- **Botón "Book" de servicios:** 20 de 37 servicios precargaban un asunto de menos de los 10 caracteres que exige Zod; la reserva fallaba después de enviar (`minLength` del navegador solo valida valores editados por la usuaria). Ahora el asunto es `"<categoría> – <servicio>"`.
- Header con `w-dvw` (incluye la scrollbar) → `inset-x-0`; `<p>` dentro de `<h3>` en `service.tsx`; teléfono del header por índice `[2]`; comilla suelta en el `href` del calendario del email; clases inexistentes y `calendar.tsx` sin uso.
- Textos: "Submiting", "Email sended", alts genéricos, premio rotulado "GOOGLE" (es BusinessRate), evento de Google Calendar en español, **"Browns" → "Brows"** con redirect 308, "High Frecuency" → "Frequency".
- **La reserva aceptaba cualquier fecha y hora (2026-10-28, desde el lanzamiento):** el schema solo exigía formato ISO, así que se podía reservar en el pasado, un domingo o a las 3 AM, y el email le llegaba igual al salón. El propio test enviaba una reserva para un domingo ya pasado. Ahora `date` encadena tres `.refine` con `abort: true`: fecha futura, día abierto y hora dentro del horario. Además, de 18:01 a 18:59 da un mensaje propio que explica que el último turno empieza a las 18:00 para terminar antes del cierre. Detalles:
  - **Horario en una sola fuente:** `src/lib/data/hours.ts` (`timeZone`, `days`, `opens`, `lastBooking`, `closes`, más `formatHour` y `hoursText`). De ahí salen el schema y sus mensajes, el JSON-LD de `layout.tsx`, el ítem "Hours" de `contact.tsx` y la description de `/reservation`. Para cambiar el horario se toca solo ese archivo.
  - **Zona horaria:** `datetime-local` envía la hora sin zona y en Vercel el servidor corre en UTC. Por eso el día y la hora se leen del texto, no con `getHours()`, y "ahora" se calcula en `America/New_York` con `toLocaleString("sv-SE", { timeZone })`. Hay un test que lo cubre: a las 16:00 UTC (11:00 en Salem), el mediodía de ese mismo día tiene que aceptarse.
  - **Tests con el reloj congelado:** `vi.useFakeTimers({ toFake: ["Date"] })` reemplaza solo `Date` y deja `setTimeout` real, así `userEvent` sigue funcionando. Sin eso, el test se pondría rojo solo el día que su fecha quedara en el pasado.

### Gotchas del entorno

- **`next dev` (16.3) escribe un bloque `nextjs-agent-rules` en este `CLAUDE.md`.** Desactivado con `agentRules: false` en `next.config.ts`.
- **El watcher de Turbopack pierde cambios de `globals.css`** (con `sed -i`, Prettier y a veces también con escrituras normales): toma las clases nuevas de los componentes pero sigue sirviendo los tokens viejos, sin aviso. Verificar el valor en el CSS servido (`curl` del chunk `.css` y `grep`); si está viejo, reiniciar `next dev`.
- `overline` es una utilidad nativa de Tailwind: no usarla como nombre de clase propia.
- Al matar el dev server, `pkill -f "next dev -p 3123"` mata también al shell que lo ejecuta. Usar `ps ... | grep "[n]ext dev"` y matar por PID.

### Pendiente de esta pasada

- **Aprobación de `styles`** por Ordnay; después, PR/merge a `development` y deploy.
- Los pasos D, E y F y el set de íconos están hechos y commiteados en `styles` (2026-10-26/27, ver "Tipografía y componentes").
- Abierto: `CurveDivider` e `Icon` usan export nombrado y el resto del repo `export default` (convención global: nombrados; alinear al tocar cada archivo). Encuadre de la foto del hero (la tarjeta del premio tapa la cara en escritorio; Ordnay lo dejó así por ahora). ESLint revisa `coverage/` (generado) y da una advertencia: agregarlo a los ignores.
- Después del deploy: medir LCP en Speed Insights (el elemento LCP pasó del párrafo al logo).

## Pendiente (orden de impacto)

- **Medir el efecto del copywriting** de `/about` y `/reservation` (deploy 2026-10-01) con ventanas de 28 días, leyéndolo contra la estacionalidad (ver la ficha de gestión: la demanda local cae ~38% de mayo a octubre).
- **Validación de horario en producción:** hoy el sitio en vivo sigue aceptando reservas fuera de horario. El fix está en `development` (`cd214ef`) y en `styles`, y llega con el próximo deploy.
- **Arreglar `www`:** agregar el subdominio en Vercel como redirect 308 al apex (hoy `https://www.…` da error SSL).
- **Contraste de footer/nav/FAQ** (blanco sobre beige, 1.9:1): resuelto en la rama `styles` con la paleta nueva (header blanco con texto `dark`, banner/FAQ/footer sobre `deep`). Llega a producción cuando se apruebe `styles`.
