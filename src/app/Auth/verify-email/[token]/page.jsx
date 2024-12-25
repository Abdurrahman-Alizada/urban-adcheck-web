"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useConfirmEmailMutation } from "@/redux/reducers/user/userThunk";
import { useRouter } from "next/router";

function VerifyEmail({ params }) {
  const resolvedParams = React.use(params); // Unwrap the Promise
  const token = resolvedParams?.token;
  
  const [statusMessage, setStatusMessage] = React.useState("");
  const [loader, setLoader] = useState(true);

  const [confirmEmail, { isLoading }] = useConfirmEmailMutation({
    skip: !token // Skip the API call if there's no token
  });

  // Handle the email confirmation when token is available
  React.useEffect(() => {
    if (token) {
      confirmEmail(token)
        .then((response) => {
          if (response.data?.message === "You email confirmation successful") {
            setStatusMessage("Email confirmed successfully!");
          } else {
            setStatusMessage("Email confirmation failed. Please try again.");
          }
          setLoader(false);
        })
        .catch((error) => {
          const errorMessage = 
            error?.data?.message || "An unknown error occurred. Please try again.";
          setStatusMessage(`Error: ${errorMessage}`);
          setLoader(false);
        });
    }
  }, [token]);

  return (
    <div className="flex justify-center mt-[150px] mb-[150px] relative">
      <div className="w-[95%] mobileL:w-[85%] md:w-[75%] lg:w-[40%] flex justify-center relative">
        {/* First background image */}
        <div
          className="absolute top-[-100px] md:left-[-90px] lg:left-[-100px] z-[-1] w-[220px] h-[220px]"
          style={{
            backgroundImage: "url('/shape.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>

        {/* Login Section */}
        <section className="relative z-[1] w-[100%] shadow-custom-shadow px-6 pt-10 pb-10 bg-white">
          <div className="flex gap-1 items-center justify-center">
            <Image
              src={"/favicon.png"}
              width={30}
              height={30}
              alt="Favicon"
              className="object-contain"
            />
            <h2 className="text-grayColor font-bold">Urban Adcheck</h2>
          </div>

          {/* Message Section */}
          <div className="mt-8 flex flex-col text-center">
            <h2 className="font-nunitosans">Email Verification</h2>
            {isLoading && loader && (
              <div className="flex flex-col items-center mt-4">
                {/* Loader */}
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-nunitosans text-[14px] text-grayColor mt-2">
                  Verifying your email...
                </p>
              </div>
            )}
            {statusMessage && (
              <div
                className={`mt-4 ${
                  statusMessage.includes("success")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <h3 className="text-xl font-bold">
                  {statusMessage.includes("success") ? "Success!" : "Error"}
                </h3>
                <p>{statusMessage}</p>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-6 flex justify-center">
            <a
              href="/"
              className="text-primary underline font-semibold flex items-center gap-2"
            >
              Go back to homepage
            </a>
          </div>
        </section>

        {/* Last background image */}
        <div
          className="absolute bottom-[-140px] md:left-[90%] lg:left-[90%] md:translate-x-[-50%] z-[-1] w-[220px] h-[220px]"
          style={{
            backgroundImage: "url('/shape-2.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
      </div>
    </div>
  );
}

export default VerifyEmail;