"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
// import moment from "moment/moment";
import { FaBell } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetAllNotificationQuery } from "@/redux/reducers/notification/notificationThunk";


const Notification = ({setShowNotifications}) => {
  
  const router=useRouter();
  const {data:notification}=useGetAllNotificationQuery();
  console.log("notificaton",notification)

  const handleViewAllNotification=()=>{
    router.push("/dashboard/client/notification");
    setShowNotifications(false);
  }
  return (
   
          <div className="absolute z-50 top-12 right-0 mt-4 w-96 bg-white rounded-lg shadow-lg">
            <ul>

              {
               notification?.data?.notification?.map((notification,index)=>(
                <li key={index} className="flex justify-between items-center px-4 py-2 border-b ">
                  <FaUser className="bg-slate-300 rounded-full w-10 h-10" />
                  <p className="text-gray-500 flex-1 px-2 py-1">
                    {notification?.message}
                  </p>
                  <span className="text-xs text-gray-400 block">
                  {/* {moment(notification?.timestamp).format('HH:mm A'  )} */}
                  </span>
                </li>
               ))
              }

            </ul>
            <div className="flex justify-center">
            <button onClick={handleViewAllNotification} className="px-4 py-2 text-center text-blue-600 cursor-pointer">
                View All
              </button>
            </div>
          </div>
       

      
  );
};

export default Notification;
