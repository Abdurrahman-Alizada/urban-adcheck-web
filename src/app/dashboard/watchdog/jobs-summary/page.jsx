"use client";
import React, { useEffect, useState } from "react";
import OverviewLoader from "@/components/contentLoader/dashboardOverviewLoader/page";
import { useJobSummaryQuery } from "@/redux/reducers/jobs/jobThunk";
// import DashboardCards from "@/components/dashboard/cards";
import WatchdogCards from "@/components/dashboard/watchdogsummarycard";

function Overview() {
  const { data:cardsInfo, isLoading, error } = useJobSummaryQuery();
console.log(cardsInfo, error)
  return (
    <div className="space-y-10 mt-5 bg-white">
      {isLoading ? (
        <div>
          <OverviewLoader />
        </div>
      ) : (
        <>
          <WatchdogCards info={cardsInfo?.jobSummary} />
        </>
      )}
    </div>
  );
}

export default Overview;