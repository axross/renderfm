import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { Plugin, Transformer, unified } from "unified";
import { visit } from "unist-util-visit";
import { z } from "zod";
import { WEBSITE_URL_ORIGIN } from "~/constants/general";
import { Episode, EpisodeId } from "~/models/episode";
import { EpisodeRepository } from "~/services/episode-repository.server";

export class FileEpisodeRepository implements EpisodeRepository {
  async getAll(): Promise<Episode[]> {
    const rawEpisodes = (await import("~/episodes.json")).default;

    return EpisodeListFromRawEpisodeList.parseAsync(rawEpisodes);
  }

  async getById(id: EpisodeId): Promise<Episode | null> {
    const episodes = await this.getAll();

    return episodes.find((ep) => ep.id === id) ?? null;
  }
}

export const RawEpisode = Episode.omit({
  audioUrl: true,
  summaryPlainText: true,
  timeline: true,
}).extend({
  audioUrl: z.string(),
  timeline: z.array(z.tuple([z.string(), z.string()])),
});

export type RawEpisode = z.infer<typeof RawEpisode>;

const EpisodeListFromRawEpisodeList = z
  .array(RawEpisode)
  .transform<Episode[]>((rawEps) =>
    Promise.all(
      rawEps.map(async (rawEp) => ({
        ...rawEp,
        audioUrl: `${WEBSITE_URL_ORIGIN}${rawEp.audioUrl}`,
        summaryPlainText: await markdownToPlainText(rawEp.summaryMarkdown),
        timeline: rawEp.timeline.map(([label, time]) => [
          label,
          parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]),
        ]),
      }))
    )
  );

async function markdownToPlainText(markdown: string): Promise<string> {
  const vfile = await unified()
    .use(remarkParse)
    .use(remarkPlainText)
    .use(remarkStringify)
    .process(markdown);

  return vfile.toString().trim();
}

const remarkPlainText: Plugin = () => {
  const transformer: Transformer = (tree) => {
    let plainText = "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, "text", (node: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      plainText += node.value as string;
    });

    return {
      ...tree,
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: plainText,
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: {
                  line: 1,
                  column: plainText.length + 1,
                  offset: plainText.length,
                },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: {
              line: 1,
              column: plainText.length + 1,
              offset: plainText.length,
            },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: {
          line: 1,
          column: plainText.length + 1,
          offset: plainText.length,
        },
      },
    };
  };

  return transformer;
};
