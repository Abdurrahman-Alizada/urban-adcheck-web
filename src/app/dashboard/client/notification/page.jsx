"use client";
import { useGetAllNotificationQuery, useUpdateNotificationMutation } from "@/redux/reducers/notification/notificationThunk";
// import Notification from '@/components/notification/page'
import { useState } from "react";
import moment from "moment/moment";
import { useGetCurrentLoginUserQuery } from "@/redux/reducers/user/userThunk";

const NotificationComponent = () => {
  const [loading, setLoading] = useState(true);
  const [markStatus, setMarkStatus] = useState("UNREAD");
  const [markStatusModel, setMarkStatusModel] = useState(false);
  const [activeRow,setActiveRow]=useState(null);

  const togglePopup = (rowId) => {
    setActiveRow((prevRow) => (prevRow === rowId ? null : rowId));
  };

  const { data: notification } = useGetAllNotificationQuery();
  // console.log("notification", notification?.data?._id);
  const { data: user } = useGetCurrentLoginUserQuery();
  const [UpdateNotification] = useUpdateNotificationMutation();

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const updateNotificationHandler = (notification1) => {
    const body = {
      notifcationId: notification1?._id,
      info: {
        user: user?._id,
        status: "READ"
      }

    }
    // console.log("body",body)
    UpdateNotification(body).then((res) => {
      console.log(res);
    })
  }

  const handleActionModal=()=>{
       setMarkStatusModel((prev)=>!prev)
  }
  return (
    <div className="mt-20">
      <ul className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500">
        <li

          className="border-b-[1px] grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-3 font-normal min-w-[600px]"
        >
          <span className="text-[13px]">Messages</span>
          <span className="text-[13px]">Time</span>
          <span className="text-[13px]">Status</span>
          <span className="text-[13px]">Action</span>
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
                  <p className="bg-gray-400/30 px-3 py-3 shimmer"></p>
                </li>
              ))
            )
            :
            (

              <>
                {notification?.data?.notification?.map((notification, index) => (
                  <li
                    key={index}
                    className="relative hover:rounded-md hover:shadow-custom-hover grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4 min-w-[600px]"
                  >
                    <span className={`text-[13px]`}>{notification?.message}</span>
                    <span className={`text-[13px]`}>
                      {moment(notification?.timestamp).format("HH:mm A")}
                    </span>
                    <span>{notification?.status}</span>
                    <span onClick={handleActionModal} className="cursor-pointer">...</span>

                    {/* Conditionally render the status when markStatusModel is true */}
                    {markStatusModel && activeRow === notification?._id && <span className="absolute z-10 bg-white w-[30px] h-[10px] right-10">Mark as {notification?.status}</span>}
                  </li>
                ))}
              </>

            )}
      </ul>
    </div>
  );
};

export default NotificationComponent;
