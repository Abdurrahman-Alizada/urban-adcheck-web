"use client";
import React, { Children, useState } from 'react'
import Sidebar from './sidebar/page'
import { CgMenuLeft } from "react-icons/cg";
function Layout({ children }) {
  const [siderbarModal, setSidebarModal] = useState(false);
  const handleSidebarModal=()=>{
    setSidebarModal(!siderbarModal)
  }
  return (
    <div className="w-full flex flex-col lg:flex-row justify-between relative ">
      {/* Sidebar */}
      <div className='p-2 md:p-4 lg:p-0 lg:hidden relative'>
      <CgMenuLeft size={40} className='lg:hidden' onClick={handleSidebarModal}/>
    
      </div>
      {siderbarModal && 
      <div className='absolute top-12 right-10  bg-white mx-auto w-11/12 z-50'>
         <div className=" w-full shadow-md h-screen mb-10 md:mb-0  lg:w-[25%] xl:w-[20%] ">
          <Sidebar />
         </div>
      </div>
      }
     
      {/* Main Content */}
      <div className="w-full shadow-md h-screen mb-10 md:mb-0 hidden lg:block lg:w-[25%] xl:w-[20%] ">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full  lg:w-[75%] xl:w-[80%] lg:p-5">
        {children}
      </div>
    </div>
  );
}

export default Layout;



