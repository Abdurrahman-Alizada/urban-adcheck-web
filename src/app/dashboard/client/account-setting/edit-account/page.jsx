'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useGetCurrentLoginUserQuery, useUpdateUserMutation } from '@/redux/reducers/user/userThunk';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ProfleContentLoader from '@/components/contentLoader/profileContentLoader/page';

function EditAccount() {
  const [loading, setLoading] = useState(true);
  const { data: loginUser, isLoading } = useGetCurrentLoginUserQuery();
  // console.log("login user",loginUser)
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const validationSchema = Yup.object({
    userName: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string()
      .test('valid-phone', 'Invalid phone number', (value) => 
        !value || isValidPhoneNumber(value)
      ),
    location: Yup.object({
      state: Yup.string(),
      city: Yup.string(),
      zipCode: Yup.string()
    })
  });

  const initialValues = {
    inputType: 'basic',
    userName: loginUser?.userName || '',
    firstName: loginUser?.firstName || '',
    lastName: loginUser?.lastName || '',
    phoneNumber: loginUser?.phoneNumber || '',
    location: {
      state: loginUser?.location?.state || '',
      city: loginUser?.location?.city || '',
      zipCode: loginUser?.location?.zipCode || ''
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {

    const body={
      userName: values.userName,
      fullName: {
        firstName: values.firstName,
        lastName: values.lastName
      },
      phoneNumber: values.phoneNumber,
      location: {
        state: "",
        city: "",
        zipCode: ""
      }
    }
    try {
      const updatedUser = await updateUser(body).unwrap();
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
      {loading ? (
        <ProfleContentLoader />
      ) : (
        <>
          <div>
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
            {({ values, setFieldValue }) => (
              <Form className="mt-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-[16px] text-gray-800 font-nunitosans">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder={loginUser?.fullName?.firstName}
                      className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-[16px] text-gray-800 font-nunitosans">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder={loginUser?.fullName?.lastName}
                      className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
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
                      placeholder={loginUser?.userName}
                      className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                    />
                    <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                    <label htmlFor="phoneNumber" className="text-[16px] text-gray-800 font-nunitosans">
                      Primary Phone
                    </label>
                    <PhoneInput
                      defaultCountry="US"
                      placeholder={loginUser?.phoneNumber}
                      onChange={(value) => setFieldValue('phoneNumber', value)}
                      className="custom-phone-input text-[16px] text-gray-800 font-nunitosans bg-transparent focus:border-primary outline-primary border-[1px] px-3 py-3 rounded-[5px]"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
                {/* location */}
                {/* <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="w-[100%] md:w-[33%] flex flex-col gap-2">
                    <label htmlFor="location.state" className="text-[16px] text-gray-800 font-nunitosans">
                      State
                    </label>
                    <Field
                      type="text"
                      name="location.state"
                      id="location.state"
                      value={loginUser?.location?.state}
                      className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                    />
                    <ErrorMessage name="location.state" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-[100%] md:w-[33%] flex flex-col gap-2">
                    <label htmlFor="location.city" className="text-[16px] text-gray-800 font-nunitosans">
                      City
                    </label>
                    <Field
                      type="text"
                      name="location.city"
                      id="location.city"
                      value={loginUser?.data?.location?.city}
                      className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                    />
                    <ErrorMessage name="location.city" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-[100%] md:w-[33%] flex flex-col gap-2">
                    <label htmlFor="location.zipCode" className="text-[16px] text-gray-800 font-nunitosans">
                      Zip Code
                    </label>
                    <Field
                      type="text"
                      name="location.zipCode"
                      id="location.zipCode"
                      value={loginUser?.data?.location?.zipCode}
                      className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                    />
                    <ErrorMessage name="location.zipCode" component="div" className="text-red-500 text-sm" />
                  </div>
                </div> */}
                <div className="mt-4">
                  <button
                    type="submit"
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
        </>
      )}
      <hr className="h-2 w-full mt-4" />
    </div>
  );
}

export default EditAccount;