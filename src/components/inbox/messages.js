"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { BsFillSendCheckFill } from "react-icons/bs";

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
    <div className="">
      <div className="flex items-center bg-slate-200 p-3">
        <FaUser className="h-12 w-12 text-gray-600 rounded-full bg-slate-500" />
        <div className="flex flex-col pl-3">
          <span className="font-extrabold text-black pt-2">User 1</span>
        </div>
      </div>

      {
        <div className="flex flex-col bg-slate-100 h-[300px] p-3">
          <div
            className={`bg-slate-500 w-1/3 p-6 rounded-3xl font-medium text-gray-200 left-0 ${
              user == sender ? "self-end" : "self-start"
            }`}
          >
            how are you
          </div>
          <div className="bg-slate-300 w-1/3 p-6 rounded-3xl font-medium text-gray-500 -right-0">
            I am fine
          </div>
        </div>
      }

      <div className="p-4 flex items-center bg-slate-200">
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
  );
}
