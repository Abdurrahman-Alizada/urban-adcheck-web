"use client"
import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Image from 'next/image';

function AdvanceInfoSection({ handleFileUpload, values, errors, touched,   onNext,
}) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Array to store uploaded images
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message for validation

  const MAX_FILES = 5;
  const MAX_FILE_SIZE_MB = 5;



  const handleNextClick = () => {
    setHasSubmitted(true);
    if (onNext) {
      onNext();
    }
  };


  // Handle file upload and validation
  const handleUpload = async (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    let newFiles = [...uploadedFiles]; // Clone current uploaded files
    let error = ""; // Initialize error message

    for (let file of files) {
      // Check if total uploaded files exceed the limit
      if (newFiles.length >= MAX_FILES) {
        error = "You can only upload up to 5 images.";
        break;
      }

      // Check file size limit
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        error = `File size should not exceed ${MAX_FILE_SIZE_MB} MB.`;
        break;
      }

      // Add file if valid
      newFiles.push({
        file,
        preview: URL.createObjectURL(file), // Generate preview URL
      });
    }

    // Set state based on validation
    if (error) {
      setErrorMessage(error);
    } else {
      setLoading(true);
      setErrorMessage("");
      setUploadedFiles(newFiles);

      // Simulate upload delay (replace with actual upload logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setLoading(false);

      // Call external file handler if provided
      if (handleFileUpload) {
        handleFileUpload(newFiles.map((item) => item.file));
      }
    }
  };

  // Remove image functionality
  const handleRemoveImage = (index) => {
    const filteredFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(filteredFiles);
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
      <div className="w-[100%]">
        <label htmlFor="upload-images" className="text-[16px] font-semibold">
          Upload Images (Max 5 images, 5MB each)
        </label>

        {/* Upload Area */}
        <div className="flex flex-wrap gap-4 mt-3 p-4 border-gray-300 border-[1px] rounded-md">
          {/* File Input */}
          {uploadedFiles.length < MAX_FILES && (
            <label
              htmlFor="upload-images"
              className="w-[100px] h-[100px] bg-[#F5F7FA] rounded-[5px] flex items-center justify-center cursor-pointer relative"
            >
              <input
                type="file"
                id="upload-images"
                name="images"
                accept=".png, .jpg, .jpeg"
                className="hidden"
                multiple
                onChange={handleUpload}
              />
              {loading ? (
                <div className="loader border-4 border-primary border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
              ) : (
                <IoIosAddCircleOutline size={35} color="#636A80" />
              )}
            </label>
          )}

          {/* Uploaded Image Previews */}
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="relative w-[100px] h-[100px] flex items-center justify-center"
            >
              <Image
                src={file.preview}
                alt={`Uploaded Preview ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-contain rounded-md"
              />
              {/* Remove Image Button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                <RxCross2 size={16}/>
              </button>
            </div>
          ))}
        </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
      </div>

      {/* Buttons */}
      {/* <div className="flex justify-end gap-3 mt-3">
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
      </div> */}
    </section>
  );
}

export default AdvanceInfoSection;
