import { useId } from 'react';
import { AlertIcon } from '../icons';
import './NumberField.css';

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  hint?: string;
  error?: string;
  min?: number;
  step?: number;
}

export default function NumberField({
  label,
  value,
  onChange,
  unit,
  hint,
  error,
  min = 0,
  step,
}: NumberFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">{label}</span>

      <span className={`field__control${unit ? ' has-unit' : ''}${error ? ' has-error' : ''}`}>
        <input
          id={id}
          type="number"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : ''}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
        {unit && <span className="field__unit">{unit}</span>}
      </span>

      {error ? (
        <span className="field__error" id={`${id}-error`} role="alert">
          <AlertIcon width={13} height={13} />
          {error}
        </span>
      ) : hint ? (
        <span className="field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
    </label>
  );
}
