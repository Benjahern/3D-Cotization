# AGENTS.md — Frontend «Cotizador 3D»

App móvil para **cotizar precios de impresión 3D**. Interfaz en español (es-CL),
cálculo 100% local (sin backend). Empaquetada para Android con Capacitor.

## Stack

- **React 19** + **TypeScript** (estricto) + **Vite 8** (`@vitejs/plugin-react`).
- **Capacitor 8** para Android (`android/`, `capacitor.config.ts`).
- **CSS puro con design tokens.** No se usa Tailwind, CSS-in-JS ni módulos CSS.
- Gestor de paquetes: **pnpm** (`pnpm-lock.yaml`).

## Comandos

```bash
pnpm dev        # servidor de desarrollo
pnpm build      # tsc -b && vite build
pnpm lint       # ESLint
pnpm preview    # previsualizar el build
```

- Verificación obligatoria tras cambios: **`pnpm lint && pnpm build`**.
- `npx` no está disponible en este entorno: usá `pnpm` o `./node_modules/.bin/<bin>`.
- Tras `pnpm build`, si se toca el shell nativo: `pnpm cap sync android`.

## Estructura

```text
src/
  main.tsx                 # entry: importa theme.css → index.css → App
  App.tsx / App.css        # shell: estado, topbar y tab bar
  index.css                # reset/base global (consume tokens)
  styles/theme.css         # ÚNICA fuente de tokens de diseño (claro/oscuro)
  components/
    icons.tsx              # íconos SVG (stroke currentColor)
    layout/BottomTabBar.*  # navegación inferior flotante
    ui/Card.*              # bloque/contenedor con encabezado
    ui/NumberField.*       # campo numérico con unidad, hint y error
    ui/Button.*            # botón primary / secondary / ghost
  screens/
    Calculadora/           # formulario: 3 cards + multiplicador
    Resultado/             # total, resumen y desglose
  lib/pricing.ts           # calculatePrice + formatCurrency
  types/pricing.ts         # tipos, CURRENCIES, PROFIT_MULTIPLIERS, DEFAULT_PRICING_INPUT
```

## Arquitectura y estado

- **`App.tsx` es dueño del estado** (`input` y `result` de la cotización, `activeTab`).
  Las pantallas son presentacionales: `Calculadora` recibe `input`, `onChange` y
  `onCalculate`. **No bajes el estado a las pantallas**: se perdería al cambiar de pestaña.
- El cálculo vive en `lib/pricing.ts` (`calculatePrice`). **No dupliques la fórmula**
  en componentes.
- Montos formateados con `Intl.NumberFormat('es-CL')` vía `formatCurrency`.

## Lógica de precios (no cambiar a la ligera)

```text
material   = costoKg × (gramos / 1000)
luz        = precioKWh × (watts / 1000) × horasTotales
margen     = (material + luz) × %error
subtotal   = material + luz + margen
marcado    = subtotal × multiplicador
final      = marcado + consumosExtra
```

## Convenciones de código

- TypeScript estricto (`verbatimModuleSyntax`, `noUnusedLocals/Parameters`,
  `erasableSyntaxOnly`). Importá tipos con `import type`.
- Un componente por archivo, en su carpeta, con su `.css` al lado.
- CSS: clases `bloque__elemento` + modificador `is-active`/`has-*`. **Usá siempre los
  tokens de `styles/theme.css`**; no hardcodees colores, radios, sombras ni espaciados.
- **Texto de UI en español** con voseo («Completá», «Ingresá», «Revisá»).
- **Accesibilidad obligatoria**: `label` asociado al control, `aria-*` cuando aplique
  (`aria-current`, `aria-pressed`, `aria-live`, `aria-describedby`), foco con
  `:focus-visible` y contraste AA.
- `index.css`/`App.css` son globales; los estilos de pantallas y componentes van en
  su propio `.css`.

## Diseño

- Fuente de verdad visual: `src/styles/theme.css` (tema claro + `prefers-color-scheme: dark`).
- Para trabajo de dirección de arte usá el agente `.opencode/agents/designer.md`.

## No tocar / tener cuidado

- `repomix-output.xml` es un snapshot empaquetado de **solo lectura**: editá los
  archivos fuente, nunca el XML.
- No edites `dist/` a mano.
- `android/` es generado/administrado por Capacitor.
