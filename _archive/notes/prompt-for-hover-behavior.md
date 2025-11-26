# Apple デザインシステムボタンのホバー挙動確認プロンプト

以下のタスクを実行してください：

## 目的

https://designsystems.surf/design-systems/apple の「Join now」ボタン（オレンジ色のグラデーションボタン）のホバー時の挙動を完全に解析してください。

## 手順

### 1. サイトへのアクセス

- URL: `https://designsystems.surf/design-systems/apple` にアクセス
- ページが完全に読み込まれるまで待機

### 2. ボタンの特定

以下の条件で「Join now」ボタンを見つけてください：

- テキスト内容: "Join now"
- 背景: `radial-gradient(75% 150% at 100% 114.2%, rgb(255, 183, 15) 0%, rgb(255, 84, 0) 100%)` を含む
- クラス名に `framer-1n1le9w` などが含まれている可能性が高い

### 3. ホバー前の状態を記録

ボタンにホバーする前の状態で、以下の CSS プロパティを記録してください：

```javascript
const defaultStyles = window.getComputedStyle(buttonElement);
// 記録するプロパティ:
- background
- backgroundImage
- backgroundColor
- transform
- transformOrigin
- scale (CSS transform scale)
- opacity
- boxShadow
- filter
- transition
- transitionDuration
- transitionTimingFunction
- transitionProperty
- cursor
- border-radius
- padding
- width
- height
- position
- z-index
- will-change
```

### 4. ホバー時の状態を記録

ボタンにマウスをホバーした状態で、上記と同じプロパティを記録してください。

**重要**: ホバー状態を取得する方法：

- Chrome DevTools の`:hov`チェックボックスを使用する
- または、JavaScript で`element.dispatchEvent(new MouseEvent('mouseenter'))`を実行後、`getComputedStyle`を取得

### 5. アニメーション/トランジションの詳細を確認

- ホバー時にアニメーションがあるか？
- トランジションの継続時間は？
- イージング関数は？（`ease`, `ease-in-out`, `cubic-bezier`など）
- どのプロパティがアニメーションされるか？

### 6. 視覚的な変化を確認

以下について確認してください：

- 背景のグラデーションは変化するか？（色、位置、角度など）
- スケール（拡大/縮小）はあるか？どのくらい？
- 影は追加/変化するか？
- 透明度は変化するか？
- その他の視覚的変化（色、境界線など）

### 7. 出力形式

以下の形式で結果を出力してください：

````markdown
# ホバー挙動の解析結果

## ボタンの識別情報

- セレクタ: [CSS セレクタ]
- クラス名: [クラス名の一覧]
- 要素タイプ: `<a>` or `<button>`

## デフォルト状態（ホバー前）

```css
background: [値]
background-image: [値]
transform: [値]
opacity: [値]
box-shadow: [値]
filter: [値]
transition: [値]
/* その他の重要なプロパティ */
```
````

## ホバー状態

```css
background: [値]
background-image: [値]
transform: [値]
opacity: [値]
box-shadow: [値]
filter: [値]
transition: [値]
/* その他の重要なプロパティ */
```

## 変化したプロパティ

- [プロパティ名]: [デフォルト値] → [ホバー値]
- [プロパティ名]: [デフォルト値] → [ホバー値]

## アニメーション/トランジション

- 継続時間: [値]
- イージング関数: [値]
- アニメーションされるプロパティ: [リスト]

## 視覚的な変化の説明

[テキストでの説明]

```

## 注意事項
- ホバー状態は一時的なものなので、DevToolsの`:hov`機能を使用するか、スクリプトでホバー状態を維持しながら測定してください
- CSS変数（`--variable-name`）が使用されている場合は、それらの値も記録してください
- Framer Motionなどのアニメーションライブラリが使用されている可能性があるため、インラインスタイルや`data-*`属性も確認してください

## 追加確認事項（可能であれば）
- クリック時の挙動（アクティブ状態）
- フォーカス時の挙動（キーボードナビゲーション）
- モバイル/タッチデバイスでの挙動

---

上記のプロンプトを実行し、結果を返してください。

```
