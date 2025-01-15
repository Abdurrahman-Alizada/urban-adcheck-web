"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import moment from "moment/moment";
import { FaBell } from "react-icons/fa6";
import Image from "next/image";


const Notification = () => {
  

  return (
   
          <div className="absolute top-12 right-0 mt-4 w-96 bg-white rounded-lg shadow-lg">
            <ul>
              <li className="flex justify-between items-center px-4 py-2 border-b ">
                <FaUser className="bg-slate-300 rounded-full w-10 h-10" />
                <p className="text-gray-500 px-2 py-1">
                  Admin approved your order
                </p>
                <span className="text-xs text-gray-400 block">
                  {new moment().format("h:mm A")}
                </span>
              </li>
              <li className="flex justify-between items-center px-4 py-2 border-b ">
                <FaUser className="bg-slate-300 rounded-full w-10 h-10" />
                <p className="text-gray-500 px-2 py-1">
                  Admin approved your order
                </p>
                <span className="text-xs text-gray-400 block">
                  {new moment().format("h:mm A")}
                </span>
              </li>

              <li className="px-4 py-2 text-center text-blue-600 cursor-pointer">
                View All
              </li>
            </ul>
          </div>
       

      
  );
};

export default Notification;
