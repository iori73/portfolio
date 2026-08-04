// プレビュー専用の案切替バー。本番には存在しない足場。
import Link from 'next/link';

export default function Switcher({ current }: { current: 'index' | 'a' | 'b' }) {
  return (
    <nav className="pv-switch" aria-label="Preview variants">
      <Link href="/preview" data-active={current === 'index'}>
        目次
      </Link>
      <Link href="/preview/a" data-active={current === 'a'}>
        案A Harbor
      </Link>
      <Link href="/preview/b" data-active={current === 'b'}>
        案B Paper &amp; Light
      </Link>
    </nav>
  );
}
