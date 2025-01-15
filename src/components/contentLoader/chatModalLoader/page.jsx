'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ChatModalSkeleton = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[70%] h-[85vh]">
        <div className="flex flex-col h-full">
          {/* Chat Header Skeleton */}
          <div className="flex items-center justify-between bg-gray-100 p-3 border-b border-gray-200">
            <Skeleton circle={true} height={60} width={60} />
            <Skeleton width={150} height={20} />
            <Skeleton width={30} height={30} circle={true} />
          </div>

          {/* Chat Body Skeleton */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {/* Message skeletons */}
              {Array(5)
                .fill(null)
                .map((_, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <Skeleton circle={true} height={30} width={30} />
                    <div className="flex-1">
                      <Skeleton width="70%" height={16} className="mb-2" />
                      <Skeleton width="90%" height={40} />
                    </div>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatModalSkeleton
