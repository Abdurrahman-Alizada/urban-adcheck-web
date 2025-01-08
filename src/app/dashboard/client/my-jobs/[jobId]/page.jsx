'use client';

import React from 'react';
import { BsArrowLeft } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';
import { useJobDetailsQuery } from '@/redux/reducers/jobs/jobThunk';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

function ViewDetails() {
  const params = useParams();
  console.log("alksdfjlsad", params?.jobId)

  const { data: jobDetails, isError, isLoading } = useJobDetailsQuery(params?.jobId);
  const router = useRouter();

  if (isLoading) return <div className="text-center text-gray-700 font-nunitosans">Loading...</div>;
  if (isError || !jobDetails) return <div className="text-center text-red-500 font-nunitosans">Error loading job details.</div>;

  const {
    jobTitle,
    description,
    paymentDetails,
    address,
    phoneNumber,
    tags,
    category,
    personalInfo,
    expireAt,
    jobGallery,
    jobVideo,
  } = jobDetails?.data || {};

  return (
    <div className="w-full mt-4 mb-4 px-2 lg:px-6 font-nunitosans">
      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 font-Archivoo hover:text-gray-900"
        >
          <BsArrowLeft size={22} />
          Back to Job List
        </button>
      </div>

      {/* Job Title */}
      <div className="mt-4">
        <h1 className="text-gray-800 text-[24px] lg:text-[28px] font-extrabold font-Archivoo">
          {jobTitle ?? 'N/A'}
        </h1>
        <span className="text-gray-500 text-sm font-nunitosans">
          Category: {category ?? 'N/A'}
        </span>
      </div>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-2">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-md font-nunitosans"
          >
            {tag}
          </span>
        )) ?? <span>No tags available</span>}
      </div>

      {/* Job Image Gallery */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1 bg-[#F6F6F6] rounded-[10px] mt-4">
        {jobGallery?.length > 0 ? (
          jobGallery.map((image, index) => (
            <Image
              key={index}
              src={image}
              height={200}
              width={300}
              className="object-contain max-w-full max-h-[200px]"
              alt={`Job Image ${index + 1}`}
            />
          ))
        ) : (
          <span className="text-gray-600 font-nunitosans">No images available</span>
        )}
      </div>

      {/* Job Video */}
      {jobVideo && (
        <div className="mt-4">
          <h2 className="text-gray-700 text-[20px] font-bold font-Archivoo">Job Video</h2>
          <video
            controls
            className="w-full rounded-md mt-2"
            src={jobVideo}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Description */}
      <div className="mt-4">
        <h2 className="text-gray-700 text-[20px] font-bold font-Archivoo">Description</h2>
        <p className="text-gray-600 mt-2 text-[15px] leading-[22px] font-nunitosans">
          {description ?? 'No description provided.'}
        </p>
      </div>

      {/* Payment Details */}
      <div className="mt-4">
        <h2 className="text-gray-700 text-[20px] font-bold font-Archivoo">Payment Details</h2>
        <div className="mt-2 text-gray-600 text-[15px] font-nunitosans">
          <p>Type: {paymentDetails?.paymentType ?? 'N/A'}</p>
          <p>Amount: {paymentDetails?.currency} {paymentDetails?.amount ?? 'N/A'}</p>
          <p>Service Fee: {paymentDetails?.currency} {paymentDetails?.serviceFee ?? 'N/A'}</p>
          <p>Total: {paymentDetails?.currency} {paymentDetails?.totalAmount ?? 'N/A'}</p>
        </div>
      </div>

      {/* Location */}
      <div className="mt-4">
        <h2 className="text-gray-700 text-[20px] font-bold font-Archivoo">Location</h2>
        <div className="mt-2 text-gray-600 text-[15px] font-nunitosans">
          <p>{address?.street}, {address?.city}, {address?.state}, {address?.country}</p>
          <p>Postal Code: {address?.postalCode ?? 'N/A'}</p>
        </div>
        <Image
          src={'/map-1.png'}
          width={944}
          height={311}
          alt="Map"
          className="object-contain mt-2"
        />
      </div>

      {/* Contact Information */}
      <div className="mt-4">
        <h2 className="text-gray-700 text-[20px] font-bold font-Archivoo">Contact Information</h2>
        <div className="mt-2 text-gray-600 text-[15px] font-nunitosans">
          <p>Full Name: {personalInfo?.fullName ?? 'N/A'}</p>
          <p>Email: {personalInfo?.email ?? 'N/A'}</p>
          <p>Phone: {phoneNumber?.primary ?? 'N/A'}</p>
        </div>
      </div>

      {/* Expiration Date */}
      <div className="mt-4">
        <h2 className="text-gray-700 text-[20px] font-bold font-Archivoo">Job Expiration</h2>
        <p className="text-gray-600 text-[15px] font-nunitosans">
          {expireAt ? new Date(expireAt).toLocaleDateString() : 'N/A'}
        </p>
      </div>
    </div>
  );
}

export default ViewDetails;
