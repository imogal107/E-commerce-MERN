
const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg p-4 shadow-sm">
      <div className="bg-gray-300 h-40 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
