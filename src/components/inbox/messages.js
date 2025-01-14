"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { BsFillSendCheckFill } from "react-icons/bs";
import moment from "moment";
export default function Messages() {
  
  const [messageInput, setMessageInput] = useState("");

  const handleMessageSend = () => {
    try {
      if (messageInput.trim() === "") {
        alert("Message must be at least 1 character");
        return;
      }
    } catch (err) {
      console.log("Error Sending Messages", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  const sender = "client";
  const reciver = "wachtDog";
  const user = sender;
  return (
    <div className=" shadow-xl rounded-lg">
      <div className="flex items-center bg-primary rounded-t-lg border-b-[1px]  p-3">
        <FaUser className="h-12 w-12 text-gray-600 rounded-full bg-slate-300" />
        <div className="flex flex-col pl-3">
          <span className="font-extrabold text-white pt-2">User 1</span>
        </div>
      </div>

      {
        <div className="flex flex-col bg-white  h-[300px] p-3 overflow-y-auto">
          <div
            className={`bg-blue-500 w-1/3 px-3 py-1 rounded-lg font-medium text-white ${
              user == sender ? "self-end" : "self-start"
            }`}
          >
            how are you?
            <span className="text-xs text-gray-400 block">
              {new moment().format("h:mm A")}
            </span>
          </div>
          <div className="bg-slate-200 w-1/3 px-3 py-1 rounded-lg font-medium text-black">
            I am fine
            <span className="text-xs text-gray-400 block ">
              {new moment().format("h:mm A")}
            </span>
          </div>
          <div
            className={`bg-blue-500 w-1/3 px-3 py-1 rounded-lg font-medium text-white ${
              user == sender ? "self-end" : "self-start"
            }`}
          >
            how are you
            <span className="text-xs text-gray-400 block ">
              {new moment().format("h:mm A")}
            </span>
          </div>
          <div className="bg-slate-200 w-1/3 px-3 py-1 rounded-lg font-medium text-black">
            I am fine
            <span className="text-xs text-gray-400 block">
              {new moment().format("h:mm A")}
            </span>
          </div>
          <div
            className={`bg-blue-500 w-1/3 px-3 py-1 rounded-lg font-medium text-white ${
              user == sender ? "self-end" : "self-start"
            }`}
          >
            how are you
            <span className="text-xs text-gray-400 block">
              {new moment().format("h:mm A")}
            </span>
          </div>
          <div className="bg-slate-200 w-1/3 px-3 py-1 rounded-lg font-medium text-black">
            I am fine
            <span className="text-xs text-gray-400 block">
              {new moment().format("h:mm A")}
            </span>
          </div>
          <div
            className={`bg-blue-500 w-1/3 px-3 py-1 rounded-lg font-medium text-white ${
              user == sender ? "self-end" : "self-start"
            }`}
          >
            how are you
            <span className="text-xs text-gray-400 block ">
              {new moment().format("h:mm A")}
            </span>
          </div>
          <div className="bg-slate-200 w-1/3 px-3 py-1 rounded-lg font-medium text-black">
            I am fine
            <span className="text-xs text-gray-400 block ">
              {new moment().format("h:mm A")}
            </span>
          </div>
        </div>
      }

      <div className="p-4 flex items-center  border-t-[1px] ">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg  bg-slate-200"
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
