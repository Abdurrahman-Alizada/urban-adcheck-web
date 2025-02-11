"use client";
import React, { useState } from "react";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { MdFilterList } from "react-icons/md";
import Select from "react-select";
import { useGetAllUsersQuery } from "@/redux/reducers/user/userThunk";
import { useRouter } from "next/navigation";

function Clients() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    userTypes: [],
    searchQuery: "",
    fromDate: "",
    toDate: "",
    sortBy: "createdAt",
    sortOrder: "descending",
    limit: 10,
  });

  const userTypeOptions = [
    { value: "admin", label: "Admins" },
    { value: "client", label: "Clients" },
    { value: "watchdog", label: "Watchdogs" },
  ];

  const sortOptions = [
    { value: "createdAt-descending", label: "Newest First" },
    { value: "createdAt-ascending", label: "Oldest First" },
    { value: "name-ascending", label: "Name (A-Z)" },
    { value: "name-descending", label: "Name (Z-A)" },
  ];

  const rowsPerPageOptions = [
    { value: 5, label: "5 rows" },
    { value: 10, label: "10 rows" },
    { value: 20, label: "20 rows" },
    { value: 50, label: "50 rows" },
  ];

  // Fetch users using the API
  const defaultQuery = {
    type: filters.userTypes.length > 0 ? filters.userTypes : undefined,
    page: currentPage,
    limit: filters.limit,
    searchQuery: filters.searchQuery,
    fromDate: filters.fromDate,
    toDate: filters.toDate,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
  };

  const { data: res, isLoading } = useGetAllUsersQuery(defaultQuery);

  // Pagination Handlers
  const totalPages = res?.data?.pagination?.totalPages || 1;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleUserTypeChange = (selected) => {
    const values = selected.map((option) => option.value);
    setFilters((prev) => ({
      ...prev,
      userTypes: values,
    }));
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handleSortChange = (selected) => {
    const [sortBy, sortOrder] = selected.value.split("-");
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
    }));
  };

  const handleRowsPerPageChange = (selected) => {
    setFilters((prev) => ({
      ...prev,
      limit: selected.value,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      userTypes: [],
      searchQuery: "",
      fromDate: "",
      toDate: "",
      sortBy: "createdAt",
      sortOrder: "descending",
      limit: 10,
    });
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Users Managment</h1>
        </div>
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
              (option) =>
                option.value === `${filters.sortBy}-${filters.sortOrder}`
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
              <label className="text-sm font-medium text-gray-700">
                User Types
              </label>
              <Select
                isMulti
                options={userTypeOptions}
                value={userTypeOptions.filter((option) =>
                  filters.userTypes.includes(option.value)
                )}
                onChange={handleUserTypeChange}
                placeholder="Select user types"
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date Range
              </label>
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
              <label className="text-sm font-medium text-gray-700">
                Rows per page
              </label>
              <Select
                options={rowsPerPageOptions}
                value={rowsPerPageOptions.find(
                  (option) => option.value === filters.limit
                )}
                onChange={handleRowsPerPageChange}
                placeholder="Select rows"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="relative flex-1 ">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search by name or email..."
                value={filters.searchQuery}
                onChange={handleFilterChange}
                className="w-full pl-10 pr-4 py-2 border rounded bg-white"
              />
              <BsSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
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
          Total ({res?.data?.pagination?.totalUsers || "0"}) users found
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
  {isLoading ? (
    [...Array(5)].map((_, index) => (
      <tr key={index} className="border-b animate-pulse">
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-8 bg-gray-300 rounded w-16"></div>
        </td>
      </tr>
    ))
  ) : res?.data?.users?.length > 0 ? (
    res.data.users.map((user) => (
      <tr key={user._id} className="border-b hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 font-medium text-gray-900">
          {`${user.fullName.firstName} ${user.fullName.lastName}`}
        </td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              user.role.isSuperAdmin
                ? "bg-purple-100 text-purple-800"
                : user.role.isAdmin
                ? "bg-blue-100 text-blue-800"
                : user.role.isClient
                ? "bg-green-100 text-green-800"
                : user.role.isWatchDog
                ? "bg-orange-100 text-orange-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {user.role.isSuperAdmin
              ? "Super Admin"
              : user.role.isAdmin
              ? "Admin"
              : user.role.isClient
              ? "Client"
              : user.role.isWatchDog
              ? "Watchdog"
              : "N/A"}
          </span>
        </td>
        <td className="px-6 py-4">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              user.packageDetails.isSubscribed
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {user.packageDetails.isSubscribed ? "Active" : "Inactive"}
          </span>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() => {
              router.push(`/dashboard/admin/users/${user?._id}`);
            }}
            className="text-sm px-4 py-2 text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-200"
          >
            Details
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} className="text-center py-8 text-gray-500">
        No users found. Try adjusting your filters.
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clients;
