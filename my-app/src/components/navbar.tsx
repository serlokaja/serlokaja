"use client";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Logout } from "@/app/action";

export default function NavbarProduct({
  isLogin,
  placeholder,
}: {
  isLogin?: boolean;
  placeholder?: string;
}) {
  const pathname = usePathname();
  
  const [dropdownOpenCariApa, setDropdownOpenCariApa] = useState(false);
  const [dropdownOpenMasuk, setDropdownOpenMasuk] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRefCariApa = useRef<HTMLLIElement>(null);
  const dropdownRefMasuk = useRef<HTMLLIElement>(null);

  const toggleDropdownCariApa = () => {
    setDropdownOpenCariApa(!dropdownOpenCariApa);
  };

  const toggleDropdownMasuk = () => {
    setDropdownOpenMasuk(!dropdownOpenMasuk);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleClickOutside = (event: any) => {
    if (
      dropdownRefCariApa.current &&
      !dropdownRefCariApa.current.contains(event.target)
    ) {
      setDropdownOpenCariApa(false);
    }
    if (
      dropdownRefMasuk.current &&
      !dropdownRefMasuk.current.contains(event.target)
    ) {
      setDropdownOpenMasuk(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="hidden lg:flex lg:items-center lg:justify-between lg:px-5 lg:py-3 lg:border-b lg:border-gray-200 bg-white sticky top-0 z-50">
        <div className="logo flex items-center">
          <Image src={logo} alt="Kosyuk logo" width={35} height={35} />
          <Link href="/">
            <h1 className="text-2xl text-black font-sans font-bold ml-2">
              SERLOK AJA
            </h1>
          </Link>
        </div>
        <div className="nav-right flex items-center space-x-4 md:space-x-6 lg:space-x-8">
          <form className="relative">
            <input
              className="border border-gray-400 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:border-blue-500 focus:ring-0"
              type="search"
              name="search"
              placeholder={placeholder || "Masukkan lokasi..."}
            />
            <button type="button" className="absolute right-0 top-0 mt-2 mr-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.5 11.5A5.5 5.5 0 1111 16.5 5.5 0 0116.5 11.5z" />
              </svg>
            </button>
          </form>
          <ul className="flex flex-wrap gap-5 text-black font-sans font-semibold items-center">
            <li className="relative" ref={dropdownRefCariApa}>
              <a
                className="cursor-pointer hover:text-blue-700 font-bold"
                onClick={toggleDropdownCariApa}
              >
                Cari Apa?
              </a>
              {dropdownOpenCariApa && (
                <ul className="dropdown-menu absolute top-full left-0 mt-2 bg-white shadow-lg py-2 w-56 rounded-md z-50">
                  <li className="hover:bg-gray-100">
                    <Link href="/kontrakan" className="block px-4 py-2 font-bold">
                      Kontrakan
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100">
                    <Link href="/tempat-usaha" className="block px-4 py-2 font-bold">
                      Tempat Usaha
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {isLogin && (
              <li className="hover:text-blue-700 font-bold">
                <Link href="/riwayat-pengajuan">Riwayat Pengajuan</Link>
              </li>
            )}
            <li className="hover:text-blue-700 font-bold">
              <a href="#">Pusat Bantuan</a>
            </li>
            <li className="hover:text-blue-700 font-bold">
              <a href="#">Syarat dan Ketentuan</a>
            </li>
            {isLogin ? (
              <button
                onClick={() => {
                  localStorage.removeItem('pathname');
                  Logout();
                }}
                className="hover:text-blue-700 font-bold"
              >
                Keluar
              </button>
            ) : (
              <li className="relative" ref={dropdownRefMasuk}>
                <a
                  className="cursor-pointer hover:text-blue-700 font-bold"
                  onClick={toggleDropdownMasuk}
                >
                  Masuk
                </a>
                {dropdownOpenMasuk && (
                  <ul className="dropdown-menu absolute top-full right-0 mt-2 bg-white shadow-lg py-2 w-56 rounded-md z-50">
                    <li className="hover:bg-gray-100">
                      <Link href="/login/pencari" className="block px-4 py-2 font-bold">
                        Pencari
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100">
                      <Link href="/login/pemilik" className="block px-4 py-2 font-bold">
                        Pemilik
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="logo flex items-center">
          <Image src={logo} alt="Kosyuk logo" width={35} height={35} />
          <Link href="/">
            <h1 className="text-2xl text-black font-sans font-bold ml-2">
              SERLOK AJA
            </h1>
          </Link>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="text-gray-600 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-40">
          <div className="w-64 h-full bg-white p-4">
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="logo flex items-center mb-4 border-b">
              <Image src={logo} alt="Kosyuk logo" width={35} height={35} />
              <Link href="/">
                <h1 className="text-2xl text-black font-sans font-bold ml-2">
                  SERLOK AJA
                </h1>
              </Link>
            </div>
            <ul className="flex flex-col space-y-4">
              <li className="relative" ref={dropdownRefCariApa}>
                <a
                  className="cursor-pointer text-blue-700 font-bold"
                  onClick={toggleDropdownCariApa}
                >
                  Cari Apa?
                </a>
                {dropdownOpenCariApa && (
                  <ul className="dropdown-menu mt-2 bg-white shadow-lg py-2 w-full rounded-md z-50">
                    <li className="text-blue-700  ">
                      <Link href="/kontrakan" className="block px-4 py-2 font-bold">
                        Kontrakan
                      </Link>
                    </li>
                    <li className="text-blue-700">
                      <Link href="/tempat-usaha" className="block px-4 py-2 font-bold">
                        Tempat Usaha
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {isLogin && (
                <li className="text-blue-700 font-bold">
                  <Link href="/riwayat-pengajuan">Riwayat Pengajuan</Link>
                </li>
              )}
              <li className="text-blue-700 font-bold">
                <a href="#">Pusat Bantuan</a>
              </li>
              <li className="text-blue-700 font-bold">
                <a href="#">Syarat dan Ketentuan</a>
              </li>
              {isLogin ? (
                <button
                  onClick={() => {
                    localStorage.removeItem('pathname');
                    Logout();
                  }}
                  className="text-blue-700 font-bold"
                >
                  Keluar
                </button>
              ) : (
                <li className="relative" ref={dropdownRefMasuk}>
                  <a
                    className="cursor-pointer text-blue-700 font-bold"
                    onClick={toggleDropdownMasuk}
                  >
                    Masuk
                  </a>
                  {dropdownOpenMasuk && (
                    <ul className="dropdown-menu mt-2 bg-white shadow-lg py-2 w-full rounded-md z-50">
                      <li className="text-blue-700">
                        <Link href="/login/pencari" className="block px-4 py-2 font-bold">
                          Pencari
                        </Link>
                      </li>
                      <li className="text-blue-700">
                        <Link href="/login/pemilik" className="block px-4 py-2 font-bold">
                          Pemilik
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

