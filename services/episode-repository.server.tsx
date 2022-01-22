import { Episode, EpisodeId } from "~/models/episode";

export interface EpisodeRepository {
  getAll(): Promise<Episode[]>;

  getById(id: EpisodeId): Promise<Episode | null>;
}
