"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { BsFillSendCheckFill } from "react-icons/bs";
import moment from "moment";
import {
  useGetAllMessagesRoomQuery,
  useGetByIdQuery,
  useGetRoomByIdQuery,
  useUpdateMessageRoutesMutation,
} from "@/redux/reducers/messages/messagesThunk";
import { useGetCurrentLoginUserQuery } from "@/redux/reducers/user/userThunk";

export default function Messages({ selectRoom }) {
  const { data: CurrentLoginUser } = useGetCurrentLoginUserQuery();

  const [updateMessageRoutes]=useUpdateMessageRoutesMutation();

  const { data: messages, error,refetch } = useGetRoomByIdQuery(selectRoom?._id, {
    skip: !selectRoom?._id,
  });
  console.log("messages are", messages, error);

  const [messageInput, setMessageInput] = useState("");

  const handleMessageSend = () => {
    if (messageInput.trim() === "") {
      alert("Message must be at least 1 character");
      return;
    }
    console.log("Message sent:", messageInput);
    setMessageInput("");
    
    
    const newData={
      roomId:messages?.data?._id,
      newMessage:{
        sender:CurrentLoginUser?._id==messages?.data?.members?.watchDog ? messages?.data?.members?.watchDog : messages?.data?.members?.client,
        reciver:CurrentLoginUser?._id==messages?.data?.members?.watchDog ? messages?.data?.members?.client : messages?.data?.members?.watchDog,
        message:messageInput,
        timestamp: new Date()
      }
    }

    updateMessageRoutes(newData).then((res)=>{
      if (res?.data) {
        refetch();
        setMessageInput("")
        console.log(res);
      }
      else {
        alert("message sent failed", res.error)
      }
    })


  };

    const isClient =
      CurrentLoginUser?.data?._id === messages?.data?.members?.client?._id;

  //     console.log(    "aqib",messages?.data?.members?.watchDog?._id  )
  //   const receiverName = isClient
  //     ?
  //     messages?.data?.members?.watchDog?.fullName?.firstName
  //     : messages?.data?.members?.client?.fullName?.firstName;
  // console.log("messages?.data",receiverName);
  return (
    <div className="shadow-xl rounded-lg">
      {/* header */}
      <div className="flex items-center bg-primary rounded-t-lg border-b-[1px] p-3">
        <FaUser className="h-12 w-12 text-gray-600 rounded-full bg-slate-300" />
        <div className="flex flex-col pl-3">
          <span className="font-extrabold text-white pt-2">
            {isClient ? 
             messages?.data?.members?.client?.fullName?.firstName
             :
             messages?.data?.members?.watchDog?.fullName?.firstName
            }</span>
        </div>
      </div>
        {/* messages body */}
        <div className="flex flex-col bg-gray-50 h-[300px] p-4 rounded-lg overflow-y-auto space-y-4">
          {
            messages?.data?.messages?.map((message,index)=>(
              <div key={index} className={`
              bg-slate-200 w-fit max-w-[75%] rounded-lg p-3 text-gray-900 
               ${CurrentLoginUser?._id==message?.sender ? 'self-end' : 'self-start'}
              `}>
                  <span className="block text-sm mb-1">{message?.message}</span>
                  <span className="text-xs text-gray-500 block text-right">
                    {moment(message?.timestamp).format("h:mm A")}
                  </span>
          </div>
            ))
          }
        </div>
{/* sending area */}
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
    </div>
  );
}
