import React, { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import moment from "moment";

export default function UsersList({ userList, setSelectedRoom, onSelect }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = userList?.data?.filter((user) => {
    const userName = user?.members?.watchDog?.fullName?.firstName || "";
    const lastMessage = user?.messages?.[user.messages.length - 1]?.message || "";
    return (
      userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleUserSelect = (user) => {
    setSelectedRoom(user);
    onSelect?.();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-primary p-4 rounded-t-2xl">
        <h1 className="text-xl font-bold text-white mb-4">Messages</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 
                     placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 
                     focus:ring-white/20 transition-all duration-200"
          />
          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {filteredUsers?.map((user, index) => {
            const lastMessage = user?.messages?.[user.messages.length - 1];
            const unreadCount = user.messages?.filter(m => !m.read).length;

            return (
              <div
                key={index}
                onClick={() => handleUserSelect(user)}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 
                         transition-all duration-200 cursor-pointer group"
              >
                <div className="relative">
                  <FaUser className="h-12 w-12 text-gray-600 rounded-full bg-gray-200 p-2" />
                  {user.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full 
                                  border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {user?.members?.watchDog?.fullName?.firstName || "Unknown"}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {lastMessage && moment(lastMessage.timestamp).fromNow()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 truncate">
                    {lastMessage
                      ? `${lastMessage.sender === "currentUserId" ? "You: " : ""}${lastMessage.message}`
                      : "No messages yet"}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <div className="bg-primary text-white text-xs font-bold h-5 w-5 rounded-full 
                               flex items-center justify-center">
                    {unreadCount}
                  </div>
                )}
              </div>
            );
          })}

          {filteredUsers?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg font-semibold">No conversations found</p>
              <p className="text-sm">Try searching with a different term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}