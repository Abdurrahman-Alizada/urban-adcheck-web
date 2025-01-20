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
import RecentlySubscribedUsers from "@/components/dashboard/RecentlySubscribedUsers";

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

  return (
    <div className="space-y-10 mt-5 bg-white">
      {loading ? (
        <div>
          <OverviewLoader />
        </div>
      ) : (
        <>
        
          <DashboardCards info={cardsInfo?.data} />

          {/* Recently Posted Jobs Section */}
          <RecentlySubscribedUsers users={cardsInfo?.recentlySubscribedUsers || []} />

        </>
      )}
    </div>
  );
}

export default Overview;
