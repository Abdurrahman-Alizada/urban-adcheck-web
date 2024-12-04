'use client'
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ProgressBar from "./ProgressBar/page";
import AdsInfoSection from "./AdsInfoSection/page";
import AdvanceInfoSection from "./AdvanceInfoSection/page";
import ContactSection from "./ContactSection/page";

const AdsPost = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 Schema
  const step1Schema = Yup.object().shape({
    adName: Yup.string().required("Ad name is required."),
    category: Yup.string().required("Category is required."),
    subCategory: Yup.string().required("Sub-category is required."),
    brand: Yup.string().required("Brand is required."),
    model: Yup.string().required("Model is required."),
    conditions: Yup.string().required("Conditions are required."),
    authenticity: Yup.string().required("Authenticity is required."),
    tags: Yup.string().required("Tags are required."),
    adsPrices: Yup.number()
      .typeError("Price must be a number.")
      .required("Ads price is required."),
    negotiables: Yup.string().required("Please select if negotiable."),
  });

  // Step 2 Schema
  const step2Schema = Yup.object().shape({
    description: Yup.string().required("Description is required."),
    features: Yup.array()
      .of(Yup.string().required("Feature is required."))
      .required("At least one feature is required."),
    images: Yup.array()
      .of(
        Yup.mixed()
          .nullable()
          .test("fileType", "Only images are allowed.", (value) =>
            value ? ["image/jpeg", "image/png", "image/gif"].includes(value.type) : true
          )
          .test("fileSize", "File size too large.", (value) =>
            value ? value.size <= 5000000 : true
          )
      )
      .min(1, "At least one image is required."),
  });

  // Step 3 Schema
  const step3Schema = Yup.object().shape({
    contactName: Yup.string().required("Contact name is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
      .required("Phone number is required."),
    address: Yup.string().required("Address is required."),
  });

  // Combined Validation Schemas
  const validationSchemas = [step1Schema, step2Schema, step3Schema];

  // Initial Values
  const initialValues = {
    adName: "",
    category: "",
    subCategory: "",
    brand: "",
    model: "",
    conditions: "",
    authenticity: "",
    tags: "",
    adsPrices: "",
    negotiables: "",
    description: "",
    features: [],
    images: [],
    contactName: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  // Handle "Next" Button Click
  const handleNext = async (validateForm, setFieldTouched) => {
    // Step-wise field keys
    const schemaFieldKeys = [
      ["adName", "category", "subCategory", "brand", "model", "conditions", "authenticity", "tags", "adsPrices", "negotiables"],
      ["description", "features", "images"],
      ["contactName", "email", "phoneNumber", "address"],
    ];

    const currentFields = schemaFieldKeys[currentStep - 1]; // Get fields for current step

    // Mark all fields in current step as touched
    currentFields.forEach((field) => setFieldTouched(field, true, true));

    // Validate the form and get the errors
    const validationErrors = await validateForm();

    // Only proceed to the next step if no errors exist for current step
    const stepErrors = Object.keys(validationErrors).filter((key) =>
      currentFields.includes(key)
    );

    // If no errors for the current step, proceed to the next step
    if (stepErrors.length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      console.error("Validation errors for current step:", validationErrors);
    }
  };

  // Handle form submission
  const handleSubmit = (values, actions) => {
    console.log("Form submitted:", values);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[currentStep - 1]} // Apply validation for the current step only
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ 
        values, 
        errors, 
        touched, 
        validateForm, 
        setFieldTouched, 
        handleChange, 
        handleBlur 
      }) => (
        <Form className="w-full">
          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} totalSteps={validationSchemas.length} />

          {/* Step Content */}
          {currentStep === 1 && (
            <AdsInfoSection
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}

          {currentStep === 2 && (
            <AdvanceInfoSection
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}

          {currentStep === 3 && (
            <ContactSection
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}

          {/* Navigation Buttons */}
<div className="flex justify-end items-center gap-6">
  {currentStep === 1 && (
    <>
      <button
        type="button"
        className="w-[280px] bg-transparent border-grayColor border-[1px] text-black px-8 py-2 rounded-md "
        onClick={() => console.log("View Posting Rules clicked")}
      >
        View Posting Rules
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-primary text-white rounded"
        onClick={() => handleNext(validateForm, setFieldTouched)}
      >
        Next Step
      </button>
    </>
  )}

  {currentStep === 2 && (
    <>
      <button
        type="button"
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
        onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
      >
        Previous
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-primary text-white rounded"
        onClick={() => handleNext(validateForm, setFieldTouched)}
      >
        Next
      </button>
    </>
  )}

  {currentStep === 3 && (
    <>
      <button
        type="button"
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
        onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
      >
        Previous
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Post Job
      </button>
    </>
  )}
</div>

        </Form>
      )}
    </Formik>
  );
};

export default AdsPost;
