"use client"
import Messages from "@/components/inbox/messages";
import UsersList from "@/components/inbox/usersList";
import { useGetAllMessagesRoomQuery } from "@/redux/reducers/messages/messagesThunk";
import React, { useState } from "react";

export default function Inbox() {
  const [selectRoom, setSelectedRoom] = useState(null);
  const { data: userList, isLoading } = useGetAllMessagesRoomQuery();

  return (
    <div className="w-full mt-16 flex flex-col lg:flex-row lg:gap-4 justify-between mb-[100px]">
      {/* Sidebar */}
      <div className="w-full lg:w-[25%] xl:w-[30%] p-3">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : (
          <UsersList userList={userList} setSelectedRoom={setSelectedRoom} />
        )}
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[75%] xl:w-[70%] lg:p-5">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : (
          <Messages selectRoom={selectRoom} />
        )}
      </div>
    </div>
  );
}
