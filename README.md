# render(fm)

<img src="https://user-images.githubusercontent.com/4289883/153341471-dddf9aae-fd6e-4e2f-b815-c754ccd40621.png" alt="render(fm)" width="256" height="256" />

render(fm)はサンフランシスコのスタートアップでソフトウェアエンジニアとして働く @yuya と [@axross](https://github.com/axross) が英語のポッドキャストを聴いて知ったこと・感じたことを日本語で発信するポッドキャストです。このリポジトリは render(fm)のウェブサイト (https://renderfm.com) のソースです。

ざっくりと[TypeScript](https://www.typescriptlang.org/)、[Next.js](https://nextjs.org/)、[Tailwind CSS](https://tailwindcss.com/)、[Unified](https://github.com/unifiedjs/unified)/[Remark](https://github.com/remarkjs/remark)でできています。JSON で書いたデータソースをもとに説明文を Unified/Remark で Markdown->Plaintext 変換したり、軽く[Storybook](https://storybook.js.org/)や、[Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)でのユニットテストや[Playwright](https://playwright.dev/)での E2E テストがあったり、そんな感じです。

## Contribution

リポジトリを clone したら、 `npm i` してから `cp .env.local.example .env.local` のように.env ファイルをコピー・生成してください。あとは `npm run dev:app` でウェブサイト本体が、 `npm run dev:storybook` で Storybook が立ち上がります。

`.env.local` に `NEXT_PUBLIC_MOCK_SERVICES=true` という行を追加すると、データソース部分がモックに置き換わった状態で起動します。E2E テストに使っている設定ですが、何かデータソースに依らない再現性が必要な場合は有効にしてみてください。

Pull Request は大歓迎です。Pull Request を作ってくれる場合は、タイトルを[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)準拠にしてください。後述するデプロイのバージョン決定に左右するためです。

## Deployment

main ブランチの更新のたびに GitHub Actions のワークフローが実行され、[Semantic Release](https://github.com/semantic-release/semantic-release)で自動的にバージョンを決定してデプロイします。そのため、main ブランチへ向けられたあらゆる Pull Request は Lint、Unit/E2E Tests、Build が成功している必要があります。Pull Request の checks が失敗している場合は当然ですが merge できません。

Pull Request ごとに個別のデプロイされた実行環境があるので、変更によってウェブサイトがどう変わったか視覚的に確認できます。GitHub Actions が正しく動作していれば、コメントでデプロイされたことを知らせてくれるはずです。

## License

このリポジトリにあるソースは npm パッケージを除いて基本的に unlicensed です。部分的に使いたいものなどあれば[@axross](https://github.com/axross)までご一報ください。npm パッケージとして切り出してライセンス付きで公開するかもしれません。
