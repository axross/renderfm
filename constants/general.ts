export const PODCAST_TITLE = "render(fm)";
export const PODCAST_DESCRIPTION = `${PODCAST_TITLE}はサンフランシスコのスタートアップでソフトウェアエンジニアとして働くYuyaとKoheiが英語のポッドキャストを聴いて知ったこと・感じたことを日本語で発信するポッドキャストです。`;
export const PODCAST_RSS_FEED_URL = "https://pitpa.jp/rss/renderfm";

export const WEBSITE_URL_ORIGIN =
  process.env.NEXT_PUBLIC_URL_ORIGIN ?? "http://localhost:3000";
export const WEBSITE_BANNER_URL = `${WEBSITE_URL_ORIGIN}/banner.png`;
export const WEBSITE_TITLE = PODCAST_TITLE;
export const WEBSITE_DESCRIPTION = PODCAST_DESCRIPTION;
