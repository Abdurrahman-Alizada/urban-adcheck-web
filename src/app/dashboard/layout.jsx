import React, { Children } from 'react'
import Sidebar from './sidebar/page'
function Layout({ children }) {
  return (
    <div className="w-full flex flex-col lg:flex-row justify-between">
      {/* Sidebar */}
      <div className="w-full shadow-md h-screen lg:w-[25%] xl:w-[20%] ">
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



