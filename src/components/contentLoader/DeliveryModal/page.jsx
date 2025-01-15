'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DeliveryModalSkeleton = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-full max-w-[80%] max-h-[95vh] overflow-y-auto">
        {/* Modal Header Skeleton
        <div className="mb-4">
          <Skeleton height={28} width={200} />
        </div>
        <div className="mb-6">
          <Skeleton height={16} width={300} />
        </div> */}

        {/* Skeleton for Drone Images Section */}
        <div className="mb-6">
          <Skeleton height={24} width={150} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6)
              .fill(null)
              .map((_, idx) => (
                <Skeleton key={idx} width={200} height={200} className="rounded-md" />
              ))}
          </div>
        </div>

        {/* Skeleton for Camera Images Section */}
        <div className="mt-6">
          <Skeleton height={24} width={150} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6)
              .fill(null)
              .map((_, idx) => (
                <Skeleton key={idx} width={200} height={200} className="rounded-md" />
              ))}
          </div>
        </div>

        {/* Skeleton for Comments Section */}
        <div className="mt-4">
          <Skeleton height={24} width={150} className="mb-4" />
          {Array(3)
            .fill(null)
            .map((_, idx) => (
              <div key={idx} className="mb-4">
                <Skeleton height={16} width={120} className="mb-2" />
                <Skeleton height={14} width="100%" />
              </div>
            ))}
        </div>

        {/* Skeleton for Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <Skeleton height={40} width={150} />
          <Skeleton height={40} width={150} />
        </div>
      </div>
    </div>
  );
};

export default DeliveryModalSkeleton;
