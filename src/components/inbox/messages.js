import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BsSend, BsEmojiSmile } from "react-icons/bs";
import moment from "moment";
import {
  useGetRoomByIdQuery,
  useUpdateMessageRoutesMutation,
} from "@/redux/reducers/messages/messagesThunk";
import { useGetCurrentLoginUserQuery } from "@/redux/reducers/user/userThunk";

export default function Messages({ selectRoom }) {
  const { data: CurrentLoginUser } = useGetCurrentLoginUserQuery();
  const [updateMessageRoutes] = useUpdateMessageRoutesMutation();
  const { data: messages, error, refetch } = useGetRoomByIdQuery(selectRoom?._id, {
    skip: !selectRoom?._id,
  });

  const [messageInput, setMessageInput] = useState("");
  const chatBodyRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSend = () => {
    if (messageInput.trim() === "") return;

    const newData = {
      roomId: messages?.data?._id,
      newMessage: {
        sender:
          CurrentLoginUser?._id === messages?.data?.members?.watchDog
            ? messages?.data?.members?.watchDog
            : messages?.data?.members?.client,
        reciver:
          CurrentLoginUser?._id === messages?.data?.members?.watchDog
            ? messages?.data?.members?.client
            : messages?.data?.members?.watchDog,
        message: messageInput,
        timestamp: new Date(),
      },
    };

    updateMessageRoutes(newData).then((res) => {
      if (res?.data) {
        refetch();
        setMessageInput("");
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMessageSend();
    }
  };

  const isClient = CurrentLoginUser?.data?._id === messages?.data?.members?.client?._id;

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between bg-primary px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaUser className="h-10 w-10 text-gray-600 rounded-full bg-white/90 p-2" />
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-bold text-white">
              {isClient
                ? messages?.data?.members?.client?.fullName?.firstName
                : messages?.data?.members?.watchDog?.fullName?.firstName}
            </h2>
            <span className="text-xs text-white/80">Active now</span>
          </div>
        </div>
      </div>

      {/* Messages Body */}
      <div 
        ref={chatBodyRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
      >
        {messages?.data?.messages?.map((message, index) => {
          const isSender = CurrentLoginUser?._id === message?.sender;
          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  isSender
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                }`}
              >
                <p className="text-sm">{message?.message}</p>
                <span className={`text-xs mt-1 block ${isSender ? "text-white/80" : "text-gray-500"}`}>
                  {moment(message?.timestamp).format("h:mm A")}
                </span>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
            <span className="text-sm">typing...</span>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <BsEmojiSmile size={20} />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none 
                     focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
          <button
            onClick={handleMessageSend}
            disabled={!messageInput.trim()}
            className={`p-2 rounded-full transition-all duration-200 ${
              messageInput.trim()
                ? "text-primary hover:bg-primary/10"
                : "text-gray-400"
            }`}
          >
            <BsSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}