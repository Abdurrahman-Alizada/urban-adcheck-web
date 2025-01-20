import React from 'react'

export default function DeleteJob({selectedJob, setShowDeletePopup}) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-15">
    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        Delete The Job
      </h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want{" "}
        <strong>{selectedJob?.jobTitle}</strong> to be
        deleted?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowDeletePopup(false)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            console.log(
              `Job ${selectedJob?.jobTitle} deleted`
            );
            setShowDeletePopup(false);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  )
}
