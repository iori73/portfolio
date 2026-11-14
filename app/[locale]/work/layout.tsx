import WorkBackground from '@/src/components/work/WorkBackground';

/** work/ 配下の全ページ共通。背景を白（--background）にする（2026-11-03 河野の指示。Figma の土台が白のため）。 */
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WorkBackground />
      {children}
    </>
  );
}
