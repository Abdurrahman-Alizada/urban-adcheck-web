'use client';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUpdateUserMutation } from '@/redux/reducers/user/userThunk';

function ManagePassword() {
  const [loading, setLoading] = useState(true);
  const [updatePassword, { isLoading: isUpdating }] = useUpdateUserMutation();

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Current password is required')
      .min(8, 'Password must be at least 8 characters long'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters long')
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
      const response = await updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }).unwrap();

      alert('Password updated successfully!');
      resetForm();
      console.log('Password update response:', response);
    } catch (error) {
      alert('Failed to update password. Please check your current password.');
      console.error('Password update error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="w-full p-4 mt-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold">
            Manage Password
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-4 space-y-4">
                {/* Current Password */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="currentPassword"
                    className="text-[16px] text-gray-800 font-semibold"
                  >
                    Current Password
                  </label>
                  <Field
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    className="text-[16px] text-gray-800 border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="newPassword"
                    className="text-[16px] text-gray-800 font-semibold"
                  >
                    New Password
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="text-[16px] text-gray-800 border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-[16px] text-gray-800 font-semibold"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="text-[16px] text-gray-800 border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isUpdating}
                    className={`text-[15px] px-6 py-2 font-semibold rounded-[5px] ${
                      isSubmitting || isUpdating
                        ? 'bg-gray-400 text-white'
                        : 'bg-primary text-white'
                    }`}
                  >
                    {isSubmitting || isUpdating ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
}

export default ManagePassword;
