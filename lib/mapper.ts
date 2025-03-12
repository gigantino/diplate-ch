import en from "./i18n/en.json";
import de from "./i18n/de.json";
import fr from "./i18n/fr.json";
import it from "./i18n/it.json";
import { intOrgCodes, unMissionsCodes } from "./diplomaticCodes";

export type PlateType = "CD_GREEN" | "CC_GREEN" | "CD_BLUE" | "AT_GREEN";
export type Lang = "en" | "de" | "fr" | "it";

const translationsMap: Record<Lang, Record<string, string>> = {
  en,
  de,
  fr,
  it,
};

export function getPlateDescription(
  lang: Lang,
  plateType: PlateType
): string[] {
  const translations = translationsMap[lang];

  const prefix = `info-${plateType}-`;

  const keys = Object.keys(translations)
    .filter((key) => key.startsWith(prefix))
    .sort((a, b) => {
      const aIndex = parseInt(a.slice(prefix.length), 10);
      const bIndex = parseInt(b.slice(prefix.length), 10);
      return aIndex - bIndex;
    });

  return keys.map((key) => translations[key]);
}

export function getCantonCodes(lang: Lang): string[] {
  const translations = translationsMap[lang];
  return Object.keys(translations)
    .filter((key) => key.startsWith("canton-"))
    .map((key) => key.slice(-2));
}

export function getRawTranslation(lang: Lang, key: string) {
  return translationsMap[lang][key];
}

export function getPlateInfoByCategory(lang: Lang, category: string): string[] {
  const translations = translationsMap[lang];
  const prefix = `info-${category}-`;

  const keys = Object.keys(translations)
    .filter((key) => key.startsWith(prefix))
    .sort((a, b) => {
      const aIndex = parseInt(a.slice(prefix.length), 10);
      const bIndex = parseInt(b.slice(prefix.length), 10);
      return aIndex - bIndex;
    });

  return keys.map((key) => translations[key]);
}

export type DiplomaticEntity = {
  type: "COUNTRY" | "INT_ORG" | "UN_MISSION";
  value: string;
  url?: string;
};
export function getDiplomaticEntity(
  lang: Lang,
  code: string
): DiplomaticEntity | null {
  const translations = translationsMap[lang];
  const fullKey = `code-${code}`;

  if (translations[fullKey]) {
    return { type: "COUNTRY", value: translations[fullKey] };
  }

  if (code.startsWith("3") || code.startsWith("5")) {
    const patternKey = `code-${code[0]}xx`;
    if (intOrgCodes[patternKey]) {
      let intOrg = intOrgCodes[patternKey];
      let countryCode = code.slice(1);
      if (countryCode.startsWith("0")) {
        countryCode = countryCode.slice(1);
      }
      const country = translations[`code-${countryCode}`];
      return {
        type: "INT_ORG",
        value: country
          ? `${getRawTranslation(lang, `org-${intOrg.code}`)} - ${country}`
          : intOrg.code,
        url: intOrg.url,
      };
    }
  }

  const intOrg = intOrgCodes[fullKey];
  if (intOrg) {
    return {
      type: "INT_ORG",
      value: getRawTranslation(lang, `org-${intOrg.code}`),
      url: intOrg.url,
    };
  }

  const unMission = unMissionsCodes[fullKey];
  if (unMission) {
    return {
      type: "UN_MISSION",
      value: getRawTranslation(lang, `org-${unMission.code}`),
      url: unMission.url,
    };
  }

  return null;
}
