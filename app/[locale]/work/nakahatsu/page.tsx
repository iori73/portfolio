import NakahatsuSy from './NakahatsuSy';
import { isNakahatsuLaunched } from '@/src/lib/nakahatsuLaunch';

/** 公開判定（nakahatsuLaunch.ts）を6時間ごとに更新する。旧・詳しい版（../nakahatsu-detail、非公開）も同じ作り。 */
export const revalidate = 21600;

export default async function NakahatsuSyPage() {
  const launched = await isNakahatsuLaunched();
  return <NakahatsuSy launched={launched} />;
}
