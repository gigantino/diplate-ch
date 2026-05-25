import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "de", "fr", "it"] as const;
const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const accepted = request.headers
    .get("accept-language")
    ?.split(",")
    .map((part) => part.split(";")[0].trim().split("-")[0]);

  const locale =
    accepted?.find((lang) =>
      locales.includes(lang as (typeof locales)[number])
    ) ?? defaultLocale;

  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: "/",
};
