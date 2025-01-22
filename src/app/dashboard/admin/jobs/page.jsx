"use client";
import { useJobListQuery } from "@/redux/reducers/jobs/jobThunk";
import React, { useState, useMemo } from "react";
import { BsThreeDots, BsEye, BsCheckCircle, BsSearch } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { MdOutlineCancel, MdFilterList } from "react-icons/md";
import { useRouter } from "next/navigation";
import Select from "react-select";
import MarkAsExpired from "@/components/dashboard/adminJobs/markAsExpired";
import DeleteJob from "@/components/dashboard/adminJobs/deleteJob";
import MarkAsApproved from "@/components/dashboard/adminJobs/markAsApproved";
import moment from "moment";
import Image from "next/image";

const JobFilterComponent = () => {
  const [activeRow, setActiveRow] = useState(null);
  const [showExpirePopup, setShowExpirePopup] = useState(false);
  const [showMarkAsApprovePopup, setShowMarkAsApprovedPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  const [filters, setFilters] = useState({
    jobsType: [],
    jobTitle: "",
    minAmount: "",
    maxAmount: "",
    fromDate: "",
    toDate: "",
    sortBy: "createdAt",
    sortOrder: "descending",
  });

  const jobTypeOptions = [
    { value: "featured", label: "Featured Jobs" },
    { value: "approved", label: "Approved by Admin" },
    { value: "not-approved", label: "Not Approved" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "expired", label: "Expired" },
  ];

  const sortOptions = [
    { value: "createdAt-descending", label: "Newest First" },
    { value: "createdAt-ascending", label: "Oldest First" },
    { value: "jobTitle-ascending", label: "Job Title (A-Z)" },
    { value: "jobTitle-descending", label: "Job Title (Z-A)" },
    { value: "amount-ascending", label: "Amount (Low to High)" },
    { value: "amount-descending", label: "Amount (High to Low)" },
  ];

  const { data: jobsData = {}, isLoading, error } = useJobListQuery(filters);
  const jobs = jobsData.data?.jobs || [];
  const totalJobs = jobsData.data?.jobsCount || 0;

  const getStatusColor = (status) => {
    const statusColors = {
      Featured: "bg-purple-100 text-purple-800",
      Approved: "bg-green-100 text-green-800",
      "Not Approved": "bg-yellow-100 text-yellow-800",
      Completed: "bg-blue-100 text-blue-800",
      Cancelled: "bg-red-100 text-red-800",
      Expired: "bg-gray-100 text-gray-800"
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };


  const handleJobTypeChange = (e) => {
    const values = e.map((option) => option.value);
    setFilters((prev) => ({
      ...prev,
      jobsType: values,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (selected) => {
    const [sortBy, sortOrder] = selected.value.split("-");
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
    }));
  };

  const clearFilters = () => {
    setFilters({
      jobsType: [],
      jobTitle: "",
      minAmount: "",
      maxAmount: "",
      fromDate: "",
      toDate: "",
      sortBy: "createdAt",
      sortOrder: "descending",
    });
  };

  const togglePopup = (rowId) => {
    setActiveRow((prevRow) => (prevRow === rowId ? null : rowId));
  };

  const handleApprovePopup = (job) => {
    setSelectedJob(job);
    setShowMarkAsApprovedPopup(true);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-4 p-6 bg-gray-100 rounded-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs Managment</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <MdFilterList size={20} />
            <span>Filters</span>
          </button>
          <Select
            className="w-48"
            options={sortOptions}
            value={sortOptions.find(
              option => option.value === `${filters.sortBy}-${filters.sortOrder}`
            )}
            onChange={handleSortChange}
            placeholder="Sort by"
          />
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Job Types</label>
              <Select
                isMulti
                name="jobTypes"
                options={jobTypeOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={jobTypeOptions.filter((option) =>
                  filters.jobsType.includes(option.value)
                )}
                onChange={handleJobTypeChange}
                placeholder="Select job types"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded bg-white"
                />
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Amount Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="minAmount"
                  placeholder="Min"
                  value={filters.minAmount}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded bg-white"
                />
                <input
                  type="number"
                  name="maxAmount"
                  placeholder="Max"
                  value={filters.maxAmount}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="relative flex-1 ">
              <input
                type="text"
                name="jobTitle"
                placeholder="Search by job title..."
                value={filters.jobTitle}
                onChange={handleFilterChange}
                className="w-full pl-10 py-2 border rounded bg-white"
              />
              <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-gray-600 mb-4">Total ({totalJobs || "0"}) jobs found</h2>

        {jobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <JobTableHeader />
              <tbody className="z-50">
                {jobs.map((job) => (
                  <JobTableRow
                    key={job._id}
                    job={job}
                    activeRow={activeRow}
                    togglePopup={togglePopup}
                    handleApprovePopup={handleApprovePopup}
                    router={router}
                    getStatusColor={getStatusColor}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No jobs found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* Mark as Approved Modal */}
      {showMarkAsApprovePopup && (
        <MarkAsApproved
          selectedJob={selectedJob}
          setShowMarkAsApprovedPopup={setShowMarkAsApprovedPopup}
        />

      )}

      {/* Mark as Expired Modal */}
      {showExpirePopup && (
        <MarkAsExpired
          selectedJob={selectedJob}
          setShowExpirePopup={setShowExpirePopup}
        />

      )}

      {/* Delete Job Modal */}
      {showDeletePopup && (
        <DeleteJob
          selectedJob={selectedJob}
          setShowDeletePopup={setShowDeletePopup}
        />

      )}

    </div>
  );
};

export default JobFilterComponent;


const JobTableHeader = () => {
  return (
    <thead>
      <tr className="border-b">
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Image</th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Job Title</th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Location</th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500"></th>
      </tr>
    </thead>
  );
};


const getStatusColor = (status) => {
  const statusColors = {
    Featured: "bg-purple-100 text-purple-800",
    Approved: "bg-green-100 text-green-800",
    "Not Approved": "bg-yellow-100 text-yellow-800",
    Completed: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
    Expired: "bg-gray-100 text-gray-800"
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
};


const JobTableRow = ({ job, activeRow, togglePopup, handleApprovePopup, router }) => {
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
          
          {activeRow === job._id && (
            <div className="absolute top-full right-0 mt-1 w-[200px] bg-white shadow-lg rounded-md z-50 border">
              <div 
                onClick={() => router.push(`/dashboard/admin/jobs/${job._id}`)}
                className="flex items-center gap-2 hover:bg-[#E8F7FF] p-3 cursor-pointer transition-colors"
              >
                <BsEye size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">View Details</span>
              </div>
              <div className="flex items-center gap-2 hover:bg-[#E8F7FF] p-3 cursor-pointer transition-colors">
                <CiEdit size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">Edit Job</span>
              </div>
              <div 
                onClick={() => handleApprovePopup(job)}
                className="flex items-center gap-2 hover:bg-[#E8F7FF] p-3 cursor-pointer transition-colors"
              >
                {job.status?.isApproved ? (
                  <>
                    <MdOutlineCancel size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-600">Disapprove Job</span>
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
        </div>
      </td>
    </tr>
  );
};
