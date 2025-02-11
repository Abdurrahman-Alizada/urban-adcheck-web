"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBell } from "react-icons/fa6";
import { GoGear } from "react-icons/go";
import { PiSignOut } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useGetCurrentLoginUserQuery, useSignOutUserMutation } from '@/redux/reducers/user/userThunk';
import Notification from '../notification/page'; // Ensure this import path is correct

const navItems = [
  { href: '/about', label: 'About us' },
  { href: '/Pricing', label: 'Services' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const router = useRouter();
  const [signOutUser] = useSignOutUserMutation();
  const { data: currentLoginUser } = useGetCurrentLoginUserQuery();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      localStorage.removeItem("userInfo");
      router.push("/account/login");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const UserDropdown = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
      <div className="py-2">
        <Link 
          href={currentLoginUser?.role.isClient ? "/dashboard/client/account-setting" : "/dashboard/watchdog/account-settings"}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <GoGear className="mr-2" size={18} />
          Account Settings
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <PiSignOut className="mr-2" size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  const AuthenticatedActions = () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaBell className="text-gray-600" size={20} />
          {/* Notification count badge */}
          {currentLoginUser?.notifications?.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {currentLoginUser.notifications.length}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
            <Notification 
              setShowNotifications={setShowNotifications} 
              notifications={currentLoginUser?.notifications || []}
            />
         )} 
      </div>

      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center focus:outline-none"
        >
          <Image 
            src="/profile-image.png" 
            width={40} 
            height={40} 
            alt="Profile" 
            className="rounded-full"
          />
        </button>
        {showDropdown && <UserDropdown />}
      </div>
      
      {currentLoginUser?.role.isClient && (
        <button 
          onClick={() => router.push("/dashboard/client/post-job")}
          className="hidden md:block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Post a Job
        </button>
      )}
    </div>
  );

  return (
    <header className="w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/logo.png" 
              width={140} 
              height={40} 
              alt="Logo"
              className="h-8 w-auto sm:h-10" 
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {currentLoginUser ? (
              <AuthenticatedActions />
            ) : (
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  href="/account/login"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/account/signup"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                {label}
              </Link>
            ))}
            {!currentLoginUser && (
              <div className="flex flex-col gap-2 px-3 pt-2">
                <Link
                  href="/account/login"
                  className="block w-full text-center px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/account/signup"
                  className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;