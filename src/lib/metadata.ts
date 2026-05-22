import { Metadata } from "next";

const BASE_URL = "https://countriehoodlums.com";
const DEFAULT_OG_IMAGE = "/og-image.jpg";
const SITE_NAME = "Countrie Hoodlums";

export function generatePageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: `${BASE_URL}${DEFAULT_OG_IMAGE}`,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${BASE_URL}${DEFAULT_OG_IMAGE}`],
    },
  };
}
