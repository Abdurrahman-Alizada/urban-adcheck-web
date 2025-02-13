'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RxCross1 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaDownload } from 'react-icons/fa';


function FinancialOverview() {

    const [openFilter, setOpenFilter] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [loading, setLoading] = useState(true)
    

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;

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
            title: 'Posted Jobs',
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
            filter: 'completed',
            title: 'Completed Jobs',
            jobs: '23',
            image: '/Completed-job-1.png',
            alt: 'completed-jobs',
        },
    ];

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setTimeout(()=>{
            const jobData = [
                { id: 1, invoice: 'Invoice#98', amount: '1,987,093', Date: '1/12/2025', status:"Succes"  },
                { id: 2, invoice: 'Invoice#97', amount: '1,987,093', Date: '1/12/2025', status:"Succes"  },
                { id: 3, invoice: 'Invoice#96', amount:'1,987,093', Date: '1/12/2025', status:"Pending"  },
                { id: 4, invoice: 'Invoice#95', amount: '1,986,878', Date: '1/12/2025', status:"Pending"  },
                { id: 5, invoice: 'Invoice#94', amount: '1,983,653', Date: '1/12/2025', status:"Failed"  },
                { id: 6, invoice: 'Invoice#93', amount: '6,981,093', Date: '1/12/2025', status:"Failed"  },
                { id: 7, invoice: 'Invoice#92', amount: '3,987,093', Date: '1/12/2025', status:"Succes" },
                { id: 8, invoice: 'Invoice#91', amount: '1,982,093', Date: '1/12/2025', status:"Succes" },
                { id: 9, invoice: 'Invoice#88', amount: '2,987,093', Date: '1/12/2025', status:"Pending" },
                { id: 10, invoice: 'Invoice#77', amount:'1,988,093',  Date: '1/12/2025', status:"Pending" },
                { id: 11, invoice: 'Invoice#76', amount:'9,187,096',  Date: '1/12/2025', status:"Failed"  },
                { id: 12, invoice: 'Invoice#75', amount:'1,985,053',  Date: '1/12/2025', status:"Failed" },
            
            ];
            setJobs(jobData);
            setFilteredJobs(jobData);
            setLoading(false);
        }, 3000);
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
            <tr key={job.id} className="bg-white text-left border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                    scope="row"
                    className="flex gap-2 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    
                    
                    <h4 className="text-[14px]">{job.invoice}</h4>
                </th>
                <td className="px-5 py-4 text-[14px] leading-tight">${job.amount}</td>
                <td className="px-4 py-4">
                {job.Date}
                </td>
                <td
    className={`px-4 py-4 ${
        job.status === 'Success'
        ? 'text-green-500'
        : job.status === 'Pending'
        ? 'text-yellow-500'
        : job.status === 'Failed'
        ? 'text-red-500'
        : 'text-primary'
    }`}
>
    {job.status}
</td>
<td className="px-4 py-4 ">
    <button className="text-[14px] flex items-center gap-2 text-primary font-semibold"><FaDownload/>Download</button>
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
            <div className="px-2">
                <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
                    Earnings
                </h2>
                <span className='text-gray-400 block mb-2 mt-2 font-nunitosans'>Available Funds</span>
                <span className='font-semibold font-nunitosans '>US$2k.00</span>
                <button className='bg-[#468451] rounded-md block text-white mb-2 mt-2 px-6 py-1 font-Archivoo '>Withdraw</button>
            </div>
            {/* Jobs List */}
            <div className="b-[1px] rounded-[5px] shadow-custom-shadow">
                    {/* Job List Header */}
                    <div className="px-2 py-3 flex items-center gap-4 relative">
                        {/* Filter Button */}
                        <button
                            className="flex items-center gap-2 bg-[#bffeb0] text-black px-3 py-1 rounded-full"
                            onClick={() => setOpenFilter(!openFilter)}
                        >
                            <Image src={'/filter.png'} alt='filter icon' width={35} height={35} onClick={() => setOpenFilter(!openFilter)} className='cursor-pointer'/>
                            <span>Filter Earnings</span>
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
                                        Filter Earnings
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
                                        Payment Invoice
                                    </th>
                                    <th scope="col" className="font-normal px-6 py-3">Amount</th>
                                    <th scope="col" className="font-normal px-6 py-3">Date</th>
                                    <th scope="col" className="font-normal px-6 py-3">Status</th>
                                    <th scope="col" className="font-normal px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody> {loading ? (
                            // Skeleton UI
                            [...Array(3)].map((_, index) => (
                                <tr key={index} className="animate-pulse bg-gray-200 border-b dark:bg-gray-700 dark:border-gray-600">
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-4 bg-gray-300 rounded w-10"></div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            renderJobRows(currentJobs)
                        )}
                        </tbody>
                            </table>
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

export default FinancialOverview;
