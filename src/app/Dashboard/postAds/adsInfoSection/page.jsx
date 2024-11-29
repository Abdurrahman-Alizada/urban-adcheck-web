import React, { useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';

const AdsInfoSection = ({ values, handleChange, handleBlur, errors, touched, modelOptions = [], authenticityOptions = [] }) => {
  // Debug logging (for development purposes)
  useEffect(() => {
    console.log('AdsInfoSection Values:', values);
    console.log('AdsInfoSection Errors:', errors);
    console.log('AdsInfoSection Touched:', touched);
  }, [values, errors, touched]);

  // Helper function to determine the border class based on error state
  const getBorderClass = (fieldName) => {
    return errors[fieldName] && touched[fieldName] ? 'border-red-500' : 'border-gray-300';
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
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.adName}
          placeholder="Ad name"
          className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('adName')}`}
        />
        <ErrorMessage name="adName" component="div" className="text-red-500 text-sm" />
      </div>

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
          <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
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
          <ErrorMessage name="subCategory" component="div" className="text-red-500 text-sm" />
        </div>
      </div>

        { /* Brand and model Field */}
      <div className='flex gap-3'>

          {/* Brand Field */}
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
        <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />
      </div>

      {/* Model Field */}
      <div className="w-[50%] flex flex-col gap-2">
        <label htmlFor="model" className="text-[16px]">Model</label>
        <Field
          as="select"
          id="model"
          name="model"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.model}
          className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('model')}`}
        >
          <option value="">Select Model</option>
          {modelOptions.length > 0 ? (
            modelOptions.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))
          ) : (
            <option value="">No models available</option>
          )}
        </Field>
        <ErrorMessage name="model" component="div" className="text-red-500 text-sm" />
      </div>

      </div>
   
   
              {/* Negotiables & Authenticity Field */}
        <div className='flex gap-3'>

            {/* Negotiables Field */}
      <div className="w-[50%] flex flex-col gap-2">
        <label htmlFor="negotiables" className="text-[16px]">Negotiables</label>
        <Field
          as="select"
          id="negotiables"
          name="negotiables"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.negotiables}
          className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('negotiables')}`}
        >
          <option value="">Select ...</option>
          <option value="negotiable">Negotiable</option>
          <option value="non-negotiable">Non-Negotiable</option>
        </Field>
        <ErrorMessage name="negotiables" component="div" className="text-red-500 text-sm" />
      </div>

      {/* Authenticity Field */}
      <div className="w-[50%] flex flex-col gap-2">
        <label htmlFor="authenticity" className="text-[16px]">Authenticity</label>
        <Field
          as="select"
          id="authenticity"
          name="authenticity"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.authenticity}
          className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('authenticity')}`}
        >
          <option value="">Select</option>
          {authenticityOptions.length > 0 ? (
            authenticityOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))
          ) : (
            <option value="">No authenticity options available</option>
          )}
        </Field>
        <ErrorMessage name="authenticity" component="div" className="text-red-500 text-sm" />
      </div>

        </div>


        

      {/* Tags Field */}
      <div className=" flex flex-col gap-2">
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
        <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
      </div>

        <div className='flex gap-3'>

          {/* Price Field */}
        <div className="w-[50%] flex flex-col gap-2">
        <label htmlFor="adsPrices" className="text-[16px]">Ads Prices (USD)</label>
        <Field
          type="text"
          id="adsPrices"
          name="adsPrices"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.adsPrices}
          placeholder="Ads Price"
          className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('adsPrices')}`}
        />
        <ErrorMessage name="adsPrices" component="div" className="text-red-500 text-sm" />
         </div>

          {/* Negotiables Field */}
          <div className="w-[50%] flex flex-col gap-2">
            <label htmlFor="negotiables" className="text-[16px]">Negotiables</label>
            <Field
              as="select"
              id="negotiables"
              name="negotiables"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.negotiables}
              className={`text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] ${getBorderClass('negotiables')}`}
            >
              <option value="">Select ...</option>
              <option value="negotiable">Negotiable</option>
              <option value="non-negotiable">Non-Negotiable</option>
            </Field>
            <ErrorMessage name="negotiables" component="div" className="text-red-500 text-sm" />
          </div>

        </div>
        
    </section>
  );
};

export default AdsInfoSection;
