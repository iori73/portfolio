// app/print/layout.tsx — isolated shell for the PDF document tree.
//
// Sits as a sibling of app/[locale]/, so it inherits only the minimal root
// layout and none of the site chrome (Header / Footer / TransitionOverlay /
// max-w-6xl main wrapper) that app/[locale]/layout.tsx applies.
import './print.css';
import './print-fonts.css';

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
