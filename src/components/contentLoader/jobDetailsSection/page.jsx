'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const JobDetailsLoader = () => {
  return (
    <div>
      {/* Job Title */}
      <div className="mt-4">
        <Skeleton height={28} width={300} />
        <Skeleton height={18} width={150} className="mt-2" />
      </div>

      {/* Accepted By */}
      <div className="mt-4">
        <Skeleton height={18} width={200} />
      </div>

      {/* Expiration Date & Buttons */}
      <div className="flex flex-col lg:flex-row justify-between mt-4">
        <div>
          <Skeleton height={24} width={200} />
          <Skeleton height={18} width={150} className="mt-2" />
        </div>
        <div className="flex gap-2 mt-4 lg:mt-0">
          <Skeleton height={40} width={120} />
          <Skeleton height={40} width={120} />
        </div>
      </div>

      {/* Job Image Gallery */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1 bg-[#F6F6F6] rounded-md mt-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} height={200} width={300} />
        ))}
      </div>

      {/* Job Video */}
      <div className="mt-4">
        <Skeleton height={24} width={200} />
        <Skeleton height={200} className="mt-2 w-full" />
      </div>

      {/* Description */}
      <div className="mt-4">
        <Skeleton height={24} width={200} />
        <Skeleton count={3} height={18} className="mt-2" />
      </div>

      {/* Payment Details */}
      <div className="mt-4">
        <Skeleton height={24} width={200} />
        <Skeleton count={4} height={18} className="mt-2" />
      </div>

      {/* Location */}
      <div className="mt-4">
        <Skeleton height={24} width={200} />
        <Skeleton count={2} height={18} className="mt-2" />
        <Skeleton height={300} width={944} className="mt-2" />
      </div>

      {/* Contact Information */}
      <div className="mt-4">
        <Skeleton height={24} width={200} />
        <Skeleton count={3} height={18} className="mt-2" />
      </div>

      {/* Tags */}
      <div className="mt-4">
        <Skeleton height={24} width={200} />
        <div className="flex flex-wrap gap-2 mt-2">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} height={24} width={60} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsLoader;
