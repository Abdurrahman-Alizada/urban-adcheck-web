'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useResetPasswordMutation } from '@/redux/reducers/user/userThunk';

function ManagePassword() {
  const [resetPassword, { isLoading: isUpdating }] = useResetPasswordMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000); 
  }, []);

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Current password is required')
      .min(8, 'Password must be at least 8 characters long'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters long')
      .notOneOf([Yup.ref('currentPassword')], 'New password must be different from current password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Please confirm your new password')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setErrorMessage('');
      setShowSuccess(false);
      
      const response = await resetPassword(values).unwrap();
      
      setShowSuccess(true);
      resetForm();
      
    } catch (error) {
      setErrorMessage(
        error.data?.message || 
        'Failed to update password. Please check your current password.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-4 mt-6 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-32"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 mt-6">
      <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold">
        Manage Password
      </h2>
      
      {showSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Password updated successfully!
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="currentPassword" className="text-[16px] text-gray-800 font-semibold">
                Current Password
              </label>
              <Field type="password" name="currentPassword" id="currentPassword" className="text-[16px] text-gray-800 border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary" autoComplete="current-password" />
              <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-[16px] text-gray-800 font-semibold">
                New Password
              </label>
              <Field type="password" name="newPassword" id="newPassword" className="text-[16px] text-gray-800 border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary" autoComplete="new-password" />
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-[16px] text-gray-800 font-semibold">
                Confirm Password
              </label>
              <Field type="password" name="confirmPassword" id="confirmPassword" className="text-[16px] text-gray-800 border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary" autoComplete="new-password" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting || isUpdating} className={`text-[15px] px-6 py-2 font-semibold rounded-[5px] ${isSubmitting || isUpdating ? 'bg-gray-400 text-white' : 'bg-primary text-white hover:bg-primary/90 transition-colors'}`}>
                {isSubmitting || isUpdating ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ManagePassword;
