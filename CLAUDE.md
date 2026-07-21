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

### Fixes aplicados (2026-07-20, sesión posterior al baseline — pendiente re-medir)

- Widget de Elfsight del calendario en `/reservation` (`_components/calendar.tsx`) archivado: sacado el `import`/uso de `page.tsx`, el archivo se dejó sin borrar por si se retoma.
- Widget de testimonios (`_components/testimonials/testimonials-list.tsx`) se mantiene con Elfsight (decisión consciente: las reseñas se actualizan en tiempo real, el reemplazo estático que estaba comentado en el archivo no cubre ese requisito — se eliminó ese código muerto). Se reescribió como client component con `IntersectionObserver` propio (ref + `useEffect`) para que el script `platform.js` y el div del widget solo se monten cuando la sección entra en viewport por scroll real del usuario — el `<Script>` global se sacó de `layout.tsx` (ya no se necesita en ninguna otra página tras archivar el calendario).
- `aria-label` agregado al toggle de menú móvil (`components/nav/aside-nav.tsx`, con `aria-expanded` también) y al botón flotante de llamada (`components/global/body-cta.tsx`).
- Pendiente: fix de contraste (footer/nav/FAQ) y re-medir Lighthouse para documentar antes/después.
