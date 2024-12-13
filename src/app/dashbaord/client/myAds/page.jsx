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

function Myads() {
  const [activeRow, setActiveRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  // Ads data for dynamic rendering
  const adsData = [
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

  // Filter ads based on the search query
  const filteredAds = adsData.filter((ad) =>
    ad.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="w-full p-2 relative bg-[#FFFFFF] overflow-hidden">
      {/* Search and Filters Section */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
          {/* search for ads */}
        <div className="relative w-full sm:w-[40%]">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-3 text-primary"
            size="sm"
          />
          <input
            type="text"
            placeholder="Ads title, Keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 text-[16px] rounded-[5px] pl-10 py-2 focus:outline-primary"
          />
        </div>
        {/* filters */}
        <div className="w-full sm:w-[60%] flex flex-wrap gap-4">
          <select className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary">
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>
          <select className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary">
            <option value="">Recently Posted</option>
            <option value="1">1 Day Ago</option>
            <option value="7">7 Days Ago</option>
          </select>
          <select className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary">
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </section>

      {/* My Ads Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="border-b-[1px]">
            <tr>
              <th className="px-6 py-3 text-[13px] font-normal">Ads</th>
              <th className="px-6 py-3 text-[13px] font-normal">Date</th>
              <th className="px-6 py-3 text-[13px] font-normal">Prices</th>
              <th className="px-6 py-3 text-[13px] font-normal">Status</th>
              <th className="px-6 py-3 text-[13px] font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAds.map((ad) => (
              <tr
                key={ad.id}
                className="hover:rounded-md hover:shadow-custom-hover"
              >
                <td className="px-4 py-4 flex items-center gap-2 text-[14.5px] font-semibold text-gray-900">
                  <Image
                    src={ad.image}
                    width={74}
                    height={74}
                    alt="job-image"
                    className="object-contain rounded-[7px]"
                  />
                  {ad.title}
                </td>
                <td className="px-4 py-4 text-[13px]">{ad.date}</td>
                <td className="px-4 py-4 text-[13px]">{ad.price}</td>
                <td
                  className={`px-4 py-4 text-[13px] ${
                    ad.status === "Complete"
                      ? "text- [#27C200]"
                      : ad.status === "Active"
                      ? "text-[#007BFF]"
                      : "text-[#FF4F4F]"
                  }`}
                >
                  ✓ {ad.status}
                </td>
                <td className="px-1 py-4">
                  <div className="flex items-center gap-1">
                    <button className="text-gray-700 bg-[#F5F7FA] hover:bg-[#00AAFF] hover:text-white text-[14.5px] flex gap-2 py-2 px-2 rounded-md">
                      <CiEdit size={20} className="cursor-pointer" />
                      Edit
                    </button>
                    <button onClick={() => togglePopup(ad.id)} className="relative">
                      <BsThreeDots
                        size={45}
                        className="cursor-pointer text-gray-600 bg-[#F5F7FA] hover:text-white hover:bg-[#00AAFF] rounded-md px-2 py-2"
                      />
                    </button>
                  </div>
                  {activeRow === ad.id && (
                    <div className="absolute top-25 right-[10%] z-10 w-[200px] bg-white shadow-lg rounded-md">
                      {actionItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 hover:bg-[#E8F7FF] p-2"
                        >
                          {item.icon}
                          <span className="text-[14px] text-grayColor">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Myads;

