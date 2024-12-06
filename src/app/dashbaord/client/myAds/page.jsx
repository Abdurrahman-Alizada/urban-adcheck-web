import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsThreeDots } from "react-icons/bs";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MdDone } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";

function Myads() {


      // action items 3 dots
  const actionItems = [
    {
      icon: <IoEyeOutline size={16} color="#767E94" className="cursor-pointer" />,
      text: 'View job details',
    },
    {
      icon: <TiDeleteOutline size={16} color="#767E94" className="cursor-pointer" />,
      text: 'Mark it expire',
    },
    {
      icon: <RiDeleteBin6Line size={16} color="#767E94" className="cursor-pointer" />,
      text: 'Delete job',
    },
  ];


  return (
    <div className="w-full  bg-gray-50">
      {/* Search and Filters Section */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full sm:w-[40%]">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-3 text-primary"
            size="sm"
          />
          <input
            type="text"
            placeholder="Ads title, Keywords..."
            className="w-full border border-gray-300 text-[16px] rounded-[5px] pl-10 py-2 focus:outline-primary"
          />
        </div>

        {/* Filters */}
        <div className="w-full sm:w-[60%] flex flex-wrap gap-4">
          {/* Category Filter */}
          <select
            name="category"
            className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary"
          >
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
          </select>

          {/* Recently Posted Filter */}
          <select
            name="recentlyPosted"
            className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary"
          >
            <option value="">Recently Posted</option>
            <option value="1">1 Day Ago</option>
            <option value="7">7 Days Ago</option>
          </select>

          {/* All Posted Filter */}
          <select
            name="allPosted"
            className="flex-1 border text-grayColor border-gray-300 text-[15px] px-3 py-2 rounded-[5px] focus:outline-primary"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </section>

      {/* My Ads Table */}
 <div className="overflow-x-auto w-full">
  <table className="w-full border table-fixed border-gray-300 bg-white rounded-md shadow-sm">
    {/* table head */}
    <thead className="bg-gray-100 text-gray-600 text-left">
      <tr>
        <th className="text-[18px] font-nunitosans px-4 py-2">Ads</th>
        <th className="text-[18px] font-nunitosans py-2">Title</th>
        <th className="text-[18px] font-nunitosanspy-2">Date</th>
        <th className="text-[18px] font-nunitosans py-2">Price</th>
        <th className="text-[18px] font-nunitosans py-2">Status</th>
        <th className="text-[18px] font-nunitosanspy-2">Actions</th>
      </tr>
    </thead>
    {/* table body */}
    <tbody className='w-full'>
      {/* Ad Item */}
      <tr className="w-full border-t border-gray-200 hover:bg-gray-50">
        <td className="px-2 py-3">
          <Image
            src="/img-jobs.png"
            width={75}
            height={75}
            alt="Job Image"
            className="rounded-md"
          />
        </td>
        <td className="px-2 py-3 text-[14.5px]">Canon EOS Rebel SL3 / EOS 250D</td>
        <td className="px-2 py-3 text-gray-500 text-[14.5px]">Jul 13, 2021</td>
        <td className="px-2 py-3 text-gray-500 text-[14.5px]">$250.00</td>
        <td className="px-2 py-3 text-[14.5px] text-green-500 flex items-center gap-2">
          <MdDone size={16} />
            Completed
        </td>
        <td className="px-2 py-3 flex items-center gap-1 ">
          <div className='bg-[#F5F7FA] hover:text-white hover:bg-[#00AAFF] px-2 py-2 flex gap-1'>
          <CiEdit size={20} className="cursor-pointer" />
          <button className="text-primary hover:text-white  text-[14.5px]">Edit</button>
          </div>
          <BsThreeDots size={40}  className="cursor-pointer text-gray-600 bg-[#F5F7FA] hover:text-white hover:bg-[#00AAFF] px-1 py-2" />
        </td>
        
      </tr>
    </tbody>
  </table>
</div> 
       {/* three dots popup */}
         <div className="w-[20%] p-2 rounded-[10px] shadow-custom-shadow">
             {actionItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 hover:bg-[#E8F7FF] p-1">
              {item.icon}
              <span className="text-[14px] text-grayColor">{item.text}</span>
             </div>
           ))}
         </div>
    </div>
  );
}

export default Myads;
