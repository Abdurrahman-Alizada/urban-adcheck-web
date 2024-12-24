import React, { Children } from 'react'
import Sidebar from './sidebar/page'
function layout({ children }) {
  return (
    <div className='w-full flex lg:gap-4 justify-between  '>
        <div className='lg:w-[25%] xl:w-[20%] h-[100%] '>
           <Sidebar/>
        </div>
        <div className='w-full lg:w-[75%] xl:w-[80%] lg:p-5'>
           {children}
        </div>

    </div>
  )                                      
}

export default layout
