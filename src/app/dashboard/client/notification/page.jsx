"use client";
import { useGetAllNotificationQuery } from "@/redux/reducers/notification/notificationThunk";
// import Notification from '@/components/notification/page'
import { useState } from "react";
import moment from "moment/moment";

const NotificationComponent = () => {
  const [loading, setLoading] = useState(true);

  const { data:notification } = useGetAllNotificationQuery();
  console.log("notification", notification);

  setTimeout(() => {
    setLoading(false);
  }, 3000);
  return (
    <div className="mt-20">
      <ul className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500">
        <li
         
          className="border-b-[1px] grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-3 font-normal min-w-[600px]"
        >
          <span className="text-[13px]">Messages</span>
          <span className="text-[13px]">Time</span>
          <span className="text-[13px]">Status</span>
        </li>

        {
        loading ? 
        (
          [...Array(4)].map((_, index) => (
            <li
              key={index}
              className="  grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4 min-w-[600px]"
            > 
              <p className="bg-gray-400/30 px-6 py-3 shimmer"></p>
              <p className="bg-gray-400/30 px-14 py-3 shimmer"></p>
              <p className="bg-gray-400/30 px-6 py-3 shimmer"></p>
            </li>
          ))
         ) 
         : 
         (
         
          <>
          
          {
            notification?.data?.notification?.map((notification,index)=>(

              <li key={index} className="hover:rounded-md hover:shadow-custom-hover grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4 min-w-[600px]">
            <span className="text-[13px]">{notification?.message}</span>
                
            <span className={`text-[13px] `}>{moment(notification?.timestamp).format('HH:mm A'  )}</span>
            <span>{notification?.status}</span>
          </li>
            ))
          }
          </>
        )}
      </ul>
    </div>
  );
};

export default NotificationComponent;
