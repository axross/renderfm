import { test, expect } from "@playwright/test";

test.describe("index page", () => {
  test.beforeEach(async ({ page, request }) => {
    const response = await request.get("/");
    const html = await response.text();

    await page.setContent(html);
  });

  test("the page contains sufficient open graph meta tags", async ({
    baseURL,
    page,
  }) => {
    expect(await page.getAttribute('meta[property="og:type"]', "content")).toBe(
      "website"
    );
    expect(
      await page.getAttribute('meta[property="og:title"]', "content")
    ).toBe("render(fm)");
    expect(
      await page.getAttribute('meta[property="og:description"]', "content")
    ).toBe(
      "render(fm)はサンフランシスコのスタートアップでソフトウェアエンジニアとして働くYuyaとKoheiが英語のポッドキャストを聴いて知ったこと・感じたことを日本語で発信するポッドキャストです。"
    );
    expect(await page.getAttribute('meta[property="og:url"]', "content")).toBe(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${baseURL}/`
    );
    expect(
      await page.getAttribute('meta[property="og:locale"]', "content")
    ).toBe("ja_JP");
    expect(
      await page.getAttribute('meta[property="og:image"]', "content")
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    ).toBe(`${baseURL}/banner.png`);
    expect(
      await page.getAttribute('meta[property="og:image:type"]', "content")
    ).toBe("image/png");
    expect(
      await page.getAttribute('meta[property="og:image:width"]', "content")
    ).toBe("1200");
    expect(
      await page.getAttribute('meta[property="og:image:height"]', "content")
    ).toBe("630");
    expect(
      await page.getAttribute('meta[property="twitter:card"]', "content")
    ).toBe("summary_large_image");
  });
});

test.describe("episode page", () => {
  test.beforeEach(async ({ page, request }) => {
    const response = await request.get("/episodes/1");
    const html = await response.text();

    await page.setContent(html);
  });

  test("the page contains sufficient open graph meta tags", async ({
    baseURL,
    page,
  }) => {
    expect(await page.getAttribute('meta[property="og:type"]', "content")).toBe(
      "article"
    );
    expect(
      await page.getAttribute('meta[property="og:title"]', "content")
    ).toBe("Innovative background attitude | render(fm)");
    expect(
      await page.getAttribute('meta[property="og:description"]', "content")
    ).toBe(
      "Reiciendis sed sed quaerat a fugiat vitae, id laborum sapiente nihil maiores qui asperiores non quaerat commodi deserunt doloribus vitae non cupiditate dicta consectetur sed ullam beatae ullam non sed non, necessitatibus et, nihil, numquam esse et unde voluptate aliquid occaecati nulla voluptate."
    );
    expect(await page.getAttribute('meta[property="og:url"]', "content")).toBe(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${baseURL}/episodes/1`
    );
    expect(
      await page.getAttribute('meta[property="og:locale"]', "content")
    ).toBe("ja_JP");
    expect(
      await page.getAttribute('meta[property="og:image"]', "content")
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    ).toBe(`${baseURL}/banner.png`);
    expect(
      await page.getAttribute('meta[property="og:image:type"]', "content")
    ).toBe("image/png");
    expect(
      await page.getAttribute('meta[property="og:image:width"]', "content")
    ).toBe("1200");
    expect(
      await page.getAttribute('meta[property="og:image:height"]', "content")
    ).toBe("630");
    expect(
      await page.getAttribute('meta[property="twitter:card"]', "content")
    ).toBe("summary_large_image");
  });
});
