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
        <div className="w-1/2 flex flex-col gap-2">
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
        </div>

        <div className="w-1/2 flex flex-col gap-2">
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
          <div className="w-1/3 flex flex-col gap-2">
            <label htmlFor="paymentDetails.amount" className="text-[16px]">Amount</label>
            <Field
              type="number"
              id="paymentDetails.amount"
              name="paymentDetails.amount"
              className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.paymentDetails?.amount && touched.paymentDetails?.amount ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="paymentDetails.amount" component="div" className="text-red-500 text-sm" />
          </div>

          {values.paymentType === 'Per-Job' && (
            <div className="w-1/3 flex flex-col gap-2">
              <label htmlFor="paymentDetails.perJobPayment.priceType" className="text-[16px]">Price Type</label>
              <Field
                as="select"
                id="paymentDetails.perJobPayment.priceType"
                name="paymentDetails.perJobPayment.priceType"
                className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.paymentDetails?.perJobPayment?.priceType && touched.paymentDetails?.perJobPayment?.priceType ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Price Type</option>
                <option value="fixed">Fixed</option>
                <option value="hourly">Hourly</option>
                <option value="negotiable">Negotiable</option>
              </Field>
              <ErrorMessage name="paymentDetails.perJobPayment.priceType" component="div" className="text-red-500 text-sm" />
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {/* <div className="flex flex-col gap-2">
        <label htmlFor="tags" className="text-[16px]">Tags</label>
        <Field
          type="text"
          id="tags"
          name="tags"
          className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.tags && touched.tags ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter tags separated by commas"
        />
        <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
      </div> */}

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
    </section>
  );
};

export default JobsInfoSection;