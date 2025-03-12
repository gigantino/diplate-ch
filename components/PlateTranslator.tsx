"use client";
import { useEffect, useState } from "react";
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
import PlateTranslatorSkeleton from "@/components/skeletons/PlateTranslatorSkeleton";
import { Globe } from "lucide-react";
import { SiGithub } from "react-icons/si";
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
  const [subNumber, setSubNumber] = useState("45");
  const [diplomaticEntity, setDiplomaticEntity] =
    useState<null | DiplomaticEntity>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDiplomaticEntity(getDiplomaticEntity(lang, subNumber));
    setIsLoading(false);
  }, [subNumber, lang]);

  return (
    <>
      {isLoading ? (
        <PlateTranslatorSkeleton />
      ) : (
        <div className="space-y-8">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="plate-type">
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
                  <Label htmlFor="canton">
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
                    <Label htmlFor="serial_number">
                      {getRawTranslation(lang, "serial_number")}
                    </Label>
                    <Input
                      id="serial_number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      maxLength={4}
                      placeholder="123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="identification_number">
                      {getRawTranslation(lang, "identification_number")}
                    </Label>
                    <Input
                      id="identification_number"
                      value={subNumber}
                      onChange={(e) => {
                        setSubNumber(e.target.value);
                      }}
                      maxLength={3}
                      placeholder="45"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  {/* License Plate Representation */}
                  <div className="border-4 border-gray-800 rounded-md bg-gray-200 shadow-lg overflow-hidden">
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
                        <span className="text-3xl font-bold tracking-wider">
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
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-700">
                        {getRawTranslation(lang, "plate_information")}
                      </h4>
                      <div className="text-sm space-y-1">
                        <p className="grid grid-cols-[auto,1fr] gap-x-2">
                          <span className="font-medium whitespace-nowrap">
                            {getRawTranslation(lang, "plate_type")}:
                          </span>
                          <span>
                            {getRawTranslation(
                              lang,
                              `description-${plateType}`
                            )}
                          </span>
                        </p>
                        <p className="grid grid-cols-[auto,1fr] gap-x-2">
                          <span className="font-medium whitespace-nowrap">
                            {getRawTranslation(lang, "registration_canton")}:
                          </span>
                          <span>
                            {getRawTranslation(lang, `canton-${canton}`)}
                          </span>
                        </p>
                        <p className="grid grid-cols-[auto,1fr] gap-x-2">
                          <span className="font-medium whitespace-nowrap">
                            {getRawTranslation(lang, "diplomatic_entity")}:
                          </span>
                          <span>
                            {diplomaticEntity ? (
                              diplomaticEntity.url ? (
                                <a
                                  href={diplomaticEntity.url}
                                  className="underline text-blue-600"
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
                            {getRawTranslation(lang, "diplomatic_entity_type")}:
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
                      <h4 className="font-bold text-gray-700">
                        {getRawTranslation(lang, "plate_description")}
                      </h4>
                      <ul className="text-sm space-y-2 list-disc pl-5 text-gray-600">
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

          <footer className="text-center py-4 border-t">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} diplate.ch |{" "}
                {getRawTranslation(lang, "license")}
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/gigantino/diplate-ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <SiGithub className="h-5 w-5" />
                </a>
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
      )}
    </>
  );
}
