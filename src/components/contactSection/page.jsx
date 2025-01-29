import React from 'react';
import { Field, ErrorMessage } from 'formik';

const ContactSection = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  jobPostModal,
  isLoading,
  setJobPostModal,
  jobPostResponse
}) => {
  
  return (
    <section className="relative flex flex-col gap-6">
      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="personalInfo.fullName" className="text-[16px]">Full Name</label>
            <Field
              type="text"
              id="personalInfo.fullName"
              name="personalInfo.fullName"
              className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                errors.personalInfo?.fullName && touched.personalInfo?.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            <ErrorMessage name="personalInfo.fullName" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="personalInfo.email" className="text-[16px]">Email</label>
            <Field
              type="email"
              id="personalInfo.email"
              name="personalInfo.email"
              className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                errors.personalInfo?.email && touched.personalInfo?.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            <ErrorMessage name="personalInfo.email" component="div" className="text-red-500 text-sm" />
          </div>
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Primary Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber.primary" className="text-[16px]">Primary Phone</label>
            <Field
              type="tel"
              id="phoneNumber.primary"
              name="phoneNumber.primary"
              className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                errors.phoneNumber?.primary && touched.phoneNumber?.primary ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter primary phone number"
            />
            <ErrorMessage name="phoneNumber.primary" component="div" className="text-red-500 text-sm" />
          </div>
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber.secondary" className="text-[16px]">Secondary Phone</label>
            <Field
              type="tel"
              id="phoneNumber.secondary"
              name="phoneNumber.secondary"
              className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                errors.phoneNumber?.primary && touched.phoneNumber?.primary ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter secondary phone number"
            />
            <ErrorMessage name="phoneNumber.secondary" component="div" className="text-red-500 text-sm" />
          </div> */}

          {/* location */}
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-[16px]">location</label>
            <Field
              type="input"
              id="location"
              name="location"
              className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] border-gray-300"
              placeholder="Enter location"
            />
          </div> */}
        </div>
      </div>

      {
  jobPostModal && !isLoading && (
    <div className="absolute inset-0 z-50 flex flex-col items-center gap-3 mt-3 bg-white shadow-lg p-6 rounded-lg">
      {/* Display message based on jobPostResponse */}
      <p>
        {jobPostResponse?.error
          ? jobPostResponse.error.data.message || jobPostResponse.error.message
          : jobPostResponse?.message}          
      </p>

      {/* If payment details exist, show additional information */}
      {jobPostResponse?.paymentDetails && (
        <div className="text-sm text-gray-600 mt-3">
          <p>
            <strong>Payment Type:</strong> {jobPostResponse.paymentDetails.paymentType}
          </p>
          <p>
            <strong>Amount:</strong> {jobPostResponse.paymentDetails.amount}{' '}
            {jobPostResponse.paymentDetails.currency}
          </p>
          <p>
            <strong>Service Fee:</strong> {jobPostResponse.paymentDetails.serviceFee}{' '}
            {jobPostResponse.paymentDetails.currency}
          </p>
          <p>
            <strong>Total:</strong> {jobPostResponse.paymentDetails.totalAmount}{' '}
            {jobPostResponse.paymentDetails.currency}
          </p>
        </div>
      )}

      {/* Modal Actions */}
      <div className="flex justify-end gap-3 mt-3">
        <button
          className="flex items-center text-[18px] px-6 py-2 border-[1px] border-gray-300 rounded-[5px] bg-transparent text-black"
          onClick={() => setJobPostModal(false)}
        >
          Close
        </button>
        {jobPostResponse?.paymentDetails && (
          <button
            className="flex items-center gap-4 text-[18px] px-8 py-2 rounded-[5px] bg-primary text-white"
            onClick={() => handleSubscribe()}
          >
            Subscribe Package
          </button>
        )}
      </div>
    </div>
  )
}


    </section>
  );
};

export default ContactSection;