'use client';
import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { BiSquareRounded } from "react-icons/bi";
import Image from 'next/image';
import { IoMdCheckboxOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

function MyJob() {

    const [openFilter, setOpenFilter] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;
    
    //Delete Model for InProgress jobs
    const [showDeleteModal,setShowDeleteModal]=useState(false);
   
    const deleteInProgressJob=()=>{
        setShowDeleteModal(true);
    }

    const closeDeleteInProgressJobModal=()=>{
        setShowDeleteModal(false)
    }
    
    //filters inner cards content
    const cardsData = [
        {
            filter: 'all',
            title: 'All Jobs',
            jobs: '43',
            image: '/posted-job-1.png',
            alt: 'posted-jobs',
        },
        {
            filter: 'posted',
            title: 'posted Jobs',
            jobs: '43',
            image: '/posted-job-1.png',
            alt: 'posted-jobs',
        },
        {
            filter: 'in-progress',
            title: 'In Progress',
            jobs: '43',
            image: '/in-progress-1.png',
            alt: 'in-progress-jobs',
        },
        {
            filter: 'pending',
            title: 'Pending Jobs',
            jobs: '443',
            image: '/pending-job-1.png',
            alt: 'pending-jobs',
        },
        {
            filter: 'Assigned',
            title: 'Assigned Jobs',
            jobs: '443',
            image: '/pending-job-1.png',
            alt: 'Assigned-jobs',
        },
        {
            filter: 'completed',
            title: 'Completed Jobs',
            jobs: '23',
            image: '/Completed-job-1.png',
            alt: 'completed-jobs',
        },
    ];
    
    useEffect(() => {
        const fetchJobs = async () => {
            const jobData = [
                { id: 1, name: 'Building Horse', location: 'A Block st41, H20', charge: 100, status: 'Requested', image: '/img-jobs.png',alt:"job image 1" },
                { id: 2, name: 'Painting Wall', location: 'C Block st23, H10', charge: 200, status: 'in-progress', image: '/img-jobs.png',alt:"job image 2" },
                { id: 3, name: 'Fixing Roof', location: 'D Block st9, H5', charge: 150, status: 'pending', image: '/img-jobs.png' , alt:"job image 3" },
                { id: 4, name: 'Plumbing Work', location: 'E Block st12, H15', charge: 180, status: 'completed', image: '/img-jobs.png',alt:"job image 4" },
                { id: 5, name: 'Plumbing Work', location: 'E Block st12, H15', charge: 180, status: 'Assigned', image: '/img-jobs.png',alt:"job image 5" },
                { id: 6, name: 'Plumbing Work', location: 'E Block st12, H15', charge: 180, status: 'Assigned', image: '/img-jobs.png',alt:"job image 7" },
                { id: 7, name: 'Plumbing Work', location: 'E Block st12, H15', charge: 180, status: 'completed', image: '/img-jobs.png',alt:"job image 6" },
                { id: 8, name: 'Painting Wall', location: 'C Block st23, H10', charge: 200, status: 'in-progress', image: '/img-jobs.png',alt:"job image 8" },
                { id: 9, name: 'Painting Wall', location: 'C Block st23, H10', charge: 200, status: 'in-progress', image: '/img-jobs.png', alt:"job image 9" },
                { id: 10, name: 'Fixing Roof', location: 'D Block st9, H5', charge: 1000, status: 'pending', image: '/img-jobs.png', alt:"job image 10" },
                { id: 11, name: 'Fixing Roof', location: 'D Block st9, H5', charge: 1120, status: 'pending', image: '/img-jobs.png',alt:"job image 11" },
                { id: 12, name: 'Fixing Roof', location: 'D Block st9, H5', charge: 1230, status: 'pending', image: '/img-jobs.png', alt:"job image 12" },
            
            ];
            setJobs(jobData);
            setFilteredJobs(jobData);
        };
        fetchJobs();
    }, []);

    const toggleFilter = (filter) => {
        let updatedFilters;
        if (filter === 'all') {
            updatedFilters = selectedFilters.includes('all') ? [] : ['all'];
        } else {
            updatedFilters = selectedFilters.includes(filter)
                ? selectedFilters.filter((item) => item !== filter)
                : [...selectedFilters.filter((f) => f !== 'all'), filter];
        }
        setSelectedFilters(updatedFilters);

        if (updatedFilters.length === 0 || updatedFilters.includes('all')) {
            setFilteredJobs(jobs);
        } else {
            setFilteredJobs(jobs.filter((job) => updatedFilters.includes(job.status)));
        }
    };

    const removeFilter = (filter) => {
        toggleFilter(filter);
    };

    const renderJobRows = (jobList) => {
        return jobList.map((job, index) => (
            <tr key={job.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                    scope="row"
                    className="flex gap-2 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    <span className="font-bold">{index + 1}</span>
                    <Image
                        src={job.image}
                        width={55}
                        height={55}
                        alt={job.alt}
                        className="rounded-md"
                    />
                    <h4 className="text-[14px]">{job.name}</h4>
                </th>
                <td className="px-5 py-4 text-[14px] leading-tight">{job.location}</td>
                <td className="px-4 py-4">
                    <span className="bg-[#CEFEFB] px-2 py-1 text-[#068179] text-[14px] rounded-[20px]">
                        ${job.charge}
                    </span>
                </td>
                <td className="px-4 py-4 flex justify-between items-center">
                    {job.status === 'in-progress' ? (
                        <>
                            <button
                                type="button"
                                className="text-[13px] cursor-pointer lg:text-[15px] shadow-md px-2 xl:px-5 py-1 font-medium bg-transparent text-primary border-[1px] border-primary rounded-[10px]"
                                onClick={deleteInProgressJob}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="text-[13px] cursor-pointer lg:text-[15px] shadow-md px-2 xl:px-5 py-1 font-medium bg-primary text-white rounded-[10px]"
                            >
                                Submit
                            </button>
                        </>
                    ) : job.status === 'pending' ? (
                        <button
                            type="submit"
                            className="text-[13px] shadow-md lg:text-[15px] px-3 lg:px-6 py-1 font-medium bg-[#EEBB06] text-white rounded-[10px]"
                        >
                            Pending
                        </button>
                    ) : job.status === 'completed' ? (
                        <button
                            type="button"
                            className="text-[13px] shadow-lg lg:text-[15px] px-3 lg:px-8 py-1 font-medium bg-[#08D880] text-white rounded-[10px]"
                        >
                            Done
                        </button>
                    ) 
                    : job.status === 'Assigned' ? (
                        <>
                            <button
                            className="text-[13px] lg:text-[15px] shadow-md px-1 xl:px-3 py-1 font-medium bg-transparent text-black border-[1px] border-primary rounded-[10px]"
                            >
                            View
                            </button>
                            <button
                            className="text-[13px] lg:text-[15px] shadow-md px-1 xl:px-3 py-1 font-medium bg-primary text-white rounded-[10px]"
                            >
                            Assign
                            </button>
                        </>
                    )
                    : (
                        <>
                            <button
                            className="text-[13px] lg:text-[15px] shadow-md px-1 xl:px-3 py-1 font-medium bg-transparent text-black border-[1px] border-primary rounded-[10px]"
                            >
                            View
                            </button>
                            <button
                            className="text-[13px] lg:text-[15px] shadow-md px-1 xl:px-3 py-1 font-medium bg-primary text-white rounded-[10px]"
                            >
                            Assign
                            </button>
                        </>
                       
                    )}
                </td>
            </tr>
        ));
    };

    // Pagination Logic
    const indexOfLastJob = currentPage * rowsPerPage;
    const indexOfFirstJob = indexOfLastJob - rowsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    // Handle Page Change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle Next Page
    const nextPage = () => setCurrentPage(currentPage + 1);

    // Handle Previous Page
    const prevPage = () => setCurrentPage(currentPage - 1);

    // Total Pages
    const totalPages = Math.ceil(filteredJobs.length / rowsPerPage);
    
    const renderPaginationNumbers = () => {
        const pages = [];
        const totalPages = Math.ceil(filteredJobs.length / rowsPerPage);
    
        // Always show the first 3 pages
        for (let i = 1; i <= Math.min(3, totalPages); i++) {
            pages.push(i);
        }
    
        // Show dots if the current page is far from the first 3
        if (currentPage > 4) {
            pages.push('...');
        }
    
        // Show current page and one page before and after
        if (currentPage > 3 && currentPage < totalPages - 2) {
            pages.push(currentPage - 1, currentPage, currentPage + 1);
        }
    
        // Show dots if the current page is far from the last 3
        if (currentPage < totalPages - 3) {
            pages.push('...');
        }
    
        // Always show the last 3 pages
        for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
            pages.push(i);
        }
    
        return pages;
    };
    
    return (
        <div className="w-full mt-4 mb-10">
            {/* Section Header */}
            <div className="flex gap-4 items-center">
                <BsArrowLeft size={22} />
                <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
                    All Jobs
                </h2>
            </div>
            {/* Jobs List */}
            <div className="b-[1px] rounded-[5px] shadow-custom-shadow">
                    {/* Job List Header */}
                    <div className="px-5 py-3 flex items-center gap-4 relative">
                        {/* Filter Button */}
                        <button
                            className="flex items-center gap-2 bg-[#bffeb0] text-black px-3 py-1 rounded-full"
                            onClick={() => setOpenFilter(!openFilter)}
                        >
                            <Image src={'/filter.png'} alt='filter icon' width={35} height={35} onClick={() => setOpenFilter(!openFilter)} className='cursor-pointer'/>
                            <span>Filter Jobs</span>
                        </button>

                        {/* Jobs Count */}
                        <span className="bg-[#F9F5FF] p-1 text-[#6941C6] rounded-[20px]">
                            {filteredJobs.length}
                        </span>

                        {/* Active Filters */}
                        {selectedFilters.map((filter, index) => (
                            <button
                                key={index}
                                onClick={() => removeFilter(filter)}
                                className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full flex items-center gap-1"
                            >
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                <RxCross1 size={14} />
                            </button>
                        ))}
                    </div>

                    {/* Filter Modal */}
                    {openFilter && (
                        <div className="w-[45%] absolute  left-[250px] z-10">
                            <div className="w-full bg-white shadow-custom-shadow rounded-md flex flex-col p-3">
                                <div className="flex justify-between items-center mt-5">
                                    <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
                                        Filter Jobs
                                    </h2>
                                    <RxCross1
                                        size={40}
                                        color="#068179"
                                        className="bg-[#EBECF5] cursor-pointer rounded-full p-2"
                                        onClick={() => setOpenFilter(false)}
                                    />
                                </div>
                                <div className='w-full px-6 py-4'>
                                    {cardsData.map((card, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center py-4 border-b-[1px]"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={card.image}
                                                    width={48}
                                                    height={48}
                                                    alt={card.alt}
                                                    className="object-contain"
                                                />
                                                <div className='flex flex-col'>
                                                    <span className="text-[15px] font-semibold">{card.title}</span>
                                                    <span className="text-gray-500 text-[16px]">{card.jobs}</span>
                                                </div>
                                            </div>
                                            <input
                                                type="checkbox"
                                                id={`filter-${index}`}
                                                name={`filter-${card.title}`}
                                                className="w-4 h-4 text-[#068179] border-gray-300 rounded"
                                                checked={selectedFilters.includes(card.filter)}
                                                onChange={() => toggleFilter(card.filter)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Job List Table */}
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-grayColor font-normal capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-normal flex items-center gap-1">
                            <BiSquareRounded size={20} className='bg-white'/>
                            Name
                            </th>
                            <th scope="col" className="font-normal px-6 py-3">Location</th>
                            <th scope="col" className="font-normal px-6 py-3">Charge ($)</th>
                            <th scope="col" className="font-normal px-6 py-3">Action</th>
                        </tr>
                        </thead>
                        <tbody>{renderJobRows(currentJobs)}</tbody>
                    </table>

                    {/* Delete Job Modal */}
                    {showDeleteModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                        <div className="w-[70%] md:w-[60%] lg:w-[50%] bg-white shadow-custom-shadow p-4 rounded-md">
                            <div className="flex flex-col items-center">
                            <RxCross2
                                color="red"
                                size={25}
                                className="cursor-pointer"
                                onClick={closeDeleteInProgressJobModal}
                            />
                            <span className="font-semibold font-nunitosans text-center">
                                Are you sure you want to cancel a job?
                            </span>
                            </div>
                            <div className="flex flex-col gap-2 p-4">
                            <label
                                htmlFor="jobCancellationReason"
                                className="text-[15px] font-semibold font-nunitosans"
                            >
                                Give Reason
                            </label>
                            <textarea
                                id="jobCancellationReason"
                                placeholder="Type here"
                                className="bg-gray-100 text-[16px] resize-none rounded-md p-2"
                                rows="4"
                            ></textarea>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center gap-2">
                            <button
                                className="bg-transparent border-[1px] border-red-500 text-red-500 px-2 md:px-6 py-1 rounded-md disabled:opacity-50"
                                onClick={closeDeleteInProgressJobModal}
                            >
                                Cancel
                            </button>
                            <button className="bg-green-400 border-[1px] text-white px-2 md:px-6 py-1 rounded-md disabled:opacity-50">
                                Submit
                            </button>
                            </div>
                        </div>
                        </div>
                    )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
                       {/* Previous Button */}
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="flex gap-2 items-center bg-transparent border-[1px] border-gray-300 text-gray-500 px-2 md:px-8 py-1 rounded-md disabled:opacity-50"
                        >
                            <FaArrowLeftLong size={22}/>
                            Previous
                        </button>

                        {/* Page Numbers */}
                        <div>
                         {renderPaginationNumbers().map((page, index) => (
                                <button
                                    key={index}
                                    onClick={() => page !== '...' && paginate(page)}
                                    className={`px-3 py-1 rounded-md ${
                                        currentPage === page ? 'bg-[#F9F5FF] text-[#7F56D9]' : 'bg-transparent'
                                    }`}
                                    disabled={page === '...'}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="flex gap-2 items-center bg-transparent border-[1px] border-gray-300 text-gray-500 px-2 md:px-8 py-1 rounded-md disabled:opacity-50"
                        >
                            Next
                            <FaArrowRightLong size={22}/>
                        </button>
                    </div>
            </div>
        </div>
    );
}

export default MyJob;
