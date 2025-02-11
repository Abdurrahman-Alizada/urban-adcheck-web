'use client';
import React from 'react';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useGetCurrentLoginUserQuery, useUpdateUserMutation } from '@/redux/reducers/user/userThunk';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ProfleContentLoader from '@/components/contentLoader/profileContentLoader/page';

function EditAccount() {
  const { data: loginUser, isLoading } = useGetCurrentLoginUserQuery();
  const [updateUser, { isLoading:loading }] = useUpdateUserMutation();

  if (isLoading) return <ProfleContentLoader />;

  return (
    <div className="w-full p-2 mt-4">
      <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold">Edit Profile</h2>
      <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={'/profile-Image.png'}
            width={80}
            height={80}
            alt="profile image"
            className="object-contain"
          />
          <button className="bg-[#E9E0FF] h-10 text-[15px] text-primary font-semibold rounded-sm py-2 px-4">
            Choose Image
          </button>
        </div>
      </div>

      <Formik
        initialValues={{
          userName: loginUser?.userName || '',
          firstName: loginUser?.firstName || '',
          lastName: loginUser?.lastName || '',
          phoneNumber: loginUser?.phoneNumber || '',
        }}
        validationSchema={Yup.object({
          userName: Yup.string().required('Username is required'),
          firstName: Yup.string().required('First Name is required'),
          lastName: Yup.string().required('Last Name is required'),
          phoneNumber: Yup.string().test(
            'valid-phone',
            'Invalid phone number',
            (value) => !value || isValidPhoneNumber(value)
          ),
        })}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await updateUser({
              userName: values.userName,
              fullName: { firstName: values.firstName, lastName: values.lastName },
              phoneNumber: values.phoneNumber,
            }).unwrap();
            alert('Profile updated successfully!');
          } catch (err) {
            alert('Failed to update profile.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form className="mt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full md:w-1/2 flex flex-col gap-2">
                <label htmlFor="firstName" className="text-[16px] text-gray-800">First Name</label>
                <Field type="text" name="firstName" id="firstName" className="border px-3 py-2 rounded" />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-2">
                <label htmlFor="lastName" className="text-[16px] text-gray-800">Last Name</label>
                <Field type="text" name="lastName" id="lastName" className="border px-3 py-2 rounded" />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full md:w-1/2 flex flex-col gap-2">
                <label htmlFor="userName" className="text-[16px] text-gray-800">Username</label>
                <Field type="text" name="userName" id="userName" className="border px-3 py-2 rounded" />
                <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-2">
                <label htmlFor="phoneNumber" className="text-[16px] text-gray-800">Primary Phone</label>
                <PhoneInput
                  defaultCountry="US"
                  value={loginUser?.phoneNumber || ''}
                  onChange={(value) => setFieldValue('phoneNumber', value)}
                  className="border px-3 py-2 rounded"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className={`text-[15px] px-6 py-2 font-semibold rounded ${loading ? 'bg-gray-400' : 'bg-primary text-white'}`}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <hr className="w-full mt-4 border-gray-300" />
    </div>
  );
}

export default EditAccount;
