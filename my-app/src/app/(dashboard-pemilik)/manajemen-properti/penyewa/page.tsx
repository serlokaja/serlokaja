"use client";
import { useState, useEffect } from "react";
import ImageNoData from "../../../../assets/noPenyewa.png";
import Image from "next/image";
import SkeletonPemilik from "@/components/skeletonPemilik";
import Menu from "@/components/menu";
import CardManajemenProperti from "@/components/cardManajemenProperti";
import { useRouter } from "next/navigation";


export default function Penyewa() {
  const [loading, setLoading] = useState(true);
  let data : any = []
  const [penyewa, setPenyewa] = useState(data);
  const router = useRouter();

  const fetchPenyewa = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_URL_SERVER + '/api/bookings?status=Disetujui', { cache: 'no-store', })
    const data  = await response.json()
    
    if (data.message == "Unauthorzied / Auth timeout") {
      return router.push("/login/pemilik");
    }

    if(data) {
      setLoading(false)
    }
    setPenyewa(data)
  }

  const [dataPengajuan, setDataPengajuan] = useState(data);

  const fetchRiwayatPengajuan = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_URL_SERVER + '/api/bookings?status=Menunggu', { cache: 'no-store', })
    const data  = await response.json()

    
    if (data.message == "Unauthorzied / Auth timeout") {
      return router.push("/login/pemilik");
    }

    if(data) {
      setLoading(false)
    }
    setDataPengajuan(data)
  }

  useEffect(() => {
    fetchPenyewa();
    fetchRiwayatPengajuan();
  }, []);

  return (
    <>
      <Menu pengajuan={dataPengajuan} penyewa={penyewa}/>
      <div className="flex flex-wrap mb-5 w-11/12 m-auto mt-28">
        {loading ? (
          Array.from({ length: 4 }).map((_ : any, index : number) => (
            <SkeletonPemilik key={index} />
          ))
        ) : penyewa.length === 0 ? (
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
            {penyewa.map((riwayat : any, index: any) => (
              <CardManajemenProperti key={index} property={riwayat} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
