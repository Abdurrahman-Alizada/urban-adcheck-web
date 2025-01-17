"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfileLoader = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <Skeleton height={28} width={200} />
          <Skeleton height={18} width={300} className="mt-2" />
        </div>

        {/* User Header Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-start gap-6">
            {/* Profile Image */}
            <Skeleton circle={true} height={96} width={96} />
            <div className="flex-1">
              <Skeleton height={24} width={180} />
              <Skeleton height={18} width={120} className="mt-2" />
              <div className="mt-4 flex items-center gap-4">
                <Skeleton height={18} width={200} />
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
          <Skeleton height={24} width={200} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <Skeleton height={18} width={100} />
                <Skeleton height={18} width={80} className="mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews or Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
          <Skeleton height={24} width={200} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <Skeleton height={18} width={100} />
                <Skeleton height={18} width={80} className="mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLoader;
