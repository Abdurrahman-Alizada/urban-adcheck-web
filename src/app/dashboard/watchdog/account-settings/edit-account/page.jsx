'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useGetCurrentLoginUserQuery, useUpdateUserMutation } from '@/redux/reducers/user/userThunk';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



function EditAccount() {
  const [phone, setPhone] = useState('');
  const { data: loginUser, isLoading } = useGetCurrentLoginUserQuery();
  const [UpdateUser, { isLoading: isUpdating, isError, error }] = useUpdateUserMutation();

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    userName: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    address: Yup.string().required('Address is required'),
    websiteURL: Yup.string().url('Invalid URL'),
    biography: Yup.string(),
    phone: Yup.string()
      .test('valid-phone', 'Invalid phone number', (value) => isValidPhoneNumber(value || ''))
      .required('Phone number is required'),
  });

  const initialValues = {
    fullName: loginUser?.fullName?.firstName || '',
    userName: loginUser?.userName || '',
    email: loginUser?.email || '',
    address: '',
    websiteURL: '',
    biography: '',
    phone: phone || '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const updatedUser = await UpdateUser({
        fullName: values.fullName,
        userName: values.userName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        websiteURL: values.websiteURL,
        biography: values.biography,
      }).unwrap();

      console.log('User updated successfully:', updatedUser);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Failed to update profile.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-2 mt-4">
      <div>
        <span></span>
        <h2 className="text-gray-700 inline-block text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
          Edit Profile
        </h2>
        <div className="mt-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={'/profile-Image.png'}
                width={80}
                height={80}
                alt="profile image"
                className="object-contain"
              />
              <button className="bg-[#E9E0FF] h-10 text-[15.03px] text-primary font-semibold rounded-sm py-2 px-4">
                Choose Image
              </button>
            </div>
          </div>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form className="mt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                <label htmlFor="fullName" className="text-[16px] text-gray-800 font-nunitosans">
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                <label htmlFor="phone" className="text-[16px] text-gray-800 font-nunitosans">
                  Primary Phone
                </label>
                <PhoneInput
                  placeholder="Phone"
                  defaultCountry="US"
                  value={phone}
                  onChange={(value) => {
                    setPhone(value);
                    setFieldValue('phone', value);
                  }}
                  className="custom-phone-input text-[16px] text-gray-800 font-nunitosans bg-transparent focus:border-primary outline-primary border-[1px] px-3 py-3 rounded-[5px]"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                <label htmlFor="userName" className="text-[16px] text-gray-800 font-nunitosans">
                  Username
                </label>
                <Field
                  type="text"
                  name="userName"
                  id="userName"
                  className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                <label htmlFor="email" className="text-[16px] text-gray-800 font-nunitosans">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-[100%] lg:w-[50%] flex flex-col gap-2">
                <label htmlFor="address" className="text-[16px] text-gray-800 font-nunitosans">
                  Enter Location
                </label>
                <Field
                  type="text"
                  name="address"
                  id="address"
                  className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-[100%] lg:w-[50%] flex flex-col gap-2">
                <label htmlFor="websiteURL" className="text-[16px] text-gray-800 font-nunitosans">
                  Website Links (optional)
                </label>
                <Field
                  type="text"
                  name="websiteURL"
                  id="websiteURL"
                  className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                />
                <ErrorMessage
                  name="websiteURL"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div className="w-[100%] flex flex-col gap-2 mt-4">
              <label htmlFor="biography" className="text-[16px] text-gray-800 font-nunitosans">
                Biography
              </label>
              <Field
                as="textarea"
                name="biography"
                id="biography"
                className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary resize-none h-[120px]"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                disabled={isUpdating}
                className={`text-[15px] px-6 py-2 font-semibold rounded-[5px] ${
                  isUpdating ? 'bg-gray-400' : 'bg-primary text-white'
                }`}
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <hr className="h-2 w-full mt-4" />
    </div>
  );
}

export default EditAccount;
