import {
  PODCAST_DESCRIPTION,
  PODCAST_RSS_FEED_URL,
  PODCAST_TITLE,
  WEBSITE_BANNER_URL,
  WEBSITE_URL_ORIGIN,
} from "~/constants/general";
import { Episode } from "~/models/episode";

export const yuya = {
  "@type": "Person",
  name: "Yuya Oshimo",
  url: "https://twitter.com/van_sf_engineer",
};

export const kohei = {
  "@type": "Person",
  name: "Kohei Asai",
  url: "https://kohei.dev/",
};

export const podcastSeries = {
  "@type": "PodcastSeries",
  name: PODCAST_TITLE,
  description: PODCAST_DESCRIPTION,
  url: `${WEBSITE_URL_ORIGIN}/`,
  image: WEBSITE_BANNER_URL,
  webFeed: PODCAST_RSS_FEED_URL,
  author: [yuya, kohei],
};

export function getPodcastEpisode(episode: Episode) {
  return {
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.summaryPlainText,
    url: `${WEBSITE_URL_ORIGIN}/episodes/${episode.id}`,
    image: WEBSITE_BANNER_URL,
    webFeed: PODCAST_RSS_FEED_URL,
    episodeNumber: `${episode.id}`,
    duration: secondsToISO8601Duration(episode.duration),
    associatedMedia: {
      "@type": "MediaObject",
      contentUrl: episode.audioUrl,
    },
    author: [yuya, kohei],
    partOfSeries: podcastSeries,
  };
}

function secondsToISO8601Duration(value: number): string {
  if (value >= 60 * 60 * 24) {
    throw new Error(
      "this function doesn't support a duration that is longer than or equal to a day."
    );
  }

  const hours = Math.floor((value / 60) * 60);
  const minutes = Math.floor((value - hours * 60 * 60) / 60);
  const seconds = Math.floor((value - hours * 60 * 60 - minutes * 60) % 60);

  let durationString = "PT";

  if (hours > 0) {
    durationString += `H${hours}`;
  }

  if (minutes > 0) {
    durationString += `M${minutes}`;
  }

  if (seconds > 0) {
    durationString += `S${seconds}`;
  }

  return durationString;
}
