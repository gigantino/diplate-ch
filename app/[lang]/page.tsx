import { notFound } from "next/navigation";
import MainWrapper from "@/components/MainWrapper";
import { isLang, LANGS } from "@/lib/mapper";

type Props = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function Home({ params }: Props) {
  const { lang } = await params;

  if (!isLang(lang)) {
    notFound();
  }

  return <MainWrapper lang={lang} />;
}
