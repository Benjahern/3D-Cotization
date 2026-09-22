import type { PricingInput, PricingResult } from '../types/pricing';

/**
 * Precio material   = costo filamento/kg x (gramos / 1000)
 * Precio luz        = precio kWh x (watts impresora / 1000) x horas totales
 * Margen de error   = (material + luz) x % margen de error
 * Subtotal          = material + luz + margen de error
 * Precio marcado    = subtotal x multiplicador de ganancia
 * Total a cobrar    = precio marcado + consumos extra
 */
export function calculatePrice(input: PricingInput): PricingResult {
  const totalHours = input.printHours + input.extraMinutes / 60;

  const materialCost = input.filamentCostPerKg * (input.filamentGrams / 1000);
  const electricityCost = input.kwhPrice * (input.printerWatts / 1000) * totalHours;

  const baseBeforeError = materialCost + electricityCost;
  const errorBuffer = baseBeforeError * (input.errorMarginPercent / 100);
  const subtotal = baseBeforeError + errorBuffer;

  const markedUpPrice = subtotal * input.profitMultiplier;
  const finalPrice = markedUpPrice + input.extraCosts;

  return {
    materialCost,
    electricityCost,
    errorBuffer,
    subtotal,
    markedUpPrice,
    finalPrice,
    input,
  };
}

export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}