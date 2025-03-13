"use client";
import { useEffect, useState } from "react";
import type React from "react";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Moon, Sun, Laptop } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useTheme } from "next-themes";
import {
  getCantonCodes,
  getDiplomaticEntity,
  getPlateInfoByCategory,
  getRawTranslation,
  type Lang,
  type PlateType,
  type DiplomaticEntity,
} from "@/lib/mapper";

export default function PlateTranslator({ lang }: { lang: Lang }) {
  const [plateType, setPlateType] = useState<PlateType>("CD_GREEN");
  const [canton, setCanton] = useState("GE");
  const [number, setNumber] = useState("123");
  const [subNumber, setSubNumber] = useState("07");
  const [diplomaticEntity, setDiplomaticEntity] =
    useState<null | DiplomaticEntity>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme component doesn't render until mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDiplomaticEntity(getDiplomaticEntity(lang, subNumber));
    setIsLoading(false);
  }, [subNumber, lang]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isTooltipVisible &&
        !(event.target as Element).closest(
          'button[aria-label="More information"]'
        )
      ) {
        setIsTooltipVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTooltipVisible]);

  const handleSubNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      /^\d*$/.test(value) &&
      (value === "" || Number.parseInt(value) <= 999)
    ) {
      setSubNumber(value);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    !isLoading && (
      <div className="space-y-8">
        <Card className="p-6 dark:bg-black/90">
          <div></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="plate-type" className="dark:text-gray-200">
                  {getRawTranslation(lang, "plate_type")}
                </Label>
                <Select
                  value={plateType}
                  onValueChange={(value) => setPlateType(value as PlateType)}
                >
                  <SelectTrigger id="plate-type" className="w-full">
                    <SelectValue placeholder="Select plate type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CD_GREEN">
                      {getRawTranslation(lang, "select-CD_GREEN")}
                    </SelectItem>
                    <SelectItem value="CC_GREEN">
                      {getRawTranslation(lang, "select-CC_GREEN")}
                    </SelectItem>
                    <SelectItem value="CD_BLUE">
                      {getRawTranslation(lang, "select-CD_BLUE")}
                    </SelectItem>
                    <SelectItem value="AT_GREEN">
                      {getRawTranslation(lang, "select-AT_GREEN")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="canton" className="dark:text-gray-200">
                  {getRawTranslation(lang, "canton")}
                </Label>
                <Select
                  value={canton}
                  onValueChange={(value) => setCanton(value)}
                >
                  <SelectTrigger id="canton" className="w-full">
                    <SelectValue placeholder="Select canton" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCantonCodes(lang).map((code) => (
                      <SelectItem key={code} value={code}>
                        {code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="serial_number" className="dark:text-gray-200">
                    {getRawTranslation(lang, "serial_number")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="serial_number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      maxLength={4}
                      placeholder="123"
                      disabled
                      className="pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="button"
                        aria-label="More information"
                        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-900 border text-gray-500 dark:text-gray-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        ?
                      </button>
                      {isTooltipVisible && (
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-black border text-white text-xs rounded shadow-lg z-10">
                          {getRawTranslation(lang, "serial-number-tooltip")}
                          <div className="absolute top-full right-3 -mt-1 w-2 h-2 rotate-45 bg-black dark:border dark:border-t-0 dark:border-l-0"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="identification_number"
                    className="dark:text-gray-200"
                  >
                    {getRawTranslation(lang, "identification_number")}
                  </Label>
                  <Input
                    id="identification_number"
                    type="text"
                    inputMode="numeric"
                    value={subNumber}
                    onChange={handleSubNumberChange}
                    maxLength={3}
                    placeholder="07"
                    className="dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* License Plate Representation */}
                <div className="border-4 border-gray-800 dark:border-neutral-800 rounded-md bg-gray-200 shadow-lg overflow-hidden">
                  <div className="flex">
                    <div
                      className={`${
                        plateType.endsWith("BLUE")
                          ? "bg-blue-600"
                          : "bg-green-600"
                      } text-white font-bold text-center p-4 flex items-center justify-center w-1/4`}
                    >
                      <span className="text-3xl">
                        {plateType.split("_")[0]}
                      </span>
                    </div>

                    <div className="bg-gray-100 p-4 flex items-center justify-center w-3/4">
                      <span className="text-3xl font-bold tracking-wider text-black">
                        {canton} {number}
                        <span className="mx-1">•</span>
                        {subNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-4 mt-6">
              <div className="bg-gray-50 dark:bg-black dark:border rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-700 dark:text-gray-200">
                      {getRawTranslation(lang, "plate_information")}
                    </h4>
                    <div className="text-sm space-y-1 dark:text-gray-300">
                      <p className="grid grid-cols-[auto,1fr] gap-x-2">
                        <span className="font-medium whitespace-nowrap">
                          {getRawTranslation(lang, "plate_type")}
                        </span>
                        <span>
                          {getRawTranslation(lang, `description-${plateType}`)}
                        </span>
                      </p>
                      <p className="grid grid-cols-[auto,1fr] gap-x-2">
                        <span className="font-medium whitespace-nowrap">
                          {getRawTranslation(lang, "registration_canton")}
                        </span>
                        <span>
                          {getRawTranslation(lang, `canton-${canton}`)}
                        </span>
                      </p>
                      <p className="grid grid-cols-[auto,1fr] gap-x-2">
                        <span className="font-medium whitespace-nowrap">
                          {getRawTranslation(lang, "diplomatic_entity")}
                        </span>
                        <span>
                          {diplomaticEntity ? (
                            diplomaticEntity.url ? (
                              <a
                                href={diplomaticEntity.url}
                                className="underline text-blue-600 dark:text-blue-400"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {diplomaticEntity.value}
                              </a>
                            ) : (
                              <span>{diplomaticEntity.value}</span>
                            )
                          ) : (
                            <span className="italic">
                              {getRawTranslation(lang, "unknown")}
                            </span>
                          )}
                        </span>
                      </p>
                      <p className="grid grid-cols-[auto,1fr] gap-x-2">
                        <span className="font-medium whitespace-nowrap">
                          {getRawTranslation(lang, "diplomatic_entity_type")}
                        </span>
                        <span>
                          {diplomaticEntity ? (
                            <span>
                              {getRawTranslation(
                                lang,
                                `diplomatic-entity-${diplomaticEntity.type}`
                              )}
                            </span>
                          ) : (
                            <span className="italic">
                              {getRawTranslation(lang, "unknown")}
                            </span>
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-700 dark:text-gray-200">
                      {getRawTranslation(lang, "plate_description")}
                    </h4>
                    <ul className="text-sm space-y-2 list-disc pl-5 text-gray-600 dark:text-gray-300">
                      {getPlateInfoByCategory(lang, plateType).map(
                        (info, i) => {
                          return <li key={i}>{info}</li>;
                        }
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <footer className="text-center py-4 border-t dark:border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} diplate.ch |{" "}
              {getRawTranslation(lang, "license")}
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/gigantino/diplate-ch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                <SiGithub className="h-5 w-5" />
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    {theme === "light" ? (
                      <Sun className="h-[1.2rem] w-[1.2rem]" />
                    ) : theme === "dark" ? (
                      <Moon className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                      <Laptop className="h-[1.2rem] w-[1.2rem]" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center gap-2">
                <Select
                  value={lang}
                  onValueChange={(value) => {
                    router.push(`/${value}`);
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <SelectValue placeholder="Language" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">
                      {getRawTranslation("en", "language")}
                    </SelectItem>
                    <SelectItem value="de">
                      {getRawTranslation("de", "language")}
                    </SelectItem>
                    <SelectItem value="fr">
                      {getRawTranslation("fr", "language")}
                    </SelectItem>
                    <SelectItem value="it">
                      {getRawTranslation("it", "language")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  );
}
