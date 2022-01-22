import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { container } from "tsyringe";
import { Card } from "~/components/card";
import { TextAnchor } from "~/components/clickable-text";
import { ConnectedPlayerBar } from "~/components/connected-player-bar";
import { EpisodeList, EpisodeListRow } from "~/components/episode-list";
import { Footer } from "~/components/footer";
import { FullLogo } from "~/components/logo";
import {
  WEBSITE_BANNER_URL,
  WEBSITE_DESCRIPTION,
  WEBSITE_TITLE,
  WEBSITE_URL_ORIGIN,
} from "~/constants/general";
import * as structuredData from "~/constants/structured-data";
import { primaryFocusRing } from "~/constants/style";
import { Episode } from "~/models/episode";
import { EpisodeRepository } from "~/services/episode-repository.server";

interface IndexPageStaticProps {
  episodes: Episode[];
}

const IndexPage: React.VFC<IndexPageStaticProps> = ({ episodes }) => {
  return (
    <>
      <div className="min-w-[375px] pt-8 pb-40 px-4 sm:px-12 sm:pb-16">
        <header>
          <FullLogo />
        </header>

        <main className="mt-8">
          <p>
            {
              "render(fm)はサンフランシスコのスタートアップでソフトウェアエンジニアとして働くYuya("
            }
            <TextAnchor
              href="https://twitter.com/van_sf_engineer"
              title="Twitter @van_sf_engineer"
            >
              @yuya
            </TextAnchor>
            {")とKohei("}
            <TextAnchor
              href="https://twitter.com/axross_"
              title="Twitter @axross_"
            >
              @kohei
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

          <h2 className="mt-8 text-2xl font-semibold">Episodes</h2>

          <Card className="mt-4">
            <EpisodeList data-testid="episode-list">
              <ul>
                {episodes.map((ep, i) => (
                  <li key={ep.id} data-testid="item">
                    <Link href={`/episodes/${ep.id}`}>
                      <a
                        className={twMerge(
                          primaryFocusRing,
                          "block rounded hover:opacity-75"
                        )}
                        data-testid="link"
                      >
                        <EpisodeListRow
                          episode={ep}
                          last={i === episodes.length - 1}
                        />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </EpisodeList>
          </Card>
        </main>

        <Footer className="mt-8" />

        <ConnectedPlayerBar />
      </div>

      <Head>
        <meta property="og:type" content="website" key="og-type" />
        <meta property="og:title" content={WEBSITE_TITLE} key="og-title" />
        <meta
          property="og:description"
          content={WEBSITE_DESCRIPTION}
          key="og-description"
        />
        <meta
          property="og:url"
          content={`${WEBSITE_URL_ORIGIN}/`}
          key="og-url"
        />
        <meta property="og:locale" content="ja_JP" key="og-locale" />
        <meta property="og:image" content={WEBSITE_BANNER_URL} key="og-image" />
        <meta
          property="og:image:type"
          content="image/png"
          key="og-image-type"
        />
        <meta property="og:image:width" content="1200" key="og-image-width" />
        <meta property="og:image:height" content="630" key="og-image-height" />
        <meta
          property="twitter:card"
          content="summary_large_image"
          key="twitter-card"
        />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            ...structuredData.podcastSeries,
          }),
        }}
        key="structured-data"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const episodeRepository =
    container.resolve<EpisodeRepository>("EpisodeRepository");
  const episodes = await episodeRepository.getAll();

  return {
    props: { episodes },
  };
};

export default IndexPage;
