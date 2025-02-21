"use client";
import { useJobbystatusQuery } from "@/redux/reducers/jobs/jobThunk";
import React, { useState, useMemo, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { MdFilterList } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import MarkAsExpired from "@/components/dashboard/adminJobs/markAsExpired";
import DeleteJob from "@/components/dashboard/adminJobs/deleteJob";
import MarkAsApproved from "@/components/dashboard/adminJobs/markAsApproved";
import JobTableRow from "@/components/dashboard/watchDogJobs/tablerow";

const JobFilterComponent = () => {
  const [activeRow, setActiveRow] = useState(null);
  const [showExpirePopup, setShowExpirePopup] = useState(false);
  const [showMarkAsApprovePopup, setShowMarkAsApprovedPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const [selectedJobsByStatus, setSelectedJobsByStatus] = useState([]);
  const [titleFromURL, setTitleFromURL] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTitleFromURL(params.get("title") || "");
  }, [router]);

  const [filters, setFilters] = useState({
    jobsStatus: [],
    jobTitle: "",
    minAmount: "",
    maxAmount: "",
    fromDate: "",
    toDate: "",
    sortBy: "createdAt",
    sortOrder: "descending",
  });

  const jobsStatusOption = [
    { value: "available", label: "Available" },
    { value: "inProgress", label: "inProgress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "hidden", label: "Hidden" },
  ];

  const sortOptions = [
    { value: "createdAt-descending", label: "Newest First" },
    { value: "createdAt-ascending", label: "Oldest First" },
    { value: "jobTitle-ascending", label: "Job Title (A-Z)" },
    { value: "jobTitle-descending", label: "Job Title (Z-A)" },
    { value: "amount-ascending", label: "Amount (Low to High)" },
    { value: "amount-descending", label: "Amount (High to Low)" },
  ];

  const { data: jobsData = {}, isLoading, error } = useJobbystatusQuery();

  const handleJobStatusQuery = (selectedOption) => {
    if (!selectedOption) return;
    
    const statusKey = selectedOption.value;
    const jobsByStatus = jobsData?.jobsByStatus || {};
    
    // Set the selected jobs based on the status
    setSelectedJobsByStatus(jobsByStatus[statusKey] || []);
    // Update filters
    setFilters(prev => ({
      ...prev,
      jobsStatus: [selectedOption],
    }));
  };

  const titleToStatusMap = {
    "In Progress Jobs": { value: "inProgress", label: "inProgress" },
    "Completed Jobs": { value: "completed", label: "Completed" },
    "Cancelled Jobs": { value: "cancelled", label: "Cancelled" },
    "Hidden Jobs": { value: "hidden", label: "Hidden" },
    "Available Jobs": { value: "available", label: "Available" }
  };

  useEffect(() => {
    if (jobsData?.jobsByStatus) {
      // Get the matching status from the map
      const statusToUse = titleToStatusMap[titleFromURL] || { value: "available", label: "Available" };
      // Update filters with the correct status
      setFilters(prev => ({
        ...prev,
        jobsStatus: [statusToUse],
      }));
      // Call the query handler with the status
      handleJobStatusQuery(statusToUse);
    }
  }, [jobsData, titleFromURL]);

  // Apply all filters
  const filteredJobs = useMemo(() => {
    return selectedJobsByStatus.filter(job => {
      // Title filter
      if (filters.jobTitle && !job.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())) {
        return false;
      }
      
      // Amount range filter - use parseFloat to handle numeric comparison
      if (filters.minAmount && (!job.amount || parseFloat(job.amount) < parseFloat(filters.minAmount))) {
        return false;
      }
      if (filters.maxAmount && (!job.amount || parseFloat(job.amount) > parseFloat(filters.maxAmount))) {
        return false;
      }
      
      // Date range filter
      if (filters.fromDate && job.createdAt) {
        const jobDate = new Date(job.createdAt);
        const fromDate = new Date(filters.fromDate);
        if (jobDate < fromDate) {
          return false;
        }
      }
      
      if (filters.toDate && job.createdAt) {
        const jobDate = new Date(job.createdAt);
        const toDate = new Date(filters.toDate);
        // Set to end of day
        toDate.setHours(23, 59, 59, 999);
        if (jobDate > toDate) {
          return false;
        }
      }
      
      return true;
    });
  }, [selectedJobsByStatus, filters]);

  // Apply sorting
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      const { sortBy, sortOrder } = filters;
      
      if (sortBy === 'createdAt') {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
      }
      
      if (sortBy === 'jobTitle') {
        const titleA = a.jobTitle || '';
        const titleB = b.jobTitle || '';
        return sortOrder === 'ascending' 
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      }
      
      if (sortBy === 'amount') {
        const amountA = parseFloat(a.amount || 0);
        const amountB = parseFloat(b.amount || 0);
        return sortOrder === 'ascending' ? amountA - amountB : amountB - amountA;
      }
      
      return 0;
    });
  }, [filteredJobs, filters.sortBy, filters.sortOrder]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (selected) => {
    if (!selected) return;
    const [sortBy, sortOrder] = selected.value.split("-");
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
    }));
  };
   
  const clearFilters = () => {
    setFilters({
      jobsStatus: filters.jobsStatus, // Keep the current status selection
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
        <h1 className="text-2xl font-bold">Jobs Management</h1>
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
              <label className="text-sm font-medium text-gray-700">Job Status</label>
              <Select
                name="jobStatus"
                options={jobsStatusOption}
                className="basic-select"
                classNamePrefix="select"
                value={filters.jobsStatus[0]}
                onChange={handleJobStatusQuery}
                placeholder="Select job status"
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
            <div className="relative flex-1">
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
        <h2 className="text-gray-600 mb-4">
        Total ({sortedJobs.length}) jobs found
        </h2>

        {sortedJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <JobTableHeader />
              <tbody className="z-50">
                {sortedJobs.map((job) => (
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

      {showMarkAsApprovePopup && (
        <MarkAsApproved
          selectedJob={selectedJob}
          setShowMarkAsApprovedPopup={setShowMarkAsApprovedPopup}
        />
      )}

      {showExpirePopup && (
        <MarkAsExpired
          selectedJob={selectedJob}
          setShowExpirePopup={setShowExpirePopup}
        />
      )}

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