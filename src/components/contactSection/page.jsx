import React from 'react';
import { Field, ErrorMessage } from 'formik';

const ContactSection = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched
}) => {
  return (
    <section className="flex flex-col gap-6">
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
        <h3 className="text-lg font-medium mb-4">Phone Numbers</h3>
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

          {/* Secondary Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber.secondary" className="text-[16px]">Secondary Phone (Optional)</label>
            <Field
              type="tel"
              id="phoneNumber.secondary"
              name="phoneNumber.secondary"
              className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] border-gray-300"
              placeholder="Enter secondary phone number"
            />
          </div>
        </div>
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

export default ContactSection;