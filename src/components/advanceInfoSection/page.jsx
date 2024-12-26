import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { MdFileUpload, MdCancel } from "react-icons/md";

const AdvanceInfoSection = ({
  values,
  handleChange,
  setFieldValue,
  cover,
  setCover,
  video,
  setVideo,
  gallery,
  setGallery,
  errors,
  touched,
}) => {
  const [previewUrls, setPreviewUrls] = useState({
    gallery: [],
    cover: "",
    video: "",
  });

  // Handle file change for gallery, cover, and video uploads
  const handleFileChange = (event, field) => {
    // const files = Array.from(event.target.files);
    const files = Array.from(event.currentTarget.files);

    if (field === "jobGallery") {
      const newUrls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...newUrls],
      }));
      setGallery((prev) => [...prev, ...files]); // Concatenating new files
    } else {
      const url = URL.createObjectURL(files[0]);
      setPreviewUrls((prev) => ({
        ...prev,
        [field === "jobCoverImage" ? "cover" : "video"]: url,
      }));
      field === "jobCoverImage"
        ? setCover(event.currentTarget.files[0])
        : setVideo(event.currentTarget.files[0]);
    }
  };

  // Handle removal of uploaded files (gallery images, cover, video)
  const removeFile = (index, field) => {
    if (field === "jobGallery") {
      const newGallery = gallery.filter((_, i) => i !== index);
      const newPreviewUrls = previewUrls.gallery.filter((_, i) => i !== index);
      setGallery(newGallery);
      setPreviewUrls((prev) => ({
        ...prev,
        gallery: newPreviewUrls,
      }));
    } else {
      field === "jobCoverImage" ? setCover(null) : setVideo(null);
      setPreviewUrls((prev) => ({
        ...prev,
        [field === "jobCoverImage" ? "cover" : "video"]: "",
      }));
    }
  };

  return (
    <section className="flex flex-col gap-6">
      {/* Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-[16px] font-medium">
          Description
        </label>
        <Field
          as="textarea"
          id="description"
          name="description"
          rows="6"
          className={`w-full p-3 rounded-md border ${
            errors.description && touched.description
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-2">
        <label htmlFor="notes" className="text-[16px] font-medium">
          Notes
        </label>
        <Field
          as="textarea"
          id="notes"
          name="notes"
          rows="4"
          className={`w-full p-3 rounded-md border ${
            errors.notes && touched.notes ? "border-red-500" : "border-gray-300"
          }`}
        />
        <ErrorMessage
          name="notes"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Gallery Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] font-medium">Job Gallery</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <MdFileUpload className="w-6 h-6 mb-2" />
            <span className="text-sm">Add Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "jobGallery")}
            />
          </label>
          {previewUrls.gallery.map((url, index) => (
            <div key={index} className="relative w-32 h-32">
              <img
                src={url}
                alt={`Gallery ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeFile(index, "jobGallery")}
                className="absolute -top-2 -right-2 bg-white rounded-full"
              >
                <MdCancel className="w-6 h-6 text-red-500" />
              </button>
            </div>
          ))}
        </div>
        <ErrorMessage
          name="jobGallery"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Cover Image Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] font-medium">Cover Image</label>
        <div className="flex items-center gap-4">
          <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <MdFileUpload className="w-6 h-6 mb-2" />
            <span className="text-sm">Upload Cover</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "jobCoverImage")}
            />
          </label>
          {previewUrls.cover && (
            <div className="relative w-40 h-40">
              <img
                src={previewUrls.cover}
                alt="Cover"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeFile(null, "jobCoverImage")}
                className="absolute -top-2 -right-2 bg-white rounded-full"
              >
                <MdCancel className="w-6 h-6 text-red-500" />
              </button>
            </div>
          )}
        </div>
        <ErrorMessage
          name="jobCoverImage"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Video Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-[16px] font-medium">Job Video</label>
        <div className="flex items-center gap-4">
          <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <MdFileUpload className="w-6 h-6 mb-2" />
            <span className="text-sm">Upload Video</span>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "jobVideo")}
            />
          </label>
          {previewUrls.video && (
            <div className="relative w-40 h-40">
              <video
                src={previewUrls.video}
                className="w-full h-full object-cover rounded-lg"
                controls
              />
              <button
                type="button"
                onClick={() => removeFile(null, "jobVideo")}
                className="absolute -top-2 -right-2 bg-white rounded-full"
              >
                <MdCancel className="w-6 h-6 text-red-500" />
              </button>
            </div>
          )}
        </div>
        <ErrorMessage
          name="jobVideo"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </section>
  );
};

export default AdvanceInfoSection;
