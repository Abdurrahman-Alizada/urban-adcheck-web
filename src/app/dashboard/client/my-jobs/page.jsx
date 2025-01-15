"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsThreeDots } from "react-icons/bs";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import JobsListContentLoader from "@/components/contentLoader/jobsListContentLoader/page";
import { useJobListQuery } from "@/redux/reducers/jobs/jobThunk";
import Link from "next/link";
import { useRouter } from "next/navigation";

function MyJobs() {
  const { data: jobs, isError, isLoading } = useJobListQuery();
  console.log(jobs);

  // all states for this page
  const [activeRow, setActiveRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExpirePopup, setShowExpirePopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // router
  const router = useRouter();
  // Filter Jobs based on the search query
  const filteredJobs = jobs?.data?.jobs?.filter((job) =>
    job?.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredJobs);
  // Toggle the popup for specific row
  const togglePopup = (rowId) => {
    setActiveRow((prevRow) => (prevRow === rowId ? null : rowId));
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };
  // ui loading for category filter
  const selectedCategory = (v) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };
  // ui loading for recentlyPosted filter
  const recentlyPosted = (v) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };
  // ui loading for allJobs filter
  const allJobs = (v) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  //  mark as expire popup
  const handleMarkAsExpire = (job) => {
    setSelectedJob(job);
    setShowExpirePopup(true);
  };

  const handleDeletePopup = (job) => {
    setSelectedJob(job);
    setShowDeletePopup(true);
  };

  return (
    <div className="w-full p-2 relative bg-[#FFFFFF] overflow-hidden">
      {/* Search and Filters Section */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
        {/* search for Jobs */}
        <div className="relative w-full sm:w-[40%]">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-3 text-primary"
            size="sm"
          />
          <input
            type="text"
            placeholder="Jobs title, Keywords..."
            value={searchQuery}
            onChange={handleChange}
            // onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 text-[16px] rounded-[5px] pl-10 py-2 focus:outline-primary"
          />
        </div>
        {/* filters */}
        <div className="w-full sm:w-[60%] flex flex-wrap gap-4">
          <select
            onChange={(e) => selectedCategory(e.target.value)}
            className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary"
          >
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
          <select
            onChange={(e) => recentlyPosted(e.target.value)}
            className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary"
          >
            <option value="">Recently Posted</option>
            <option value="1">1 Day Ago</option>
            <option value="7">7 Days Ago</option>
          </select>
          <select
            onChange={(e) => allJobs(e.target.value)}
            className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </section>

      {/* My Jobs Table */}
      <div className="relative w-full">
        <ul className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500">
          {/* Header */}
          <li className="border-b-[1px] grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 font-normal min-w-[600px]">
            <span className="text-[13px]">Jobs</span>
            <span className="text-[13px]">Date</span>
            <span className="text-[13px]">Prices</span>
            <span className="text-[13px]">Status</span>
            <span className="text-[13px]">Action</span>
          </li>
          {/* Loading State */}
          {loading
            ? [...Array(4)].map((_, index) => (
                <li
                  key={index}
                  className="hover:rounded-md hover:shadow-custom-hover grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4 min-w-[600px]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-[74px] h-[74px] bg-gray-400/30 rounded-md shimmer"></div>
                    <p className="bg-gray-400/30 px-16 py-3 shimmer"></p>
                  </div>
                  <p className="bg-gray-400/30 px-14 py-3 shimmer"></p>
                  <p className="bg-gray-400/30 px-14 py-3 shimmer"></p>
                  <p className="bg-gray-400/30 px-14 py-3 shimmer"></p>
                  <div className="flex gap-1">
                    <div className="px-5 py-4 bg-gray-400/30 rounded-md shimmer"></div>
                    <div className="px-4 py-4 bg-gray-400/30 rounded-md shimmer"></div>
                  </div>
                </li>
              ))
            : filteredJobs?.map((job) => (
                <li
                  key={job?._id}
                  className="hover:rounded-md hover:shadow-custom-hover grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4 min-w-[600px]"
                >
                  <div className="flex items-center gap-2 text-[14.5px] font-semibold text-gray-900">
                    <Image
                      src={job?.jobCoverImage || "/fallback-image.jpg"}
                      width={74}
                      height={74}
                      alt={job?.jobTitle || "job-image"}
                      className="object-contain rounded-[7px]"
                    />
                    <span title={job?.jobTitle}>{job?.jobTitle}</span>
                  </div>
                  <span className="text-[13px]">{job?.dueTime}</span>
                  <span className="text-[13px]">
                    $CAD {job?.paymentDetails?.perJobPayment?.price}
                  </span>
                  <span
                    className={`text-[13px] ${
                      job?.paymentDetails?.status === "Complete"
                        ? "text-[#27C200]"
                        : job?.paymentDetails?.status === "Active"
                        ? "text-[#007BFF]"
                        : "text-[#FF4F4F]"
                    }`}
                  >
                    ✓ {job?.paymentDetails?.status}
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="text-gray-700 bg-[#F5F7FA] hover:bg-[#00AAFF] hover:text-white text-[14.5px] flex gap-2 py-3 px-2 rounded-md">
                      <CiEdit size={20} className="cursor-pointer" />
                      Edit
                    </button>
                    <button
                      onClick={() => togglePopup(job?._id)}
                      className="relative"
                    >
                      <BsThreeDots
                        size={45}
                        className="cursor-pointer text-gray-600 bg-[#F5F7FA] hover:text-white hover:bg-[#00AAFF] rounded-md px-2 py-2"
                      />
                    </button>
                    {activeRow === job?._id && (
                      <div className="absolute top-25 right-[10%] z-10 w-[200px] bg-white shadow-lg rounded-md">
                        <div className="flex items-center gap-2 hover:bg-[#E8F7FF] p-2 cursor-pointer">
                          <IoEyeOutline size={16} color="#767E94" />
                          <span
                            onClick={() =>
                              router.push(
                                `/dashboard/client/my-jobs/${job?._id}`
                              )
                            }
                            className="text-[14px] text-grayColor"
                          >
                            View job details
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-2 hover:bg-[#E8F7FF] p-2 cursor-pointer"
                          onClick={() => handleMarkAsExpire(job)}
                        >
                          <TiDeleteOutline size={16} color="#767E94" />
                          <span className="text-[14px] text-grayColor">
                            Mark it expire
                          </span>
                        </div>
                        <div
                          onClick={() => handleDeletePopup(job)}
                          className="flex items-center gap-2 hover:bg-[#E8F7FF] p-2 cursor-pointer"
                        >
                          <RiDeleteBin6Line size={16} color="#767E94" />
                          <span className="text-[14px] text-grayColor">
                            Delete job
                          </span>
                        </div>
                      </div>
                    )}

                    {showExpirePopup && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                          <h2 className="text-xl font-semibold mb-4">
                            Mark Job as Expire
                          </h2>
                          <p className="text-gray-600 mb-6">
                            Are you sure you want to mark the job{" "}
                            <strong>{selectedJob?.jobTitle}</strong> as expired?
                          </p>
                          <div className="flex justify-end gap-4">
                            <button
                              onClick={() => setShowExpirePopup(false)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                // Handle job expiry logic here
                                console.log(
                                  `Job ${selectedJob?.jobTitle} marked as expired.`
                                );
                                setShowExpirePopup(false);
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              Mark Expired
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {showDeletePopup && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
                          <h2 className="text-xl font-semibold mb-4">
                            Delete The Job
                          </h2>
                          <p className="text-gray-600 mb-6">
                            Are you sure you want{" "}
                            <strong>{selectedJob?.jobTitle}</strong> to be
                            deleted?
                          </p>
                          <div className="flex justify-end gap-4">
                            <button
                              onClick={() => setShowDeletePopup(false)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                console.log(
                                  `Job ${selectedJob?.jobTitle} deleted`
                                );
                                setShowDeletePopup(false);
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default MyJobs;
