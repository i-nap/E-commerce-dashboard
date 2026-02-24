export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-2 mb-8 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-gray-200 animate-pulse rounded-full" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-square bg-gray-200 animate-pulse rounded-3xl" />
            <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
            <div className="h-5 bg-gray-200 animate-pulse rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}