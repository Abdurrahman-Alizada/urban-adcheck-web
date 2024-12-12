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
import { IoIosSquareOutline } from "react-icons/io";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FcCheckmark } from "react-icons/fc";


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
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 font-nunitosans font-normal text-[13px] leading-[18px]">
                   Ads
                </th>
                <th scope="col" className="px-6 py-3 font-nunitosans font-normal text-[13px] leading-[18px]">
                    Date
                </th>
                <th scope="col" className="px-6 py-3 font-nunitosans font-normal text-[13px] leading-[18px]">
                    Prices
                </th>
                <th scope="col" className="px-6 py-3 font-nunitosans font-normal text-[13px] leading-[18px]">
                    Status
                </th>
                <th scope="col" className="px-6 py-3 font-nunitosans font-normal text-[13px] leading-[18px]">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

          <tr className="">
              <th scope="row" className="px-4 py-4 font-nunitosans font-semibold text-[14.5px] leading-[18px] text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                  <Image 
                      src={'/ads-img.png'} 
                      width={74} 
                      height={74} 
                      alt='job-image' 
                      className='object-contain rounded-[7px]'
                  />
                  Apple MacBook Pro 17"
              </th>
              <td className="px-4 py-4 font-nunitosans font-normal text-[13px]">
                  Jul 13, 2021
              </td>
              <td className="px-4 py-4 font-nunitosans font-normal text-[13px]">
                  $ 533.39
              </td>
              <td className="px-4 py-4 font-nunitosans font-normal text-[13px] text-[#27C200] ">
                <span>✓</span> Complete
              </td>

              <td className="px-1 py-4 ">
                  <div className='bg-[#F5F7FA]  w-[70px] flex items-center gap-3  '>
                      
                      <button className="text-gray-700 hover:bg-[#00AAFF] hover:text-white text-[14.5px] flex gap-2 py-2 px-2 rounded-md"><CiEdit size={20} className="cursor-pointer" /> Edit</button>
                      <button className='py-2 px-1'><BsThreeDots size={20} className="cursor-pointer text-gray-600 bg-[#F5F7FA] hover:text-white hover:bg-[#00AAFF] rounded-md "/> 
                      </button>
                   </div>   
                      
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
