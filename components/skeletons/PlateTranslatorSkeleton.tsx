import { Card } from "@/components/ui/card";

export default function PlateTranslatorSkeleton() {
  return (
    <div className="space-y-8">
      <Card className="p-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Skeleton for form fields */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {/* Skeleton for license plate */}
            <div className="relative w-full max-w-md">
              <div className="border-4 border-gray-300 rounded-md bg-gray-100 shadow-lg overflow-hidden">
                <div className="flex">
                  <div className="bg-gray-200 text-white font-bold text-center p-4 flex items-center justify-center w-1/4 animate-pulse"></div>
                  <div className="bg-gray-100 p-4 flex items-center justify-center w-3/4">
                    <div className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton for plate info */}
        <div className="mt-6">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Skeleton for footer */}
      <div className="py-4 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center gap-4">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
