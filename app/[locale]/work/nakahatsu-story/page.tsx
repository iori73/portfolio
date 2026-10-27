import fs from 'node:fs';
import path from 'node:path';
import NakahatsuStory from './NakahatsuStory';
import { isNakahatsuLaunched } from '@/src/lib/nakahatsuLaunch';

/** 詳しい版（../nakahatsu）と同じく、公開判定を6時間ごとに更新する。 */
export const revalidate = 21600;

/** 動画は、ファイルを置いたときだけ表示する。 */
const MOTION_VIDEO = '/work/nakahatsu/ochimasse.mp4';

export default async function NakahatsuStoryPage() {
  const launched = await isNakahatsuLaunched();
  const hasVideo = fs.existsSync(path.join(process.cwd(), 'public', MOTION_VIDEO));
  return <NakahatsuStory launched={launched} motionVideo={hasVideo ? MOTION_VIDEO : null} />;
}
