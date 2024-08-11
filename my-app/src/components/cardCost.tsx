"use client";

import Link from "next/link";
import Image from "next/image";
import { GiRoundStar } from "react-icons/gi";

export default function CardKost({ kosts }: { kosts: any }) {

  const kecStartIndex = kosts.alamat.indexOf("Kec.");
  let kecText = "";

  if (kecStartIndex !== -1) {
    kecText = kosts.alamat
      .slice(kecStartIndex)
      .split(",")[0]
      .replace("Kec. ", "");
  }

  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-500 hover:shadow-2xl flex flex-col mt-5">
      <Link href={`/products/${kosts.slug}`}>
        <a>
          <Image
            src={kosts?.thumbnail || "/placeholder.jpg"}
            className="w-full h-48 object-cover"
            alt={kosts.nama}
            width={500}
            height={300}
          />
        </a>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <button className="text-white bg-blue-500 hover:bg-blue-600 font-semibold py-1 px-3 rounded-lg border border-transparent">
            {kosts.type}
          </button>
          <div className="flex items-center">
            <GiRoundStar className="text-orange-500" />
            <span className="text-orange-500 font-semibold">0</span>
          </div>
        </div>
        <h1 className="text-lg font-semibold text-black mb-1">{kosts.nama}</h1>
        <p className="text-gray-600 text-sm mb-2 whitespace-nowrap overflow-hidden text-ellipsis">{kecText}</p>
        <p className="text-gray-500 text-xs mb-2 whitespace-nowrap overflow-hidden text-ellipsis">{kosts.fasilitas.join(", ")}</p>
        <h2 className="text-xl font-bold text-black">Rp. {kosts.harga.toLocaleString("id-ID")}</h2>
      </div>
    </div>
  );
}
