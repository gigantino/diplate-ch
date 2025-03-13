"use client";

import { getRawTranslation, type Lang } from "@/lib/mapper";
import PlateTranslator from "./PlateTranslator";
import { ThemeProvider } from "next-themes";

interface MainWrapperProps {
  lang: Lang;
}
export default function MainWrapper({ lang }: MainWrapperProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-black transition-colors duration-200">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl font-bold text-center mb-2 dark:text-white">
            diplate.ch
          </h1>
          <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
            {getRawTranslation(lang, "description")}
          </p>
          <PlateTranslator lang={lang} />
        </div>
      </main>
    </ThemeProvider>
  );
}
