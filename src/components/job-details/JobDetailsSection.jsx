'use client';
import React from 'react';
import Image from 'next/image';

const JobDetailsSection = ({ jobDetails, setDeliveryModal, setChatModal }) => {
 
  

  const {
    jobTitle,
    category,
    acceptedBy,
    expireAt,
    jobGallery,
    jobVideo,
    description,
    paymentDetails,
    address,
    personalInfo,
    phoneNumber,
    tags,
  } = jobDetails?.data || {};

  
// chat modal
const handleChatModal = () => {
  setChatModal(true);
}
 // delivery modal
 const handleViewDelievery = () => {
  setDeliveryModal(true)
}

  return (
    <div>
      {/* Job Title */}
      <div className="mt-4">
        <h1 className="text-gray-800 text-[24px] lg:text-[28px] font-extrabold font-Archivoo">
          {jobTitle ?? 'N/A'}
        </h1>
        <span className="text-gray-500 font-semibold text-sm font-nunitosans">
          Category: {category ?? 'N/A'}
        </span>
      </div>
        {/* accepted by */}
      <div>
        <span className="text-gray-500 font-semibold text-sm font-nunitosans">
          Accepted By:  {acceptedBy?.watchdog ? `${acceptedBy?.watchdog?.fullName?.firstName} ${acceptedBy?.watchdog?.fullName?.lastName}` : " Not Yet"}
        </span>
      </div>

      {/* Expiration Date & buttons*/}
      <div className='flex flex-col lg:flex-row justify-between'>
        <div>
          {/* Expiration Date */}
          <div className="mt-4">
            <h2 className="text-gray-700 text-[20px] font-bold font-Archivoo">Job Expiration</h2>
            <p className="text-gray-600 text-[15px] font-nunitosans">
              {expireAt ? new Date(expireAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
        {/* buttons */}
        <div className='flex  gap-1 relative mt-4 mb-4'>
          <button
            onClick={handleChatModal}
            className="h-8 md:h-12 px-3 md:px-6 py-2 text-[10px] md:text-[16px] rounded-[10px] bg-secondary text-white hover:bg-primary">
            Chat Now
          </button>
          <button
            onClick={handleViewDelievery}
            className="h-8 md:h-12 px-3 md:px-6 py-2 text-[10px] md:text-[16px] rounded-[10px] bg-primary text-white hover:bg-primary">
            View Delivery
          </button>
        </div>
      </div>

      {/*job  Image Gallery */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1 bg-[#F6F6F6] rounded-md mt-4">
        {jobGallery?.length > 0 ? (
          jobGallery.map((image, index) => (
            <Image
              key={index}
              src={"/ads-img.png"}
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
     
           {/* Tags */}
           <div className="mt-2 flex flex-wrap gap-2">
             <h2 className="text-gray-700 text-[20px] font-bold font-Archivoo">Tags</h2>
             {tags?.map((tag, index) => (
               <span
                 key={index}
                 className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-md font-nunitosans"
               >
                 {tag}
               </span>
             )) ?? <span>No tags available</span>}
           </div> 
     
    </div>
  );
};

export default JobDetailsSection;
