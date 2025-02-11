"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ProgressBar from "../../../../components/progressBar/page";
import JobsInfoSection from "@/components/jobs-info/page";
import AdvanceInfoSection from "../../../../components/advanceInfoSection/page";
import ContactSection from "../../../../components/contactSection/page";
import { MdArrowForward } from "react-icons/md";
import { useCreateJobMutation } from "@/redux/reducers/jobs/jobThunk";
import JobSuccessModal from "@/components/Modal/JobSuccessModal";

const PostJob = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [jobPostModal, setJobPostModal] = useState(false);
  const [jobPostResponse, setJobPostResponse] = useState(null);

  const [jobsInfo, setJobsInfo] = useState({
    adName: "",
    category: "",
    subCategory: "",
    brand: "",
    model: "",
    conditions: "good",
    authenticity: "",
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

  // [Validation schemas remain the same]
  const step1Schema = Yup.object().shape({
    jobTitle: Yup.string().required("Job title is required"),
    category: Yup.string().required("Category is required"),
    displayType: Yup.string().required("Display type is required"),
    paymentType: Yup.string().required("Payment type is required"),
    dueTime: Yup.date().required("Due time is required"),
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

  const step2Schema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    notes: Yup.string(),
    jobGallery: Yup.array(),
    jobCoverImage: Yup.mixed(),
    jobVideo: Yup.mixed(),
  });

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
  });

  const validationSchemas = [step1Schema, step2Schema, step3Schema];
  const initialValues = {
    jobTitle: "",
    category: "",
    displayType: "",
    condition: "good",
    paymentType: "Per-Job",
    address: {
      coordinates: [-79.22, -43.43],
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      mapLocation: "",
    },
    paymentDetails: {
      amount: "",
      currency: "CAD",
      status: "pending",
    },
    dueTime: "2024-12-27T07:11",
    status: {
      isApproved: false,
      isPublished: false,
      isFeatured: false,
      isActive: true,
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
    },
  };

  const handleNext = async (validateForm, setFieldTouched) => {
    const schemaFieldKeys = [
      [
        "adName",
        "category",
        "subCategory",
        "brand",
        "model",
        "conditions",
        "authenticity",
        "jobsPrices",
        "negotiables",
      ],
      ["description", "features", "images"],
      ["contactName", "email", "phoneNumber", "address"],
    ];

    const currentFields = schemaFieldKeys[currentStep - 1];
    currentFields.forEach((field) => setFieldTouched(field, true, true));
    const validationErrors = await validateForm();
    const stepErrors = Object.keys(validationErrors).filter((key) =>
      currentFields.includes(key)
    );

    if (stepErrors.length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      console.error("Validation errors for current step:", validationErrors);
    }
  };

  const handleFormSubmission = (values) => {
    const formData = new FormData();
    const sanitizedValues = { ...values };

    const appendNestedKeys = (obj, parentKey = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        const fieldKey = parentKey ? `${parentKey}[${key}]` : key;

        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${fieldKey}[]`, item);
          });
        } else if (
          value &&
          typeof value === "object" &&
          !(value instanceof File)
        ) {
          appendNestedKeys(value, fieldKey);
        } else {
          formData.append(fieldKey, value);
        }
      });
    };

    appendNestedKeys(sanitizedValues);

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

    return formData;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Post a New Job
            </h1>
            <p className="text-gray-600">
              Fill out the form below to create your job posting
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[currentStep - 1]}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={async (values) => {
              try {
                const formData = handleFormSubmission(values);
                const response = await createJob(formData);
                setJobPostResponse(response?.data);
                if (response?.jobId) {
                  setJobPostResponse(response);
                  setJobPostModal(true);
                }
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
                <div className="mb-8">
                  <ProgressBar
                    currentStep={currentStep}
                    totalSteps={validationSchemas.length}
                  />
                </div>

                <div className="bg-white rounded-lg">
                  {currentStep === 1 && (
                    <JobsInfoSection
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
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
                      jobPostModal={jobPostModal}
                      setJobPostModal={setJobPostModal}
                      isLoading={isLoading}
                      jobPostResponse={jobPostResponse}
                      errors={errors}
                      touched={touched}
                      onContactDataChange={handleContactData}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      onNext={() => console.log("onNext")}
                    />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8 pt-4 border-t">
                  {currentStep === 1 && (
                    <>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors flex items-center justify-center"
                        onClick={() =>
                          handleNext(validateForm, setFieldTouched)
                        }
                      >
                        Next Step <MdArrowForward className="ml-2" />
                      </button>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          setCurrentStep((prevStep) => prevStep - 1)
                        }
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors flex items-center justify-center"
                        onClick={() =>
                          handleNext(validateForm, setFieldTouched)
                        }
                      >
                        Next Steps <MdArrowForward className="ml-2" />
                      </button>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() =>
                          setCurrentStep((prevStep) => prevStep - 1)
                        }
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors flex items-center justify-center"
                        disabled={isLoading}
                        onClick={() => setJobPostModal(true)}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Loading...
                          </div>
                        ) : (
                          <span className="flex items-center">
                            Post Jobs <MdArrowForward className="ml-2" />
                          </span>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>

        <JobSuccessModal isOpen={jobPostModal} onClose={setJobPostModal}>
          <h2 className="text-xl font-semibold text-center">Job Created</h2>
          <p className="mt-2 text-gray-600">{jobPostResponse?.message}</p>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium">Payment Details</h3>
            <p>
              <span className="font-semibold">Amount:</span>{" "}
              {jobPostResponse?.paymentDetails?.amount}{" "}
              {jobPostResponse?.paymentDetails?.currency}
            </p>
            <p>
              <span className="font-semibold">Service Fee:</span>{" "}
              {jobPostResponse?.paymentDetails?.serviceFee}{" "}
              {jobPostResponse?.paymentDetails?.currency}
            </p>
            <p className="font-semibold">
              Total: {jobPostResponse?.paymentDetails?.totalAmount}{" "}
              {jobPostResponse?.paymentDetails?.currency}
            </p>
            <p className="text-red-500 text-sm mt-1">
              Status: {jobPostResponse?.paymentDetails?.status}
            </p>
          </div>

          <a
            href={jobPostResponse?.sessionURL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors w-full"
          >
            Complete Payment
          </a>
        </JobSuccessModal>
      </div>
    </div>
  );
};

export default PostJob;
