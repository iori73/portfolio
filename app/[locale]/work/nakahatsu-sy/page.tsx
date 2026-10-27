import NakahatsuSy from './NakahatsuSy';
import { isNakahatsuLaunched } from '@/src/lib/nakahatsuLaunch';

/** 詳しい版（../nakahatsu）と同じく、公開判定を6時間ごとに更新する。 */
export const revalidate = 21600;

export default async function NakahatsuSyPage() {
  const launched = await isNakahatsuLaunched();
  return <NakahatsuSy launched={launched} />;
}
