"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { MdArrowForward } from "react-icons/md";
import ProgressBar from "../../../../components/progressBar/page";
import JobsInfoSection from "@/components/jobs-info/page";
import AdvanceInfoSection from "../../../../components/advanceInfoSection/page";
import ContactSection from "../../../../components/contactSection/page";
import JobSuccessModal from "@/components/Modal/JobSuccessModal";
import { useCreateJobMutation } from "@/redux/reducers/jobs/jobThunk";

// Validation schemas
const validationSchemas = {
  step1: Yup.object().shape({
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
  }),
  step2: Yup.object().shape({
    description: Yup.string().required("Description is required"),
    notes: Yup.string(),
    jobGallery: Yup.array(),
    jobCoverImage: Yup.mixed(),
    jobVideo: Yup.mixed(),
  }),
  step3: Yup.object().shape({
    personalInfo: Yup.object().shape({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    phoneNumber: Yup.object().shape({
      primary: Yup.string().required("Phone number is required"),
    }),
  }),
};

const initialFormValues = {
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

const PostJob = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [jobPostModal, setJobPostModal] = useState(false);
  const [jobPostResponse, setJobPostResponse] = useState(null);
  const [createJob, { isLoading }] = useCreateJobMutation();

  // Separate state for each media type
  const [jobCoverImage, setJobCoverImage] = useState(null);
  const [jobVideo, setJobVideo] = useState(null);
  const [jobGallery, setJobGallery] = useState([]);

  // Helper functions
  const appendFormData = (formData, obj, parentKey = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      const fieldKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${fieldKey}[]`, item));
      } else if (
        value &&
        typeof value === "object" &&
        !(value instanceof File)
      ) {
        appendFormData(formData, value, fieldKey);
      } else {
        formData.append(fieldKey, value);
      }
    });
  };

  const handleFormSubmission = (values) => {
    const formData = new FormData();
    appendFormData(formData, values);

    // Append media files
    if (jobGallery.length > 0) {
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

  const handleNext = async (validateForm, setFieldTouched) => {
    const stepFields = {
      1: [
        "jobTitle",
        "category",
        "displayType",
        "paymentType",
        "dueTime",
        "address.street",
        "address.city",
        "address.country",
        "address.postalCode",
      ],
      2: ["description", "notes", "jobGallery", "jobCoverImage", "jobVideo"],
      3: ["personalInfo.fullName", "personalInfo.email", "phoneNumber.primary"],
    };

    const currentFields = stepFields[currentStep];
    currentFields.forEach((field) => setFieldTouched(field, true, true));

    const errors = await validateForm();

    // Check for nested field errors
    const hasStepErrors = currentFields.some((field) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return errors[parent]?.[child];
      }
      return errors[field];
    });

    if (!hasStepErrors) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.error("Validation errors:", errors);
    }
  };

  const renderStepContent = (errors, touched) => {
    switch (currentStep) {
      case 1:
        return <JobsInfoSection errors={errors} touched={touched} />;
      case 2:
        return (
          <AdvanceInfoSection
            errors={errors}
            touched={touched}
            jobGallery={jobGallery}
            setJobGallery={setJobGallery}
            jobCoverImage={jobCoverImage}
            setJobCoverImage={setJobCoverImage}
            setCover={setJobCoverImage}
            jobVideo={jobVideo}
            setJobVideo={setJobVideo}
          />
        );
      case 3:
        return <ContactSection errors={errors} touched={touched} />;
      default:
        return null;
    }
  };

  const renderStepButtons = (validateForm, setFieldTouched) => {
    const commonButtonClasses =
      "w-full sm:w-auto px-6 py-2 rounded-md transition-colors";
    const primaryButtonClasses = `${commonButtonClasses} bg-primary text-white hover:bg-secondary flex items-center justify-center`;
    const secondaryButtonClasses = `${commonButtonClasses} border border-gray-300 text-gray-700 hover:bg-gray-50`;

    const buttons = {
      1: [
        <button key="save" type="submit" className={secondaryButtonClasses}>
          Save Changes
        </button>,
        <button
          key="next"
          type="button"
          className={primaryButtonClasses}
          onClick={() => handleNext(validateForm, setFieldTouched)}
        >
          Next Step <MdArrowForward className="ml-2" />
        </button>,
      ],
      2: [
        <button key="save" type="submit" className={secondaryButtonClasses}>
          Save Changes
        </button>,
        <button
          key="prev"
          type="button"
          className={secondaryButtonClasses}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Previous
        </button>,
        <button
          key="next"
          type="button"
          className={primaryButtonClasses}
          onClick={() => handleNext(validateForm, setFieldTouched)}
        >
          Next Steps <MdArrowForward className="ml-2" />
        </button>,
      ],
      3: [
        <button
          key="prev"
          type="button"
          className={secondaryButtonClasses}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Previous
        </button>,
        <button
          key="submit"
          type="submit"
          className={primaryButtonClasses}
          disabled={isLoading}
          // onClick={() => setJobPostModal(true)}
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
        </button>,
      ],
    };

    return buttons[currentStep] || null;
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
            initialValues={initialFormValues}
            validationSchema={validationSchemas[`step${currentStep}`]}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={async (values) => {
              try {
                const formData = handleFormSubmission(values);
                const response = await createJob(formData);
                setJobPostResponse(response?.data);
                setJobPostModal(true);
              } catch (error) {
                console.error("Error submitting form:", error);
              }
            }}
          >
            {({
              errors,
              touched,
              validateForm,
              setFieldTouched,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-8">
                  <ProgressBar currentStep={currentStep} totalSteps={3} />
                </div>

                <div className="bg-white rounded-lg">
                  {renderStepContent(errors, touched)}
                </div>

                <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8 pt-4 border-t">
                  {renderStepButtons(validateForm, setFieldTouched)}
                </div>
              </form>
            )}
          </Formik>
        </div>

        <JobSuccessModal isOpen={jobPostModal} onClose={setJobPostModal}>
          <div>
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
          </div>
        </JobSuccessModal>
      </div>
    </div>
  );
};

export default PostJob;
