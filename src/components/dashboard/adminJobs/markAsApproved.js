import { useUpdateJobMutation } from '@/redux/reducers/jobs/jobThunk';
import React from 'react';

export default function MarkAsApproved({ selectedJob, setShowMarkAsApprovedPopup }) {
  const [updateJob, { isLoading: updateLoading, error }] = useUpdateJobMutation();

  const updateJobHandler = (statusKey) => {
    // Dynamically toggle the provided status field
    const updatedStatus = {
      ...selectedJob?.status,
      [statusKey]: !selectedJob?.status?.[statusKey], // Toggle the specific status field
    };

    const data = {
      _id: selectedJob?._id,
      data: {
        slug: selectedJob?.slug,
        status: updatedStatus, // Use the updated status object
      },
    };

    console.log("Updating job with data:", data);

    updateJob(data)
      .then((res) => {
        console.log("Update response:", res);
        setShowMarkAsApprovedPopup(false); // Close the popup after successful update
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-15">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Job Status</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to toggle the status for{" "}
          <strong>{selectedJob?.jobTitle}</strong>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowMarkAsApprovedPopup(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => updateJobHandler("isApproved")} // Pass the specific status key
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
           {updateLoading ? "Loading..." :"Approve"}  
          </button>
        </div>
      </div>
    </div>
  );
}
