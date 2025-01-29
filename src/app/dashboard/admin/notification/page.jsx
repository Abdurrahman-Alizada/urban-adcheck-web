"use client";
import { useGetAllNotificationQuery, useUpdateNotificationMutation } from "@/redux/reducers/notification/notificationThunk";
import { useState } from "react";
import moment from "moment";
import { useGetCurrentLoginUserQuery } from "@/redux/reducers/user/userThunk";

const NotificationComponent = () => {
  const [activeRow, setActiveRow] = useState(null);
  const { data: notification, isLoading } = useGetAllNotificationQuery();
  const { data: user } = useGetCurrentLoginUserQuery();
  const [updateNotification] = useUpdateNotificationMutation();

  const togglePopup = (rowId) => {
    setActiveRow((prevRow) => (prevRow === rowId ? null : rowId));
  };

  const updateNotificationHandler = (notification) => {
    const newStatus = notification.status === "READ" ? "UNREAD" : "READ";

    const body = {
      notifcationId: notification._id,
      info: {
        user: user._id,
        status: newStatus,
      },
    };

    updateNotification(body)
      .then((res) => {
        console.log("Notification status updated:", res);
        setActiveRow(null);
      })
      .catch((err) => {
        console.error("Error updating notification:", err);
      });
  };

  return (
    <div className="mt-20">
      <ul className="w-full overflow-x-auto text-sm text-gray-500">
        {/* Header */}
        <li className="border-b-[1px] grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-3 font-normal min-w-[600px]">
          <span className="text-[13px]">Messages</span>
          <span className="text-[13px]">Time</span>
          <span className="text-[13px]">Status</span>
          <span className="text-[13px]">Action</span>
        </li>

        {/* Loading Shimmer */}
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <li
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4 min-w-[600px]"
              >
                <p className="bg-gray-400/30 px-6 py-3 shimmer"></p>
                <p className="bg-gray-400/30 px-14 py-3 shimmer"></p>
                <p className="bg-gray-400/30 px-6 py-3 shimmer"></p>
                <p className="bg-gray-400/30 px-3 py-3 shimmer"></p>
              </li>
            ))
          : notification?.data?.notification?.map((notification) => (
              <li
                key={notification._id}
                className="relative hover:rounded-md hover:shadow-custom-hover grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-6 py-4 min-w-[600px]"
              >
                <span className="text-[13px]">{notification.message}</span>
                <span className="text-[13px]">
                  {moment(notification.timestamp).format("HH:mm A")}
                </span>
                <span className="text-[13px]">{notification.status}</span>
                <span
                  className="cursor-pointer text-[13px]"
                  onClick={() => togglePopup(notification._id)}
                >
                  ...
                </span>

                {/* Conditionally Render Modal */}
                {activeRow === notification._id && (
                  <div className="absolute right-14 z-10 bg-white shadow-md rounded-lg p-2">
                    <div className="relative">
                      <button
                        className="block text-sm text-gray-700 hover:text-blue-500"
                        onClick={() => updateNotificationHandler(notification)}
                      >
                        {notification.status === "READ" ? "Mark as Unread" : "Mark as Read"}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
