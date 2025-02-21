"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBell } from "react-icons/fa6";
import { GoGear } from "react-icons/go";
import { PiSignOut } from "react-icons/pi";
import { useRouter } from "next/navigation";
import {
  useGetCurrentLoginUserQuery,
  useSignOutUserMutation,
} from "@/redux/reducers/user/userThunk";
import Notification from "../notification/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { MdDashboard } from "react-icons/md";

const navItems = [
  { href: "/about", label: "About us" },
  { href: "/Pricing", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [MenuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const router = useRouter();
  const [signOutUser] = useSignOutUserMutation();
  const { data: currentLoginUser } = useGetCurrentLoginUserQuery();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openSidebarMenu = () => {
    setMenuOpen(true);
  };

  const closeSidebarMenu = () => {
    setMenuOpen(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleNotification = () => {
    setShowNotifications((prev) => !prev);
  };

  const SignoutUser = async () => {
    try {
      await signOutUser();
      Cookies.remove("userInfo");
      Cookies.remove("userRole");
      Cookies.remove("accessToken");
      localStorage.removeItem("userInfo");
      toast.success("Logout successful", {
        position: "bottom-right",
        autoClose: 2000,
      });
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
          href={
            currentLoginUser?.role.isClient
              ? "/dashboard/client/overview"
              : currentLoginUser?.role.isWatchDog
              ? "/dashboard/watchdog/overview"
              : "/dashboard/admin/overview"
          }
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <MdDashboard className="mr-2" size={18} />
          Dashboard
        </Link>
        <Link
          href={
            currentLoginUser?.role.isClient
              ? "/dashboard/client/account-setting"
              : currentLoginUser?.role.isWatchDog
              ? "/dashboard/watchdog/account-settings"
              : "/dashboard/admin/account-setting"
          }
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <GoGear className="mr-2" size={18} />
          Account Settings
        </Link>
        <button
          onClick={SignoutUser}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <PiSignOut className="mr-2" size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="">
      <header className="w-full z-50 top-0 px-4 lg:px-6 xl:px-10 shadow-custom-shadow flex gap-5 justify-between items-center bg-white">
        <div>
          <Link href="/">
            <Image
              src="/logo.png"
              width={205}
              height={80}
              alt="Company Logo"
              className="object-contain w-[140px] h-[80px] lg:w-[205px] lg:h-[80]"
            />
          </Link>
        </div>

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

        <div className="flex items-center">
          {currentLoginUser ? (
            <div className="flex items-center gap-2">
              <div ref={notificationRef} className="relative">
                <FaBell
                  size={25}
                  color="green"
                  className="cursor-pointer"
                  onClick={handleNotification}
                />
                {showNotifications && (
                  <Notification
                    setShowNotifications={setShowNotifications}
                    notifications={currentLoginUser?.notifications || []}
                  />
                )}
              </div>

              <div ref={dropdownRef} className="relative inline-block">
                <Image
                  src="/profile-image.png"
                  width={40}
                  height={40}
                  alt="Profile Image"
                  className="cursor-pointer object-contain"
                  onClick={toggleDropdown}
                />
                {showDropdown && <UserDropdown />}
              </div>

              {currentLoginUser?.role.isClient && (
                <Link href="/dashboard/client/post-job">
                  <button className="hidden md:inline-block px-6 py-2 rounded-[10px] bg-secondary text-white hover:bg-primary">
                    Post a Job
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div className="hidden xl:flex gap-2">
              <Link href="/account/login">
                <button className="px-6 py-2 rounded-[10px] bg-primary text-white hover:bg-primary">
                  Login
                </button>
              </Link>
              <Link href="/account/signup">
                <button className="px-6 py-2 rounded-[10px] bg-secondary text-white hover:bg-primary">
                  SignUp
                </button>
              </Link>
            </div>
          )}

          <div className="lg:hidden">
            <FontAwesomeIcon
              icon={faBars}
              size={40}
              className="cursor-pointer"
              onClick={openSidebarMenu}
            />
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {MenuOpen && (
        <div className="w-3/5 z-10 md:w-2/5 max-h-svh lg:hidden fixed inset-0 bg-opacity-80 bg-black">
          <div className="relative">
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="xl"
              color="white"
              className="cursor-pointer absolute right-2 top-2"
              onClick={closeSidebarMenu}
            />
          </div>
          <nav className="z-10">
            <ul className="flex z-10 flex-col gap-3 p-6 text-white font-medium">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-secondary font-NotoSans text-[18px] leading-6"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <ToastContainer className="z-9999" />
    </div>
  );
};

export default Header;
