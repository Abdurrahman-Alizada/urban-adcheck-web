'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const OverviewLoader = () => {
  return (
    <div className="space-y-10 mt-5 p-3 lg:p-0">
      {/* Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between gap-2 items-center rounded-lg px-4 py-6"
            style={{ backgroundColor: '#F5F7FA' }} // Default light color
          >
            <div className="flex flex-col">
              <Skeleton height={30} width={70} />
              <Skeleton height={20} width={120} />
            </div>
            <Skeleton circle width={68} height={68} />
          </div>
        ))}
      </section>

      {/* Recently Posted Jobs Section */}
      <section>
        {/* Section Header */}
        {/* <div className="flex justify-between items-center">
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={80} />
        </div> */}

        {/* Jobs Grid */}
        {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="shadow-custom-shadow rounded-lg overflow-hidden">
              <Skeleton width={300} height={240} />

              <div className="px-5 py-3 border-b">
                <Skeleton height={12} width={100} />
                <Skeleton height={20} width={150} />
              </div>

              <div className="px-5 py-4 flex justify-between items-center">
                <Skeleton height={20} width={60} />
                <Skeleton circle width={20} height={20} />
              </div>
            </div>
          ))}
        </div> */}
      </section>
    </div>
  );
};

export default OverviewLoader;
