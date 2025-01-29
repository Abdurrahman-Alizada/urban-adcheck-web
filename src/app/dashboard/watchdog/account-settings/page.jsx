'use client';
import React, { memo } from 'react';
import Image from 'next/image';
import { BiUser } from "react-icons/bi";
import { TbPackage, TbMail } from "react-icons/tb";
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';
import ProfileContentLoader from '@/components/contentLoader/profileContentLoader/page';
import { useRouter } from 'next/navigation';

// Extracted Package Feature component
const PackageFeature = memo(({ label, value }) => (
  <div className="p-2 bg-blue-50 rounded-lg text-sm text-blue-700">
    {label}: {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
  </div>
));

PackageFeature.displayName = 'PackageFeature';

// Extracted Status Badge component
const StatusBadge = memo(({ isActive }) => (
  <span className={`text-${isActive ? 'green' : 'red'}-500`}>
    {isActive ? 'Active' : 'Inactive'}
  </span>
));

StatusBadge.displayName = 'StatusBadge';

// Profile Header Component
const ProfileHeader = memo(({ user, onEditProfile, onEditPassword }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-start gap-6">
      <div className="relative w-24 h-24">
        <Image
          src="/profile-Image.png"
          fill
          className="rounded-xl object-cover"
          alt="Profile"
        />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-white" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.fullName.firstName} {user.fullName.lastName}
            </h2>
            <p className="text-gray-500">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEditProfile}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-secondary transition-colors duration-200 flex items-center gap-2"
            >
              Edit Profile
            </button>
            <button
              onClick={onEditPassword}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-secondary transition-colors duration-200 flex items-center gap-2"
            >
              Edit Password
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <TbMail size={18} />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

ProfileHeader.displayName = 'ProfileHeader';

// Main Component
const AccountSettings = () => {
  const { data: userData, isLoading, error } = useGetCurrentLoginUserQuery();
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/dashboard/watchdog/account-settings/edit-account');
  };

  const handleEditPassword = () => {
    router.push('/dashboard/watchdog/account-settings/edit-password');
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
    <div className="min-h-screen p-6">
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
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
