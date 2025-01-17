'use client';

import React from "react";
import { FaSearch, FaUser } from "react-icons/fa"; // Example: Importing FontAwesome's User icon

export default function UsersList({userList ,setSelectedRoom}) {
   console.log("members",userList)
  return (
    <div className=" h-full w-full  rounded-lg shadow-2xl">
      <div className="bg-primary rounded-t-lg  ">
      <h1 className="font-semibold text-white pl-2 pt-2">Chats</h1>
      <div className="py-3">
      </div>
        <div className=" relative p-2">
          <input
            type="text"
            placeholder="Search a chat"
            className="w-full pl-10  py-2 bg-white text-gray-700 placeholder-gray-400 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
        </div>
      </div>

      {
       userList?.data?.map((user,index)=>(
          <div onClick={()=>setSelectedRoom(user)} key={index} className="max-h-[330px] overflow-y-auto p-2">
          <div className="flex items-center hover:bg-white hover:shadow-custom-shadow rounded-md cursor-pointer transition-colors duration-200  ">
            <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-300" />
            <div className="flex flex-col pl-3">
              <span className="font-bold text-black pt-2">{user?.members?.watchDog?.fullName?.firstName}</span>
              <span className="text-gray-500">okay..</span>
            </div>
          </div>
        </div>

        ))
      }
    </div>
  );
}


