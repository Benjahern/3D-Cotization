import { useState, type FormEvent } from 'react';
import Card from '../../components/ui/Card';
import NumberField from '../../components/ui/NumberField';
import Button from '../../components/ui/Button';
import { AlertIcon, ChevronDownIcon } from '../../components/icons';
import {
  CURRENCIES,
  PROFIT_MULTIPLIERS,
  DEFAULT_PRICING_INPUT,
  MULTIPLIER_REFERENCES,
  type PricingInput,
} from '../../types/pricing';
import './Calculadora.css';

interface CalculadoraProps {
  input: PricingInput;
  onChange: (input: PricingInput) => void;
  onCalculate: () => void;
}

type FieldErrors = Partial<Record<keyof PricingInput, string>>;

function validate(input: PricingInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.filamentCostPerKg || input.filamentCostPerKg <= 0) {
    errors.filamentCostPerKg = 'Ingresá un valor mayor a 0.';
  }
  if (!input.filamentGrams || input.filamentGrams <= 0) {
    errors.filamentGrams = 'Indicá los gramos que usa la pieza.';
  }
  if (!input.printHours && !input.extraMinutes) {
    errors.printHours = 'Indicá al menos algunos minutos de impresión.';
  }
  if (!input.profitMultiplier || input.profitMultiplier < 1) {
    errors.profitMultiplier = 'El multiplicador debe ser 1 o más.';
  }
  return errors;
}

export default function Calculadora({ input, onChange, onCalculate }: CalculadoraProps) {
  const [showReferences, setShowReferences] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const errors = validate(input);
  const hasErrors = Object.keys(errors).length > 0;
  const visibleErrors = showErrors ? errors : {};

  const update = <K extends keyof PricingInput>(key: K, value: PricingInput[K]) => {
    onChange({ ...input, [key]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (hasErrors) {
      setShowErrors(true);
      return;
    }
    onCalculate();
    window.clarity?.('event', 'calculo_realizado');
  };

  const handleReset = () => {
    onChange(DEFAULT_PRICING_INPUT);
    setShowErrors(false);
  };

  const selectedReference = MULTIPLIER_REFERENCES.find(
    (r) => r.value === input.profitMultiplier,
  );

  return (
    <div className="calc">
      <p className="calc__lead">
        Completá los datos de la pieza para ver su precio sugerido.
      </p>

      <form className="calc__form" onSubmit={handleSubmit} noValidate>
        <Card
          title="Costos fijos"
          description="Filamento y energía de cada pieza."
        >
          <div className="card__grid">
            <label className="field card__grid--full">
              <span className="field__label">Moneda</span>
              <span className="field__control">
                <select
                  value={input.currency}
                  onChange={(e) => update('currency', e.target.value)}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <NumberField
              label="Precio del filamento"
              unit="por kg"
              value={input.filamentCostPerKg}
              onChange={(v) => update('filamentCostPerKg', v)}
              error={visibleErrors.filamentCostPerKg}
            />

            <NumberField
              label="Precio del kWh"
              unit="kWh"
              value={input.kwhPrice}
              onChange={(v) => update('kwhPrice', v)}
              hint="Revisá tu boleta de luz."
            />

            <NumberField
              label="Consumo de la impresora"
              unit="W"
              value={input.printerWatts}
              onChange={(v) => update('printerWatts', v)}
            />

            <NumberField
              label="Margen de error"
              unit="%"
              value={input.errorMarginPercent}
              onChange={(v) => update('errorMarginPercent', v)}
              hint="Cubre fallos e impresiones perdidas."
            />
          </div>
        </Card>

        <Card
          title="Pieza"
          description="Tiempo y material de esta impresión."
        >
          <div className="card__grid">
            <NumberField
              label="Horas de impresión"
              unit="h"
              step={0.1}
              value={input.printHours}
              onChange={(v) => update('printHours', v)}
              error={visibleErrors.printHours}
            />

            <NumberField
              label="Minutos adicionales"
              unit="min"
              value={input.extraMinutes}
              onChange={(v) => update('extraMinutes', v)}
            />

            <NumberField
              label="Gramos de filamento"
              unit="g"
              value={input.filamentGrams}
              onChange={(v) => update('filamentGrams', v)}
              error={visibleErrors.filamentGrams}
            />

            <NumberField
              label="Consumos extra"
              unit={input.currency}
              value={input.extraCosts}
              onChange={(v) => update('extraCosts', v)}
              hint="Pintura, pegamento, empaque…"
            />
          </div>
        </Card>

        <Card title="Margen de ganancia" description="Cuánto multiplicás el costo.">
          <div className="calc__multipliers" role="group" aria-label="Multiplicador de ganancia">
            {PROFIT_MULTIPLIERS.map((m) => {
              const isActive = input.profitMultiplier === m;
              return (
                <button
                  key={m}
                  type="button"
                  className={`multiplier${isActive ? ' is-active' : ''}`}
                  onClick={() => {
                    update('profitMultiplier', m);
                    window.clarity?.('event', 'cambio_multiplicador');
                  }}
                  aria-pressed={isActive}
                >
                  ×{m}
                </button>
              );
            })}
          </div>

          <p className="calc__selection">
            {selectedReference ? (
              <>
                Seleccionado <strong>×{input.profitMultiplier}</strong> · {selectedReference.label}
              </>
            ) : (
              <>
                Multiplicador personalizado <strong>×{input.profitMultiplier || 0}</strong>
              </>
            )}
          </p>

          <NumberField
            label="Multiplicador personalizado"
            unit="×"
            step={0.1}
            value={input.profitMultiplier}
            onChange={(v) => {
              update('profitMultiplier', v);
              window.clarity?.('event', 'cambio_multiplicador');
            }}
            error={visibleErrors.profitMultiplier}
          />

          <div className="calc__refs">
            <button
              type="button"
              className={`calc__refs-toggle${showReferences ? ' is-open' : ''}`}
              onClick={() => setShowReferences((v) => !v)}
              aria-expanded={showReferences}
              aria-controls="referencias-multiplicador"
            >
              <ChevronDownIcon width={16} height={16} />
              ¿Qué multiplicador uso?
            </button>

            {showReferences && (
              <ul className="calc__refs-list" id="referencias-multiplicador">
                {MULTIPLIER_REFERENCES.map((r) => (
                  <li key={r.value}>
                    <span className="calc__refs-value">×{r.value}</span>
                    <span>{r.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        {showErrors && hasErrors && (
          <p className="calc__alert" role="alert">
            <AlertIcon width={16} height={16} />
            Revisá los campos marcados para poder calcular.
          </p>
        )}

        <div className="calc__actions">
          <Button type="submit" variant="primary" block>
            Calcular precio
          </Button>
          <Button type="button" variant="ghost" onClick={handleReset}>
            Restablecer
          </Button>
        </div>
      </form>
    </div>
  );
}
