"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ProgressBar from "../../../../components/progressBar/page";
import JobsInfoSection from "@/components/jobs-info/page";
import AdvanceInfoSection from "../../../../components/advanceInfoSection/page";
import ContactSection from "../../../../components/contactSection/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PostJob = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [jobsInfo, setJobsInfo] = useState({
    adName: "",
    category: "",
    subCategory: "",
    brand: "",
    model: "",
    conditions: "",
    authenticity: "",
    tags: "",
    jobsPrices: "",
  });
  const [contactData, setContactData] = useState({
    phone: "",
    backupPhone: "",
    email: "",
    website: "",
    selectedCountry: null,
    selectedState: null,
    selectedCity: null,
  });
  const [advanceInfoData, setAdvanceInfoData] = useState({
    description: "",
    features: "",
    uploadedFiles: [],
  });

  // Handle Components Data
  const handleJobsInfoData = (data) => {
    setJobsInfo(data);
  };
  const handleContactData = (data) => {
    setContactData(data);
  };
  const handleAdvanceInfoData = (data) => {
    setAdvanceInfoData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine all data
    const formData = {
      ...jobsInfo,
      ...contactData,
      ...advanceInfoData,
    };
    // Print all the collected data to the console
    console.log("Form Submitted Successfully!", formData);
  };

  // Step 1 Schema
  const step1Schema = Yup.object().shape({
    adName: Yup.string().required("Ad name is required."),
    category: Yup.string().required("Category is required."),
    // subCategory: Yup.string().required("Sub-category is required."),
    // brand: Yup.string().required("Brand is required."),
    // // model: Yup.string().required("Model is required."),
    // conditions: Yup.string().required("Conditions are required."),
    // // authenticity: Yup.string().required("Authenticity is required."),
    // tags: Yup.string().required("Tags are required."),
    // jobsPrices: Yup.number()
    //   .typeError("Price must be a number.")
    //   .required("Job price is required."),
    // negotiables: Yup.string().required("Please select if negotiable."),
  });
  // Step 2 Schema
  const step2Schema = Yup.object().shape({
    description: Yup.string().required("Description is required."),
    // features: Yup.array()
    //   .of(Yup.string().required("Feature is required."))
    //   .required("At least one feature is required."),
    // images: Yup.array()
    //   .of(
    //     Yup.mixed()
    //       .nullable()
    //       .test("fileType", "Only images are allowed.", (value) =>
    //         value ? ["image/jpeg", "image/png", "image/gif"].includes(value.type) : true
    //       )
    //       .test("fileSize", "File size too large.", (value) =>
    //         value ? value.size <= 5000000 : true
    //       )
    //   )
    //   .min(1, "At least one image is required."),
  });
  // Step 3 Schema
  const step3Schema = Yup.object().shape({
    contactName: Yup.string().required("Contact name is required."),
    // email: Yup.string()
    //   .email("Invalid email address.")
    //   .required("Email is required."),
    // phoneNumber: Yup.string()
    //   .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
    //   .required("Phone number is required."),
    // address: Yup.string().required("Address is required."),
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
    jobsPrices: "",
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
      [
        "adName",
        "category",
        "subCategory",
        "brand",
        "model",
        "conditions",
        "authenticity",
        "tags",
        "jobsPrices",
        "negotiables",
      ],
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

  // // Handle form submission
  const handleSubmitHanlder = (values, actions) => {
    e.preventDefault();
    console.log("Form submitted:", values);
    // actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[currentStep - 1]} // Apply validation for the current step only
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => console.log("values on submit", values)}
    >
      {({
        values,
        errors,
        touched,
        validateForm,
        setFieldTouched,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
        <div className="w-full">
          {/* Progress Bar */}
          <ProgressBar
            currentStep={currentStep}
            totalSteps={validationSchemas.length}
          />

          {/* Step Content */}
          {currentStep === 1 && (
            <JobsInfoSection
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              jobsInfo={jobsInfo}
              onJobsInfoChnage={handleJobsInfoData}
              errors={errors}
              touched={touched}
              onNext={() => console.log("onNext")}
            />
          )}

          {currentStep === 2 && (
            <AdvanceInfoSection
              values={values}
              errors={errors}
              touched={touched}
              advanceInfoData={advanceInfoData}
              onAdvanceInfoDataChange={handleAdvanceInfoData}
              handleChange={handleChange}
              handleBlur={handleBlur}
              onNext={() => console.log("onNext")}
            />
          )}

          {currentStep === 3 && (
            <ContactSection
              values={values}
              errors={errors}
              contactData={contactData}
              onContactDataChange={handleContactData}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              onNext={() => console.log("onNext")}
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
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    type="button"
                    className="flex items-center text-[18px] px-6 py-2 border-[1px] border-grayColor rounded-[5px] bg-transparent text-Black"
                    onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-4 text-[18px] px-8 py-2 rounded-[5px] bg-primary text-white"
                    onClick={() => handleNext(validateForm, setFieldTouched)}
                  >
                    Next Steps
                    <FontAwesomeIcon icon={faArrowRight} size="15" />
                  </button>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="w-full flex justify-between items-center mt-6">
                  <label className=" text-grayColor text-[15.03px] ">
                    <input type="checkbox" className="mr-2" />
                    Save my contact information for faster posting
                  </label>

                  <div className=" flex justify-end gap-3">
                    <button
                      type="button"
                      className="text-[18px] px-6 py-2 border-grayColor border-[1px] rounded-[5px] bg-transparent"
                      onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="text-[18px] px-8 py-2 bg-primary text-white rounded-[5px]"
                      onClick={handleSubmitHanlder}
                    >
                      Post Jobs
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Formik>
  );
};

export default PostJob;
