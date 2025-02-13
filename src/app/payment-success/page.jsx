'use client';
import { RiSecurePaymentLine } from "react-icons/ri";

 function PaymentSuccess() {
  return (
    <div className="flex justify-center">
        <div className="lg:w-[50%] flex flex-col gap-3 justify-center items-center rounded-md p-2 md:p-5 lg:p-16 shadow-custom-card m-3 md:my-6 lg:my-10">
          <RiSecurePaymentLine size={45} color="#068179"/>
           <h2 className="text-[20px] text-center md:text-[25px] lg:text-[35px] font-bold font-NotoSans text-black leading-[50px] md:leading-[70px]">
            Your Payment is successfull
           </h2>  
           <p className="text-black text-center max-w-[400px] font-nunitosans font-normal text-[17px]">
            Payment Processeed , Thanks For choosing our Platform.
          </p>   
            
        </div>
    </div>
  );
}

export default PaymentSuccess