import React, { Children } from 'react'
import Sidebar from './sidebar/page'
function Layout({ children }) {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-4 justify-between mb-[100px]">
      {/* Sidebar */}
      <div className="w-full lg:w-[25%] mt-10 xl:w-[20%] p-3">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-[75%] xl:w-[80%] lg:p-5">
        {children}
      </div>
    </div>
  );
}

export default Layout;



