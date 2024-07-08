"use client";
import CardPengajuan from "@/components/cardPengajuan";
import Footer from "@/components/footer";
import Skeleton from "@/components/skeleton";
import { useState, useEffect } from "react";
import ImageNoData from "../../../assets/noData.png"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RiwayatPengajuan() {
  const [loading, setLoading] = useState(true);
  let data : any = []
  const [dataPengajuan, setDataPengajuan] = useState(data);

  const router = useRouter();

  const fetchRiwayatPengajuan = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_URL_SERVER + '/api/bookings', { cache: 'no-store', })
    const data  = await response.json()
    
    if(data.message == 'Unauthorzied / Auth timeout') {
      return router.push('/login/pencari')
    }

    if(data) {
      setLoading(false)
    }
    setDataPengajuan(data)
  }

  useEffect(() => {
    fetchRiwayatPengajuan();
  }, []);

  return (
    <>
      <div className="flex flex-wrap mb-5 w-11/12 m-auto">
        {loading ? (
            Array.from({ length: 8 }).map((_ : any, index : number) => <Skeleton key={index} />)
        ) : dataPengajuan.length === 0 ? (
            <div className="flex flex-col justify-center items-center text-center text-black font-semi-bold h-full py-36 mx-auto">
            <Image
            src={ImageNoData}
            className="rounded-md w-[295px] h-48 object-cover"
            alt="Carousel Item"
            width={500}
            height={500}
          />
          </div>
        ) : (
            <>
            {/* <BannerAdsKost /> */}
            {dataPengajuan.map((riwayat: any, index : any) => (
            <CardPengajuan key={index} property={riwayat} />
          ))}
            </>
        )}
      </div>
      <Footer />
    </>
  );
}
