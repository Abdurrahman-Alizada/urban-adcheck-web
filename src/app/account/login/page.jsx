

"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useLoginUserMutation } from "@/redux/reducers/user/userThunk";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducers/user/userSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [from, setFrom] = useState("")
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      setFrom(params.get("from") || "");
    }, [router]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email or Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await loginUser({
          email: values.email,
          password: values.password,
        }).unwrap();

        // Save user info and token in Redux store
        dispatch(setUser(response));

        // Save tokens and user info in cookies
        Cookies.set("accessToken", response.accessToken, { expires: 7, secure: true });
        Cookies.set("refreshToken", response.refreshToken, { expires: 7, secure: true });
        Cookies.set("userInfo", JSON.stringify(response), { expires: 7, secure: true });
        Cookies.set("userRole", JSON.stringify(response?.role), { expires: 7, secure: true });

        // Store in localStorage
        localStorage.setItem("userInfo", JSON.stringify(response));

        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 2000,
        });

        if (from) {
          router.push(decodeURIComponent(from));
        } else {
          router.push(`/dashboard/${response.role}/overview`);
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed. Please check your credentials.", {
          position: "top-right",
          autoClose: 3000,
        });
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

        {/* Login Section */}
        <section className="relative z-[1] w-[100%] shadow-custom-shadow px-6 pt-10 pb-10 bg-white">
          <div className="flex gap-1 items-center justify-center">
            <Image src={"/favicon.png"} width={30} height={30} alt="Favicon" />
            <h2 className="text-grayColor font-bold">Urban Adcheck</h2>
          </div>
          <div className="mt-8">
            <h2 className="font-nunitosans">Welcome to UAC! 👋</h2>
            <span className="font-nunitosans text-[14px] text-grayColor">
              Please sign in to your account and start the adventure
            </span>
          </div>
          <div className="mt-6">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-3"
            >
              {/* Email or Username */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[16px]">
                  Email or Username
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className={`text-[15.04px] bg-transparent border px-3 py-3 rounded-[5px] focus:outline-primary ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email or username"
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className="text-red-500 text-[14px]">
                    {formik.errors.email}
                  </span>
                ) : null}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-[16px]">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`bg-transparent border px-3 py-3 rounded-[5px] focus:outline-primary ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <span className="text-red-500 text-[14px]">
                    {formik.errors.password}
                  </span>
                ) : null}
              </div>

              {/* Login Button */}
              <div className="flex justify-center">
                {isLoading ? (
                  <button className="bg-primary w-full h-[60px] rounded-[10px] flex justify-center items-center">
                    <div className="spinner text-white"> </div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-primary text-white w-full h-[52px] rounded-[10px]"
                    disabled={isLoading}
                  >
                    Login
                  </button>
                )}
              </div>
              {error && (
                <div className="text-red-500 text-center">
                  Incorrect Email or Password
                </div>
              )}
            </form>
            <div className="flex justify-center mt-2 text-primary cursor-pointer">
              <span onClick={() => router.push("/account/forgot-password")}>
                Forgot Password
              </span>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
