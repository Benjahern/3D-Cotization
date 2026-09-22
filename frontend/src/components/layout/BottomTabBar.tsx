import type { ReactNode } from 'react';
import './BottomTabBar.css';

export type TabKey = 'calculadora' | 'resultado';

interface Tab {
  key: TabKey;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface BottomTabBarProps {
  tabs: Tab[];
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}

export default function BottomTabBar({ tabs, activeTab, onChange }: BottomTabBarProps) {
  return (
    <nav className="bottom-tab-bar" aria-label="Secciones de la aplicación">
      <div className="bottom-tab-bar__inner">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              className={`bottom-tab-bar__item ${isActive ? 'is-active' : ''}`}
              onClick={() => onChange(tab.key)}
              disabled={tab.disabled}
              type="button"
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.icon && <span className="bottom-tab-bar__icon">{tab.icon}</span>}
              <span className="bottom-tab-bar__label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
