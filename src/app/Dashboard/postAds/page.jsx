import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup"; // For schema validation
import ProgressBar from "./ProgressBar/page"; // Assuming ProgressBar is another component
import AdsInfoSection from "./AdsInfoSection/page"; // Assuming AdsInfoSection is a separate component
import AdvanceInfoSection from "./AdvanceInfoSection/page"; // Assuming AdvanceInfoSection is a separate component
import ContactSection from "./ContactSection/page"; // Assuming ContactSection is a separate component

const AdsPost = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [modelOptions, setModelOptions] = useState([]); // State to hold models based on selected brand

  // Example brand to model mapping (replace with your actual data)
  const brandModelMapping = {
    "Apple": ["iPhone 14", "iPhone 13", "MacBook Pro"],
    "Samsung": ["Galaxy S21", "Galaxy Note 20", "Galaxy Tab"],
    "Dell": ["XPS 13", "Inspiron 15", "Alienware"],
  };

  const authenticityOptions = ["Original", "Refurbished", "Used"];

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
    const schemaFieldKeys = [
      ["adName", "category", "subCategory", "brand", "model", "conditions", "authenticity", "tags", "adsPrices", "negotiables"],
      ["description", "features", "images"],
      ["contactName", "email", "phoneNumber", "address"],
    ];

    const currentFields = schemaFieldKeys[currentStep - 1]; // Get fields for current step

    // Mark all fields in current step as touched for validation
    currentFields.forEach((field) => setFieldTouched(field, true));

    // Validate the form
    const validationErrors = await validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // If no validation errors, proceed to the next step
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      console.log("Validation errors:", validationErrors); // Debugging validation errors
    }
  };

  // Update model options based on selected brand
  const handleBrandChange = (brand) => {
    setModelOptions(brandModelMapping[brand] || []);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[currentStep - 1]} // Apply validation for current step only
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => {
        console.log("Form submitted:", values);
      }}
    >
      {({ values, errors, touched, validateForm, setFieldTouched, handleChange, handleBlur }) => (
        <Form className="w-full">
          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} />

          {/* Step Content */}
          {currentStep === 1 && (
            <AdsInfoSection
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleBrandChange={handleBrandChange} // Pass brand change handler
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
          <div className="flex justify-between mt-4">
            {currentStep > 1 && (
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
              >
                Back
              </button>
            )}
            {currentStep < validationSchemas.length ? (
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded"
                onClick={() => handleNext(validateForm, setFieldTouched)}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AdsPost;
