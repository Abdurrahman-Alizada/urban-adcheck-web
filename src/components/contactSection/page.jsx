import React from "react";
import { Field, ErrorMessage } from "formik";

const ContactSection = ({
  errors,
  touched,
}) => {
  return (
    <section className="relative flex flex-col gap-6">
      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="personalInfo.fullName" className="text-[16px]">
              Full Name
            </label>
            <Field
              type="text"
              id="personalInfo.fullName"
              name="personalInfo.fullName"
              className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                errors.personalInfo?.fullName && touched.personalInfo?.fullName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter your full name"
            />
            <ErrorMessage
              name="personalInfo.fullName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="personalInfo.email" className="text-[16px]">
              Email
            </label>
            <Field
              type="email"
              id="personalInfo.email"
              name="personalInfo.email"
              className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                errors.personalInfo?.email && touched.personalInfo?.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            <ErrorMessage
              name="personalInfo.email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Primary Phone */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber.primary" className="text-[16px]">
              Primary Phone
            </label>
            <Field
              type="tel"
              id="phoneNumber.primary"
              name="phoneNumber.primary"
              className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${
                errors.phoneNumber?.primary && touched.phoneNumber?.primary
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter primary phone number"
            />
            <ErrorMessage
              name="phoneNumber.primary"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default ContactSection;
