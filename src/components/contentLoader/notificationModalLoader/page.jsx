'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NotificationSkeleton = () => (
  <div>
    
    {/* Feature List Skeleton */}
    <ul className="text-left mt-6">
      {[...Array(3)].map((_, index) => (
        <li key={index} className="flex  items-center px-4 py-2 border-b ">
          <Skeleton circle width={18} height={18} className="mr-2" />
          <Skeleton height={16} width={200} />
        </li>
      ))}
    </ul>
  </div>
);

export default NotificationSkeleton;
