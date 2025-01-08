"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faLayerGroup,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import OverviewLoader from "@/components/contentLoader/dashboardOverviewLoader/page";
import { useGetUserStatQuery } from "@/redux/reducers/user/userThunk";
import { BiBriefcase } from "react-icons/bi";
import DashboardCards from "@/components/dashboard/cards";

function Overview() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const cardsData = [
    {
      title: "Posted jobs",
      jobs: "43",
      image: "/posted-jobs.png",
      alt: "posted-jobs",
      bgColor: "#E8F7FF",
    },
    {
      title: "Completed jobs",
      jobs: "23",
      image: "/Completed-jobs.png",
      alt: "completed-jobs",
      bgColor: "#E4F9E0",
    },
    {
      title: "Pending jobs",
      jobs: "443",
      image: "/pending-jobs.png",
      alt: "pending-jobs",
      bgColor: "#FFE5E5",
    },
  ];

  const jobsData = [
    {
      image: "/ads-img.png",
      category: "Home & Kitchen",
      title: "Urnab ad checker",
      price: "$160.00",
    },
    {
      image: "/ads-img.png",
      category: "Electronics",
      title: "Wireless Headphones",
      price: "$99.00",
    },
    {
      image: "/ads-img.png",
      category: "Fashion",
      title: "Leather Handbag",
      price: "$120.00",
    },
  ];

  const { data:cardsInfo } = useGetUserStatQuery();
  console.log("data", cardsInfo?.data);

  return (
    <div className="space-y-10 mt-5 p-3 lg:p-0">
      {loading ? (
        <div>
          <OverviewLoader />
        </div>
      ) : (
        <>
        
          <DashboardCards info={cardsInfo?.data} />

          {/* Recently Posted Jobs Section */}
          <section>
            {/* Section Header */}
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg md:text-xl">
                Recently Posted Jobs
              </h2>
              <button className="border-b border-transparent hover:border-black transition duration-150 text-base md:text-lg font-medium">
                View All{" "}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-gray-400"
                  size="xs"
                />
              </button>
            </div>

            {/* Jobs Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobsData.map((ad, index) => (
                <div
                  key={index}
                  className="shadow-custom-shadow rounded-lg overflow-hidden"
                >
                  {/* Ad Image */}
                  <Image
                    src={ad.image}
                    width={300}
                    height={240}
                    alt={ad.title}
                    className="w-full h-auto object-cover"
                  />

                  {/* Ad Content */}
                  <div className="px-5 py-3 border-b">
                    <span className="text-gray-500 text-sm flex items-center gap-2">
                      <FontAwesomeIcon icon={faLayerGroup} size="sm" />
                      {ad.category}
                    </span>
                    <h2 className="mt-2 text-[16px] font-semibold">
                      {ad.title}
                    </h2>
                  </div>

                  {/* Ad Footer */}
                  <div className="px-5 py-4 flex justify-between items-center">
                    <span className="text-[#FF4F4F] font-bold">{ad.price}</span>
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="text-gray-500"
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Overview;
