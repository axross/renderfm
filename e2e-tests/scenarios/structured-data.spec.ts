import { test, expect } from "@playwright/test";

test.describe("index page", () => {
  test.beforeEach(async ({ page, request }) => {
    const response = await request.get("/");
    const html = await response.text();

    await page.setContent(html);
  });

  test("the page contains structured data as json-ld", async ({ page }) => {
    const ldJsonString = await page.textContent(
      'script[type="application/ld+json"]'
    );

    expect(ldJsonString).toBe(
      JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "PodcastSeries",
        name: "render(fm)",
        description:
          "render(fm)はサンフランシスコのスタートアップでソフトウェアエンジニアとして働くYuyaとKoheiが英語のポッドキャストを聴いて知ったこと・感じたことを日本語で発信するポッドキャストです。",
        url: "http://localhost:3000/",
        image: "http://localhost:3000/banner.png",
        webFeed: "https://pitpa.jp/rss/renderfm",
        author: [
          {
            "@type": "Person",
            name: "Yuya Oshimo",
            url: "https://twitter.com/van_sf_engineer",
          },
          { "@type": "Person", name: "Kohei Asai", url: "https://kohei.dev/" },
        ],
      })
    );
  });
});

test.describe("episode page", () => {
  test.beforeEach(async ({ page, request }) => {
    const response = await request.get("/episodes/1");
    const html = await response.text();

    await page.setContent(html);
  });

  test("the page contains structured data as json-ld", async ({ page }) => {
    const ldJsonString = await page.textContent(
      'script[type="application/ld+json"]'
    );

    expect(ldJsonString).toBe(
      JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "PodcastEpisode",
        name: "Innovative background attitude",
        description:
          "Reiciendis sed sed quaerat a fugiat vitae, id laborum sapiente nihil maiores qui asperiores non quaerat commodi deserunt doloribus vitae non cupiditate dicta consectetur sed ullam beatae ullam non sed non, necessitatibus et, nihil, numquam esse et unde voluptate aliquid occaecati nulla voluptate.",
        url: "http://localhost:3000/episodes/1",
        image: "http://localhost:3000/banner.png",
        webFeed: "https://pitpa.jp/rss/renderfm",
        episodeNumber: "1",
        duration: "PTH3186S6",
        associatedMedia: {
          "@type": "MediaObject",
          contentUrl:
            "https://podcast-pitpa-enginner.cdn.pitpa.jp/renderfm/episodes/001_Jcfeg.mp3",
        },
        author: [
          {
            "@type": "Person",
            name: "Yuya Oshimo",
            url: "https://twitter.com/van_sf_engineer",
          },
          { "@type": "Person", name: "Kohei Asai", url: "https://kohei.dev/" },
        ],
        partOfSeries: {
          "@type": "PodcastSeries",
          name: "render(fm)",
          description:
            "render(fm)はサンフランシスコのスタートアップでソフトウェアエンジニアとして働くYuyaとKoheiが英語のポッドキャストを聴いて知ったこと・感じたことを日本語で発信するポッドキャストです。",
          url: "http://localhost:3000/",
          image: "http://localhost:3000/banner.png",
          webFeed: "https://pitpa.jp/rss/renderfm",
          author: [
            {
              "@type": "Person",
              name: "Yuya Oshimo",
              url: "https://twitter.com/van_sf_engineer",
            },
            {
              "@type": "Person",
              name: "Kohei Asai",
              url: "https://kohei.dev/",
            },
          ],
        },
      })
    );
  });
});
