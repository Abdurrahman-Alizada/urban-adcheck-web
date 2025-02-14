"use client";
import React, { useState } from "react";
import Image from "next/image";
// import GoogleMapComponent from '../googleMap/page';
import { BsArrowLeft } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAcceptOrRejectWatchdogMutation } from "@/redux/reducers/jobs/jobThunk";
import { FaS } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import FeedbackForm from "./feedbackForm";
import { useGetCurrentLoginUserQuery } from "@/redux/reducers/user/userThunk";
import { useGetReviewOfJobQuery } from "@/redux/reducers/reviews/reviewThunk";
import FeedbackFormFreelancer from "./feedbackFormFreelancer";

const JobDetailsSection = ({ jobDetails, setDeliveryModal, setChatModal }) => {
  console.log("jobdetails",jobDetails)
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaModal, setMediaModal] = useState(false);
  const [acceptOrRejectWatchdog] = useAcceptOrRejectWatchdogMutation();
  //Get query for getReviewOfJob
  const { data: reviewData, isLoading: reviewLoading, error: reviewError } = useGetReviewOfJobQuery(jobDetails?.data?._id);
  const { data: currentLoginUser, isLoading, error } = useGetCurrentLoginUserQuery();
  const {
    jobTitle,
    description,
    paymentDetails,
    address,
    phoneNumber,
    personalInfo,
    acceptedBy,
    watchdogReports,
    status,
  } = jobDetails?.data || {};

  const router = useRouter();

  // chat modal
  const handleChatModal = () => {
    setChatModal(true);
  };
  // delivery modal
  const handleViewDelievery = () => {
    setDeliveryModal(true);
  };

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

            {
              report.status === "pending" && currentLoginUser?.role?.isClient == true && (
                <div className="flex justify-start gap-4 mt-4">
                  <button
                    onClick={rejectDelivery}
                    className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-gray-300"
                  >
                    Submit a revision
                  </button>
                  <button
                    onClick={() => acceptDelivery(report._id)}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-red-700"
                  >
                    Accept Delivery
                  </button>
                </div>
              )
            }

          {/* client review and form  */}

            {
                !(report.status === "pending") &&
             (
              currentLoginUser?.role?.isClient == true && report.status === "accepted" && (reviewData?.reviews[0]?.client?.reviewText || "").trim().length === 0
              ?
                <FeedbackForm jobDetails={jobDetails} />
                :
                <>
                  <div className="flex flex-col justify-start gap-4 mt-4   p-4 rounded-lg bg-white">
                    {
                      currentLoginUser?.role?.isClient == true && (reviewData?.reviews[0]?.client?.reviewText || "").trim().length > 0 &&
                     (
                     <>
                          <h3 className="font-bold">My Review</h3>
                          <div className="flex  flex-col gap-2 drop-shadow-md p-4 rounded-lg bg-gray-50">

                          <h3 className="font-semibold">{`${jobDetails?.data?.personalInfo?.fullName || ''}`.trim()}</h3>

                            <p>{reviewData?.reviews[0]?.client?.reviewText}</p>
                            <div className="flex items-center gap-2">
                              {
                                Array.from({ length: reviewData?.reviews[0]?.client?.numberOfStars }, (_, index) => (
                                  <FaStar key={index} size={20} color="#FFD700" />
                                ))
                              }
                              <span>{reviewData?.reviews[0]?.client?.numberOfStars}</span>

                            </div>
                          </div>
                        </>
                     )
                    }
                    {
                   currentLoginUser?.role?.isWatchDog == true && (reviewData?.reviews[0]?.client?.reviewText || "").trim().length > 10 &&
                 (
                        <>
                          <h3 className="font-bold">Client Review</h3>
                          <div className="flex  flex-col gap-2 drop-shadow-md p-4 rounded-lg bg-gray-50">

                          <h3 className="font-semibold">{`${jobDetails?.data?.personalInfo?.fullName || ''}`.trim()}</h3>

                            <p>{reviewData?.reviews[0]?.client?.reviewText}</p>
                            <div className="flex items-center gap-2">
                              {
                                Array.from({ length: reviewData?.reviews[0]?.client?.numberOfStars }, (_, index) => (
                                  <FaStar key={index} size={20} color="#FFD700" />
                                ))
                              }
                              <span>{reviewData?.reviews[0]?.client?.numberOfStars}</span>

                            </div>
                          </div>
                        </>
                 )
                    }
                  </div>
                </>
             )
            }


          {/* watchdog review and form  */}
            {
              !(report.status === "pending") &&  
                (
                  !((reviewData?.reviews[0]?.client?.reviewText || "").trim().length === 0) &&
              (
              currentLoginUser?.role?.isWatchDog == true && report.status === "accepted" && (reviewData?.reviews[0]?.watchdog?.reviewText || "").trim().length === 0
              ?
                <FeedbackFormFreelancer jobDetails={jobDetails} reviewData={reviewData} />
                :
                <>
                <div className="flex flex-col justify-start gap-4 mt-4 p-4 rounded-lg bg-white">
                  {
                    (
                       currentLoginUser?.role?.isWatchDog == true &&
                       (reviewData?.reviews[0]?.watchdog?.reviewText || "").trim().length > 10 )
                       &&
                        (
                      <>
                        <h3 className="font-bold">My Review</h3>
                        <div className="flex flex-col gap-2 drop-shadow-md p-4 rounded-lg bg-gray-50">
                        <h3 className="font-semibold">{`${jobDetails?.data?.acceptedBy?.watchdog?.fullName?.firstName || ''} ${jobDetails?.data?.acceptedBy?.watchdog?.fullName?.lastName || ''}`.trim()}</h3>
                          <p>{reviewData?.reviews[0]?.client?.reviewText}</p>
                          <div className="flex items-center gap-2">
                            {
                              Array.from({ length: reviewData?.reviews[0]?.client?.numberOfStars }, (_, index) => (
                                <FaStar key={index} size={20} color="#FFD700" />
                              ))
                            }
                            <span>{reviewData?.reviews[0]?.watchdog?.numberOfStars}</span>
                          </div>
                        </div>
                      </>
                      )
                  }

                  {
                    currentLoginUser?.role?.isClient == true && (reviewData?.reviews[0]?.watchdog?.reviewText || "").trim().length > 10 &&
                      <>
                        <h3 className="font-bold">Freelancer Review</h3>
                        <div className="flex  flex-col gap-2 drop-shadow-md p-4 rounded-lg bg-gray-50">

                        <h3 className="font-semibold">{`${jobDetails?.data?.acceptedBy?.watchdog?.fullName?.firstName || ''} ${jobDetails?.data?.acceptedBy?.watchdog?.fullName?.lastName || ''}`.trim()}</h3>

                          <p>{reviewData?.reviews[0]?.watchdog?.reviewText}</p>
                          <div className="flex items-center gap-2">
                            {
                              Array.from({ length: reviewData?.reviews[0]?.watchdog?.numberOfStars }, (_, index) => (
                                <FaStar key={index} size={20} color="#FFD700" />
                              ))
                            }
                            <span>{reviewData?.reviews[0]?.watchdog?.numberOfStars}</span>

                          </div>
                        </div>
                      </>
                  }
                </div>
              </>
        )
                )
            }

           
          </div>
        );
      })}
      {/* Modal Buttons */}
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
      accepted: {
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

  const acceptDelivery = (reportId) => {
    let data = {
      body: {
        action: "accept",
      },
      jobId: jobDetails?.data?._id,
      reportId: reportId,
    };
    acceptOrRejectWatchdog(data).then((res) => {
      console.log("delivery accepted ", res);
    });
  };

  const rejectDelivery = () => {
    let data = {
      body: {
        action: "reject",
        comments: "Please provide additional images.",
        requestResubmission: true,
      },
      jobId: "",
      reportId: "",
    };
    acceptOrRejectWatchdog(data).then((res) => {
      console.log("first ", res);
    });
  };



  return (
    <div>
      {/* Back to jobs */}
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
            color={paymentDetails?.status === "completed" ? "green" : "yellow"}
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
          
            <p className="text-gray-600">{description}</p>
          </section>

          {/* Watchdog Reports Section */}
          <WatchdogReportsSection />
        </div>
        {/* Right Column - Quick Info */}
        <div className="space-y-6">
          {/* payment details */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Payment Details
            </h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">
                  $CAD {paymentDetails?.amount}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Service Fee:</span>
                <span className="font-semibold">
                  $CAD {paymentDetails?.serviceFee}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold">
                  $CAD {paymentDetails?.totalAmount}
                </span>
              </p>
            </div>
          </section>

          {
            currentLoginUser?.role?.isWatchDog == true && acceptedBy?.watchdog ? (
              // Client Information
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Client Information</h2>
                </div>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span>{personalInfo?.fullName || "N/A"}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{personalInfo?.email || "N/A"}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{phoneNumber?.primary || "N/A"}</span>
                  </p>
                </div>
              </section>
            ) : currentLoginUser?.role?.isClient == true ? (
              // Watchdog Information
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Watchdog Information</h2>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span>
                      {acceptedBy?.watchdog?.fullName?.firstName || "N/A"}{" "}
                      {acceptedBy?.watchdog?.fullName?.lastName || "N/A"}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{acceptedBy?.watchdog?.email || "N/A"}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{acceptedBy?.watchdog?.phoneNumber || "N/A"}</span>
                  </p>
                  <button
                    onClick={handleChatModal}
                    className="h-8 md:h-12 px-3 md:px-6 py-2 text-xl rounded-[10px] bg-secondary text-white hover:bg-primary"
                  >
                    Chat Now
                  </button>
                  {/* <button
                    onClick={handleViewDelievery}
                    className="h-8 md:h-12 px-3 md:px-6 py-2 text-[10px] md:text-[16px] rounded-[10px] bg-primary text-white hover:bg-primary"
                  >
                    View Delivery
                  </button> */}
                </div>
              </section>
            ) : (
              currentLoginUser?.role?.isAdmin == true &&
              <>
                {/* Default Case: Client Information */}
                <section className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Client Information</h2>
                  </div>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>{personalInfo?.fullName || "N/A"}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span>{personalInfo?.email || "N/A"}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span>{phoneNumber?.primary || "N/A"}</span>
                    </p>
                  </div>
                </section>

                {/* Default Case: Watchdog Information */}
                <section className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Watchdog Information</h2>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>
                        {acceptedBy?.watchdog?.fullName?.firstName || "N/A"}{" "}
                        {acceptedBy?.watchdog?.fullName?.lastName || "N/A"}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span>{acceptedBy?.watchdog?.email || "N/A"}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span>{acceptedBy?.watchdog?.phoneNumber || "N/A"}</span>
                    </p>
                    <button
                      onClick={handleChatModal}
                      className="h-8 md:h-12 px-3 md:px-6 py-2 text-xl rounded-[10px] bg-secondary text-white hover:bg-primary"
                    >
                      Chat Now
                    </button>
                    <button
                      onClick={handleViewDelievery}
                      className="h-8 md:h-12 px-3 md:px-6 py-2 text-[10px] md:text-[16px] rounded-[10px] bg-primary text-white hover:bg-primary"
                    >
                      View Delivery
                    </button>
                  </div>
                </section>

              </>
            )
          }



          {/* Job Location */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Job Location
            </h2>
            <p className="text-gray-600">
              {address?.street}, {address?.city}, {address?.state},{" "}
              {address?.country}
            </p>
            <p className="text-gray-600">Postal Code: {address?.postalCode}</p>
          </section>

          {/* <GoogleMapComponent /> */}
        </div>
      </div>

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
};

export default JobDetailsSection;

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
