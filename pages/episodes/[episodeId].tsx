import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { container } from "tsyringe";
import { useAudioPlayer } from "use-audio-player";
import { Button } from "~/components/button";
import { ConnectedPlayerBar } from "~/components/connected-player-bar";
import {
  EpisodeTimeline,
  EpisodeTimelineItem,
} from "~/components/episode-timeline";
import { Footer } from "~/components/footer";
import {
  CalendarIcon,
  ClockIcon,
  PauseIcon,
  PlayIcon,
} from "~/components/icon";
import { Logo } from "~/components/logo";
import { Markdown } from "~/components/markdown";
import {
  WEBSITE_BANNER_URL,
  WEBSITE_TITLE,
  WEBSITE_URL_ORIGIN,
} from "~/constants/general";
import * as structuredData from "~/constants/structured-data";
import { Episode, EpisodeId } from "~/models/episode";
import { EpisodeRepository } from "~/services/episode-repository.server";

type EpisodePageQuery = { episodeId: string };

interface EpisodePageStaticProps {
  episode: Episode;
}

const EpisodePage: React.VFC<EpisodePageStaticProps> = ({ episode }) => {
  const player = useAudioPlayer();

  return (
    <>
      <div className="min-w-[375px] pt-8 pb-40 px-4 sm:px-12 sm:pb-16">
        <article data-testid="episode-detail">
          <h1 className="flex items-start gap-x-4">
            <Link href="/">
              <a className="outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-4 focus:ring-offset-yellow-100 rounded hover:opacity-75 transition-all">
                <Logo className="shrink-0" />
              </a>
            </Link>

            <div
              className="pt-6 text-slate-900 dark:text-zinc-50 text-4xl font-bold"
              data-testid="episode-title"
            >
              {episode.title}
            </div>
          </h1>

          <div className="flex items-center gap-x-4 mt-8">
            <span className="flex items-center gap-x-1 text-slate-500 dark:text-zinc-500">
              <ClockIcon className="w-5 h-5" />

              <span className="text-sm">
                {Math.floor(episode.duration / 60)} mins
              </span>
            </span>

            <span className="flex items-center gap-x-1 text-slate-500 dark:text-zinc-500">
              <CalendarIcon className="w-5 h-5" />

              <span className="text-sm">
                {differenceInDays(new Date(episode.publishedAt), new Date()) >
                30
                  ? format(new Date(episode.publishedAt), "MMMM dd, yyyy")
                  : formatDistanceToNow(new Date(episode.publishedAt), {
                      addSuffix: true,
                    })}
              </span>
            </span>
          </div>

          <Markdown
            markdown={episode.summaryMarkdown}
            className="mt-4"
            data-testid="episode-summary"
          />

          <div className="mt-8">
            <Button
              onClick={() => {
                if (player.track?.src !== episode.audioUrl) {
                  player.load({ title: episode.title, src: episode.audioUrl });

                  player.play();
                } else {
                  if (player.isPlaying) {
                    player.pause();
                  } else {
                    player.play();
                  }
                }
              }}
              data-testid={
                player.track?.src === episode.audioUrl && player.isPlaying
                  ? "pause-button"
                  : "play-button"
              }
            >
              {player.track?.src === episode.audioUrl && player.isPlaying ? (
                <PauseIcon className="mr-2" />
              ) : (
                <PlayIcon className="mr-2" />
              )}

              {player.track?.src === episode.audioUrl
                ? player.isPlaying
                  ? "Pause"
                  : "Resume"
                : "Play"}
            </Button>
          </div>

          <EpisodeTimeline className="mt-8" data-testid="episode-timeline">
            {episode.timeline.map(([label, time]) => (
              <EpisodeTimelineItem
                label={label}
                time={time}
                onTimeClick={() => {
                  if (player.track?.src !== episode.audioUrl) {
                    player.load({
                      title: episode.title,
                      src: episode.audioUrl,
                    });
                  }

                  player.play();
                  player.seekTo(time);
                }}
                data-testid="item"
                key={label}
              />
            ))}
          </EpisodeTimeline>
        </article>

        <Footer />

        <ConnectedPlayerBar data-testid="player-bar" />
      </div>

      <Head>
        <meta property="og:type" content="article" key="og-type" />
        <meta
          property="og:title"
          content={`${episode.title} | ${WEBSITE_TITLE}`}
          key="og-title"
        />
        <meta
          property="og:description"
          content={episode.summaryPlainText}
          key="og-description"
        />
        <meta
          property="og:url"
          content={`${WEBSITE_URL_ORIGIN}/episodes/${episode.id}`}
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
            ...structuredData.getPodcastEpisode(episode),
          }),
        }}
        key="structured-data"
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<EpisodePageQuery> = async () => {
  const episodeRepository =
    container.resolve<EpisodeRepository>("EpisodeRepository");
  const episodes = await episodeRepository.getAll();

  return {
    paths: episodes.map((ep) => ({
      params: { episodeId: `${ep.id}` },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  EpisodePageStaticProps,
  EpisodePageQuery
> = async ({ params }) => {
  const episodeRepository =
    container.resolve<EpisodeRepository>("EpisodeRepository");
  const episode = await episodeRepository.getById(
    EpisodeId.parse(params?.episodeId)
  );

  if (episode === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { episode },
  };
};

export default EpisodePage;
