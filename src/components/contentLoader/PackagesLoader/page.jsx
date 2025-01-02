'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PackageLoader = () => (
  <div className=" shadow-md py-4 px-16 rounded-[10px] bg-white ">
    {/* Title Skeleton */}
    <Skeleton height={28} width={200} style={{ marginBottom: '8px' }} />

    {/* Subtitle Skeleton */}
    <Skeleton height={20} width={150} style={{ marginBottom: '16px' }} />

    {/* Pricing Skeleton */}
    <Skeleton height={30} width={250} style={{ marginBottom: '20px' }} />

    {/* Button Skeleton */}
    <Skeleton height={40} width={120} borderRadius={10} />

    {/* Feature List Skeleton */}
    <ul className="text-left mt-6">
      {[...Array(7)].map((_, index) => (
        <li key={index} className="flex items-center mb-2">
          <Skeleton circle width={18} height={18} className="mr-2" />
          <Skeleton height={16} width={200} />
        </li>
      ))}
    </ul>
  </div>
);

export default PackageLoader;
