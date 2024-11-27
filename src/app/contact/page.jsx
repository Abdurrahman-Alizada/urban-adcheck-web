import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocationDot,faPhone } from '@fortawesome/free-solid-svg-icons';


function Contact() {
  return (
    <section>
        {/* left side */}

         <div>
               <h2 className='text-[48px] font-extrabold font-Archivoo'>Get In Touch!</h2>
               <p className="text-black font-nunitosans font-normal text-[17px]">
                Fill up the form and our Team will get back to you within 24 hours.
               </p>
               <div className="flex flex-col gap-3">
               <div className='flex justify-start items-start gap-4'>
              <div className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-[12px] cursor-pointer">
                     <FontAwesomeIcon icon={faLocationDot} size="lg" href='#'/>
               </div>
               <p className="text-black font-nunitosans font-normal text-[17px]">
               Address: 123 Street, City, Country
               </p> 
            </div>
            <div className='flex justify-start items-center gap-4'>
              <div className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-[12px] cursor-pointer">
                     <FontAwesomeIcon icon={faPhone} size="lg" href='#'/>
               </div>
               <div className='flex flex-col'>
                  <p className="text-black font-nunitosans font-normal text-[17px]"> +123 456 789</p>
                  <p className="text-black font-nunitosans font-normal text-[17px]"> +123 456 789</p>
                </div>             
            </div>
            <div className='flex justify-start items-center gap-4'>
              <div className="bg-primary text-black w-8 h-8 flex items-center justify-center rounded-[12px] cursor-pointer">
                     <FontAwesomeIcon icon={faEnvelope} size="lg" href='#'/>
               </div>
               <div className='flex flex-col'>
                  <p className="text-black font-nunitosans font-normal text-[17px]">Email: info@domain.com</p>
                  <p className="text-black font-nunitosans font-normal text-[17px]">Email: info@domain.com</p>
                </div>  
            </div>

            
            </div>
         </div>

        {/* right side */}

        <div>

        </div>


    </section>
  )
}

export default Contact
