"use client";
import { useState, useEffect } from "react";
import ImageNoData from "../../../assets/noDataProperti.png";
import Image from "next/image";
import CardPropertiPemilik from "@/components/cardPropertiPemilik";
import SkeletonPemilik from "@/components/skeletonPemilik";
import Link from "next/link";
import { BsFillHouseAddFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function PropertiSaya() {
  const [loading, setLoading] = useState(true);
  const [propertiSaya, setDataPropertiSaya] = useState([]);
  const router = useRouter();

  const fetchProperty = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + "/api/buildings/providers",
      { cache: "no-store" }
    );
    const data = await response.json();

    if (data) {
      setLoading(false);
    }

    if (data.message == "Unauthorzied / Auth timeout") {
      return router.push("/login/pemilik");
    }

    setDataPropertiSaya(data);
  };

  const handleDel = async (slug: string) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + "/api/buildings/providers",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
        }),
      }
    );
    if (response.ok) {
      fetchProperty();
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <>
      <div className="flex w-[1090px] border-b border-gray-300 fixed top-0 z-10 ml-2 mb-24 bg-white justify-center items-center">
        <h3 className="font-bold text-black mt-5 mb-8 text-center">
          DASHBOARD PEMILIK PROPERTI{" "}
          <span className="text-blue-600">SERLOK AJA</span>
        </h3>
      </div>

      <div className="flex w-[1090px] border-b border-t border-gray-300 fixed top-[67px] z-10 ml-2 mb-20 bg-white ">
        <h3 className="font-bold text-black mt-3 mb-2 ml-9 ">PROPERTI SAYA</h3>
        <Link
          href="/tambah-properti"
          className="text-blue-600 flex font-semibold ml-auto mt-3 mb-2 mr-14"
        >
          <BsFillHouseAddFill className="h-5 w-5 mr-1" />
          Tambah Properti
        </Link>
      </div>
      <div className="flex flex-wrap mb-5 w-11/12 m-auto mt-24">
        {loading ? (
          Array.from({ length: 4 }).map((_ : any, index : number) => (
            <SkeletonPemilik key={index} />
          ))
        ) : propertiSaya.length === 0 ? (
          <div className="flex flex-col justify-center items-center text-center text-black font-semi-bold h-full py-48 mx-auto">
            <Image
              src={ImageNoData}
              className="rounded-md w-[300px] h-52 object-cover"
              alt="Carousel Item"
              width={500}
              height={500}
            />
          </div>
        ) : (
          <>
            {propertiSaya?.map((properti: any, index: any) => (
              <CardPropertiPemilik
                key={index}
                property={properti}
                handleDel={handleDel}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
