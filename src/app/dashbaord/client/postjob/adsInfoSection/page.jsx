'use client'

import React, { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';

const AdsInfoSection = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  modelOptions = [],
  authenticityOptions = [],
  onNext,
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Trigger validation on all fields when "Next" is clicked
  const handleNextClick = () => {
    console.log("click")
    setHasSubmitted(true);
    if (onNext) {
      onNext();
    }
  };

  // Helper function to determine the border class based on error state
  const getBorderClass = (fieldName) => {
    const isFieldInvalid =
      (hasSubmitted || touched[fieldName]) && errors[fieldName];
    return isFieldInvalid ? 'border-red-500' : 'border-gray-300';
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Ad Name */}
      <div className="flex flex-col gap-2">
              <label htmlFor="adName" className="text-[16px]">Ad Name</label>
              <Field
                type="text"
                id="adName"
                name="adName"
                className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass(errors, touched, 'adName')}`}
              />
              <ErrorMessage name="adName" component="div" className="text-red-500 text-sm" />
            </div>

      {/* <div className="flex flex-col gap-2">
        <label htmlFor="adName" className="text-[16px]">Ad Name</label>
        <Field
          type="text"
          id="adName"
          name="adName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.adName}
          placeholder="Ad name"
          className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('adName')}`}
        />
        {(hasSubmitted || touched.adName) && (
          <ErrorMessage name="adName" component="div" className="text-red-500 text-sm" />
        )}
      </div> */}

      {/* Category & Sub-category */}
      <div className="flex gap-3">
        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="category" className="text-[16px]">Category</label>
          <Field
            as="select"
            id="category"
            name="category"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.category}
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('category')}`}
          >
            <option value="">Select ...</option>
            <option value="homes">Homes</option>
            <option value="automotive">Automotive</option>
            <option value="garage">Garage</option>
          </Field>
          {(hasSubmitted || touched.category) && (
            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
          )}
        </div>

        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="subCategory" className="text-[16px]">Sub-Category</label>
          <Field
            as="select"
            id="subCategory"
            name="subCategory"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.subCategory}
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('subCategory')}`}
          >
            <option value="">Select ...</option>
            <option value="homes">Homes</option>
            <option value="automotive">Automotive</option>
            <option value="garage">Garage</option>
          </Field>
          {(hasSubmitted || touched.subCategory) && (
            <ErrorMessage name="subCategory" component="div" className="text-red-500 text-sm" />
          )}
        </div>
      </div>

      {/*Brand & Negotiables Dropdown */}
      <div className="flex gap-3">
        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="negotiables" className="text-[16px]">Negotiable</label>
          <Field
            as="select"
            id="negotiables"
            name="negotiables"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.negotiables}
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.negotiables && touched.negotiables ? 'border-red-500' : ''}`}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Field>
          {(hasSubmitted || touched.negotiables) && (
            <ErrorMessage name="negotiables" component="div" className="text-red-500 text-sm" />
          )}
        </div>
        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="brand" className="text-[16px]">Brand</label>
          <Field
            as="select"
            id="brand"
            name="brand"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.brand}
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('brand')}`}
          >
            <option value="">Select ...</option>
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
            <option value="brand3">Brand 3</option>
          </Field>
          {(hasSubmitted || touched.brand) && (
            <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />
          )}
        </div>
      </div> 

        {/* Conditions & models Dropdown */}
       
      <div className="flex gap-3">
        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="model" className="text-[16px]">Model</label>
          <Field
            as="select"
            id="model"
            name="model"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.model}
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.model && touched.model ? 'border-red-500' : ''}`}
          >
            <option value="">Select Model</option>
            {modelOptions?.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </Field>
          {(hasSubmitted || touched.model) && (
            <ErrorMessage name="model" component="div" className="text-red-500 text-sm" />
          )}
        </div>

        {/* Conditions Dropdown */}
        <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="conditions" className="text-[16px]">Conditions</label>
          <Field
            as="select"
            id="conditions"
            name="conditions"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.conditions}
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.conditions && touched.conditions ? 'border-red-500' : ''}`}
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Refurbished">Refurbished</option>
          </Field>
          {(hasSubmitted || touched.conditions) && (
            <ErrorMessage name="conditions" component="div" className="text-red-500 text-sm" />
          )}
        </div>
      </div>

      {/* Example: Tags Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="tags" className="text-[16px]">Tags</label>
        <Field
          type="text"
          id="tags"
          name="tags"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.tags}
          placeholder="Add tags (comma separated)"
          className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('tags')}`}
        />
        {(hasSubmitted || touched.tags) && (
          <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
        )}
      </div>
      {/* Ads Price */}
      <div className="w-[50%] flex flex-col gap-2">
          <label htmlFor="adsPrices" className="text-[16px]">Ads Price</label>
          <Field
            as="input"
            type="number"
            id="adsPrices"
            name="adsPrices"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.adsPrices}
            className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${errors.adsPrices && touched.adsPrices ? 'border-red-500' : ''}`}
          />
          {(hasSubmitted || touched.adsPrices) && (
            <ErrorMessage name="adsPrices" component="div" className="text-red-500 text-sm" />
          )}
        </div>

      {/* Next Button
      <div className='flex justify-end items-center gap-6'>
        <button
          type="button"
          className="w-[280px] bg-transparent border-grayColor border-[1px] text-black px-8 py-2 rounded-md mt-4"

        >
          View Posting Rules
        </button>
        <button
          type="button"
          className="w-[200px] bg-primary text-white px-8 py-2 rounded-md mt-4"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div> */}
    </section>
  );
};

export default AdsInfoSection;
