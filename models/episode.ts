import { z } from "zod";

/**
 * An identifier string for Episodes.
 */
export const EpisodeId = z.string().regex(/^[1-9][0-9]*$/);

export type EpisodeId = z.infer<typeof EpisodeId>;

/**
 * An unit of episodes of a podcast. This contains several meta information and the URL to the audio resource.
 */
export const Episode = z.object({
  id: EpisodeId,
  publishedAt: z.string(),
  duration: z.number().nonnegative(),
  audioUrl: z.string().url(),
  title: z.string(),
  summaryMarkdown: z.string(),
  summaryPlainText: z.string(),
  timeline: z.array(z.tuple([z.string(), z.number().nonnegative()])),
});

export type Episode = z.infer<typeof Episode>;
