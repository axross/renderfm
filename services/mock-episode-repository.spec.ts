import { MockEpisodeRepository } from "~/services/mock-episode-repository.server";

describe("MockEpisodeRepository", () => {
  test("#getAll() resolves with a constant episode list", async () => {
    const episodeRepository = new MockEpisodeRepository();

    await expect(episodeRepository.getAll()).resolves.toMatchSnapshot();
  });

  test("#getById() resolves with a constant episode by the given id", async () => {
    const episodeRepository = new MockEpisodeRepository();

    await expect(episodeRepository.getById("1")).resolves.toMatchSnapshot();
  });

  test("#getById() resolves with null if there's no match episode with the given id", async () => {
    const episodeRepository = new MockEpisodeRepository();

    await expect(episodeRepository.getById("404")).resolves.toBeNull();
  });
});
