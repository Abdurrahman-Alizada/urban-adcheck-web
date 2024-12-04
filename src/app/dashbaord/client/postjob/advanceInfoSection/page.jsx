"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Field, ErrorMessage } from 'formik';

function AdvanceInfoSection({ handleFileUpload, values, errors, touched,   onNext,
}) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const handleNextClick = () => {
    console.log("click")
    setHasSubmitted(true);
    if (onNext) {
      onNext();
    }
  };
  
  return (
    <section className="flex flex-col gap-4">

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-[16px]">Description</label>
        <Field
          as="textarea"
          id="description"
          name="description"
          placeholder="Enter a detailed description for your ad"
          className="text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-3 rounded-[5px] focus:ring-2 focus:ring-primary resize-none"
          rows="4"
        />
        <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
      </div>

      {/* Features */}
      <div className="flex flex-col gap-2">
        <label htmlFor="features" className="text-[16px]">Features</label>
        <Field
          as="textarea"
          id="features"
          name="features"
          placeholder="Write Features in each line. 1\nFeature 2\n..."
          className="text-[15.04px] border-gray-300 outline-primary border-[1px] px-3 py-3 rounded-[5px] focus:ring-2 focus:ring-primary resize-none"
          rows="4"
        />
        <ErrorMessage name="features" component="div" className="text-red-500 text-sm" />
      </div>

      {/* Upload Images */}
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="upload-images" className="text-[16px]">Upload Images</label>
        <div className="relative border-gray-300 border-[1px] rounded-[5px] flex items-center justify-center p-4 bg-gray-50">
          <input
            type="file"
            id="upload-images"
            name="images"
            accept=".png, .jpg, .jpeg"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileUpload}
          />
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16v5h5M16 3h5v5M16 16h5v5M3 3h5v5M12 9v3m0 0v3m0-3h3m-3 0H9" />
            </svg>
            <p className="text-gray-500 text-sm mt-2">Click to upload PNG, JPG, or JPEG (Max 2MB)</p>
          </div>
        </div>
        <ErrorMessage name="images" component="div" className="text-red-500 text-sm" />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-3">
        <button
          type="button"
          className="flex items-center text-[18px] px-6 py-2 border-[1px] border-grayColor rounded-[5px] bg-transparent text-Black"
        >
          Previous
        </button>
        <button
           onClick={handleNextClick}
          className="flex items-center gap-4 text-[18px] px-8 py-2 rounded-[5px] bg-primary text-white"
        >
          Next Steps
          <FontAwesomeIcon icon={faArrowRight} size="15" />
        </button>
      </div>
    </section>
  );
}

export default AdvanceInfoSection;
