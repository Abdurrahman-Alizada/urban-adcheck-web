"use client";
import React from "react";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiPhone } from "react-icons/pi";
import { TbMail, TbPackage } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { useGetUserDetailsQuery } from "@/redux/reducers/user/userThunk";
import { useParams } from "next/navigation";
import UserProfileLoader from "@/components/contentLoader/profileContentLoader/page";

const UserProfile = () => {
  const params = useParams();
  const { data: userDetail, isLoading, error } = useGetUserDetailsQuery(params?.userId);
  console.log(userDetail)
  if (isLoading) {
    return (
     <UserProfileLoader />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading user details
      </div>
    );
  }
  const renderClientDetails = (data) => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <TbPackage className="text-blue-500" />
          Subscription Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium text-gray-900">
              {data.isSubscribed ? 
                <span className="text-green-500">Active</span> : 
                <span className="text-red-500">Inactive</span>
              }
            </p>
          </div>
          {data.currentPlan && (
            <>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Package Name</p>
                <p className="font-medium text-gray-900">{data.currentPlan.packageName}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-gray-900">{data.currentPlan.status}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Validity</p>
                <p className="font-medium text-gray-900">{data.currentPlan.validity} days</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Jobs</p>
                <p className="font-medium text-gray-900">{data.currentPlan.totalJobs}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Featured Jobs</p>
                <p className="font-medium text-gray-900">{data.currentPlan.featuredJobs}</p>
              </div>
            </>
          )}
        </div>

        {data.currentPlan?.features && (
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2 text-gray-700">Package Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {/* {data.currentPlan?.features?.map((feature, index) => (
                <div key={index} className="p-2 bg-blue-50 rounded-lg text-sm text-blue-700">
                  {feature}
                </div>
              ))} */}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <BiUser className="text-blue-500" />
          Reviews
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="font-medium text-gray-900">
              {data.clientReviews?.averageRating || "No ratings"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Total Reviews</p>
            <p className="font-medium text-gray-900">
              {data.clientReviews?.totalReviews || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWatchdogDetails = (data) => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <HiOutlineBriefcase className="text-blue-500" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="font-medium text-gray-900">
              {data.ratingDetails?.averageRating || "No ratings"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Total Ratings</p>
            <p className="font-medium text-gray-900">
              {data.ratingDetails?.totalRatings || 0}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Jobs Completed</p>
            <p className="font-medium text-gray-900">{data.jobsCompleted?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserContent = () => {
    if (!userDetail) return null;

    return (
      <div className="space-y-8">
        {/* User Header Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-start gap-6">
            <div className="relative w-24 h-24">
              <Image
                src="/Avatar-2.png"
                fill
                className="rounded-xl object-cover"
                alt="Profile"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {userDetail.data.fullName}
                  </h2>
                  <p className="text-gray-500">@{userDetail.data.userName}</p>
                </div>
                <span className="px-4 py-2 rounded-full text-sm font-medium capitalize bg-blue-50 text-blue-600">
                  {userDetail.role}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <TbMail size={18} />
                  <span>{userDetail.data.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role-specific content */}
        {userDetail.role === "client" && renderClientDetails(userDetail.data)}
        {userDetail.role === "watchdog" && renderWatchdogDetails(userDetail.data)}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-500">View and manage user information</p>
        </div>
        {renderUserContent()}
      </div>
    </div>
  );
};

export default UserProfile;