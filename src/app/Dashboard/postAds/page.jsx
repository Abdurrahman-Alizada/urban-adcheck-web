import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

function Postads() {
  return (
    <div className='shadow-custom-shadow px-3 py-4 rounded-sm mt-5'>
                          {/* multi-step form */}
        {/* Step-01 - ads information*/}
        <form action="">

           <section className='flex flex-col gap-4'> 

                  {/* ad Name */}
              <div className='flex flex-col gap-2'>
                <label htmlFor="ad-name" className='text-[16px]'>Ad Name</label>
                <input type="text" placeholder='Ad name' className='text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-2 rounded-[5px]' id='ad-name'/>
              </div>

                  {/* category & sub-category */}
              <div className='flex gap-3'>

                  {/* Catogery */}
                  <div className="w-[50%] flex flex-col gap-2">
                    <label htmlFor="category" className="text-[16px]">Category</label>
                    <div className="relative">
                        <select
                        name="Category"
                        id="category"
                        className="border-gray-300 text-[15.04px] border-[1px] outline-primary px-3 py-2 text-grayColor rounded-[5px] w-full appearance-none focus:ring-2 focus:ring-primary"
                        >
                        <option value="">Select ...</option>
                        <option value="">Homes</option>
                        <option value="">Automotive</option>
                        <option value="">Garage</option>
                        </select>
                        {/* Chevron Icon */}
                        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 w-8 h-8" />
                        </span>
                    </div>
                  </div>

                  {/* Sub-Category */}
                  <div className="w-[50%] flex flex-col gap-2">
                    <label htmlFor="Sub-Category" className="text-[16px]">Sub-Category</label>
                    <div className="relative">
                        <select
                        name="Sub-Category"
                        id="Sub-Category"
                        className="border-gray-300  text-[15.04px] outline-primary border-[1px] px-3 py-2 text-grayColor rounded-[5px] w-full appearance-none focus:ring-2 focus:ring-primary"
                        >
                        <option value="">Select ...</option>
                        <option value="">Homes</option>
                        <option value="">Automotive</option>
                        <option value="">Garage</option>
                        </select>
                        {/* Chevron Icon */}
                        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 w-8 h-8" />
                        </span>
                    </div>
                  </div>
 
                   
              </div>

               {/* Brand & Model */}
               <div className='flex gap-3'>

                {/* Brand */}
                <div className="w-[50%] flex flex-col gap-2">
                    <label htmlFor="Brand" className="text-[16px]">Brand</label>
                    <div className="relative">
                        <select
                        name="Brand"
                        id="Brand"
                        className="border-gray-300 text-[15.04px] border-[1px] outline-primary px-3 py-2 text-grayColor rounded-[5px] w-full appearance-none focus:ring-2 focus:ring-primary"
                        >
                        <option value="">Select ...</option>
                        <option value="">Brand 1</option>
                        <option value="">Brand 2</option>
                        <option value="">Brand 3</option>
                        </select>
                        {/* Chevron Icon */}
                        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 w-8 h-8" />
                        </span>
                    </div>
                </div>

                {/* Model */}
                <div className="w-[50%] flex flex-col gap-2">
                <label htmlFor="Model" className="text-[16px]">Model</label>
                <div className="relative">
                    <select
                    name="Model"
                    id="Model"
                    className="border-gray-300 text-[15.04px] outline-primary border-[1px] px-3 py-2 text-grayColor rounded-[5px] w-full appearance-none focus:ring-2 focus:ring-primary"
                    >
                    <option value="">Select ...</option>
                    <option value="">Homes</option>
                    <option value="">Automotive</option>
                    <option value="">Garage</option>
                    </select>
                    {/* Chevron Icon */}
                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 w-8 h-8" />
                    </span>
                </div>
                </div>

 
               </div>
  
               {/* Conditions & Authenticity */}
               <div className='flex gap-3'>

                {/* Conditions */}
                <div className="w-[50%] flex flex-col gap-2">
                    <label htmlFor="Conditions" className="text-[16px]">Conditions</label>
                    <div className="relative">
                        <select
                        name="Conditions"
                        id="Conditions"
                        className="border-gray-300 text-[15.04px] border-[1px] outline-primary px-3 py-2 text-grayColor rounded-[5px] w-full appearance-none focus:ring-2 focus:ring-primary"
                        >
                        <option value="">Select ...</option>
                        <option value="">Brand 1</option>
                        <option value="">Brand 2</option>
                        <option value="">Brand 3</option>
                        </select>
                        {/* Chevron Icon */}
                        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 w-8 h-8" />
                        </span>
                    </div>
                </div>

                {/* Authenticity */}
                <div className="w-[50%] flex flex-col gap-2">
                <label htmlFor="Authenticity" className="text-[16px]">Authenticity</label>
                <div className="relative">
                    <select
                    name="Authenticity"
                    id="Authenticity"
                    className="border-gray-300 text-[15.04px] outline-primary border-[1px] px-3 py-2 text-grayColor rounded-[5px] w-full appearance-none focus:ring-2 focus:ring-primary"
                    >
                    <option value="">Select ...</option>
                    <option value="">Homes</option>
                    <option value="">Automotive</option>
                    <option value="">Garage</option>
                    </select>
                    {/* Chevron Icon */}
                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 w-8 h-8" />
                    </span>
                </div>
                </div>

 
               </div>  

                   {/* Tag Name */}
              <div className='flex flex-col gap-2'>
                <label htmlFor="Tag" className='text-[16px]'>Tags</label>
                <input type="text" placeholder='ads Tag...' className='text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-2 rounded-[5px]' id='ad-name'/>
              </div>  


              {/* Ads Prices & Negotiables */}
              <div className='flex gap-3'>

            {/* Ads Prices */}
              <div className='w-[50%] flex flex-col gap-2'>
                <label htmlFor="Ads Prices" className='text-[16px]'>Ads Prices (USD)</label>
                <input type="text" placeholder='ads Tag...' className='text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-2 rounded-[5px]' id='ad-name'/>
              </div>  

            {/* Negotiables */}
            <div className="w-[50%] flex flex-col gap-2">
            <label htmlFor="Negotiables" className="text-[16px]">Negotiables</label>
            <div className="relative">
                <select
                name="Negotiables"
                id="Negotiables"
                className="border-gray-300 text-[15.04px] outline-primary border-[1px] px-3 py-2 text-grayColor rounded-[5px] w-full appearance-none focus:ring-2 focus:ring-primary"
                >
                <option value="">Select ...</option>
                <option value="">Negotiables 1</option>
                <option value="">Negotiables 2</option>
                <option value="">Negotiables 3</option>
                </select>
                {/* Chevron Icon */}
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 w-8 h-8" />
                </span>
            </div>
            </div>


            </div> 

           </section>
        </form>
    </div>
  )
}

export default Postads
