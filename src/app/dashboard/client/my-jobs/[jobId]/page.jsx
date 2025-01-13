'use client';
import React, { useState } from 'react';
import { BsArrowLeft } from "react-icons/bs";
import Image from 'next/image';
import { useJobDetailsQuery } from '@/redux/reducers/jobs/jobThunk';
import { useParams, useRouter } from 'next/navigation';
import { useGetRoomByIdQuery, useUpdateMessageRoutesMutation } from '@/redux/reducers/messages/messagesThunk';
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';
import { components } from 'react-select';
import ChatModal from '@/components/job-details/ChatModal';
import JobDetailsSection from '@/components/job-details/JobDetailsSection';
import DeliveryModal from '@/components/job-details/DeliveryModal';

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

      {/* job details */}
      <JobDetailsSection
        jobDetails={jobDetails}
        setDeliveryModal={setDeliveryModal}
        setChatModal={setChatModal}
      />
     
        {/* popup */}
        {deliveryModal && (
          <DeliveryModal
            watchdogReports={jobDetails?.data?.watchdogReports}
            onClose={() => setDeliveryModal(false)}
          />
        )}
        {/* chat popup */}  
        {chatModal && (
          <ChatModal
            messages={messages}
            user={user}
            refetchMessages={refetch}
            updateMessageRoutes={updateMessageRoutes}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            acceptedBy={jobDetails?.data?.acceptedBy}
            onClose={() => setChatModal(false)}
          />
        )}

    </div>
  );
}

export default ViewDetails;
