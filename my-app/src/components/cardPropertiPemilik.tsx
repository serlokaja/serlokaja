"use client";

import Image from "next/image";
import Link from "next/link";

export default function CardPropertiPemilik({ property, handleDel }: { property : any, handleDel : any }) {
  const getStatusColor = (status: any) => {
    switch (status) {
      case "Tersedia":
        return "text-green-500";
      case "Penuh":
        return "text-red-500";
      default:
        return "text-black";
    }
  };
  
  return (
    <div className="card card-side bg-slate-100 shadow-xl w-full mt-5">
      <figure className="w-48 h-48 overflow-hidden">
        <Image
          src={property?.thumbnail}
          alt="Property Image"
          width={200}
          height={192}
          className="w-64 h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl text-black font-bold">
          {property?.nama}
        </h2>
        <p className={`text-black`}>{property?.alamat}</p>
        <p
          className={`text-black font-bold ${getStatusColor(property?.status)}`}
        >
          {property?.status}
        </p>
        <div className="card-actions justify-end">
              <Link href={`/properti-saya/${property?.slug}`} className="bg-blue-600 text-white py-1 px-3 rounded-lg font-bold hover:bg-blue-500">
                Detail
              </Link>
              <button onClick={() =>handleDel(property?.slug)} className="bg-red-600 text-white py-1 px-3 rounded-lg font-bold hover:bg-red-500">
                Hapus
              </button>
        </div>
      </div>
    </div>
  );
}
