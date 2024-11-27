import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLocationDot,faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  const footerListOne = [
    { title: 'Footer Link 1', link: '#' },
    { title: 'Footer Link 2', link: '#' },
    { title: 'Footer Link 3', link: '#' },
    { title: 'Footer Link 4', link: '#' },
    { title: 'Footer Link 5', link: '#' },
    { title: 'Footer Link 6', link: '#' },
  ];
  const footerListTwo = [
    { title: 'Footer Link 7', link: '#' },
    { title: 'Footer Link 8', link: '#' },
    { title: 'Footer Link 9', link: '#' },
    { title: 'Footer Link 10', link: '#' },
    { title: 'Footer Link 11', link: '#' },
    { title: 'Footer Link 12', link: '#' },
  ];

  return (
    <footer className="bg-black w-full">
      {/* Footer Top */}
      <div className="w-full flex flex-col md:flex-row justify-around items-center py-4 px-4 border-b-[1px] border-gray-700">
        {/* Text Section */}
        <div className=" md:max-w-[50%] text-center">
          <h2 className="text-white font-extrabold mb-5 mt-3 text-[22.86px] lg:text-[30.86px] font-nunitosans leading-7 lg:leading-10">
            Subscribe our Newsletter 
          </h2>
        </div>

        {/* Input Section */}
        <div className="flex items-center w-full max-w-[500px] relative">
          <input
            type="text"
            className="w-full px-4 py-3 pr-[120px] rounded-[10px] bg-white text-[15.16px] outline-none shadow-md"
            placeholder="Your email"
          />
          <button className="bg-secondary text-white text-[15px] md:text-[18px] font-semibold rounded-[10px] px-2 md:px-5 py-1 absolute right-[10px] top-[50%] translate-y-[-50%]">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-[10px] md:px-[50px] lg:px-[80px]   py-[50px] gap-10">
          {/* Column 1: About */}
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-white font-nunitosans font-bold text-[20px] md:text-[30px] lg:text-[32.57]">
                Urban <span className="text-primary font-black">Adcheck</span>
              </h2>
            </div>
            <p className="text-[#585858] font-nunitosans font-normal text-[16px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            {/* Social Media */}
            <div className="flex gap-4 mt-4">
               <div className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                  <FontAwesomeIcon icon={faFacebook} size="lg" href='#'/>
               </div>
               <div className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                  <FontAwesomeIcon icon={faTwitter} size="lg" href='#'/>
               </div>
               <div className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                  <FontAwesomeIcon icon={faInstagram} size="lg" href='#' />
               </div>
            </div>

          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-nunitosans font-bold text-[20px] md:text-[30px] lg:text-[32.57]">
              Quick Links
            </h2>
            {/* Quick Links list one */}
             <div className='flex gap-6'>
             <ul className="flex flex-col gap-3">
              {footerListOne.map((listOne, index) => (
                <li key={index} className="text-gray-400 uppercase text-[16.39px] hover:text-primary transition">
                  <Link href={listOne.link}>{listOne.title}</Link>
                </li>
              ))}
            </ul>
            {/* Quick Links list two */}
            <ul className="flex flex-col gap-3">
              {footerListTwo.map((listTwo, index) => (
                <li key={index} className="text-gray-400 uppercase text-[16.39px] hover:text-primary transition">
                  <Link href={listTwo.link}>{listTwo.title}</Link>
                </li>
              ))}
            </ul>
             </div>
          </div>

          {/* Column 3: Resources
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-nunitosans font-bold text-[20px] md:text-[30px] lg:text-[32.57]">
              Resources
            </h2>
            <ul className="flex flex-col gap-3">
              {footerListTwo.map((listTwo, index) => (
                <li key={index} className="text-white uppercase hover:text-primary transition">
                  <Link href={listTwo.link}>{listTwo.title}</Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-nunitosans font-bold text-[20px] md:text-[30px] lg:text-[32.57]">
              Contact Us
            </h2>

            <div className='flex justify-start items-start gap-4'>
              <div className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-[12px] cursor-pointer">
                     <FontAwesomeIcon icon={faLocationDot} size="lg" href='#'/>
               </div>
               <p className="text-white font-nunitosans font-normal text-[17px]">
               Address: 123 Street, City, Country
               </p> 
            </div>
            <div className='flex justify-start items-center gap-4'>
              <div className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-[12px] cursor-pointer">
                     <FontAwesomeIcon icon={faPhone} size="lg" href='#'/>
               </div>
               <div className='flex flex-col'>
                  <p className="text-white font-nunitosans font-normal text-[17px]"> +123 456 789</p>
                  <p className="text-white font-nunitosans font-normal text-[17px]"> +123 456 789</p>
                </div>             
            </div>
            <div className='flex justify-start items-center gap-4'>
              <div className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-[12px] cursor-pointer">
                     <FontAwesomeIcon icon={faEnvelope} size="lg" href='#'/>
               </div>
               <div className='flex flex-col'>
                  <p className="text-white font-nunitosans font-normal text-[17px]">Email: info@domain.com</p>
                  <p className="text-white font-nunitosans font-normal text-[17px]">Email: info@domain.com</p>
                </div>  
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full text-center bg-gray-800 py-3">
        <p className="text-[#585858] text-[14px]">
          &copy; {new Date().getFullYear()} Urban Adcheck. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
