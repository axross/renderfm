import "reflect-metadata";

import type { AppProps } from "next/app";
import { container } from "tsyringe";
import { AudioPlayer, AudioPlayerProvider } from "use-audio-player";
import type { EpisodeRepository } from "~/services/episode-repository.server";

import "~/globals.css";

if (process.env.NEXT_PUBLIC_MOCK_SERVICES === "true") {
  const { MockEpisodeRepository } = await import(
    "~/services/mock-episode-repository.server"
  );

  container.register<EpisodeRepository>("EpisodeRepository", {
    useClass: MockEpisodeRepository,
  });
} else {
  const { FileEpisodeRepository } = await import(
    "~/services/file-episode-repository.server"
  );

  container.register<EpisodeRepository>("EpisodeRepository", {
    useClass: FileEpisodeRepository,
  });
}

let audioPlayer: AudioPlayer;
if (typeof globalThis.document === "object") {
  const { createBrowserAudioPlayer } = await import("use-audio-player");

  audioPlayer = createBrowserAudioPlayer();
} else {
  const { createMockAudioPlayer } = await import("use-audio-player");

  audioPlayer = createMockAudioPlayer();
}

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AudioPlayerProvider player={audioPlayer}>
      <Component {...pageProps} />;
    </AudioPlayerProvider>
  );
};

export default App;
