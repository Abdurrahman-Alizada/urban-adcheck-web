import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';

function Login() {
  return (
    <div className="flex justify-center mt-[150px] mb-[150px] relative">
      <div className="w-[95%] mobileL:w-[85%] md:w-[75%] lg:w-[45%] flex justify-center relative">
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
              src={'/favicon.png'}
              width={30}
              height={30}
              alt="Favicon"
              className="object-contain"
            />
            <h2 className="text-grayColor font-bold">Urban Adchecker</h2>
          </div>
          <div className="mt-8">
            <h2 className="font-nunitosans">Welcome to UAC! 👋</h2>
            <span className="font-nunitosans text-[14px] text-grayColor">
              Please sign in to your account and start the adventure
            </span>
          </div>
          <div className="mt-6">
            <form className="flex flex-col gap-3">
              {/* Username or Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-[16px]">
                  Email or Username
                </label>
                <input
                  type="text"
                  placeholder="Devid Meller"
                  id="fullName"
                  name="Full Name"
                  className="text-[15.04px] bg-transparent border px-3 py-3 rounded-[5px] focus:outline-primary"
                />
              </div>
              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-[16px]">
                    Password
                  </label>
                  <span className="text-primary font-nunitosans text-[16px] font-semibold">
                    Forgot Password?
                  </span>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Create Your Password"
                  name="password"
                  className="bg-transparent border px-3 py-3 rounded-[5px] focus:outline-primary"
                />
              </div>
              {/* Remember Me */}
              <div className="flex items-center">
                <label className="text-grayColor text-[15px]">
                  <input type="checkbox" className="mr-1" />
                  Remember Me
                </label>
              </div>
              {/* Login Button */}
              <div className="flex justify-center">
                <button className="bg-primary text-white w-full h-[52px] rounded-[10px] text-[18px]">
                  Login
                </button>
              </div>
              {/* Account Creation */}
              <div className="flex justify-center">
                <span className="font-nunitosans text-[14px]">
                  New on our platform?{' '}
                  <a href="#" className="text-primary underline font-semibold">
                    Create an account
                  </a>
                </span>
              </div>
              {/* Separator */}
              <div className="flex gap-4 items-center">
                <hr className="flex-1 border-t-2 border-gray-200" />
                <span className="text-[14px] text-grayColor">Or</span>
                <hr className="flex-1 border-t-2 border-gray-200" />
              </div>
              {/* Social Media Login */}
              <div className="flex justify-center gap-4">
                <FontAwesomeIcon
                  icon={faFacebook}
                  color="blue"
                  className="bg-[#4267B2] p-1 rounded-sm bg-opacity-10"
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  color="#1DA1F2"
                  className="bg-[#1DA1F2] p-1 rounded-sm bg-opacity-10"
                />
                <FontAwesomeIcon
                  icon={faGoogle}
                  color="#DB4437"
                  className="bg-red-100 p-1 rounded-sm"
                />
              </div>
            </form>
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

export default Login;
