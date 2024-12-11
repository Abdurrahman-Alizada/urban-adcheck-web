import React from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { IoFilter } from "react-icons/io5";
import { IoIosSquareOutline } from "react-icons/io";
import Image from 'next/image';
import { IoMdCheckboxOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";


function FinancialOverview() {

    const cardsData = [
        {
          title: 'Posted jobs',
          jobs: '43',
          image: '/posted-jobs.png',
          alt: 'posted-jobs',
          checkbox : 'IoMdCheckboxOutline icon={20}',
        },
        {
          title: 'In progress',
          jobs: '43',
          image: '/in-progress.png',
          alt: 'posted-jobs',
        },
        {
          title: 'Pending jobs',
          jobs: '443',
          image: '/pending-jobs.png',
          alt: 'pending-jobs',
        },
        {
          title: 'Completed jobs',
          jobs: '23',
          image: '/Completed-jobs.png',
          alt: 'completed-jobs',
        },
      ];

  return (
    <div className='w-full mt-4 mb-10'>
        {/* Section Header */}
        <div className="flex gap-4 items-center">
            <BsArrowLeft size={22} />
            <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
            Requested Jobs
            </h2>
        </div>
        {/* Jobs List */}
        <div className='b-[1px] rounded-[5px] shadow-custom-shadow'>
            {/* Job List Header */}
            <div className='px-5 py-3 flex items-center gap-4'>
            <h3 className="text-gray-700 text-[16px] lg:text-[20px] font-extrabold font-Archivoo">
                Jobs Requests
            </h3>
            <span className='bg-[#F9F5FF] p-1 text-[#6941C6] rounded-[20px]'>
                100
            </span>
            <IoFilter size={25} />

            <div className='w-[50%]'>
                <div className='bg-white shadow-custom-shadow rounded-md flex flex-col p-4'>
                <div className='flex justify-between items-center'>
                    <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
                    Filters Jobs
                    </h2>
                    <RxCross1 size={40} color='#068179' className='bg-[#EBECF5] rounded-full p-1' />
                </div>
                {cardsData.map((card, index) => (
                    <div
                    key={index}
                    className="flex justify-between items-center rounded-lg px-3 py-6"
                    >
                    <div className="flex ">
                        <Image
                            src={card.image}
                            width={68}
                            height={68}
                            alt={card.alt}
                            className="object-contain "
                        />
                        <div className='flex flex-col'>
                            <span className="text-[18px] font-semibold">{card.title}</span>
                            <span className="text-gray-500 text-[16px]">{card.jobs}</span>
                        </div>
                    </div>
                    
                    </div>
                ))}
                </div>
            </div>
            </div>

            {/* Job List Table */}
            <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-grayColor font-normal capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 font-normal flex items-center gap-1">
                    <IoIosSquareOutline size={20} />
                    Name
                    </th>
                    <th scope="col" className="font-normal px-6 py-3">
                    Location
                    </th>
                    <th scope="col" className="font-normal px-6 py-3">
                    Charge ($)
                    </th>
                    <th scope="col" className="font-normal px-6 py-3">
                    Action
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                    scope="row"
                    className="flex gap-2 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                    <span className='font-bold'>1</span>
                    <Image
                        src="/img-jobs.png"
                        width={45}
                        height={45}
                        alt="Job Image"
                        className="rounded-md"
                    />
                    <h4 className='text-[14px]'>Building Horse</h4>
                    </th>
                    <td className="px-5 py-4 text-[14px] leading-tight">
                    A Block st41, H20
                    </td>
                    <td className="px-4 py-4">
                    <span className='bg-[#CEFEFB] px-2 py-1 text-[#068179] text-[14px] rounded-[20px]'>
                        $100
                    </span>
                    </td>
                    <td className="px-4 py-4 flex justify-between items-center">
                    <div className='flex justify-between gap-3'>
                        <IoMdCheckboxOutline size={20} />
                        <RiDeleteBin6Line size={20} />
                    </div>
                    <button
                        type="submit"
                        className="text-[13px] lg:text-[15px] px-1 xl:px-3 py-1 font-medium bg-primary text-white rounded-[10px]"
                    >
                        See details
                    </button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>

    </div>

  )
}

export default FinancialOverview
