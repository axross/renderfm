import { TextAnchor } from "./clickable-text";

export interface PodcastSummaryProps {
  className?: string;
  style?: React.CSSProperties;
}

export const PodcastSummary: React.VFC<PodcastSummaryProps> = (props) => {
  return (
    <div {...props}>
      <p>
        {
          "render(fm)はサンフランシスコのスタートアップでソフトウェアエンジニアとして働くYuya("
        }
        <TextAnchor
          href="https://twitter.com/van_sf_engineer"
          title="@van_sf_engineer"
        >
          @van_sf_engineer
        </TextAnchor>
        {")とKohei("}
        <TextAnchor href="https://twitter.com/axross_" title="@axross_">
          @axross_
        </TextAnchor>
        {
          ")が英語のポッドキャストを聴いて知ったこと・感じたことを日本語で発信するポッドキャストです。"
        }
      </p>

      <p className="mt-4">
        <TextAnchor
          href="https://podcasts.apple.com/jp/podcast/render-fm/id1592606709"
          title="Apple Podcast"
        >
          Apple Podcast
        </TextAnchor>

        {"、"}

        <TextAnchor
          href="https://podcasts.google.com/feed/aHR0cHM6Ly9waXRwYS5qcC9yc3MvcmVuZGVyZm0"
          title="Google Podcasts"
        >
          Google Podcasts
        </TextAnchor>

        {"、"}

        <TextAnchor
          href="https://open.spotify.com/show/1ujtNoh3GkmJd830TRXB16"
          title="Spotify"
        >
          Spotify
        </TextAnchor>

        <span>でも配信しています。</span>
      </p>
    </div>
  );
};
