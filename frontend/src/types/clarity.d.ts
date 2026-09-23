// Declaración global de Microsoft Clarity.
// El script se carga desde index.html y expone window.clarity(...).
// Es opcional porque puede no estar disponible (ej. dev sin conexión).
interface Window {
  clarity?: (...args: unknown[]) => void;
}
