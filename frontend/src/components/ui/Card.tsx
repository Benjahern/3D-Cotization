import type { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, description, children, className }: CardProps) {
  return (
    <section className={`card${className ? ` ${className}` : ''}`}>
      <header className="card__head">
        <h2 className="card__title">{title}</h2>
        {description && <p className="card__desc">{description}</p>}
      </header>
      <div className="card__body">{children}</div>
    </section>
  );
}
