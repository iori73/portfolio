import NakahatsuCaseStudy from './NakahatsuCaseStudy';
import { isNakahatsuLaunched, LAUNCH_REVALIDATE_SECONDS } from '@/src/lib/nakahatsuLaunch';

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
export const revalidate = LAUNCH_REVALIDATE_SECONDS;

export default async function NakahatsuPage() {
  const launched = await isNakahatsuLaunched();
  return <NakahatsuCaseStudy launched={launched} />;
}
