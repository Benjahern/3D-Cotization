export interface Currency {
  code: string;
  label: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'CLP', label: 'Peso chileno (CLP)' },
  { code: 'USD', label: 'Dólar (USD)' },
  { code: 'MXN', label: 'Peso mexicano (MXN)' },
  { code: 'ARS', label: 'Peso argentino (ARS)' },
  { code: 'COP', label: 'Peso colombiano (COP)' },
  { code: 'PEN', label: 'Sol peruano (PEN)' },
];

export const PROFIT_MULTIPLIERS = [2, 2.5, 3, 3.5, 4, 5] as const;

export interface PricingInput {
  currency: string;             // código de moneda seleccionado (CLP, USD, ...)

  // Costos fijos
  filamentCostPerKg: number;    // costo del filamento por kg
  kwhPrice: number;             // precio del kWh
  printerWatts: number;         // consumo de la impresora en watts
  errorMarginPercent: number;   // % extra para cubrir fallos

  // Pieza
  printHours: number;           // horas de impresión
  extraMinutes: number;         // minutos adicionales
  filamentGrams: number;        // gramos de filamento usados
  extraCosts: number;           // consumos extra (CLP$ u otra moneda), se suman al total final

  // Margen de ganancia
  profitMultiplier: number;     // multiplicador: uno de PROFIT_MULTIPLIERS o un valor personalizado
}

export interface PricingResult {
  materialCost: number;
  electricityCost: number;
  errorBuffer: number;
  subtotal: number;       // material + luz + margen de error
  markedUpPrice: number;  // subtotal x multiplicador de ganancia
  finalPrice: number;     // markedUpPrice + consumos extra
  input: PricingInput;
}

/** Valores iniciales de la cotización (también usados por "Restablecer"). */
export const DEFAULT_PRICING_INPUT: PricingInput = {
  currency: 'CLP',
  filamentCostPerKg: 15000,
  kwhPrice: 250,
  printerWatts: 45,
  errorMarginPercent: 10,
  printHours: 2,
  extraMinutes: 0,
  filamentGrams: 30,
  extraCosts: 0,
  profitMultiplier: 4,
};

/** Etiquetas de referencia para orientar el multiplicador de ganancia. */
export const MULTIPLIER_REFERENCES: { value: number; label: string }[] = [
  { value: 2, label: 'Alto volumen / descuento' },
  { value: 2.5, label: 'Volumen medio' },
  { value: 3, label: 'Mayorista' },
  { value: 3.5, label: 'Intermedio' },
  { value: 4, label: 'Minorista' },
  { value: 5, label: 'Llaveros / piezas chicas' },
];