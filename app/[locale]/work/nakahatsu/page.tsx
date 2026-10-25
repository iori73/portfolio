import NakahatsuCaseStudy from './NakahatsuCaseStudy';
import { isNakahatsuLaunched } from '@/src/lib/nakahatsuLaunch';

/**
 * このページだけサーバーコンポーネントを1枚かぶせている。
 *
 * 本文には「クライアントサイトがまだ公開されていない」ことを前提にした記述が
 * 3か所あり、公開された瞬間に事実でなくなる。人が気づいて直す運用にすると
 * 必ず直し忘れるので、公開されたかどうかをここで判定して本文に渡し、
 * ページが自分で切り替わるようにしてある。判定の中身は
 * `src/lib/nakahatsuLaunch.ts` を参照。
 *
 * revalidate があるので、デプロイし直さなくても6時間ごとに判定が更新される。
 */
// Next.js は revalidate をリテラルでしか読めない。値は nakahatsuLaunch.ts の
// LAUNCH_REVALIDATE_SECONDS（21600 = 6時間）と揃えること。
export const revalidate = 21600;

export default async function NakahatsuPage() {
  const launched = await isNakahatsuLaunched();
  return <NakahatsuCaseStudy launched={launched} />;
}
