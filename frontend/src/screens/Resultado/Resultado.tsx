import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import type { PricingResult } from '../../types/pricing';
import { formatCurrency } from '../../lib/pricing';
import './Resultado.css';

interface ResultadoProps {
  result: PricingResult | null;
  onBack: () => void;
}

export default function Resultado({ result, onBack }: ResultadoProps) {
  if (!result) {
    return (
      <div className="res res--empty">
        <h2 className="res__empty-title display">Todavía no hay cotizaciones</h2>
        <p className="res__empty-text">
          Completá la calculadora para ver acá el desglose y el precio final.
        </p>
        <Button variant="primary" onClick={onBack}>
          Ir a la calculadora
        </Button>
      </div>
    );
  }

  const { currency, profitMultiplier, printHours, extraMinutes, filamentGrams } =
    result.input;
  const gain = result.markedUpPrice - result.subtotal;
  const timeLabel = `${printHours} h${extraMinutes > 0 ? ` ${extraMinutes} min` : ''}`;

  const rows = [
    { label: 'Material', value: result.materialCost },
    { label: 'Energía (luz)', value: result.electricityCost },
    { label: 'Margen de error', value: result.errorBuffer },
  ];

  return (
    <div className="res">
      <section className="res__total" aria-live="polite">
        <p className="res__total-label">Total a cobrar</p>
        <p className="res__total-value display">
          {formatCurrency(result.finalPrice, currency)}
        </p>
        <p className="res__total-note">
          {timeLabel} · {filamentGrams} g · margen ×{profitMultiplier}
        </p>
      </section>

      <Card title="Desglose">
        <div className="res__rows">
          {rows.map((row) => (
            <div className="res__row" key={row.label}>
              <span className="res__row-label">{row.label}</span>
              <span className="res__row-value">
                {formatCurrency(row.value, currency)}
              </span>
            </div>
          ))}

          <div className="res__row res__row--subtotal">
            <span className="res__row-label">Subtotal</span>
            <span className="res__row-value">
              {formatCurrency(result.subtotal, currency)}
            </span>
          </div>

          <div className="res__row res__row--gain">
            <span className="res__row-label">Ganancia (×{profitMultiplier})</span>
            <span className="res__row-value">{formatCurrency(gain, currency)}</span>
          </div>

          <div className="res__row">
            <span className="res__row-label">Consumos extra</span>
            <span className="res__row-value">
              {formatCurrency(result.input.extraCosts, currency)}
            </span>
          </div>
        </div>
      </Card>

      <Button variant="secondary" block onClick={onBack}>
        Calcular otra pieza
      </Button>
    </div>
  );
}
