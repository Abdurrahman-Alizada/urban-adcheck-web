'use client';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';

function DeleteJob() {
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteJob = () => {
    setDeleteModal(true);
  };

  const closeModal = () => {
    setDeleteModal(false);
  };

  return (
    <div className="w-full mt-4 mb-4 px-2 lg:px-6 relative">
      {/* navigation */}
      <div className="flex items-center gap-3">
        <BsArrowLeft size={22} />
        <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
          <span>1:</span> Oliviya Rhye
        </h2>
      </div>

      {/* Job Image Gallery */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 p-1 bg-[#F6F6F6] rounded-[10px]">
        {/* First Column */}
        <div>
          <Image
            src={'/billboard-horizontal.png'}
            height={404}
            width={337}
            className="object-contain w-full"
            alt="Horizontal Billboard"
          />
        </div>

        {/* Second Column */}
        <div className="space-y-2">
          <Image
            src={'/billboard-rectangle.png'}
            height={197}
            width={337}
            className="object-contain w-full"
            alt="Rectangle Billboard 1"
          />
          <Image
            src={'/billboard-rectangle.png'}
            height={197}
            width={337}
            className="object-contain w-full"
            alt="Rectangle Billboard 2"
          />
        </div>

        {/* Third Column */}
        <div className="space-y-2">
          <Image
            src={'/billboard-square.png'}
            height={197}
            width={300}
            className="object-contain w-full"
            alt="Square Billboard 1"
          />
          <Image
            src={'/billboard-square.png'}
            height={197}
            width={300}
            className="object-contain w-full"
            alt="Square Billboard 2"
          />
        </div>
      </div>

      {/* title & description */}
      <div className="mt-4">
        {/* title */}
        <div className="flex justify-between items-center">
          <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
            Dictum pretium magna ac mattis. Maecenas lobortis
          </h2>
          <span className="mt-2 font-nunitosans text-black font-bold text-[20.03px]"> $:300</span>
        </div>

        <div className="mt-4">
          <span className="mt-2 font-nunitosans text-[#123633] font-bold text-[18.03px]">About</span>
          <p className="mt-2 text-[15.03px] font-nunitosans leading-[22px] from-neutral-400 text-[#767E94]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan felis nunc, ut sagittis augue imperdiet quis. Vestibulum bibendum ultricies ipsum.
          </p>
        </div>

        <div className="mt-4">
          <span className="mt-2 font-nunitosans text-[#123633] font-bold text-[18.03px]">Location</span>
          {/* <UserLocationIframe /> */}
        </div>
      </div>

      {/* buttons */}
      <div className="flex lg:justify-end items-center gap-3">
        <div className="mt-4 ">
          <button
            type="submit"
            className="text-[15px] px-6 lg:px-10 py-2 font-medium bg-transparent border-[1px] text-black rounded-[5px]"
          >
            Archive Job
          </button>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={deleteJob}
            className="text-[15px] px-6 lg:px-10 py-2 font-medium bg-primary text-white rounded-[5px]"
          >
            Delete Job
          </button>
        </div>
      </div>

      {deleteModal && (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
    {/* Modal */}
    <div className="bg-white flex flex-col items-center py-5 px-6 w-[80%] lg:w-[40%] shadow-custom-shadow rounded-md">
      <RxCross2 size={25} color="red" fontWeight={'bold'} onClick={closeModal} />
      <span className="mt-2 text-center font-nunitosans text-black font-bold text-[20.03px]">
        Are you sure you want to delete the job?
      </span>
      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-end items-center gap-3 mt-6">
        <button
          type="button"
          onClick={closeModal}
          className="text-[15px]  px-6 lg:px-10 py-2 font-medium bg-transparent border-[1px] text-black rounded-[5px]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-[15px]  px-6 lg:px-10 py-2 font-medium bg-red-600 text-white rounded-[5px]"
        >
          Delete Job
        </button>
      </div>
    </div>
  </div>
       )}
    </div>
  );
}

export default DeleteJob;
