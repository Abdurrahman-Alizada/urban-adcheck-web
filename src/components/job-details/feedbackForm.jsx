import { useCreateJobMutation } from "@/redux/reducers/jobs/jobThunk";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useCreateReviewMutation } from "@/redux/reducers/reviews/reviewThunk";

export default function FeedbackForm({jobDetails,currentLoginUser}) {
  const [submitted, setSubmitted] = useState(false);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      feedback: "",
      rating: "",
    },
    validationSchema: Yup.object({
      feedback: Yup.string()
        .min(10, "Feedback must be at least 10 characters.")
        .required("Feedback is required."),
      rating: Yup.number()
        .min(1, "Please select a rating.")
        .required("Rating is required."),
    }),
    onSubmit: async (values) => {

      const data={
        ratingNumber: values.rating,
        review: values.feedback,
        clientId:currentLoginUser._id,
        job:jobDetails.data._id,
      }
      try {
        const res=await createReview(data).unwrap();
        console.log("res",res)
        setSubmitted(true);
      } catch (error) {
        console.error("Submission failed:", error);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {!submitted ? (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Leave your review</h1>
          <form onSubmit={formik.handleSubmit}>
            {/* Feedback Field */}
            <div className="mb-4">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                Your Review
              </label>
              <textarea
                id="feedback"
                name="feedback"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
                placeholder="Write your Review here..."
                {...formik.getFieldProps("feedback")}
              />
              {formik.touched.feedback && formik.errors.feedback ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.feedback}</p>
              ) : null}
            </div>

            {/* Rating Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex space-x-3 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`h-10 w-10 flex items-center justify-center border rounded-full text-sm font-medium ${
                      formik.values.rating === star
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue("rating", star)}
                  >
                    {star}
                  </button>
                ))}
              </div>
              {formik.touched.rating && formik.errors.rating ? (
                <p className="text-red-500 text-sm mt-1">{formik.errors.rating}</p>
              ) : null}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-green-600 text-lg font-medium">Feedback Submitted!</h2>
          <p className="text-gray-700 mt-2">Thank you for your feedback.</p>
        </div>
      )}
    </div>
  );
}
