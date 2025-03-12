"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const lang = navigator.language;
    const language = lang.split("-")[0];

    switch (language) {
      case "it":
        router.replace("/it");
        break;
      case "fr":
        router.replace("/fr");
        break;
      case "de":
        router.replace("/de");
        break;
      default:
        router.replace("/en");
        break;
    }
  }, [router]);

  return null;
}
