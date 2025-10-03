import React from "react";

const Loading = () => {
  return (
    <div className="w-full space-y-6 p-6">
      {/* Dashboard Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
            </div>
            <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 animate-pulse" />
            <div className="h-3 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-md">
            <div className="h-6 w-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="h-8 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;