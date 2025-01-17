"use client";

import React, { useState } from "react";
import { BsArrowLeft, BsFillSendCheckFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { useJobDetailsQuery } from "@/redux/reducers/jobs/jobThunk";
import { useParams, useRouter } from "next/navigation";
import {
  useGetRoomByIdQuery,
  useUpdateMessageRoutesMutation,
} from "@/redux/reducers/messages/messagesThunk";
import { useGetCurrentLoginUserQuery } from "@/redux/reducers/user/userThunk";
import { IoClose } from "react-icons/io5";
import { MessageCircle } from "lucide-react";
import CommonLoader from "@/components/contentLoader/CommonLoader";
import AdminJobDetailsSkeleton from "@/components/contentLoader/jobDetailSkeleton/JobDetailSkeleton";

function AdminJobDetails() {
  const params = useParams();
  const router = useRouter();
  const { data: messages, refetch } = useGetRoomByIdQuery(params?.jobId);
  const { data: user } = useGetCurrentLoginUserQuery();
  const [updateMessageRoutes] = useUpdateMessageRoutesMutation();

  // State management
  const [chatModal, setChatModal] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const {
    data: jobDetails,
    isError,
    isLoading,
  } = useJobDetailsQuery(params?.jobId);

  // if (isLoading)
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // if (isError || !jobDetails)
  //   return (
  //     <div className="text-center text-red-500 p-4">
  //       Error loading job details.
  //     </div>
  //   );

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
    status,
  } = jobDetails?.data || {};

  const handleMessageRoute = () => {
    if (!messageInput.trim()) {
      alert("Message cannot be empty");
      return;
    }

    const isWatchDog = user._id === messages?.data?.members?.watchDog;
    const newData = {
      roomId: messages?.data?._id,
      newMessage: {
        sender: isWatchDog
          ? messages?.data?.members?.watchDog
          : messages?.data?.members?.client,
        receiver: isWatchDog
          ? messages?.data?.members?.client
          : messages?.data?.members?.watchDog,
        message: messageInput,
        timestamp: new Date(),
      },
    };

    updateMessageRoutes(newData)
      .then((res) => {
        if (res?.data) {
          refetch();
          setMessageInput("");
        } else {
          alert("Failed to send message");
        }
      })
      .catch((err) => {
        console.error("Error sending message:", err);
        alert("Failed to send message");
      });
  };

  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaModal, setMediaModal] = useState(false);

  // Helper function to group media by subtype
  const groupMediaByType = (media) => {
    return media?.reduce((acc, item) => {
      const key = item.subType || "other";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };
  // Media modal component
  const MediaModal = ({ media, onClose }) => {
    if (!media) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white hover:text-gray-300"
          >
            <IoClose size={24} />
          </button>
          {media.type === "video" ? (
            <video controls className="max-w-full max-h-[80vh]" src={media.url}>
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={media.url}
              width={800}
              height={600}
              alt="Media preview"
              className="object-contain max-h-[80vh]"
            />
          )}
        </div>
      </div>
    );
  };

  // Replace the existing Watchdog Reports section with this updated version
  const WatchdogReportsSection = () => (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Watchdog Reports</h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">
            Total Reports: {watchdogReports?.length || 0}
          </span>
        </div>
      </div>

      {watchdogReports?.map((report, index) => {
        const groupedMedia = groupMediaByType(report.media);
        const statusStyle = getStatusStyles(report.status);

        return (
          <div
            key={index}
            className="mb-8 border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Report Header */}
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    Report #{index + 1}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${statusStyle.bg} ${statusStyle.text}`}
                  >
                    {statusStyle.label}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    Submitted:{" "}
                    {new Date(report.submittedAt).toLocaleDateString()}
                  </span>
                  {report.reviewedAt && (
                    <span>
                      Reviewed:{" "}
                      {new Date(report.reviewedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Report Meta Information */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Submission Count:</span>
                  <span className="ml-2 font-medium">
                    {report.resubmissionRequestsCount
                      ? `Original + ${report.resubmissionRequestsCount} revisions`
                      : "Original submission"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Media Items:</span>
                  <span className="ml-2 font-medium">
                    {report.media?.length || 0} files
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Revision Required:</span>
                  <span className="ml-2 font-medium">
                    {report.isResubmissionRequested ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="p-4">
              {/* Media sections by type */}
              {Object.entries(groupedMedia).map(([type, mediaItems]) => (
                <div key={type} className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-700 capitalize">
                      {type} Media
                    </h3>
                    <span className="text-sm text-gray-500">
                      {mediaItems.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mediaItems.map((media, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedMedia(media);
                          setMediaModal(true);
                        }}
                        className="cursor-pointer relative group"
                      >
                        {media.type === "video" ? (
                          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                            <video
                              src={media.url}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                              <span className="text-white">Play Video</span>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-square relative">
                            <Image
                              src={media.url}
                              alt={`${type} ${idx + 1}`}
                              fill
                              className="rounded-lg object-cover group-hover:opacity-90 transition-opacity"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Comments section with enhanced styling */}
              {report.comments && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Assessment Comments
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(report.comments).map(
                      ([key, value], idx) => (
                        <div key={idx} className="p-3 bg-white rounded-lg">
                          <span className="font-medium text-gray-700 block mb-1 capitalize">
                            {key}:
                          </span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Revision History */}
              {report.resubmissions && report.resubmissions.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Revision History
                  </h3>
                  <div className="space-y-3">
                    {report.resubmissions.map((revision, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">
                            Revision #{idx + 1}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(
                              revision.submittedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        {revision.comments && (
                          <p className="text-gray-600 text-sm">
                            {revision.comments}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );

  const getStatusStyles = (status) => {
    const statusMap = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        label: "Pending Review",
      },
      approved: {
        bg: "bg-green-50",
        text: "text-green-700",
        label: "Approved",
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        label: "Rejected",
      },
    };
    return statusMap[status] || statusMap.pending;
  };

  return (
    <div className="w-full relative mt-4 mb-4 px-2 lg:px-6 font-nunitosans">
      {/* Header Section */}
      {isLoading ? (
        <AdminJobDetailsSkeleton />
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <BsArrowLeft size={22} />
              Back to jobs
            </button>
          </div>

          {/* Job Status Banner */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatusCard
                title="Payment Status"
                status={paymentDetails?.status}
                color={
                  paymentDetails?.status === "completed" ? "green" : "yellow"
                }
              />
              <StatusCard
                title="Job Status"
                status={status?.isCompleted ? "Completed" : "In Progress"}
                color={status?.isCompleted ? "green" : "blue"}
              />
              <StatusCard
                title="Watchdog Assignment"
                status={acceptedBy?.watchdog ? "Assigned" : "Pending"}
                color={acceptedBy?.watchdog ? "green" : "yellow"}
              />
              <StatusCard
                title="Reports"
                status={`${watchdogReports?.length || 0} Submitted`}
                color="blue"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {jobTitle}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">{description}</p>
              </section>

              {/* Watchdog Reports Section */}
              <WatchdogReportsSection />
            </div>

            {/* Right Column - Quick Info */}
            <div className="space-y-6">
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Payment Details
                </h2>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">
                      {paymentDetails?.currency} {paymentDetails?.amount}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-semibold">
                      {paymentDetails?.currency} {paymentDetails?.serviceFee}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold">
                      {paymentDetails?.currency} {paymentDetails?.totalAmount}
                    </span>
                  </p>
                </div>
              </section>

              <section className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Client Information
                  </h2>
                  {/* <button
                    onClick={() => setChatModal(true)}
                    className=" text-gray-700 hover:text-gray-900"
                  >
                    <MessageCircle size={22} />
                  </button> */}
                </div>

                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span>{personalInfo?.fullName}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{personalInfo?.email}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{phoneNumber?.primary}</span>
                  </p>
                </div>
              </section>

              {acceptedBy?.watchdog && (
                <section className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Watchdog Information
                  </h2>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>
                        {acceptedBy?.watchdog?.fullName?.firstName}{" "}
                        {acceptedBy?.watchdog?.fullName?.lastName}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span>{acceptedBy?.watchdog?.email}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span>{acceptedBy?.watchdog?.phoneNumber}</span>
                    </p>
                  </div>
                </section>
              )}

              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Job Location
                </h2>
                <p className="text-gray-600">
                  {address?.street}, {address?.city}, {address?.state},{" "}
                  {address?.country}
                </p>
                <p className="text-gray-600">
                  Postal Code: {address?.postalCode}
                </p>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {chatModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Chat with Client</h2>
              <button onClick={() => setChatModal(false)}>
                <RxCross2 size={24} />
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-4">
              {messages?.data?.messages?.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    user?._id === message?.sender ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      user?._id === message?.sender
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message?.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2"
                placeholder="Type a message..."
              />
              <button
                onClick={handleMessageRoute}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                <BsFillSendCheckFill size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {mediaModal && (
        <MediaModal
          media={selectedMedia}
          onClose={() => {
            setMediaModal(false);
            setSelectedMedia(null);
          }}
        />
      )}
    </div>
  );
}

// Helper component for status cards
const StatusCard = ({ title, status, color }) => {
  const colors = {
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="p-4 rounded-lg bg-white border border-gray-200">
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className={`text-lg font-semibold ${colors[color]}`}>{status}</p>
    </div>
  );
};

export default AdminJobDetails;
