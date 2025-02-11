"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetAllNotificationQuery } from "@/redux/reducers/notification/notificationThunk";
import NotificationSkeleton from "../contentLoader/notificationModalLoader/page";

const Notification = ({ setShowNotifications }) => {
  const router = useRouter();
  const { data: notification, isLoading: loading, isError: error } = useGetAllNotificationQuery();

  const handleViewAllNotification = () => {
    router.push("/dashboard/client/notification");
    setShowNotifications(false);
  };

  return (
    <div className="absolute z-50 right-4 mt-4 w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
      {loading ? (
        <NotificationSkeleton />
      ) : (
        <>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FaBell className="text-2xl text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <button
              onClick={handleViewAllNotification}
              className="text-sm text-primary font-medium hover:text-indigo-800 focus:outline-none"
            >
              View All
            </button>
          </div>

          <ul className="max-h-64 overflow-y-auto">
            {notification?.data?.notification?.map((notification, index) => (
              <li
                key={index}
                className={`flex items-center p-2 border-b border-gray-100 transition-all duration-200 ease-in-out ${
                  notification?.status === "UNREAD" ? "bg-indigo-50" : "bg-white"
                } hover:bg-gray-50 rounded-md`}
              >
                <FaUser className="bg-gray-300 rounded-full w-10 h-10 p-2" />
                <div className="flex-1 ml-4">
                  <p
                    className={`text-gray-800 text-sm ${notification?.status === "UNREAD" ? "font-semibold" : "font-normal"}`}
                  >
                    {notification?.message}
                  </p>
                  <span className="text-xs text-gray-500">
                    {/* {moment(notification?.timestamp).format('HH:mm A')} */}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Notification;
