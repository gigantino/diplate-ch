"use server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MainWrapper from "@/components/MainWrapper";
import { getRawTranslation } from "@/lib/mapper";

type Props = {
  params: Promise<{ lang: "en" | "de" | "fr" | "it" }>;
};

const allowedLangs = ["en", "de", "fr", "it"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  if (!allowedLangs.includes(lang)) {
    notFound();
  }

  const description = getRawTranslation(lang, "description");

  return {
    title: "displate.ch",
    description,
  };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;

  if (!allowedLangs.includes(lang)) {
    notFound();
  }

  return <MainWrapper lang={lang} />;
}
