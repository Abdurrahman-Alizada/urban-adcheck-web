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
import { useCreateJobMutation } from "@/redux/reducers/jobs/jobThunk";

const PostJob = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [jobsInfo, setJobsInfo] = useState({
    adName: "",
    category: "",
    subCategory: "",
    brand: "",
    model: "",
    conditions: "good",
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

  
  const handleJobsInfoData = (data) => {
    setJobsInfo(data);
  };
  const handleContactData = (data) => {
    setContactData(data);
  };
  const handleAdvanceInfoData = (data) => {
    setAdvanceInfoData(data);
  };

  const [createJob, { isLoading, isError, error }] = useCreateJobMutation();
  const [jobCoverImage, setJobCoverImageCover] = useState(null);
  const [jobVideo, setJobVideo] = useState(null);
  const [jobGallery, setJobGallery] = useState([]);

  // Step 1 Schema
  const step1Schema = Yup.object().shape({
    jobTitle: Yup.string().required("Job title is required"),
    category: Yup.string().required("Category is required"),
    displayType: Yup.string().required("Display type is required"),
    // condition: Yup.string().required("Condition is required"),
    paymentType: Yup.string().required("Payment type is required"),
    // "paymentDetails.amount": Yup.number().required("Amount is required"),
    dueTime: Yup.date().required("Due time is required"),
    // tags: Yup.string().required("Tags are required"),
    address: Yup.object().shape({
      street: Yup.string().required("Street address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string(),
      country: Yup.string().required("Country is required"),
      postalCode: Yup.string(),
      mapLocation: Yup.string(),
      coordinates: Yup.array().of(Yup.number()),
    }),
  });

  // Step 2 Schema
  const step2Schema = Yup.object().shape({
    tags: Yup.array().min(1, "Please add at least one tag."),
    description: Yup.string().required("Description is required"),
    notes: Yup.string(),
    jobGallery: Yup.array(),
    jobCoverImage: Yup.mixed(),
    jobVideo: Yup.mixed(),
  });

  // Step 3 Schema
  const step3Schema = Yup.object().shape({
    personalInfo: Yup.object().shape({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    phoneNumber: Yup.object().shape({
      primary: Yup.string().required("Phone number is required"),
    }),
    // location: Yup.string().required("location is required"),
  });
  // Combined Validation Schemas
  const validationSchemas = [step1Schema, step2Schema, step3Schema];
  // Initial Values
  const initialValues = {
    jobTitle: "",
    category: "",
    displayType: "",
    condition: "good",
    paymentType: "Per-Job",
    address:{
    coordinates:[
      -79.22,
      -43.43,
    ],
    street:"",
    city:"",
    state:"",
    country:"",
    postalCode:"",
    mapLocation:"",
    },
    paymentDetails: {
      amount: "",
      currency: "CAD",
      status: "pending",
      perJobPayment: {
        priceType: "fixed",
        price: 0,
      },
    },
    dueTime: "2024-12-27T07:11",
    tags: [],      
    status: {
      isApproved: false,
      isPublished: false,
      isFeatured: false,
      isActive: true,
      // isAcceptedByWatchdog: true,
      isCancelled: false,
    },
    description: "",
    notes: "",
    personalInfo: {
      fullName: "khan",
      email: "khna234@gmail.com",
      phone: "289347834",
      location: "peshawar",
    },
    phoneNumber: {
      primary: "2343243232",
      secondary: "2343223432",
    }
    
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

  const handleFormSubmission = (values) => {
    const formData = new FormData();
  
    // Ensure tags is an array before processing
    const sanitizedValues = {
      ...values,
      tags: Array.isArray(values.tags)
        ? values.tags
        : typeof values.tags === "string"
        ? values.tags.split(",").map((tag) => tag.trim()) // Convert comma-separated string to array
        : [],
    };
  
    console.log(sanitizedValues.tags); // Debug: Confirm tags are properly formatted
  
    // Helper function to handle nested keys with bracket notation
    const appendNestedKeys = (obj, parentKey = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        const fieldKey = parentKey ? `${parentKey}[${key}]` : key;
  
        if (Array.isArray(value)) {
          // Handle arrays
          value.forEach((item) => {
            formData.append(`${fieldKey}[]`, item);
          });
        } else if (
          value &&
          typeof value === "object" &&
          !(value instanceof File)
        ) {
          // Handle nested objects
          appendNestedKeys(value, fieldKey);
        } else {
          // Handle primitive values
          formData.append(fieldKey, value);
        }
      });
    };
  
    // Add all fields except file uploads
    appendNestedKeys(sanitizedValues);
  
    // Handle file fields (if any)
    if (jobGallery && jobGallery.length > 0) {
      Array.from(jobGallery).forEach((file) => {
        formData.append("jobGallery", file);
      });
    }
  
    if (jobCoverImage) {
      formData.append("jobCoverImage", jobCoverImage);
    }
  
    if (jobVideo) {
      formData.append("jobVideo", jobVideo);
    }
  
    // Return the final FormData object
    return formData;
  };
  
  

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[currentStep - 1]} // Apply validation for the current step only
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values) => {
        try {
          const formData = handleFormSubmission(values);
          console.log("valuse", values);
          // Debug: Log FormData entries
          for (let pair of formData.entries()) {
            console.log("Form Data Entry:", pair[0], pair[1]);
          }

          const response = await createJob(formData);
          console.log("Job created successfully:", response);
         
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }}
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
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} className="w-full">
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
              // jobsInfo={jobsInfo}
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
              // advanceInfoData={advanceInfoData}
              onAdvanceInfoDataChange={handleAdvanceInfoData}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              cover={jobCoverImage}
              setCover={setJobCoverImageCover}
              video={jobVideo}
              setVideo={setJobVideo}
              gallery={jobGallery}
              setGallery={setJobGallery}
              handleBlur={handleBlur}
              onNext={() => console.log("onNext")}
            />
          )}

          {currentStep === 3 && (
            <ContactSection
              values={values}
              errors={errors}
              touched={touched}
              // contactData={contactData}
              onContactDataChange={handleContactData}
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
                  type="submit"
                  className="w-[280px] bg-transparent border-grayColor border-[1px] text-black px-8 py-2 rounded-md "
                  // onClick={() => console.log("View Posting Rules clicked")}
                >
                  View Posting Rules
                </button>
                <button
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
                    type="submit"
                    className="w-[280px] bg-transparent border-grayColor border-[1px] text-black px-8 py-2 rounded-md "
                  >
                    View Posting Rules
                  </button>
                  <button
                    type="button"
                    className="flex items-center text-[18px] px-6 py-2 border-[1px] border-grayColor rounded-[5px] bg-transparent text-Black"
                    onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
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
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    type="submit"
                    className="flex items-center text-[18px] px-6 py-2 border-[1px] border-grayColor rounded-[5px] bg-transparent text-Black"
                    onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-4 text-[18px] px-8 py-2 rounded-[5px] bg-primary text-white"
                    disabled={isLoading} // Disable button during loading
                  >
                    {isLoading ? (
                      <div className="animate-spin border-4 border-t-4 border-white rounded-full w-5 h-5 mr-2"></div>
                    ) : (
                      "Post Jobs"
                    )}
                    <FontAwesomeIcon icon={faArrowRight} size="15" />
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default PostJob;
