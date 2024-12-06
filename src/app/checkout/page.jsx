import React from 'react';
import Image from 'next/image';

function Checkout() {
  const PaymentImages = [
    {
      image: '/visa.png',
      alt: 'visa',
    },
    {
      image: '/stripe.png',
      alt: 'stripe',
    },
    {
      image: '/paypal.png',
      alt: 'paypal',
    },
    {
      image: '/mastercard.png',
      alt: 'mastercard',
    },
    {
      image: '/googlePay.png',
      alt: 'googlePlay',
    },
  ];
  const checkoutLinks = [
    {
      title: 'Instructions',
      link: '/instructions',
    },
    {
      title: 'License',
      link: '/License',
    },
    {
      title: 'Terms of Use',
      link: '/Term-of-Use',
    },
    {
      title: 'Privacy',
      link: '/Privacy',
    },
  ];

  return (
    <div className="w-full p-[20px] md:p-[50px] lg:p-[100px]">
      {/* checkout form */}
      <section>
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-1">
          <h2 className="text-[20px] md:text-[24px] lg:text-[32px] font-extrabold font-Archivoo">
            Complete registration payment
          </h2>
          <div className="flex gap-5">
            <span className="font-nunitosans text-primary">Subscription #1</span>
            <span className="font-nunitosans font-semibold text-primary">$9,950</span>
          </div>
        </div>

        <form action="">
          {/* Personal details */}
          <div className="mt-6">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-extrabold font-Archivoo">
              Personal details
            </h2>
            {/* Address & City Line */}
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              {/* Address Line */}
              <div className="w-[100%] lg:w-[50%] flex flex-col gap-2">
                <label htmlFor="Address" className="text-[16px]">
                  Address line
                </label>
                <input
                  type="text"
                  placeholder="P.O box 1232"
                  id="Address"
                  name="Address"
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                />
              </div>
              {/* city */}
              <div className="w-[100%] lg:w-[50%] flex flex-col gap-2">
                <label htmlFor="city" className="text-[16px]">
                  City
                </label>
                <input
                  type="text"
                  placeholder="austria"
                  id="city"
                  name="city"
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                />
              </div>
            </div>

            {/* State & Postal Code */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              {/* State */}
              <div className="w-[100%] lg:w-[50%] flex flex-col gap-2">
                <label htmlFor="State" className="text-[16px]">
                  State
                </label>
                <input
                  type="text"
                  placeholder="NewYork"
                  id="State"
                  name="State"
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                />
              </div>
              {/* Postal Code */}
              <div className="w-[100%] lg:w-[50%] flex flex-col gap-2">
                <label htmlFor="Postal" className="text-[16px]">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="3453"
                  id="Postal"
                  name="Postal"
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Payment methods */}
          <div className="mt-6">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-extrabold font-Archivoo">
              Payment methods
            </h2>
             <div className='flex gap-4 mt-3'>
             {PaymentImages.map((img, index) => (
              <div key={index}>
                <Image
                  src={img.image}
                  width={70}
                  height={48}
                  alt={img.alt}
                  className="object-contain"
                />
              </div>
            ))}
             </div>
          </div>

          {/* Card details */}
          <div className="mt-6">
            <h2 className="text-[20px] md:text-[22px] lg:text-[24px] font-extrabold font-Archivoo">
              Card details
            </h2>
            {/* CardHolder name */}
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="CardHolder" className="text-[16px]">
                  Cardholder&apos;s name
                </label>
                <input
                  type="text"
                  placeholder="seen on your card"
                  id="CardHolder"
                  name="CardHolderName"
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                />
              </div>
            </div>

            {/* Card Number */}
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="CardNumber" className="text-[16px]">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="seen on your card"
                  id="CardNumber"
                  name="CardNumber"
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                />
              </div>
            </div>

            {/* Expiry and cvc */}
            <div className="flex flex-col md:flex-row gap-4 mt-2">
              {/* Expiry */}
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="Expiry" className="text-[16px]">
                  Expiry
                </label>
                <input
                  type="text"
                  placeholder="20/25"
                  id="Expiry"
                  name="Expiry"
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                />
              </div>
              {/* cvc */}
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="cvc" className="text-[16px]">
                  Cvc
                </label>
                <input
                  type="text"
                  placeholder="123"
                  id="cvc"
                  name="cvc"
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                />
              </div>
            </div>

            <div className="w-full mt-4">
              {/* submit button */}
              <button
                type="submit"
                className="bg-primary w-full h-[40px] text-white rounded-[5px] text-[18px]"
              >
                Next
              </button>
            </div>
          </div>
        </form>

        {/* important Links in checkout */}
        <ul className="flex flex-col md:flex-row justify-center gap-2 mt-6">
          {checkoutLinks.map((link, index) => (
            <li key={index} className="text-primary text-[14px]">
              <a href={link.link}>{link.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Checkout;
