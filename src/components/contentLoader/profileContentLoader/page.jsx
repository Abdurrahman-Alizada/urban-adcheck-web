// profleContentLoader.js
'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfleContentLoader = () => {
  return (
    <>
      {/* Profile Image Skeleton */}
      <Skeleton circle={true} height={80} width={80} />

      {/* Image Button Skeleton */}
      <Skeleton width={120} height={40} />

      {/* Email Skeleton */}
      <Skeleton width={200} />

      {/* Full Name Input Skeleton */}
      <Skeleton width={'100%'} height={40} />

      {/* Phone Number Skeleton */}
      <Skeleton width={'100%'} height={40} />

      {/* Address Input Skeleton */}
      <Skeleton width={'100%'} height={40} />

      {/* Website URL Skeleton */}
      <Skeleton width={'100%'} height={40} />

      {/* Biography Textarea Skeleton */}
      <Skeleton width={'100%'} height={120} />

      {/* Save Button Skeleton */}
      <Skeleton width={120} height={40} />
    </>
  );
};

export default ProfleContentLoader;
