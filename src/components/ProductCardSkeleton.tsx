export default function ProductCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-64 bg-surface-container-lowest rounded-lg border border-outline-subtle p-4 animate-pulse">
      <div className="w-full h-48 bg-surface-container-high rounded-DEFAULT mb-4"></div>
      <div className="h-4 bg-surface-container-high rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-surface-container-high rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-surface-container-high rounded w-1/4"></div>
        <div className="w-8 h-8 rounded-full bg-surface-container-high"></div>
      </div>
    </div>
  );
}
