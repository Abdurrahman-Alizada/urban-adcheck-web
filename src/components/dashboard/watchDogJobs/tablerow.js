'use client';
import moment from "moment";
import { BsThreeDots, BsEye, BsCheckCircle } from "react-icons/bs";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";


const JobTableRow = ({ job, activeRow, togglePopup, handleApprovePopup, router , getStatusColor}) => {
    return (
      <tr className="border-b hover:bg-gray-50 transition-colors">
        <td className="p-2">
          <Image
            src={job.jobCoverImage ? job.jobCoverImage :"/billboard-square.png"}
            alt={`${job.jobTitle} image`}
            width={80}
            height={80}
            className="rounded-md object-cover"
          />
        </td>
        <td className="px-6 py-4">
          <div>
            <h3 className="font-medium text-gray-900">{job.jobTitle}</h3>
            <p className="text-sm text-gray-500">
              Posted {moment(job.createdAt).fromNow()}
            </p>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{`${job.address.city}, ${job.address.country}`}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(job.status)
              .filter(([key, value]) => value === true)
              .map(([key], idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 text-xs rounded-full ${getStatusColor(key.replace("is", ""))}`}
                >
                  {key.replace("is", "")}
                </span>
              ))}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="font-medium text-gray-900">{`${job.paymentDetails.amount} ${job.paymentDetails.currency}`}</div>
        </td>
        <td className="px-6 py-4">
          <div className="flex justify-end relative">
            <button
              onClick={() => togglePopup(job._id)}
              className="text-gray-700 bg-[#F5F7FA] hover:bg-[#00AAFF] hover:text-white rounded-md p-2 transition-colors"
            >
              <BsThreeDots size={20} />
            </button>
          </div>
          {activeRow === job._id && (
              <div className="absolute right-3 mt-1 w-[200px] bg-white shadow-lg rounded-md z-50 border">
                <div 
                  onClick={() => router.push(`/dashboard/watchdog/my-jobs/${job._id}`)}
                  className="flex items-center gap-2 hover:bg-[#E8F7FF] p-3 cursor-pointer transition-colors"
                >
                  <BsEye size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-600">View Details</span>
                </div>
          
                <div 
                  onClick={() => handleApprovePopup(job)}
                  className="flex items-center gap-2 hover:bg-[#E8F7FF] p-3 cursor-pointer transition-colors"
                >
                  {job.status?.isApproved ? (
                    <>
                      <MdOutlineCancel size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-600">Accept Job</span>
                    </>
                  ) : (
                    <>
                      <BsCheckCircle size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-600">Approve Job</span>
                    </>
                  )}
                </div>
              </div>
            )}
        </td>
      </tr>
    );
  };

export default JobTableRow;