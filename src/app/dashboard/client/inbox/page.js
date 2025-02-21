"use client"
import React, { useState } from "react";
import Messages from "@/components/inbox/messages";
import UsersList from "@/components/inbox/usersList";
import { useGetAllMessagesRoomQuery } from "@/redux/reducers/messages/messagesThunk";

export default function Inbox() {
  const [selectRoom, setSelectedRoom] = useState(null);
  const { data: userList, isLoading } = useGetAllMessagesRoomQuery();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="w-full min-h-screen ">
      <div className="max-w-7xl mx-auto mb-[100px]">
        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg z-50"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "×" : "☰"}
          </button>

          {/* Sidebar */}
          <div 
            className={`
              w-full lg:w-[350px] bg-white rounded-2xl shadow-lg transition-all duration-300
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              ${isLoading ? 'animate-pulse' : ''}
              fixed lg:relative left-0 top-0 h-screen lg:h-auto z-40 lg:z-0
            `}
          >
            {isLoading ? (
              <div className="space-y-4 p-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
                ))}
              </div>
            ) : (
              <UsersList 
                userList={userList} 
                setSelectedRoom={setSelectedRoom}
                onSelect={() => setIsSidebarOpen(false)}
              />
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden">
            {isLoading ? (
              <div className="space-y-4 p-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
                ))}
              </div>
            ) : selectRoom ? (
              <Messages selectRoom={selectRoom} />
            ) : (
              <div className="h-[600px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Welcome to Messages</h3>
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}