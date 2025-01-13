'use client';
import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { BsFillSendCheckFill } from "react-icons/bs";
import Image from 'next/image';

const ChatModal = ({ messages, user, refetchMessages,acceptedBy, updateMessageRoutes, onClose }) => {
  const [messageInput, setMessageInput] = useState('');

  const handleMessageSend = () => {
    try {
        if (messageInput.trim() === '') {
          alert("Message must be at least 1 character");
          return;
        }
        else {
          const isWatchDog = user._id === messages?.data?.members?.watchDog;
  
          const newData = {
            roomId: messages?.data?._id,
            newMessage: {
              sender: isWatchDog ? messages?.data?.members?.watchDog : messages?.data?.members?.client,
              receiver: isWatchDog ? messages?.data?.members?.client : messages?.data?.members?.watchDog,
              message: messageInput,
              timestamp: new Date()
            }
          };
  
          updateMessageRoutes(newData)
            .then((res) => {
              if (res?.data) {
                refetchMessages();
                setMessageInput("")
                console.log(res);
              }
              else {
                alert("message sent failed", res.error)
              }
            })
        }
      } catch (err) {
        console.log("Error Sending Messages", err);
        alert('Something went wrong. Please try again later.');
      }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[70%] h-[85vh]">
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className='flex items-center justify-between bg-gray-100 p-3 border-b border-gray-200'>
                <div className='flex items-center gap-3'>
                  <Image
                    src={'/Avatar-2.png'}
                    width={60}
                    height={60}
                    alt={'profile-image'}
                    className='rounded-full object-contain'
                  />
                  <span className="text-gray-500 font-semibold text-sm font-nunitosans">
                    {acceptedBy?.watchdog?.fullName?.firstName} {acceptedBy?.watchdog?.fullName?.lastName}
                  </span>
                </div>
                <RxCross2 size={25} onClick={ onClose} className='cursor-pointer p-1 bg-primary rounded-full text-white ' />
              </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {
                  messages?.data?.messages?.map((message, index) => (
                    <div key={index} className={`mb-2 ${user?._id == message?.sender ? 'self-end' : ' self-start'}`}>
                     {console.log("message is ", message,user?._id)}
                      <span className="block text-black max-w-[max]">
                        {user?._id == message?.sender
                          ? messages?.data?.members?.client?.fullName?.firstName
                          : messages?.data?.members?.watchDog?.fullName?.firstName}
                      </span>
                      <span
                        className={`block px-3 py-2 rounded-lg max-w-[max] ${user?._id === message?.sender ? 'bg-primary text-white' : 'bg-gray-300 text-black'
                          }`}
                      >
                        {message?.message}
                      </span>
                    </div>
                  ))
                }
          </div>

          {/* Chat Input */}
          <div className="p-4 flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-md"
            />
            <BsFillSendCheckFill
              size={24}
              className="ml-4 text-primary cursor-pointer"
              onClick={handleMessageSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
