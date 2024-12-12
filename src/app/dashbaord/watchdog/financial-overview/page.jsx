'use client';
import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { IoFilter } from "react-icons/io5";
import { IoIosSquareOutline } from "react-icons/io";
import Image from 'next/image';
import { IoMdCheckboxOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

function FinancialOverview() {
    const [openFilter, setOpenFilter] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);

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
            const jobData = [
                { id: 1, name: 'Building Horse', location: 'A Block st41, H20', charge: 100, status: 'posted', image: '/img-jobs.png' },
                { id: 2, name: 'Painting Wall', location: 'C Block st23, H10', charge: 200, status: 'in-progress', image: '/img-jobs.png' },
                { id: 3, name: 'Fixing Roof', location: 'D Block st9, H5', charge: 150, status: 'pending', image: '/img-jobs.png' },
                { id: 4, name: 'Plumbing Work', location: 'E Block st12, H15', charge: 180, status: 'completed', image: '/img-jobs.png' },
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
                        alt="Job Image"
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
                                className="text-[13px] lg:text-[15px] shadow-md px-2 xl:px-5 py-1 font-medium bg-transparent text-primary border-[1px] border-primary rounded-[10px]"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="text-[13px] lg:text-[15px] shadow-md px-2 xl:px-5 py-1 font-medium bg-primary text-white rounded-[10px]"
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
                    ) : (
                        <>
                           <div className='flex gap-5'>
                               <IoMdCheckboxOutline size={20}/>
                               <RiDeleteBin6Line size={20}/>
                            </div>

                            <button
                            className="text-[13px] lg:text-[15px] shadow-md px-1 xl:px-3 py-1 font-medium bg-primary text-white rounded-[10px]"
                            >
                            See details
                        </button>
                        </>
                       
                    )}
                </td>
            </tr>
        ));
    };

    return (
        <div className="w-full mt-4 mb-10">
            {/* Section Header */}
            <div className="flex gap-4 items-center">
                <BsArrowLeft size={22} />
                <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
                    My Jobs
                </h2>
            </div>
            {/* Jobs List */}
            <div className="b-[1px] rounded-[5px] shadow-custom-shadow">
                {/* Job List Header */}
                <div className="px-5 py-3 flex items-center gap-4 relative">
                    <h3 className="text-gray-700 text-[16px] lg:text-[20px] font-extrabold font-Archivoo">
                        {selectedFilters.length === 0 || selectedFilters.includes('all')
                            ? 'All Jobs'
                            : selectedFilters.map((filter) => filter.charAt(0).toUpperCase() + filter.slice(1)).join(', ')}
                    </h3>
                    <span className='bg-[#F9F5FF] p-1 text-[#6941C6] rounded-[20px]'>
                        {filteredJobs.length}
                    </span>
                    <IoFilter size={25} onClick={() => setOpenFilter(!openFilter)} className="cursor-pointer" />
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
                    <div className="w-[45%] absolute top-12 left-[250px] z-10">
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
                                    <IoIosSquareOutline size={20} />
                                    Name
                                </th>
                                <th scope="col" className="font-normal px-6 py-3">Location</th>
                                <th scope="col" className="font-normal px-6 py-3">Charge ($)</th>
                                <th scope="col" className="font-normal px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>{renderJobRows(filteredJobs)}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FinancialOverview;
