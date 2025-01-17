import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminJobDetailsSkeleton = () => {
  return (
    <div className="p-6">
      {/* Job Details Skeleton */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <Skeleton height={30} width={200} className="mb-4" />
        <Skeleton count={2} height={20} className="mb-4" />
        <Skeleton height={20} width={150} className="mb-2" />
        <Skeleton height={150} className="rounded-lg mb-4" />
        <div className="flex gap-4">
          <Skeleton height={40} width={100} className="rounded-lg" />
          <Skeleton height={40} width={100} className="rounded-lg" />
        </div>
      </div>

      {/* Watchdog Reports Skeleton */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Skeleton height={30} width={200} className="mb-6" />
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className="mb-6 border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Report Header Skeleton */}
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <Skeleton height={20} width={150} />
                <Skeleton height={20} width={100} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton height={20} width={120} />
                <Skeleton height={20} width={120} />
                <Skeleton height={20} width={120} />
              </div>
            </div>

            {/* Report Content Skeleton */}
            <div className="p-4">
              {/* Media Skeleton */}
              <div className="mb-6">
                <Skeleton height={25} width={150} className="mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(4)].map((_, idx) => (
                    <Skeleton
                      key={idx}
                      height={100}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </div>

              {/* Comments Skeleton */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <Skeleton height={25} width={180} className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(2)].map((_, idx) => (
                    <Skeleton
                      key={idx}
                      height={60}
                      className="p-3 bg-white rounded-lg"
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminJobDetailsSkeleton;
