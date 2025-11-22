import { CarCardSkeleton } from "@/components/ui/car-card-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

