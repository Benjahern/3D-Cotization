import { useState } from 'react';
import BottomTabBar, { type TabKey } from './components/layout/BottomTabBar';
import Calculadora from './screens/Calculadora/Calculadora';
import Resultado from './screens/Resultado/Resultado';
import { CalculatorIcon, ReceiptIcon } from './components/icons';
import { calculatePrice } from './lib/pricing';
import {
  DEFAULT_PRICING_INPUT,
  type PricingInput,
  type PricingResult,
} from './types/pricing';
import './App.css';

const SCREEN_SUBTITLE: Record<TabKey, string> = {
  calculadora: 'Nueva cotización',
  resultado: 'Resumen de la pieza',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('calculadora');
  const [input, setInput] = useState<PricingInput>(DEFAULT_PRICING_INPUT);
  const [result, setResult] = useState<PricingResult | null>(null);

  const handleCalculate = () => {
    setResult(calculatePrice(input));
    setActiveTab('resultado');
  };

  return (
    <div className="app">
      <header className="app__topbar">
        <div className="app__brand-text">
          <p className="app__brand-name display">Cotizador 3D</p>
          <p className="app__brand-sub">{SCREEN_SUBTITLE[activeTab]}</p>
        </div>
      </header>

      <main className="app__content">
        {activeTab === 'calculadora' ? (
          <Calculadora input={input} onChange={setInput} onCalculate={handleCalculate} />
        ) : (
          <Resultado result={result} onBack={() => setActiveTab('calculadora')} />
        )}
      </main>

      <BottomTabBar
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { key: 'calculadora', label: 'Calculadora', icon: <CalculatorIcon /> },
          { key: 'resultado', label: 'Resultado', icon: <ReceiptIcon /> },
        ]}
      />
    </div>
  );
}
