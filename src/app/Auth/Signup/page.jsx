"use client";
import React, { useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignupUserMutation } from "@/redux/reducers/user/userThunk";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Link from "next/link"; // Use Link for navigation

function Signup() {
  const [selectedRole, setSelectedRole] = useState("Client"); // State to manage selected role
  const [showPassword, setShowPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(null); // State to handle errors
  const [signupUser, { isLoading }] = useSignupUserMutation();
  const router = useRouter(); // Initialize useRouter

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First name is too short")
        .required("First name is required"),
      lastName: Yup.string()
        .min(2, "Last name is too short")
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      username: Yup.string()
        .min(3, "Username must be at least 3 characters long")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be digits")
        .required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      // Prepare user data for submission
      const user = {
        fullName: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        userName: values.username,
        email: values.email,
        password: values.password,
        isConfirmed: false,
        role: {
          isWatchDog: selectedRole === "Watchdog"? true : false,
          isClient: selectedRole === "Client"? true : false,
          isAdmin: false,
          isSuperAdmin: false,
        },
      };

      try {

        // Call the signup API
        const response = await signupUser(user).unwrap(); // Use .unwrap() to handle payloads
        console.log("Signup successful:", response);

        // Redirect to login page
        router.push("/auth/login");
      } catch (error) {
        // Handle error from API
        console.error("Signup failed:", error);
        setErrorMessage(
          error.data?.message || "An error occurred during signup. Please try again."
        );
      }
    },
  });

  return (
    <div className="flex justify-center mt-[150px] mb-[150px] relative">
      <div className="w-[100%] mobileL:w-[85%] md:w-[75%] lg:w-[45%] flex justify-center relative">
        {/* First Background Image */}
        <div
          className="absolute top-[-100px] md:left-[-90px] lg:left-[-100px] z-[-1] w-[220px] h-[220px]"
          style={{
            backgroundImage: "url('/shape.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>

        {/* Sign-up Section */}
        <section className="relative z-[1] w-[100%] shadow-custom-shadow px-6 pt-10 pb-10 bg-white">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] md:text-[24px] lg:text-[32px] font-extrabold font-Archivoo">
              Create your account with us below
            </h2>
          </div>

          {/* Tabs */}
          <div className="mt-4 mb-2">
            <span className="font-nunitosans">You’re creating an account as?</span>
            <div className="mt-2 flex flex-col mobileL:flex-row gap-5">
              {/* Client Radio Button */}
              <label
                htmlFor="client"
                className={`flex items-center gap-1 lg:gap-3 border-[1px] rounded-[10px] px-4 w-[160px] lg:w-[280px] h-[60px] cursor-pointer ${
                  selectedRole === "Client"
                    ? "border-primary bg-[#068179] bg-opacity-[13%] text-primary"
                    : "border-grayColor bg-transparent"
                }`}
              >
                <input
                  type="radio"
                  id="client"
                  name="role"
                  value="Client"
                  checked={selectedRole === "Client"}
                  onChange={() => setSelectedRole("Client")}
                  className="accent-primary cursor-pointer"
                />
                Client
              </label>

              {/* Watchdog Radio Button */}
              <label
                htmlFor="watchdog"
                className={`flex items-center gap-3 border-[1px] rounded-[10px] px-4 w-[160px] lg:w-[280px] h-[60px] cursor-pointer ${
                  selectedRole === "Watchdog"
                    ? "border-primary bg-[#068179] bg-opacity-[13%] text-primary"
                    : "border-grayColor bg-transparent"
                }`}
              >
                <input
                  type="radio"
                  id="watchdog"
                  name="role"
                  value="Watchdog"
                  checked={selectedRole === "Watchdog"}
                  onChange={() => setSelectedRole("Watchdog")}
                  className="accent-primary cursor-pointer"
                />
                Watchdog
              </label>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="mt-6 mb-10 flex flex-col gap-4">
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-[16px]">
                First Name
              </label>
              <input
                type="text"
                placeholder="Devid"
                id="firstName"
                name="firstName"
                className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                {...formik.getFieldProps("firstName")}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-[16px]">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Meller"
                id="lastName"
                name="lastName"
                className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                {...formik.getFieldProps("lastName")}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
              )}
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-[16px]">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                id="username"
                name="username"
                className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                {...formik.getFieldProps("username")}
              />
              {formik.errors.username && formik.touched.username && (
                <div className="text-red-500 text-sm">{formik.errors.username}</div>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[16px]">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter Your Email Address"
                name="email"
                className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[16px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] w-full focus:border-primary"
                  {...formik.getFieldProps("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <RxEyeOpen /> : <GoEyeClosed />}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-[16px]">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter Your Phone Number"
                name="phone"
                className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                {...formik.getFieldProps("phone")}
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-[16px]">
                Current Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter Your Current Address"
                name="address"
                className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                {...formik.getFieldProps("address")}
              />
              {formik.errors.address && formik.touched.address && (
                <div className="text-red-500 text-sm">{formik.errors.address}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary text-white w-[249px] h-[59px] rounded-[10px] text-[18px]"
              >
                Create Account as {selectedRole}
              </button>
            </div>

            <div className="flex justify-center">
              <span className="font-nunitosans text-[14px]">
                Already have an account?{" "}
                <a href="#" className="text-primary underline font-semibold">
                  Login
                </a>
              </span>
            </div>
          </form>
        </section>

        {/* Last Background Image */}
        <div
          className="absolute bottom-[-140px] lg:bottom-[-100px] lg:left-[100%] lg:translate-x-[-50%] z-[-1] w-[220px] h-[220px]"
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


export default Signup;