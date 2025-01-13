import React from "react";
import { FaSearch, FaUser } from "react-icons/fa"; // Example: Importing FontAwesome's User icon

export default function UsersList() {
  return (
    <div className=" h-full w-full p-3 rounded-lg bg-slate-200">
      <h1 className="font-semibold text-black pt-2">Chats</h1>
      <div className="py-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search a chat"
            className="w-full pl-10  py-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="max-h-[330px] overflow-y-auto p-2">
        <div className="flex items-center hover:bg-gray-300 rounded-md cursor-pointer transition-colors duration-200  ">
          <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-500" />
          <div className="flex flex-col pl-3">
            <span className="font-bold text-black pt-2">User 1</span>
            <span className="text-gray-500">okay..</span>
          </div>
        </div>

        <div className="flex items-center hover:bg-gray-300 rounded-md cursor-pointer transition-colors duration-200 ">
          <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-500" />
          <div className="flex flex-col pl-3">
            <span className="font-bold text-black pt-2">User 2</span>
            <span className="text-gray-500">okay..</span>
          </div>
        </div>
        <div className="flex items-center hover:bg-gray-300 rounded-md cursor-pointer transition-colors duration-200 ">
          <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-500" />
          <div className="flex flex-col pl-3">
            <span className="font-bold text-black pt-2">User 3</span>
            <span className="text-gray-500">okay..</span>
          </div>
        </div>
        <div className="flex items-center hover:bg-gray-300 rounded-md cursor-pointer transition-colors duration-200 ">
          <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-500" />
          <div className="flex flex-col pl-3">
            <span className="font-bold text-black pt-2">User 4</span>
            <span className="text-gray-500">okay..</span>
          </div>
        </div>
        <div className="flex items-center hover:bg-gray-300 rounded-md cursor-pointer transition-colors duration-200 ">
          <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-500" />
          <div className="flex flex-col pl-3">
            <span className="font-bold text-black pt-2">User 5</span>
            <span className="text-gray-500">ok..</span>
          </div>
        </div>
        <div className="flex items-center hover:bg-gray-300 rounded-md cursor-pointer transition-colors duration-200 ">
          <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-500" />
          <div className="flex flex-col pl-3">
            <span className="font-bold text-black pt-2">User 6</span>
            <span className="text-gray-500">ok..</span>
          </div>
        </div>
        <div className="flex items-center hover:bg-gray-300 rounded-md cursor-pointer transition-colors duration-200 ">
          <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-500" />
          <div className="flex flex-col pl-3">
            <span className="font-bold text-black pt-2">User 7</span>
            <span className="text-gray-500">ok..</span>
          </div>
        </div>
        <div className="flex items-center hover:bg-gray-300 rounded-md cursor-pointer transition-colors duration-200 ">
          <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-500" />
          <div className="flex flex-col pl-3">
            <span className="font-bold text-black pt-2">User 8</span>
            <span className="text-gray-500">ok..</span>
          </div>
        </div>
        <div className="flex items-center hover:bg-gray-300 rounded-md cursor-pointer transition-colors duration-200 ">
          <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-500" />
          <div className="flex flex-col pl-3">
            <span className="font-bold text-black pt-2">User 9</span>
            <span className="text-gray-500">ok..</span>
          </div>
        </div>
        <div className="flex items-center hover:bg-gray-300 rounded-md cursor-pointer transition-colors duration-200 ">
          <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-500" />
          <div className="flex flex-col pl-3">
            <span className="font-bold text-black pt-2">User 10</span>
            <span className="text-gray-500">ok..</span>
          </div>
        </div>
      </div>
    </div>
  );
}


