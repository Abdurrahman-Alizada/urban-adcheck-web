'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const JobsListContentLoader = () => {
  return (
    <>
      {[...Array(5)].map((_, rowIndex) => ( // Adjust the number of rows here if needed
        <tr key={rowIndex} className="border-b">
          {/* Jobs Column */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Skeleton circle width={50} height={50} />
              <Skeleton height={20} width={120} />
            </div>
          </td>
          {/* Date Column */}
          <td className="px-6 py-4">
            <Skeleton height={16} width={80} />
          </td>
          {/* Prices Column */}
          <td className="px-6 py-4">
            <Skeleton height={16} width={60} />
          </td>
          {/* Status Column */}
          <td className="px-6 py-4">
            <Skeleton height={16} width={90} />
          </td>
          {/* Action Column */}
          <td className="px-6 py-4">
            <Skeleton height={36} width={100} borderRadius={8} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default JobsListContentLoader;
