import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Wrapped Rose"
        description="Wrapped ROSE on Oasis Sapphire enables sending ROSE while preserving privacy."
        canonical="https://www.wrose.io/"
        openGraph={{
          url: "https://www.wrose.io/",
          title: "Wrapped Rose",
          description: "Wrapped ROSE on Oasis Sapphire enables sending ROSE while preserving privacy.",
          images: [
            {
              url: "https://user-images.githubusercontent.com/19412160/229571180-be04ee34-a5b2-4691-8120-b3d185921d37.png",
              width: 2000,
              height: 2000,
              alt: "WROSE",
              type: "image/jpeg",
            },
          ],
          siteName: "wrose.io",
        }}
        twitter={{
          handle: "@OasisProtocol",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
