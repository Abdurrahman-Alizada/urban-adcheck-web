'use client';

import React, { useState } from 'react';
import { BsArrowLeft } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';
import { useJobDetailsQuery } from '@/redux/reducers/jobs/jobThunk';
import { useParams, useRouter } from 'next/navigation';
import { RxCross2 } from "react-icons/rx";
import { BsFillSendCheckFill } from "react-icons/bs";
import { useGetRoomByIdQuery, useUpdateMessageRoutesMutation } from '@/redux/reducers/messages/messagesThunk';
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';

function ViewDetails() {
  const params = useParams();
  // console.log("alksdfjlsad", params?.jobId)

  const { data: messages, refetch,isLoading:loading } = useGetRoomByIdQuery(params?.jobId);
  console.log("messages", messages)
  const { data: user } = useGetCurrentLoginUserQuery();
  console.log("user", user)
  const [updateMessageRoutes,] = useUpdateMessageRoutesMutation();
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [deliveryRevision, setDeliveryRevision] = useState(false)
  const [chatModal, setChatModal] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const { data: jobDetails, isError, isLoading } = useJobDetailsQuery(params?.jobId);
  const router = useRouter();

  if (isLoading) return <div className="text-center text-gray-700 font-nunitosans">Loading...</div>;
  if (isError || !jobDetails) return <div className="text-center text-red-500 font-nunitosans">Error loading job details.</div>;

  // job details object variables
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
    acceptedBy,
    watchdogReports,

  } = jobDetails?.data || {};

  console.log("watchdog", watchdogReports);

  // delivery modal
  const handleViewDelievery = () => {
    setDeliveryModal(true)
  }
  // chat modal
  const handleChatModal = () => {
    setChatModal(true);
  }

  const handleRevision = () => {

  }

  const handleMessageRoute = () => {
    try {
      if (messageInput.trim() === '') {
        alert("Message must be at least 1 character");
        return;
      }
      else {
        const isWatchDog = user._id === messages?.data?.members?.watchDog;

        const newData = {
          roomId: messages?.data?._id,
          newMessage: {
            sender: isWatchDog ? messages?.data?.members?.watchDog : messages?.data?.members?.client,
            receiver: isWatchDog ? messages?.data?.members?.client : messages?.data?.members?.watchDog,
            message: messageInput,
            timestamp: new Date()
          }
        };

        updateMessageRoutes(newData)
          .then((res) => {
            if (res?.data) {
              refetch();
              setMessageInput("")
              console.log(res);
            }
            else {
              alert("message sent failed", res.error)
            }
          })
      }
    } catch (err) {
      console.log("Error Sending Messages", err);
      alert('Something went wrong. Please try again later.');
    }
  }

  return (
    <div className="w-full relative mt-4 mb-4 px-2 lg:px-6 font-nunitosans">
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
        <span className="text-gray-500 font-semibold text-sm font-nunitosans">
          Category: {category ?? 'N/A'}
        </span>
      </div>

      <div>
        <span className="text-gray-500 font-semibold text-sm font-nunitosans">
          Accepted By:  {acceptedBy?.watchdog ? `${acceptedBy?.watchdog?.fullName?.firstName} ${acceptedBy?.watchdog?.fullName?.lastName}` : " Not Yet"}
        </span>
      </div>

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
      {/* popup */}
      {
        deliveryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-full max-w-[80%] max-h-[95vh] overflow-y-auto">
              {/* Modal Header */}
              <h2 className="text-xl font-semibold mb-4 text-primary">Watchdog Reports</h2>
              <p className="text-gray-600 mb-6">Here is your job delivery:</p>

              {/* Modal Content */}
              {watchdogReports?.map((report, index) => (
                <div key={index} className="mb-6">
                  {/* Drone Images Section */}
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-primary">Drone Images</h2>
                    {report?.media?.filter((media) => media.subType === "drone").length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {report?.media
                          ?.filter((media) => media.subType === "drone")
                          .map((media, idx) => (
                            <div key={idx}>
                              <Image
                                src={media?.url}
                                width={200}
                                height={200}
                                className="rounded-md object-contain max-w-[200px] max-h-[200px]"
                              />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p>No Drone Images Found.</p>
                    )}
                  </div>

                  {/* Camera Images Section */}
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4 text-primary">Camera Images</h2>
                    {report?.media?.filter((media) => media.subType === "camera").length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {report?.media
                          ?.filter((media) => media.subType === "camera")
                          .map((media, idx) => (
                            <div key={idx}>
                              <Image
                                src={media?.url}
                                width={200}
                                height={200}
                                className="rounded-md object-contain max-w-[200px] max-h-[200px]"
                              />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p>No Camera Images Found.</p>
                    )}
                  </div>

                  {/* comments */}
                  <div className='mt-4'>
                    <h2 className="text-lg font-semibold mb-4 text-primary">Comments</h2>

                    {report?.comments &&
                      Object.entries(report.comments).map(([title, comment], index) => (
                        <div key={index} className="mb-4">
                          <h3 className="text-gray-700 font-bold text-sm">
                            {title.charAt(0).toUpperCase() + title.slice(1)} {/* Capitalize the title */}
                          </h3>
                          <p className="text-gray-500 text-sm">{comment}</p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))}

              {/* Modal Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={handleRevision}
                  className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-gray-300"
                >
                  Submit a revision
                </button>
                <button
                  onClick={() => {
                    setDeliveryModal(false);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-red-700"
                >
                  Accept Delivery
                </button>
              </div>
            </div>
          </div>
        )
      }
      {/* chat popup */}

      {
        chatModal &&
        <div className='fixed inset-0 z-50 w-full h-full  bg-black/50'>
          <div className=' bg-white max-w-[95%] max-h-[85vh] h-[85vh] md:max-w-[70%] md:max-h-[85vh] md:h-[85vh] mx-auto m-12 rounded-md border-gray-200 border-[1px]'>
            <div className='flex flex-col h-full'>
              {/* Chat Header */}
              <div className='flex items-center justify-between bg-gray-100 p-3 border-b border-gray-200'>
                <div className='flex items-center gap-3'>
                  <Image
                    src={'/Avatar-2.png'}
                    width={60}
                    height={60}
                    alt={'profile-image'}
                    className='rounded-full object-contain'
                  />
                  <span className="text-gray-500 font-semibold text-sm font-nunitosans">
                    {acceptedBy?.watchdog?.fullName?.firstName} {acceptedBy?.watchdog?.fullName?.lastName}
                  </span>
                </div>
                <RxCross2 size={25} onClick={() => setChatModal(false)} className='cursor-pointer p-1 bg-primary rounded-full text-white ' />
              </div>

              {/* Chat Body */}
              <div className='flex flex-col flex-1 overflow-y-auto bg-gray-50 p-4'>
                {/* Sender message & reciever message*/}
                {
                  messages?.data?.messages?.map((message, index) => (
                    <div key={index} className={`mb-2 ${ user?._id == message?.sender ? 'self-end' : ' self-start'}`}>
                     {console.log("message is ", message,user?._id)}
                      <span className="block text-black max-w-[max]">
                        {user?._id == message?.sender
                          ? messages?.data?.members?.client?.fullName?.firstName
                          : messages?.data?.members?.watchDog?.fullName?.firstName}
                      </span>
                      <span
                        className={`block px-3 py-2 rounded-lg max-w-[max] ${user?._id === message?.sender ? 'bg-primary text-white' : 'bg-gray-300 text-black'
                          }`}
                      >
                        {message?.message}
                      </span>
                    </div>
                  ))
                }
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {/* send button */}
                <BsFillSendCheckFill size={20} className="cursor-pointer w-12 h-10 p-1 bg-secondary text-white rounded-lg hover:bg-primary"
                  onClick={handleMessageRoute}
                />
              </div>
            </div>
          </div>
        </div>
      }

      {/* Job Image Gallery */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1 bg-[#F6F6F6] rounded-[10px] mt-4">
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
}

export default ViewDetails;
