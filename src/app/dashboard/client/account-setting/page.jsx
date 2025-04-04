'use client';
import React, { memo } from 'react';
import Image from 'next/image';
import { TbPackage, TbMail } from "react-icons/tb";
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';
import ProfileContentLoader from '@/components/contentLoader/profileContentLoader/page';
import { useRouter } from 'next/navigation';

// Package Feature Component
const PackageFeature = memo(({ label, value }) => (
  <div className="p-2 bg-blue-50 rounded-lg text-sm text-blue-700">
    {label}: {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
  </div>
));
PackageFeature.displayName = 'PackageFeature';

// Status Badge Component
const StatusBadge = memo(({ isActive }) => (
  <span className={`text-${isActive ? 'green' : 'red'}-500`}>
    {isActive ? 'Active' : 'Inactive'}
  </span>
));
StatusBadge.displayName = 'StatusBadge';

// Profile Header Component
const ProfileHeader = memo(({ user, onEditProfile, onEditPassword }) => (
  <div className="bg-white p-2 md:p-6 rounded-xl shadow-sm">
    <div className="flex flex-wrap items-start gap-6">
      <div className="relative w-24 h-24">
        <Image
          src="/Avatar-2.png"
          fill
          className="rounded-xl object-cover"
          alt="Profile"
        />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-white" />
      </div>
      <div className="md:flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.fullName.firstName} {user.fullName.lastName}
            </h2>
            <p className="text-gray-500">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="md:flex md:flex-wrap gap-2 hidden ">
            <button
              onClick={onEditProfile}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-secondary transition-colors duration-200"
            >
              Edit Profile
            </button>
            <button
              onClick={onEditPassword}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-secondary transition-colors duration-200"
            >
              Edit Password
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <TbMail size={18} />
            <span>{user.email}</span>
          </div>
          <div className="flex flex-wrap gap-2  md:hidden">
            <button
              onClick={onEditProfile}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-secondary transition-colors duration-200"
            >
              Edit Profile
            </button>
            <button
              onClick={onEditPassword}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-secondary transition-colors duration-200"
            >
              Edit Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
));
ProfileHeader.displayName = 'ProfileHeader';

// Subscription Details Component
const SubscriptionDetails = memo(({ packageDetails }) => {
  if (!packageDetails?.currentPlan) return null;

  const { currentPlan } = packageDetails;

  return (
    <div className="bg-white p-2 md:p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <TbPackage className="text-blue-500" />
        Subscription Details
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium text-gray-900">
            <StatusBadge isActive={packageDetails.isSubscribed} />
          </p>
        </div>
        {Object.entries({
          'Package Name': currentPlan.packageName,
          'Status': currentPlan.status,
          'Validity': `${currentPlan.validity} days`,
          'Total Jobs': currentPlan.totalJobs,
          'Featured Jobs': currentPlan.featuredJobs,
          'Auto Renewal': currentPlan.autoRenew ? 'Enabled' : 'Disabled'
        }).map(([label, value]) => (
          <div key={label} className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {currentPlan.features && (
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2 text-gray-700">Package Features</h4>
          <div className="grid grid-cols-2 gap-2">
            <PackageFeature label="Priority Support" value={currentPlan.features.prioritySupport} />
            <PackageFeature label="Job Duration" value={`${currentPlan.features.jobDuration} days`} />
            <PackageFeature label="Auto Renewal" value={currentPlan.features.autoRenewal} />
          </div>
        </div>
      )}
    </div>
  );
});
SubscriptionDetails.displayName = 'SubscriptionDetails';

// Main Component
const AccountSettings = () => {
  const { data: userData, isLoading, error } = useGetCurrentLoginUserQuery();
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/dashboard/client/account-setting/edit-account');
  };

  const handleEditPassword = () => {
    router.push('/dashboard/client/account-setting/edit-password');
  };

  if (isLoading) {
    return <ProfileContentLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading account details
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen p-2 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-500">View your account information</p>
        </div>
        <div className="space-y-8">
          <ProfileHeader
            user={userData}
            onEditProfile={handleEditProfile}
            onEditPassword={handleEditPassword}
          />
          {userData.role.isClient && userData.packageDetails && (
            <SubscriptionDetails packageDetails={userData.packageDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
