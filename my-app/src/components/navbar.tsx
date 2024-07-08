"use client";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Logout } from "@/app/action";
// import path from "node:path/win32";

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

  const dropdownRefCariApa = useRef<HTMLLIElement>(null);
  const dropdownRefMasuk = useRef<HTMLLIElement>(null);

  const toggleDropdownCariApa = () => {
    setDropdownOpenCariApa(!dropdownOpenCariApa);
  };

  const toggleDropdownMasuk = () => {
    setDropdownOpenMasuk(!dropdownOpenMasuk);
  };

  const handleClickOutside = (event : any) => {
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
    <div className="navbar bg-white sticky top-0 z-50 flex justify-between px-5 border-b border-gray-200">
      {pathname == "/dashboard-pemilik" ||
      pathname == "/properti-saya" ||
      pathname == "/profil" ||
      pathname == "/manajemen-properti/pengajuan-sewa" ||
      pathname == "/manajemen-properti/penyewa" ? (
        <div className="logo flex items-center">
          <Image src={logo} alt="Kosyuk logo" width={35} height={35} />
          <Link href="/dashboard-pemilik">
            <h1 className="text-2xl text-black font-sans font-bold ml-2">
              SERLOK AJA
            </h1>
          </Link>
        </div>
      ) : (
        <>
          <div className="logo flex items-center">
            <Image src={logo} alt="Kosyuk logo" width={35} height={35} />
            <Link href="/">
              <h1 className="text-2xl text-black font-sans font-bold ml-2">
                SERLOK AJA
              </h1>
            </Link>
          </div>
          <div className="nav-right flex items-center">
            {pathname !== "/login/pencari" &&
              pathname !== "/login/pemilik" &&
              pathname !== "/register/pencari" &&
              pathname !== "/register/pemilik" &&
              pathname !== "/" && (
                <form className="mr-5">
                  <input
                    className="border border-gray-400 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:border-none"
                    type="search"
                    name="search"
                    placeholder="Masukkan lokasi..."
                  />
                  <button type="button"></button>
                </form>
              )}
            <ul className="flex flex-wrap gap-5 text-black font-sans font-semibold">
              <li className="relative" ref={dropdownRefCariApa}>
                <a
                  className="cursor-pointer hover:text-blue-700 font-bold"
                  onClick={toggleDropdownCariApa}
                >
                  Cari Apa?
                </a>
                {dropdownOpenCariApa && (
                  <ul className="dropdown-menu absolute top-10 bg-white shadow-md py-2 w-56 rounded-md">
                    <li className="hover:bg-gray-100">
                      <a
                        href="/kontrakan"
                        className="block px-4 py-2 font-bold"
                      >
                        Kontrakan
                      </a>
                    </li>
                    <li className="hover:bg-gray-100">
                      <a href="/tempat-usaha" className="block px-4 py-2 font-bold">
                        Tempat Usaha
                      </a>
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
                <a>Pusat Bantuan</a>
              </li>
              <li className="hover:text-blue-700 font-bold">
                <a>Syarat dan Ketentuan</a>
              </li>
              {isLogin ? (

                <button onClick={() => {
                  localStorage.removeItem('pathname')
                  Logout()
                }} className="hover:text-blue-700 font-bold">
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
                    <ul className="dropdown-menu absolute top-10 right-0 bg-white shadow-md py-2 w-56 rounded-md">
                      <li className="hover:bg-gray-100">
                        <a
                          href="/login/pencari"
                          className="block px-4 py-2 font-bold"
                        >
                          Pencari
                        </a>
                      </li>
                      <li className="hover:bg-gray-100">
                        <a
                          href="/login/pemilik"
                          className="block px-4 py-2 font-bold"
                        >
                          Pemilik
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
