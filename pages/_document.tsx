import { Html, Head, Main, NextScript } from "next/document";

const Document: React.VFC = () => {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#0f172a" />
      </Head>

      <body className="max-w-4xl min-w-min mx-auto">
        <Main />

        <NextScript />

        <script
          dangerouslySetInnerHTML={{
            __html: `globalThis.__ENV__ = { build: "${
              process.env.NEXT_PUBLIC_BUILD ?? "unknown"
            }" }`,
          }}
        />
      </body>
    </Html>
  );
};

export default Document;
