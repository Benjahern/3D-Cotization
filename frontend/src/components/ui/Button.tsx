import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  block?: boolean;
  icon?: ReactNode;
}

export default function Button({
  variant = 'primary',
  block = false,
  icon,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}${block ? ' btn--block' : ''}${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
