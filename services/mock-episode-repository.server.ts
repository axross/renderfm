import { Episode, EpisodeId } from "~/models/episode";
import { EpisodeRepository } from "~/services/episode-repository.server";

export class MockEpisodeRepository implements EpisodeRepository {
  getAll(): Promise<Episode[]> {
    return Promise.resolve(MOCK_EPISODE_LIST);
  }

  getById(id: EpisodeId): Promise<Episode | null> {
    return Promise.resolve(
      MOCK_EPISODE_LIST.find((ep) => ep.id === id) ?? null
    );
  }
}

export const MOCK_EPISODE_LIST: Episode[] = [
  {
    id: "1",
    publishedAt: "2021-06-06T21:07:37.567Z",
    duration: 3186.703673469388,
    audioUrl:
      "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
    title: "Innovative background attitude",
    summaryMarkdown:
      "Lesch and Sonsの [#310 Extended asynchronous system engine](https://occaecati.io) を聴いて[@reiciendis](http://magnam.name)と[@repellat](https://blanditiis.net)がいろいろ話しました。後編です。",
    summaryPlainText:
      "Reiciendis sed sed quaerat a fugiat vitae, id laborum sapiente nihil maiores qui asperiores non quaerat commodi deserunt doloribus vitae non cupiditate dicta consectetur sed ullam beatae ullam non sed non, necessitatibus et, nihil, numquam esse et unde voluptate aliquid occaecati nulla voluptate.",
    timeline: [
      ["Profit-focused executive core", 79],
      ["Versatile national time-frame", 133],
      ["Extended asynchronous system engine", 161],
      ["Synergized client-server architecture", 244],
      ["Business-focused stable framework", 292],
      ["Advanced transitional support", 449],
      ["Cloned human-resource knowledge base", 966],
      ["Customizable client-driven encoding", 1591],
      ["De-engineered full-range extranet", 1624],
      ["Re-engineered 24/7 paradigm", 2203],
      ["Reactive motivating data-warehouse", 2296],
      ["Orchestration encompassing middleware", 2355],
      ["Persevering encompassing alliance", 2403],
      ["Organized contextually-based function", 2533],
      ["Multi-layered zero administration system engine", 2825],
      ["Exclusive fresh-thinking workforce", 3041],
      ["Profit-focused coherent application", 3147],
      ["Synergistic responsive service-desk", 3155],
    ],
  },
  {
    id: "4",
    publishedAt: "2021-09-14T02:58:03.120Z",
    duration: 3186.703673469388,
    audioUrl:
      "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
    title: "Optimized contextually-based toolset",
    summaryMarkdown:
      "Bogan - Danielの [#66 Reactive local implementation](http://consequatur.net) を聴いて[@repellat](https://in.net)と[@sed](https://quaerat.name)がいろいろ話しました。後編です。",
    summaryPlainText:
      "Unde aut est voluptate quasi quae error, asperiores est quia, id consequuntur aliquid.",
    timeline: [
      ["Balanced radical archive", 1267],
      ["Enhanced responsive software", 1358],
      ["Synergized 4th generation success", 1569],
      ["Re-engineered upward-trending standardization", 1625],
      ["Streamlined impactful alliance", 1743],
      ["Enhanced responsive software", 1761],
      ["Optimized contextually-based toolset", 1830],
      ["Reactive local implementation", 2184],
      ["Virtual background paradigm", 2642],
      ["User-centric optimizing implementation", 2806],
      ["Networked mobile moratorium", 2824],
      ["Persevering encompassing middleware", 2906],
      ["Configurable global help-desk", 2929],
    ],
  },
  {
    id: "13",
    publishedAt: "2021-03-11T10:49:19.220Z",
    duration: 3186.703673469388,
    audioUrl:
      "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
    title: "Focused asymmetric contingency",
    summaryMarkdown:
      "Brown LLCの [#349 Multi-lateral zero defect throughput](http://sunt.org) を聴いて[@numquam](https://sequi.com)と[@nihil](https://sunt.dev)がいろいろ話しました。後編です。",
    summaryPlainText:
      "Sequi aut sapiente in consectetur sed possimus tenetur, quaerat magnam nemo, consequatur beatae tenetur id repellat occaecati quos asperiores est ipsum consequatur.",
    timeline: [
      ["Multi-layered zero administration system engine", 1560],
      ["Seamless bi-directional capacity", 1688],
      ["Secured holistic architecture", 2850],
      ["Secured holistic architecture", 2851],
    ],
  },
  {
    id: "21",
    publishedAt: "2022-01-26T21:38:10.282Z",
    duration: 3186.703673469388,
    audioUrl:
      "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
    title: "Compatible fresh-thinking success",
    summaryMarkdown:
      "Hegmann Incの [#76 Distributed heuristic archive](http://doloribus.io) を聴いて[@quasi](http://error.net)と[@voluptate](http://id.info)がいろいろ話しました。後編です。",
    summaryPlainText:
      "Consectetur commodi dolores et ipsum, nemo enim beatae laborum consectetur doloribus voluptate, voluptatem, sit deserunt vel sit quas id in et consectetur est voluptatem quos.",
    timeline: [
      ["Robust foreground synergy", 270],
      ["Balanced radical archive", 368],
      ["Fundamental multi-tasking standardization", 455],
      ["Upgradable cohesive knowledge user", 480],
      ["Switchable next generation intranet", 557],
      ["Implemented well-modulated task-force", 682],
      ["Enhanced responsive software", 896],
      ["User-friendly impactful utilisation", 1716],
      ["Advanced transitional support", 1808],
      ["Multi-channelled zero tolerance core", 1880],
      ["Enterprise-wide directional orchestration", 2241],
      ["De-engineered needs-based hardware", 2265],
      ["Inverse contextually-based portal", 2378],
      ["Synergistic responsive service-desk", 2435],
      ["Synchronised 24 hour emulation", 2558],
      ["Networked mobile moratorium", 2956],
    ],
  },
  {
    id: "40",
    publishedAt: "2021-04-24T08:16:15.213Z",
    duration: 3186.703673469388,
    audioUrl:
      "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
    title: "Re-engineered 24/7 paradigm",
    summaryMarkdown:
      "Orn, Spencer and Kiehnの [#436 Upgradable cohesive knowledge user](http://nihil.info) を聴いて[@magnam](http://excepturi.name)と[@numquam](https://nihil.io)がいろいろ話しました。後編です。",
    summaryPlainText:
      "Commodi et cum tenetur in, fugiat est dolores dicta vel non, repellat, a at at deserunt nostrum cupiditate possimus enim.",
    timeline: [
      ["Right-sized client-driven firmware", 19],
      ["Ameliorated asynchronous pricing structure", 171],
      ["Reduced multi-tasking encoding", 924],
      ["Secured methodical frame", 1052],
      ["User-centric executive knowledge user", 1569],
      ["Virtual background paradigm", 2183],
      ["Multi-channelled zero tolerance core", 2208],
      ["Organized contextually-based function", 2248],
    ],
  },
  {
    id: "42",
    publishedAt: "2021-06-08T02:56:24.559Z",
    duration: 3186.703673469388,
    audioUrl:
      "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
    title: "Expanded didactic methodology",
    summaryMarkdown:
      "Walker - Ziemeの [#472 Reactive 4th generation info-mediaries](http://neque.com) を聴いて[@beatae](https://quasi.com)と[@commodi](https://labore.biz)がいろいろ話しました。後編です。",
    summaryPlainText: "Rerum consequuntur exercitationem exercitationem sed.",
    timeline: [
      ["Secured holistic architecture", 545],
      ["Proactive client-server access", 1068],
      ["Synergized client-server architecture", 1126],
      ["Enterprise-wide directional orchestration", 1204],
      ["Secured holistic architecture", 2682],
      ["Innovative background attitude", 2805],
    ],
  },
  {
    id: "44",
    publishedAt: "2021-02-09T23:04:16.551Z",
    duration: 3186.703673469388,
    audioUrl:
      "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
    title: "Organized maximized firmware",
    summaryMarkdown:
      "Hahn - Welchの [#469 Streamlined executive Graphic Interface](http://cupiditate.info) を聴いて[@sequi](https://ullam.biz)と[@sequi](http://consequuntur.net)がいろいろ話しました。後編です。",
    summaryPlainText:
      "Facilis possimus beatae nihil voluptatibus id repellat esse consectetur vitae nemo fugiat doloribus.",
    timeline: [
      ["Adaptive asymmetric infrastructure", 24],
      ["Face to face 6th generation complexity", 264],
      ["Fundamental multi-tasking standardization", 424],
      ["Reactive 4th generation info-mediaries", 476],
      ["Distributed heuristic archive", 661],
      ["Exclusive fresh-thinking workforce", 775],
      ["Mandatory regional complexity", 844],
      ["Re-contextualized grid-enabled portal", 884],
      ["Multi-layered zero administration system engine", 1093],
      ["Upgradable stable strategy", 1173],
      ["Integrated regional open architecture", 1178],
      ["Robust heuristic installation", 1342],
      ["Re-engineered upward-trending standardization", 1723],
      ["Multi-channelled zero tolerance core", 1797],
      ["Enterprise-wide 24 hour info-mediaries", 2121],
      ["Stand-alone needs-based pricing structure", 2136],
      ["Cloned human-resource knowledge base", 2359],
    ],
  },
  {
    id: "57",
    publishedAt: "2021-05-25T23:23:24.962Z",
    duration: 3186.703673469388,
    audioUrl:
      "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
    title: "Exclusive fresh-thinking workforce",
    summaryMarkdown:
      "Swaniawski and Sonsの [#2 Distributed heuristic archive](https://tenetur.org) を聴いて[@repellat](https://deserunt.info)と[@maiores](http://reiciendis.dev)がいろいろ話しました。後編です。",
    summaryPlainText:
      "Deserunt esse dolores deserunt non blanditiis excepturi reiciendis, qui vitae vitae ullam est nulla, exercitationem maiores sed.",
    timeline: [
      ["Stand-alone next generation task-force", 449],
      ["Extended asynchronous system engine", 1197],
    ],
  },
  {
    id: "67",
    publishedAt: "2021-05-13T16:34:16.850Z",
    duration: 3186.703673469388,
    audioUrl:
      "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
    title: "Reactive motivating data-warehouse",
    summaryMarkdown:
      "Marquardt - Runolfsdottirの [#208 Robust foreground synergy](https://id.net) を聴いて[@vitae](https://quia.org)と[@ducimus](http://ducimus.info)がいろいろ話しました。後編です。",
    summaryPlainText:
      "Sapiente sed qui sunt fugiat hic aut asperiores quas facilis fugiat occaecati dicta sit numquam, in quia, enim quas rerum eos doloribus sit dolores blanditiis ullam consequuntur neque quas quas ducimus qui labore, numquam consequuntur.",
    timeline: [
      ["Decentralized human-resource system engine", 483],
      ["Versatile national time-frame", 885],
      ["Synergized client-server architecture", 1641],
      ["Right-sized client-driven firmware", 1884],
      ["Streamlined executive Graphic Interface", 2009],
      ["Multi-layered zero administration system engine", 2170],
      ["Stand-alone next generation task-force", 2521],
      ["Streamlined executive Graphic Interface", 2522],
      ["Switchable upward-trending array", 2617],
      ["Organized contextually-based function", 2732],
      ["Stand-alone needs-based pricing structure", 3028],
      ["Networked exuding monitoring", 3175],
      ["Reduced multi-tasking encoding", 3177],
    ],
  },
  {
    id: "100",
    publishedAt: "2021-06-21T17:26:49.910Z",
    duration: 3186.703673469388,
    audioUrl:
      "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
    title: "Synergized client-server architecture",
    summaryMarkdown:
      "Champlin - Gaylordの [#89 Monitored bottom-line productivity](http://magnam.info) を聴いて[@eos](http://ipsum.dev)と[@sequi](http://quos.io)がいろいろ話しました。後編です。",
    summaryPlainText:
      "Omnis occaecati necessitatibus voluptatem ducimus consectetur tenetur doloribus sequi, id sapiente, nostrum et nihil tenetur.",
    timeline: [
      ["De-engineered full-range extranet", 177],
      ["Adaptive asymmetric infrastructure", 674],
      ["Innovative background attitude", 1209],
      ["Polarised global open system", 1345],
      ["Ameliorated multimedia groupware", 1367],
      ["Business-focused stable framework", 1433],
      ["Reduced regional frame", 1490],
      ["Robust foreground synergy", 2333],
      ["Robust heuristic installation", 2920],
      ["Business-focused stable framework", 2920],
    ],
  },
];
