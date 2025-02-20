"use client"
import React from 'react';
import { Field, ErrorMessage } from 'formik';

const JobsInfoSection = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched
}) => {
  return (
    <section className="flex flex-col gap-4">
      {/* Job Title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="jobTitle" className="text-[16px]">Job Title</label>
        <Field
          type="text"
          id="jobTitle"
          name="jobTitle"
          className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.jobTitle && touched.jobTitle ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter job title"
        />
        <ErrorMessage name="jobTitle" component="div" className="text-red-500 text-sm" />
      </div>

      {/* Category & Display Type */}
      <div className="flex gap-3">
        <div className="w-1/2 flex flex-col gap-2">
          <label htmlFor="category" className="text-[16px]">Category</label>
          <Field
            as="select"
            id="category"
            name="category"
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.category && touched.category ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Category</option>
            <option value="Outdoor Advertising">Outdoor Advertising</option>
          </Field>
          <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
        </div>

        <div className="w-1/2 flex flex-col gap-2">
          <label htmlFor="displayType" className="text-[16px]">Display Type</label>
          <Field
            as="select"
            id="displayType"
            name="displayType"
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.displayType && touched.displayType ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Display Type</option>
            <option value="billboard">Billboard</option>
            <option value="digital-ad">Digital Ad</option>
            <option value="storefront">Storefront</option>
            <option value="construction-notice">Construction Notice</option>
            <option value="flag">Flag</option>
            <option value="temporary-display">Temporary Display</option>
            <option value="permanent-display">Permanent Display</option>
          </Field>
          <ErrorMessage name="displayType" component="div" className="text-red-500 text-sm" />
        </div>
      </div>

      {/* Condition & Payment Type */}
      <div className="flex gap-3">
        {/* <div className="w-1/2 flex flex-col gap-2">
          <label htmlFor="condition" className="text-[16px]">Condition</label>
          <Field
            as="select"
            id="condition"
            name="condition"
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.condition && touched.condition ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Condition</option>
            <option value="good">Good</option>
            <option value="damaged">Damaged</option>
            <option value="needs-replacement">Needs Replacement</option>
          </Field>
          <ErrorMessage name="condition" component="div" className="text-red-500 text-sm" />
        </div> */}

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="paymentType" className="text-[16px]">Payment Type</label>
          <Field
            as="select"
            id="paymentType"
            name="paymentType"
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.paymentType && touched.paymentType ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select Payment Type</option>
            <option value="Per-Job">Per Job</option>
            <option value="Subscription">Subscription</option>
          </Field>
          <ErrorMessage name="paymentType" component="div" className="text-red-500 text-sm" />
        </div>
      </div>

      {/* Payment Details */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">Payment Details</h3>
       
        <div className="flex gap-3">
            {/* amount */}
          <div className="w-1/2 flex flex-col gap-2">
            <label htmlFor="paymentDetails.amount" className="text-[16px]">Amount</label>
            <Field
              type="number"
              id="paymentDetails.amount"
              name="paymentDetails.amount"
              className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.paymentDetails?.amount && touched.paymentDetails?.amount ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="paymentDetails.amount" component="div" className="text-red-500 text-sm" />
          </div>
            {/* Currency */}
          <div className="w-1/2 flex flex-col gap-2">
              <label htmlFor="paymentDetails.currency" className="text-[16px]">Currency</label>
              <Field
                as="select"
                id="paymentDetails.currency"
                name="paymentDetails.currency"
                className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] border-gray-300`}
              >
                <option value="">Select Currency</option>
                <option value="CAD">CAD</option>
              </Field>
              <ErrorMessage name="paymentDetails.currency" component="div" className="text-red-500 text-sm" />
            </div>
       
        </div>
      </div>

      {/* Due Time */}
      <div className="flex flex-col gap-2">
        <label htmlFor="dueTime" className="text-[16px]">Due Time</label>
        <Field
          type="datetime-local"
          id="dueTime"
          name="dueTime"
          className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.dueTime && touched.dueTime ? 'border-red-500' : 'border-gray-300'}`}
        />
        <ErrorMessage name="dueTime" component="div" className="text-red-500 text-sm" />
      </div>

      {/* Address Information */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Address Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Street */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="address.street" className="text-[16px]">Street</label>
                  <Field
                    type="text"
                    id="address.street"
                    name="address.street"
                    className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                      errors.address?.street && touched.address?.street ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter street address"
                  />
                  <ErrorMessage name="address.street" component="div" className="text-red-500 text-sm" />
                </div>
      
                {/* City */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="address.city" className="text-[16px]">City</label>
                  <Field
                    type="text"
                    id="address.city"
                    name="address.city"
                    className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                      errors.address?.city && touched.address?.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter city"
                  />
                  <ErrorMessage name="address.city" component="div" className="text-red-500 text-sm" />
                </div>
      
                {/* State/Province */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="address.state" className="text-[16px]">State/Province</label>
                  <Field
                    type="text"
                    id="address.state"
                    name="address.state"
                    className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                      errors.address?.state && touched.address?.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter state/province"
                  />
                  <ErrorMessage name="address.state" component="div" className="text-red-500 text-sm" />
                </div>
      
                {/* Country */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="address.country" className="text-[16px]">Country</label>
                  <Field
                    type="text"
                    id="address.country"
                    name="address.country"
                    className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                      errors.address?.country && touched.address?.country ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter country"
                  />
                  <ErrorMessage name="address.country" component="div" className="text-red-500 text-sm" />
                </div>
      
                {/* Postal Code */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="address.postalCode" className="text-[16px]">Postal Code</label>
                  <Field
                    type="text"
                    id="address.postalCode"
                    name="address.postalCode"
                    className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                      errors.address?.postalCode && touched.address?.postalCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter postal code"
                  />
                  <ErrorMessage name="address.postalCode" component="div" className="text-red-500 text-sm" />
                </div>
      
                {/* Map Location */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="address.mapLocation" className="text-[16px]">Map Location</label>
                  <Field
                    type="text"
                    id="address.mapLocation"
                    name="address.mapLocation"
                    className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] border-gray-300"
                    placeholder="Enter map location"
                  />
                </div>
              </div>
            </div>
    </section>
  );
};

export default JobsInfoSection;