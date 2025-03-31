import { Skeleton } from "@/components/ui/skeleton";

export const Loader = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-6 text-gray-600">
      {/* Title */}
      <Skeleton className="h-6 w-48 rounded-md" />

      {/* Input Field Skeleton */}
      <Skeleton className="h-10 w-full max-w-md rounded-md" />

      {/* Button Skeleton */}
      <Skeleton className="h-10 w-32 rounded-md" />

      {/* Shortened Link Skeleton */}
      <Skeleton className="h-6 w-56 rounded-md" />

      {/* List of recent links */}
      <div className="w-full max-w-md space-y-2">
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-6 w-2/3 rounded-md" />
      </div>
    </div>
  );
};
