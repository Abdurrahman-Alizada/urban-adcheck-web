import Messages from '@/components/inbox/messages'
import UsersList from '@/components/inbox/usersList'
import React from 'react'

export default function Inbox() {
    return (
        <div className="w-full flex flex-col lg:flex-row lg:gap-4 justify-between mb-[100px]">
            {/* Sidebar */}
            <div className="w-full lg:w-[25%] xl:w-[20%] p-3">
                <UsersList />
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-[75%] xl:w-[80%] lg:p-5">
                <Messages />
            </div>
        </div>
    )
}
