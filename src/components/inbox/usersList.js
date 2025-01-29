"use client";

import React, { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import moment from "moment"; // To format timestamps

export default function UsersList({ userList, setSelectedRoom }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on the search query
  const filteredUsers = userList?.data?.filter((user) => {
    const userName = user?.members?.watchDog?.fullName?.firstName || "";
    const lastMessage = user?.messages?.[user.messages.length - 1]?.message || "";

    return (
      userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="h-full w-full rounded-lg shadow-2xl">
      {/* Header */}
      <div className="bg-primary rounded-t-lg">
        <h1 className="font-semibold text-white pl-2 pt-2">Chats</h1>
        <div className="py-3"></div>
        {/* Search Bar */}
        <div className="relative p-2">
          <input
            type="text"
            placeholder="Search a chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="w-full pl-10 py-2 bg-white text-gray-700 placeholder-gray-400 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* User List */}
      <div className="max-h-[330px] overflow-y-auto p-2">
        {filteredUsers?.map((user, index) => {
          // Extract the last message
          const lastMessage = user?.messages?.[user.messages.length - 1] || null;

          return (
            <div
              key={index}
              className="flex items-center hover:bg-white hover:shadow-custom-shadow rounded-md cursor-pointer transition-colors duration-200 p-2"
              onClick={() => setSelectedRoom(user)} // Set the selected room on click
            >
              <FaUser className="h-8 w-8 text-gray-600 rounded-full bg-slate-300" />
              <div className="flex flex-col pl-3">
                {/* Display User's First Name */}
                <span className="font-bold text-black pt-2">
                  {user?.members?.watchDog?.fullName?.firstName || "Unknown"}
                </span>
                {/* Display Last Message */}
                <span className="text-gray-500 text-sm">
                  {lastMessage
                    ? `${lastMessage.sender === "currentUserId" ? "You: " : ""}${lastMessage.message}`
                    : "No messages yet."}
                </span>
                {/* Display Timestamp */}
                {lastMessage && (
                  <span className="text-gray-400 text-xs">
                    {moment(lastMessage.timestamp).fromNow()}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* No Results Found */}
        {filteredUsers?.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            No chats match your search.
          </div>
        )}
      </div>
    </div>
  );
}
