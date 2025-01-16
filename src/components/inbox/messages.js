"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { BsFillSendCheckFill } from "react-icons/bs";
import moment from "moment";
import { useGetAllMessagesRoomQuery } from "@/redux/reducers/messages/messagesThunk";
import { useGetCurrentLoginUserQuery } from "@/redux/reducers/user/userThunk";

export default function Messages() {
  const { data: messages } = useGetAllMessagesRoomQuery();
  console.log(messages)
  const { data: CurrentLoginUser } = useGetCurrentLoginUserQuery();
  console.log(CurrentLoginUser)
  const [messageInput, setMessageInput] = useState("");

  const handleMessageSend = () => {
    if (messageInput.trim() === "") {
      alert("Message must be at least 1 character");
      return;
    }
    console.log("Message sent:", messageInput);
    setMessageInput("");
  };

  const isClient =
    CurrentLoginUser?.data?._id === messages?.data?.members?.client?._id;
  
    console.log(    "aqib",messages?.data?.members?.watchDog?._id  )
  const receiverName = isClient
    ?
    messages?.data?.members?.watchDog?.fullName?.firstName
    : messages?.data?.members?.client?.fullName?.firstName;
console.log("messages?.data",receiverName);
  return (
    <div className="shadow-xl rounded-lg">
      {messages?.data && CurrentLoginUser?.data ? (
       <>
       <div className="flex items-center bg-primary rounded-t-lg border-b-[1px] p-3">
         <FaUser className="h-12 w-12 text-gray-600 rounded-full bg-slate-300" />
         <div className="flex flex-col pl-3">
           <span className="font-extrabold text-white pt-2">{receiverName}</span>
         </div>
       </div>
     
       <div className="flex flex-col bg-white h-[300px] p-3 overflow-y-auto">
         {messages?.data?.messages?.map((message, index) => {
          
           const isSentByCurrentUser =
             message.sender === CurrentLoginUser?.data?._id;
           return (
             <div
               key={index}
               className={`${
                 isSentByCurrentUser
                   ? "bg-blue-500 text-white self-end"
                   : "bg-slate-200 text-black self-start"
               } w-1/3 px-3 py-1 rounded-lg font-medium my-1`}
             >
               <span className="block">{message.message}</span>
               <span className="text-xs text-gray-400 block">
                 {moment(message.timestamp).format("h:mm A")}
               </span>
             </div>
           );
         })}
       </div>
     
       <div className="p-4 flex items-center border-t-[1px]">
         <input
           type="text"
           placeholder="Type a message..."
           value={messageInput}
           onChange={(e) => setMessageInput(e.target.value)}
           className="flex-1 px-4 py-2 border rounded-lg bg-slate-200"
         />
         <BsFillSendCheckFill
           size={24}
           className="ml-4 text-primary cursor-pointer"
           onClick={handleMessageSend}
         />
       </div>
     </>
     
      ) : (
        <div className="p-4 text-center">Loading messages...</div>
      )}
    </div>
  );
}
