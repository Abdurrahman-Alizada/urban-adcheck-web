'use client';
import React, { useState } from 'react';
import { useJobDetailsQuery } from '@/redux/reducers/jobs/jobThunk';
import { useParams, useRouter } from 'next/navigation';
import {  useGetRoomByJobIdQuery, useUpdateMessageRoutesMutation } from '@/redux/reducers/messages/messagesThunk';
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';
import ChatModal from '@/components/job-details/ChatModal';
import JobDetailsSection from '@/components/job-details/JobDetailsSection';
import DeliveryModal from '@/components/job-details/DeliveryModal';
import AdminJobDetailsSkeleton from '@/components/contentLoader/jobDetailSkeleton/JobDetailSkeleton';

function ViewDetails() {
  const params = useParams();

  const { data: messages, refetch,isLoading:loading,error } = useGetRoomByJobIdQuery(params?.jobId);  
  const { data: user } = useGetCurrentLoginUserQuery();
  const [updateMessageRoutes] = useUpdateMessageRoutesMutation();
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const { data: jobDetails, isError, isLoading } = useJobDetailsQuery(params?.jobId);
  const router = useRouter();

  // if (isLoading) return <div className="text-center text-gray-700 font-nunitosans">Loading...</div>;
  // if (isError || !jobDetails) return <div className="text-center text-red-500 font-nunitosans">Error loading job details.</div>;
  
  return (
    <div className="w-full relative mt-4 mb-4 px-2 lg:px-6 font-nunitosans">

      {/* job details */}
      {
        isLoading ?
         <AdminJobDetailsSkeleton/>
        :
        <JobDetailsSection
        jobDetails={jobDetails}
        setDeliveryModal={setDeliveryModal}
        setChatModal={setChatModal}
      />
      }
     
        {/* popup */}
        {deliveryModal && (
          <DeliveryModal
            watchdogReports={jobDetails?.data?.watchdogReports}
            onClose={() => setDeliveryModal(false)}
            isLoading={isLoading}
          />
        )}
        {/* chat popup */}  
        {chatModal && (
          <ChatModal
            messages={messages}
            user={user}
            messagesLoading={loading}
            userLoading={isLoading}
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
