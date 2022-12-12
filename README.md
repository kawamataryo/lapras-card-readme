# LAPRAS Card Readme

[LAPRAS](https://lapras.com) の現在のスコアをSVG画像のカードとして、GitHub Profileに埋め込むGitHub Actionsです。

- [example](https://github.com/kawamataryo)

<a href="https://lapras.com/public/sss" target="_blank" rel="noopener noreferrer"><img src="https://lapras-card-generator.vercel.app/api/svg?e=4.26&b=3.48&i=4.05&b1=%23020E27&b2=%230E5593&i1=%23030E21&i2=%231688BF&l=ja" width="400" ></a>

## 🛠️ 使い方

事前に自分のGitHub Profileの `README.md` 内のカード画像を挿入したい位置に以下のコメントを追加します。

```md
<!--START_SECTION:lapras-card-->
<!--END_SECTION:lapras-card-->
```

そして、`.github/workflows/` 内に、`lapras-card.yml`を追加します。
`SHARE_ID`には、自分の公開プロフィールのIDを入力します（`https://lapras.com/public/<:share_id>`）。

```yml
name: LAPRAS Card

on:
  workflow_dispatch: # for manual workflow trigger
  schedule:
    - cron: "0 0 * * *" # runs at every 12AM UTC

jobs:
  update-card:
    name: LAPRAS Card
    runs-on: ubuntu-latest
    steps:
      - uses: kawamataryo/lapras-card-readme@latest
        with:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SHARE_ID: 'your lapras public share id'
```

初回は、GitHub Actionsの手動実行で画像を追加してください。以降は12:00(UTC)に更新されます。

![CleanShot 2022-12-12 at 19 51 47](https://user-images.githubusercontent.com/11070996/207027299-5f667477-a812-448b-9997-192f202181d9.png)

## 🎨 オプション

カードのデザインはさまざまな調整が可能です。

|property|default|description|
|---|---|---|
|ICON_FIRST|#030E21|LAPRASアイコンのグラデーションの start color|
|ICON_SECOND|#1688BF|LAPRASアイコンのグラデーションの end color|
|BACKGROUND_FIRST|#020E27|カード背景のグラデーションの start color|
|BACKGROUND_END|#0E5593|カード背景のグラデーションカラーの end color|
|LANG|`ja`|スコアの表記方法（`ja` or `en`|

[lapras-card-generator](https://lapras-card-generator.vercel.app) を使うことで生成画像のPreviewや、環境変数の出力も可能です。

<a href="https://lapras-card-generator.vercel.app"><img src="https://user-images.githubusercontent.com/11070996/207026772-5e0d8417-b3b1-47ec-9532-8529f22fd068.png"></a>
