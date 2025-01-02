'use client';
import { FaCircleDollarToSlot } from "react-icons/fa6";


 function PaymentFailed() {
  return (
    <div className="flex justify-center">
        <div className="lg:w-[50%] flex flex-col gap-3 justify-center items-center rounded-md p-2 md:p-5 lg:p-16 shadow-custom-card m-3 md:my-6 lg:my-10">
        <FaCircleDollarToSlot size={45} color="#068179"/>
           <h2 className="text-[20px] text-center md:text-[25px] lg:text-[35px] font-bold font-NotoSans text-black leading-[50px] md:leading-[70px]">
            Your Payment is failed 
           </h2>  
           <p className="text-black text-center max-w-[400px] font-nunitosans font-normal text-[17px]">
            Payment Failed Becuase your Card is NOT working.
          </p>   
          <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md font-bold hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
            >
             Pay Again
            </button>      
        </div>
    </div>
  );
}

export default PaymentFailed