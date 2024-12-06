'use client'
import React from 'react';
import Image from 'next/image';
import { IoIosArrowBack } from "react-icons/io";
import { useFormik } from 'formik';  // Import Formik
import * as Yup from 'yup';  // Import Yup for validation
import { useResetPasswordMutation } from '@/redux/reducers/user/userThunk';
import { useRouter } from 'next/navigation';




function ResetPassword() {
  
   const [resetPassword]=useResetPasswordMutation();
   const router=useRouter();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async(values) => {
      const user={
        newPassword:values.password,
        confirmPassword:values.confirmPassword
      }
      try {
        const response= await resetPassword(user)
        console.log("success:" , response)
        router.push('auth/login')
      } catch (error) {
        console.error("password changed failed",error)
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

        {/* Reset Password Section */}
        <section className="relative z-[1] w-[100%] shadow-custom-shadow px-6 pt-10 pb-10 bg-white">
          <div className="flex gap-1 items-center justify-center">
            <Image
              src={'/favicon.png'}
              width={30}
              height={30}
              alt="Favicon"
              className="object-contain"
            />
            <h2 className="text-grayColor font-bold">Urban Adcheck</h2>
          </div>
          <div className="mt-8">
            <h2 className="font-nunitosans">Reset Password 🔒</h2>
            <span className="font-nunitosans text-[14px] text-grayColor">
              for john.doe@email.com
            </span>
          </div>
          <div className="mt-6">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
              {/* New Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-[16px]">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create Your New Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                ) : null}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-[16px]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-primary text-white w-full h-[52px] rounded-[10px] text-[18px]"
                >
                  Set New Password
                </button>
              </div>
              <div className="flex justify-center">
                <button className="bg-transparent flex items-center justify-center text-primary w-full h-[52px] rounded-[10px] text-[18px]">
                  <IoIosArrowBack />
                  Back to Log in
                </button>
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

export default ResetPassword;
