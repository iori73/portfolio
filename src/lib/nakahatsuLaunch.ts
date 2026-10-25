/**
 * サーバー専用。クライアントコンポーネントから import しないこと。
 * （`server-only` パッケージはこのリポジトリに入っていないため、
 *   機械的な保証ではなく規約で守る。呼び出し元は
 *   `app/[locale]/work/nakahatsu/page.tsx` の1か所だけ。）
 *
 * 中初商店のサイトが一般公開されたかを判定する。
 *
 * ケーススタディには、公開されていないことを前提にした記述が3か所ある
 * （海外販売は範囲外という断り / 先方確認がこれから、の一文 / 現在のステータス節）。
 * 公開された瞬間にそれらは事実でなくなるので、人が気づいて直すのではなく
 * ページ側が自分で切り替わるようにしてある。判定はここ1か所だけ。
 *
 * 判定方法: nakahatsu.jp のトップを取得して、テーマ固有のクラス接頭辞
 * `nkv2-` が入っているかを見る。
 *
 *   - 移行前の nakahatsu.jp は WordPress。この文字列は出ない
 *   - Shopify のパスワードページ（公開前）は Shopify 側のテンプレートで
 *     描画されるため、これも出ない。「Shopify かどうか」で判定すると
 *     パスワードページを公開と誤認するので、テーマ側の印を見ている
 *   - 移行後の本番ストアは Liquid が返す HTML に必ず含まれる
 *
 * 判定できないときは必ず「未公開」に倒す。誤って公開扱いにすると、
 * 正直に書いてある進行中の記述が消えて、事実と違うページになる。
 * 逆向きの誤りは「公開済みなのに慎重な書き方のまま」で済む。
 */

const SITE_URL = 'https://nakahatsu.jp/';
const THEME_MARKER = 'nkv2-';
const FETCH_TIMEOUT_MS = 5000;

/** 6時間。デプロイし直さなくてもこの間隔で判定が更新される。 */
export const LAUNCH_REVALIDATE_SECONDS = 21600;

export async function isNakahatsuLaunched(): Promise<boolean> {
  // 手動の上書き。検証や、判定が誤ったときの緊急避難用。
  const override = process.env.NAKAHATSU_LAUNCHED;
  if (override === '1' || override === 'true') return true;
  if (override === '0' || override === 'false') return false;

  try {
    const res = await fetch(SITE_URL, {
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: LAUNCH_REVALIDATE_SECONDS },
    });
    if (!res.ok) return false;
    return (await res.text()).includes(THEME_MARKER);
  } catch {
    return false;
  }
}
