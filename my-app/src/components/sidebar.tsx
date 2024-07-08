"use client";
import { MdHomeWork } from "react-icons/md";
import { FaSwatchbook } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { usePathname } from "next/navigation";
import logo from "../assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { Logout } from "@/app/action";

export default function Sidebar() { 
  const pathname = usePathname();

  const getMenuItemClass = (path: any) => {
    return path.includes(pathname) ? 'bg-blue-600 text-white' : 'text-black hover:bg-blue-600 hover:text-white';
  };

  const getIconClass = (path: any) => {
    return path.includes(pathname) ? 'text-white' : 'text-black group-hover:text-white';
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center border-r">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 h-screen bg-white text-base-content">
        <div className="logo flex items-center mb-4 border-b w-full">
          <Image src={logo} alt="Kosyuk logo" width={35} height={35} className="mb-4" />
          <Link href="/dashboard-pemilik">
            <h1 className="text-2xl text-black font-sans font-bold ml-2 mb-4">
              SERLOK AJA
            </h1>
          </Link>
        </div>
          <li>
            <a href="/properti-saya" className={`flex items-center font-bold text-base group mb-1 ${getMenuItemClass(['/properti-saya'])}`}>
              <MdHomeWork className={`w-5 h-5 ${getIconClass(['/properti-saya'])}`} />
              Properti Saya
            </a>
          </li>
          <li>
            <a href="/manajemen-properti/pengajuan-sewa" className={`flex items-center font-bold text-base group mb-1 ${getMenuItemClass(['/manajemen-properti/pengajuan-sewa', '/manajemen-properti/penyewa'])}`}>
              <FaSwatchbook className={`w-5 h-5 ${getIconClass(['/manajemen-properti/pengajuan-sewa', '/manajemen-properti/penyewa'])}`} />
              Manajemen Properti
            </a>
          </li>
          {/* <li>
            <a href="/profil" className={`flex items-center font-bold text-base group mb-1 ${getMenuItemClass(['/profil'])}`}>
              <FaUser className={`w-5 h-5 ${getIconClass(['/profil'])}`} />
              Profil
            </a>
          </li> */}
          <li>
            <button onClick={() => Logout()} className={`flex items-center font-bold text-base group ${getMenuItemClass(['/logout'])}`}>
              <IoLogOut className={`w-5 h-5 ${getIconClass(['/logout'])}`} />
              Keluar
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
