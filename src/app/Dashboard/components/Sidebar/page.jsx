'use client'
import React, { useState } from 'react';
import Image from 'next/image';
// import Overview from '../../overview/page';
// import Postads from '../../postAds/page';
// import Myads from '../../myAds/page';

const overview = () => <div></div>;
const ViewProfile = () => <div>View Profile Content</div>;
const RequestForJobs = () => <div></div>;
const MyAds = () => <div></div>;
const AccountSettings = () => <div>Account Settings Content</div>;
const SignOut = () => <div>Sign Out Content</div>;

function Sidebar() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('Overview');

  // Tab metadata stored in an array of objects
  const tabs = [
    { name: 'Overview', icon: '/Grid.png', component: <Overview /> },
    { name: 'View Profile', icon: '/UserCircle.png', component: <ViewProfile /> },
    { name: 'Request For Jobs', icon: '/PlusCircle.png', component: <RequestForJobs /> },
    { name: 'My ads', icon: '/Clipboa                                                                                                                                                                                                                                                                         rdText.png', component: <MyAds /> },
    { name: 'Account Settings', icon: '/Gear.png', component: <AccountSettings /> },
    { name: 'Sign Out', icon: '/SignOut.png', component: <SignOut /> },
  ];

  return (
    <div className="flex items-start">
      {/* Left Sidebar */}
      <section className="lg:w-[25%] xl:w-[20%] hidden lg:inline-block bg-white shadow-custom-shadow rounded-[10px] mt-10 mb-10 ml-10 pb-5">
        {/* Profile info */}
        <div className=" p-3 flex justify-evenly border-b-[1px] border-gray-300">
          <Image
            src="/profile-Image.png"
            width={60}
            height={60}
            alt="Company Logo"
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="text-black font-medium text-[18.79px]">Jenny Wilson</span>
            <span className="text-gray-400 text-[13.79px]">Member</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-4 px-6 mt-4">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              className={`flex items-center gap-2 cursor-pointer ${
                activeTab === tab.name ? 'text-primary font-bold' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <Image
                src={tab.icon}
                width={21}
                height={21}
                alt={`${tab.name} Icon`}
                className="object-contain"
              />
              <span className="text-[15.03px]">{tab.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs Content */}
      <section className="w-full lg:w-[75%] xl:w-[80%] p-5">
        {tabs.find((tab) => tab.name === activeTab)?.component}
      </section>
    </div>
  );
}

export default Sidebar;
