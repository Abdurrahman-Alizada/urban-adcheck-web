"use client";
import React, { useEffect, useState } from "react";

import OverviewLoader from "@/components/contentLoader/dashboardOverviewLoader/page";
import { useGetUserStatQuery } from "@/redux/reducers/user/userThunk";
import DashboardCards from "@/components/dashboard/cards";
import RecentlySubscribedUsers from "@/components/dashboard/RecentlySubscribedUsers";

function Overview() {
  const { data:cardsInfo,isLoading } = useGetUserStatQuery();

  return (
    <div className="space-y-10 mt-5 bg-white">
      {isLoading ? (
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
