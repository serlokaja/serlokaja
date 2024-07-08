import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu({
  pengajuan,
  penyewa,
}: {
  pengajuan: any;
  penyewa: any;
}) {
  const pathname = usePathname();

  const getMenuItemClass = (path: any) => {
    return pathname === path
      ? "bg-blue-600 text-white"
      : "text-black hover:bg-blue-600 hover:text-white";
  };

  return (
    <>
      <div className="flex w-[1090px] border-b border-gray-300 fixed top-0 z-10 ml-2 mb-24 bg-white justify-center items-center">
        <h3 className="font-bold text-black mt-5 mb-8 text-center">
          DASHBOARD PEMILIK PROPERTI{" "}
          <span className="text-blue-600">SERLOK AJA</span>
        </h3>
      </div>

      <ul className="menu menu-horizontal flex w-[1090px] text-black bg-white border-b border-t border-slate-200 fixed  top-[67px] z-10 ml-2">
        <li className="flex-1 mr-2">
          <Link href="/manajemen-properti/pengajuan-sewa" legacyBehavior>
            <a
              className={`flex justify-center items-center w-full ${getMenuItemClass(
                "/manajemen-properti/pengajuan-sewa"
              )}`}
            >
              <p className="text-center text-base font-sans font-semibold">
                Pengajuan Sewa
              </p>
              <span className="font-bold text-base">{pengajuan?.length}</span>
            </a>
          </Link>
        </li>
        <li className="flex-1">
          <Link href="/manajemen-properti/penyewa" legacyBehavior>
            <a
              className={`flex justify-center items-center w-full ${getMenuItemClass(
                "/manajemen-properti/penyewa"
              )}`}
            >
              <p className="text-center text-base font-sans font-semibold">
                Penyewa
              </p>
              <span className="font-bold text-base">{penyewa?.length}</span>
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
}
