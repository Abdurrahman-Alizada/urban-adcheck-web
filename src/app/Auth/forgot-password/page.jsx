"use client";
import React from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import { useForgotPasswordMutation } from "@/redux/reducers/user/userThunk";
import { useRouter } from "next/navigation";

function ForgotPasswordP() {
  const router = useRouter();
  const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Send the email to the API
        console.log("first",values.email)
        const newData = {email:values.email}
        forgotPassword(values.email).then((res)=>{
          console.log("res=>",res)
        });
        // console.log("Success:", response);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

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

        {/* Forgot Password Section */}
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
          <div className="mt-8">
            <h2 className="font-nunitosans text-[20px] font-bold">
              Forgot Password? 🔒
            </h2>
            <span className="font-nunitosans text-[14px] text-grayColor">
              Enter your email, and we&apos;ll send you instructions to reset
              your password.
            </span>
          </div>
          <div className="mt-6">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-3"
            >
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[16px]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                  className={`text-[15.04px] bg-transparent border px-3 py-3 rounded-[5px] ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "focus:outline-primary"
                  }`}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-[52px] rounded-[10px] text-[18px] ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary text-white"
                  }`}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>

              {/* Back to Login */}
              <div className="flex justify-center">
                <button
                  type="button"
                  className="bg-transparent flex items-center justify-center text-primary w-full h-[52px] rounded-[10px] text-[18px]"
                  onClick={() => router.push("/auth/login")}
                >
                  {/* <IoIosArrowBack /> */}
                  Back to Log in
                </button>
              </div>

              {/* Error Feedback */}
              {isError && (
                <div className="text-red-500 text-center mt-3">
                  Something went wrong. Please try again later.
                </div>
              )}
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

export default ForgotPasswordP;
