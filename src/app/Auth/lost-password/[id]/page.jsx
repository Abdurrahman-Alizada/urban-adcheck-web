"use client";
import Head from "next/head";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useResetPasswordMutation } from "@/redux/reducers/user/userThunk";
import { useRouter } from "next/navigation";

const NewPassword = ({ params }) => {
  const resolvedParams = React.use(params); // Unwrap the Promise
  const id = resolvedParams?.id;
  const router = useRouter();
  console.log("params", id);

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        delete values.confirmPassword;
        console.log("Form submitted:", values, id);
        // Call resetPassword API or perform desired actions
        resetPassword({ resetToken: id, newPassword: values.newPassword }).then(
          (res) => {
              console.log("password rest", res?.error?.data?.message);
            if (res.data?.message == "You have successfully updated your password") {
              router.push("/auth/login");
            }
            else if(res?.error){
                alert(`Password didn't reset. The error maybe '${res?.error?.data?.message}'`)
            }else{
                alert(`Password didn't reset. Please try again in a while`)
            }
          }
        );
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <div>
      <Head>
        <title>Lost password - Urban AdCheck</title>
        <meta name="description" content="New password setup" />
      </Head>

      <main>
        <div className="container mx-auto">
          <div className="flex justify-center !px-5 my-20">
            <div className="w-full lg:w-1/2 !p-6 m-auto shadow-card rounded bg-white">
              <h1 className="text-lg text-center font-semibold">
                New Password
              </h1>
              <p className="text-center text-themeLight">
                Please enter your new password
              </p>
              <form className="!mt-5" onSubmit={formik.handleSubmit}>
                {/* New Password Field */}
                <div className="!mb-5">
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                      formik.touched.newPassword && formik.errors.newPassword
                        ? "!border-red-500"
                        : "border-gray"
                    } placeholder:font-normal placeholder:text-xss1 rounded placeholder-themeDarkAlt focus:outline-none focus:ring-0 focus:ring-opacity-50`}
                    placeholder="New Password"
                  />
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <span className="text-red-500 text-xss italic">
                      {formik.errors.newPassword}
                    </span>
                  )}
                </div>
                {/* Confirm Password Field */}
                <div className="!mb-5">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none block w-full !p-3 leading-5 text-themeDarker border ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "!border-red-500"
                        : "border-gray"
                    } placeholder:font-normal placeholder:text-xss1 rounded placeholder-themeDarkAlt focus:outline-none focus:ring-0 focus:ring-opacity-50`}
                    placeholder="Confirm Password"
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <span className="text-red-500 text-xss italic">
                        {formik.errors.confirmPassword}
                      </span>
                    )}
                </div>
                {/* Submit Button */}
                <button
                  className={`py-3 px-7 flex gap-2 justify-center items-center transition-all duration-300 ease-in-out !mb-4 text-base text-white font-normal text-center leading-6 rounded-md bg-primary hover:bg-secondary`}
                  type="submit"
                >
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewPassword;
