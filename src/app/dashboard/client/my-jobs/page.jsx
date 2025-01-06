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


function MyJobs() {

  const {data:jobs,isError,isLoading}=useJobListQuery();
 console.log(jobs);


  const [activeRow, setActiveRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // jobs data for dynamic rendering
  const JobsData = [
    {
      id: 1,
      title: "Apple MacBook Pro 17",
      date: "Jul 13, 2021",
      price: "$533.39",
      status: "Complete",
      image: "/ads-img.png",
    },
    {
      id: 2,
      title: "Samsung Galaxy S21",
      date: "Aug 25, 2021",
      price: "$999.99",
      status: "Pending",
      image: "/ads-img.png",
    },
    {
      id: 3,
      title: "Sony WH-1000XM4",
      date: "Sep 5, 2021",
      price: "$349.00",
      status: "Complete",
      image: "/ads-img.png",
    },
  ];

  // Filter Jobs based on the search query
  const filteredJobs = jobs?.data?.jobs?.filter((job) =>
    job?.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredJobs)
  // Toggle the popup for specific row
  const togglePopup = (rowId) => {
    setActiveRow((prevRow) => (prevRow === rowId ? null : rowId));
  };

  // Action items for the three dots menu
  const actionItems = [
    {
      icon: <IoEyeOutline size={16} color="#767E94" className="cursor-pointer" />,
      text: "View job details",
    },
    {
      icon: <TiDeleteOutline size={16} color="#767E94" className="cursor-pointer" />,
      text: "Mark it expire",
    },
    {
      icon: <RiDeleteBin6Line size={16} color="#767E94" className="cursor-pointer" />,
      text: "Delete job",
    },
  ];
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000);
   
  }
  const selectedCategory=(v)=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000);
  }

  const recentlyPosted=(v)=>{
     setLoading(true)
     setTimeout(() => {
      setLoading(false)
     }, 4000);
  }

  const allJobs=(v)=>{
    setLoading(true)
    setTimeout(() => {
     setLoading(false)
    }, 4000);
 }

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
          <select onChange={(e) => selectedCategory(e.target.value)}  className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary">
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
          <select onChange={(e) => recentlyPosted(e.target.value)} className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary">
            <option value="">Recently Posted</option>
            <option value="1">1 Day Ago</option>
            <option value="7">7 Days Ago</option>
          </select>
          <select onChange={(e) => allJobs(e.target.value)} className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary">
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </section>

      {/* My Jobs Table */}
      <ul className="w-full text-sm text-left rtl:text-right text-gray-500">
  {/* Header */}
  <li className="border-b-[1px] grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 font-normal">
    <span className="text-[13px]">Jobs</span>
    <span className="text-[13px]">Date</span>
    <span className="text-[13px]">Prices</span>
    <span className="text-[13px]">Status</span>
    <span className="text-[13px]">Action</span>
  </li>

  {/* Loading State */}
  {loading ? (
    [...Array(4)].map((_, index) => (
      <li
        key={index}
        className="hover:rounded-md hover:shadow-custom-hover grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4"
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
  ) : (
    filteredJobs?.map((job) => (
      <li
        key={job?._id}
        className="hover:rounded-md hover:shadow-custom-hover grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4"
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
        <span className="text-[13px]">$CAD{job?.paymentDetails?.perJobPayment?.price}</span>
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
          <button onClick={() => togglePopup(job?._id)} className="relative">
            <BsThreeDots
              size={45}
              className="cursor-pointer text-gray-600 bg-[#F5F7FA] hover:text-white hover:bg-[#00AAFF] rounded-md px-2 py-2"
            />
          </button>
          {activeRow === job?._id && (
            <div className="absolute top-25 right-[10%] z-10 w-[200px] bg-white shadow-lg rounded-md">
              {actionItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 hover:bg-[#E8F7FF] p-2"
                >
                  {item.icon}
                  <span className="text-[14px] text-grayColor">{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </li>
    ))
  )}
</ul>

    </div>
  );
}

export default MyJobs;

