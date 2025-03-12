import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://diplate.ch/en",
      lastModified,
      alternates: {
        languages: {
          de: "https://diplate.ch/de",
          fr: "https://diplate.ch/fr",
          it: "https://diplate.ch/it",
        },
      },
    },
    {
      url: "https://diplate.ch/de",
      lastModified,
      alternates: {
        languages: {
          en: "https://diplate.ch/en",
          fr: "https://diplate.ch/fr",
          it: "https://diplate.ch/it",
        },
      },
    },
    {
      url: "https://diplate.ch/fr",
      lastModified,
      alternates: {
        languages: {
          en: "https://diplate.ch/en",
          de: "https://diplate.ch/de",
          it: "https://diplate.ch/it",
        },
      },
    },
    {
      url: "https://diplate.ch/it",
      lastModified,
      alternates: {
        languages: {
          en: "https://diplate.ch/en",
          de: "https://diplate.ch/de",
          fr: "https://diplate.ch/fr",
        },
      },
    },
  ];
}
