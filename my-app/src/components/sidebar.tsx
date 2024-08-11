"use client";
import { MdHomeWork } from "react-icons/md";
import { FaSwatchbook } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { usePathname } from "next/navigation";
import logo from "../assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { Logout } from "@/app/action";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMenuItemClass = (path: any) => {
    return path.includes(pathname) ? 'bg-blue-600 text-white' : 'text-black hover:bg-blue-600 hover:text-white';
  };

  const getIconClass = (path: any) => {
    return path.includes(pathname) ? 'text-white' : 'text-black group-hover:text-white';
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:h-full lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="logo flex items-center mb-4 border-b p-4">
          <Image src={logo} alt="Kosyuk logo" width={35} height={35} />
          <Link href="/dashboard-pemilik">
            <h1 className="text-2xl text-black font-sans font-bold ml-2">
              SERLOK AJA
            </h1>
          </Link>
        </div>
        <ul className="flex flex-col p-4">
          <li>
            <Link href="/properti-saya">
              <a className={`flex items-center font-bold text-base group mb-1 ${getMenuItemClass(['/properti-saya'])}`}>
                <MdHomeWork className={`w-5 h-5 ${getIconClass(['/properti-saya'])}`} />
                Properti Saya
              </a>
            </Link>
          </li>
          <li>
            <Link href="/manajemen-properti/pengajuan-sewa">
              <a className={`flex items-center font-bold text-base group mb-1 ${getMenuItemClass(['/manajemen-properti/pengajuan-sewa', '/manajemen-properti/penyewa'])}`}>
                <FaSwatchbook className={`w-5 h-5 ${getIconClass(['/manajemen-properti/pengajuan-sewa', '/manajemen-properti/penyewa'])}`} />
                Manajemen Properti
              </a>
            </Link>
          </li>
          {/* <li>
            <Link href="/profil">
              <a className={`flex items-center font-bold text-base group mb-1 ${getMenuItemClass(['/profil'])}`}>
                <FaUser className={`w-5 h-5 ${getIconClass(['/profil'])}`} />
                Profil
              </a>
            </Link>
          </li> */}
          <li>
            <button onClick={() => Logout()} className={`flex items-center font-bold text-base group ${getMenuItemClass(['/logout'])}`}>
              <IoLogOut className={`w-5 h-5 ${getIconClass(['/logout'])}`} />
              Keluar
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex flex-col h-screen">
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <Image src={logo} alt="Kosyuk logo" width={35} height={35} />
          <button onClick={() => setSidebarOpen(true)} className="text-black focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        {/* Sidebar Drawer */}
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-transform transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="w-64 h-full bg-white p-4">
            <div className="flex items-center mb-4 border-b">
              <Image src={logo} alt="Kosyuk logo" width={35} height={35} />
              <Link href="/dashboard-pemilik">
                <h1 className="text-2xl text-black font-sans font-bold ml-2">
                  SERLOK AJA
                </h1>
              </Link>
            </div>
            <ul className="flex flex-col">
              <li>
                <Link href="/properti-saya">
                  <a className={`flex items-center font-bold text-base group mb-1 ${getMenuItemClass(['/properti-saya'])}`}>
                    <MdHomeWork className={`w-5 h-5 ${getIconClass(['/properti-saya'])}`} />
                    Properti Saya
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/manajemen-properti/pengajuan-sewa">
                  <a className={`flex items-center font-bold text-base group mb-1 ${getMenuItemClass(['/manajemen-properti/pengajuan-sewa', '/manajemen-properti/penyewa'])}`}>
                    <FaSwatchbook className={`w-5 h-5 ${getIconClass(['/manajemen-properti/pengajuan-sewa', '/manajemen-properti/penyewa'])}`} />
                    Manajemen Properti
                  </a>
                </Link>
              </li>
              {/* <li>
                <Link href="/profil">
                  <a className={`flex items-center font-bold text-base group mb-1 ${getMenuItemClass(['/profil'])}`}>
                    <FaUser className={`w-5 h-5 ${getIconClass(['/profil'])}`} />
                    Profil
                  </a>
                </Link>
              </li> */}
              <li>
                <button onClick={() => Logout()} className={`flex items-center font-bold text-base group ${getMenuItemClass(['/logout'])}`}>
                  <IoLogOut className={`w-5 h-5 ${getIconClass(['/logout'])}`} />
                  Keluar
                </button>
              </li>
            </ul>
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="lg:pl-64 p-4">
        {/* Your main content goes here */}
      </main>
    </div>
  );
}
