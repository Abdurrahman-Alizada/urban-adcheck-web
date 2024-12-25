'use client'
import React, { useState } from 'react'
import 'react-phone-number-input/style.css';
import {  useResetPasswordMutation } from '@/redux/reducers/user/userThunk';
import { useFormik } from 'formik';
import * as Yup from 'yup';


function ResetPassword() {

  const [resetPassword]=useResetPasswordMutation();
  
  
// Validation Schema using Yup
    const validationSchema = Yup.object({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
    });
    
    const formik = useFormik({
        initialValues: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
          try {
            const response = await resetPassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
                confirmPassword:values.confirmPassword,
            }).unwrap();
    
            if (response?.success) {
              resetForm();
              alert('Password updated successfully');
            } else {
              setFieldError('currentPassword', response?.message || 'Invalid password');
            }
          } catch (err) {
            setFieldError('currentPassword', err?.data?.message || 'An error occurred');
          } finally {
            setSubmitting(false);
          }
        },
      });


  return (
    <div className="w-full p-2 mt-4">
      {/* Password form */}
      <div className="mt-6">
        <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
          Change Password
        </h2>
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Current Password */}
            <div className="w-[100%] md:w-[50%] lg:w-[33%] flex flex-col gap-2">
              <label htmlFor="currentPassword" className="text-[16px] text-gray-800 font-nunitosans">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary ${
                  formik.touched.currentPassword && formik.errors.currentPassword ? 'border-red-500' : ''
                }`}
              />
              {formik.touched.currentPassword && formik.errors.currentPassword && (
                <span className="text-red-500 text-sm">{formik.errors.currentPassword}</span>
              )}
            </div>
            {/* New Password */}
            <div className="w-[100%] md:w-[50%] lg:w-[33%] flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-[16px] text-gray-800 font-nunitosans">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary ${
                  formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500' : ''
                }`}
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <span className="text-red-500 text-sm">{formik.errors.newPassword}</span>
              )}
            </div>
            {/* Confirm Password */}
            <div className="w-[100%] md:w-[50%] lg:w-[33%] flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-[16px] text-gray-800 font-nunitosans">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
                }`}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <span className="text-red-500 text-sm">{formik.errors.confirmPassword}</span>
              )}
            </div>
          </div>
          {/* Save button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`text-[15px] px-6 py-2 font-semibold rounded-[5px] ${
                formik.isSubmitting ? 'bg-gray-400' : 'bg-primary text-white'
              }`}
            >
              {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
      <hr className="h-2 w-full mt-4" />
    </div>
  )
}

export default ResetPassword
