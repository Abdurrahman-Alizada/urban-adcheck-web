"use client"
import Messages from "@/components/inbox/messages";
import UsersList from "@/components/inbox/usersList";
import { useGetAllMessagesRoomQuery } from "@/redux/reducers/messages/messagesThunk";
import { useGetCurrentLoginUserQuery } from "@/redux/reducers/user/userThunk";
import React from "react";


export default function Inbox() {
       const {data:userList}=useGetAllMessagesRoomQuery();
       console.log(userList)
       
  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-4 justify-between mb-[100px]">
      {/* Sidebar */}
      <div className="w-full lg:w-[25%] xl:w-[30%] p-3">
        <UsersList userList={userList}/>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[75%] xl:w-[70%] lg:p-5">
        <Messages />
      </div>
    </div>
  );
}
