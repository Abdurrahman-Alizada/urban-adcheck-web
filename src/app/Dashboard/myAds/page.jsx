import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Myads() {
  return (
    <div>
        
         <section className='w-full flex items-center justify-between'> 
            {/* search */}
             <div className='w-[33%] relative'>
                <FontAwesomeIcon icon={faSearch} color='text-primary'  size="sm" className="absolute left-1 top-3 text-primary"/>
                <input type="text" placeholder='Ads title, Keywords...' className='border-grayColor border-[1px] text-[16px] rounded-[5px] px-6 py-2'/>
             </div>
            {/* filters */}
            <div className='w-[65%] flex gap-3'>
               
               {/* category filter */}
               
                <div className=" flex  flex-col gap-2">
                    <select name="category" className="text-[15.04px] text-grayColor border-[1px] px-3 py-3 rounded-[5px]"
                    >
                    <option value="">Select Category</option>
                    <option value="negotiable">category1</option>
                    <option value="non-negotiable">category2</option>
                    </select>
                </div>

                {/* Recently Posted */}
               
                <div className=" flex flex-col gap-2">
                    <select name="Recently Posted" className="text-[15.04px] text-grayColor border-[1px] px-3 py-3 rounded-[5px]"
                    >
                    <option value="">Recently Posted</option>
                    <option value="negotiable">Recently Posted</option>
                    <option value="non-negotiable">Recently Posted</option>
                    </select>
                </div>

                 {/* All Posted */}
               
                 <div className=" flex flex-col gap-2">
                    <select name="Recently Posted" className="text-[15.04px] text-grayColor border-[1px] px-3 py-3 rounded-[5px]"
                    >
                    <option value="">All</option>
                    <option value="negotiable">All Posted</option>
                    <option value="non-negotiable">All Posted</option>
                    </select>
                </div>

            </div>
         </section>

    </div>
  )
}

export default Myads
