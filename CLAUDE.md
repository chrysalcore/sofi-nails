# sofi-nails — notas específicas de este repo

Preferencias generales en `~/.claude/CLAUDE.md` (que cubre solo lo transversal a todos los proyectos). Esto es lo propio de este repo.

- 100% TypeScript en `src/` (no hay `.js`/`.jsx` de código, solo configs `.mjs`). El README ya lo refleja correctamente (corregido 2026-07-20, antes decía "TypeScript, JavaScript").
- El formulario de reserva (`src/app/reservation/_components/form/`) usa **Server Action + Resend** para el envío de email, documentado en el README desde 2026-07-20 (sección "Reservation Form & Email Notifications"). Errores se manejan vía `useActionState`, no try/catch.
- Zod (`^4.4.3`) es dependencia directa desde el 2026-07-20 — la validación del formulario de reserva vive en `src/app/reservation/_lib/data/schema.ts` (`reservationSchema`), usada vía `safeParse` en `actions.tsx`. Ya no hay validación manual inline; el typo de gramática histórico en el mensaje de error de `name`/`subject` ("most to be") también se corrigió ese día.
- Prettier configurado con `prettier-plugin-tailwindcss` — correr `prettier` antes de commitear cambios de estilos si se toca CSS/Tailwind. Decisión tomada 2026-07-20: se generaliza al resto de repos del portafolio con Tailwind (empezando por `chrysal-core`), no queda como caso puntual de este repo. Importante: el plugin necesita estar listado en `.prettierrc.json` (`"plugins": ["prettier-plugin-tailwindcss"]`) para tener efecto — Prettier 3 no lo carga solo por estar instalado como dependencia; esto pasó desapercibido acá hasta esa fecha (plugin instalado pero inerte).
- Badges/tabla de stack en el README deben reflejar las versiones reales instaladas (`package.json`/`node_modules`), no quedarse fijas — se corrigieron Next.js (14.2.5 → 16.2.9) y TypeScript (5.5 → 5.9) el 2026-07-20 tras haber quedado desactualizadas.
- Interfaces (`interface`) se usan para los tipos de datos (`Service`, `FAQ`, `Category`, `SocialLink`, `NavLink`) importados desde `_lib/data/`; las props de componentes siguen el default global (tipo inline).

## Rendimiento — estado actual y próximos pasos

**Estado confirmado (2026-07-21, contra producción, 5 corridas Lighthouse mobile-throttled promediadas, Home):**

| Página | Performance | TBT |
| :--- | :--- | :--- |
| Home | 79 (rango 72–83) | 392ms (rango 256–586ms) |

`/services/nails` y `/reservation` comparten el fix de analytics (está en `layout.tsx` raíz) pero no se remidieron individualmente con esta metodología de 5 corridas — pendiente.

**Fixes ya aplicados:**
- Elfsight del calendario en `/reservation` archivado (`_components/calendar.tsx` sin uso, no borrado).
- Testimonios (home) con mount diferido vía `IntersectionObserver` propio en vez del lazy attribute de Elfsight (que no sacaba su TBT de la ventana de carga).
- `aria-label`/`aria-expanded` en toggle de menú móvil y botón flotante de llamada.
- Fuentes convertidas de TTF/OTF a WOFF2 (`ttf2woff2`, -38% a -63% de peso).
- GA4 diferido hasta primera interacción o timeout de 4s (`src/components/global/deferred-analytics.tsx`) — sacó a Google Analytics de `third-party-summary` en producción, pero destapó el siguiente cuello de botella (ver pendientes).

**Pendiente / próximos pasos:**
- Fix de contraste (footer/nav/FAQ): usar `--color-dark` (#6e5b3d) como fondo en vez del tint `#d5b79b` (ratio ~1.89, falla AA) — axe-core seguía reportando `color-contrast` (serious) como única violación de accesibilidad en las 3 páginas la última vez que se auditó.
- Investigar el chunk de hidratación `1eglloh0s_w8l.js` — es ahora el mayor contribuyente a TBT (hasta 719ms de scripting y una long task de 415ms en la corrida más floja) una vez que GA dejó de dominar. Sin diagnosticar todavía qué componente/librería es.
- Remedir `/services/nails` y `/reservation` con la misma metodología de 5 corridas contra producción.
