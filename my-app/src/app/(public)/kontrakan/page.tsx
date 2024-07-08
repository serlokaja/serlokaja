"use client";
import BannerAdsKost from "@/components/bannerAdsKost";
import CardProperty from "@/components/cardProperty";
import Footer from "@/components/footer";
import Skeleton from "@/components/skeleton";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ImageNoData from "../../../assets/dataPropertiNotFound.png"


interface Kontrakan {
  slug: string;
}

export default function Kontrakan() {
  const [kontrakans, setKontrakans] = useState<Kontrakan[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search"));

  const getKontrakan = async () => {
    setLoading(true);
    let response;
    if (search) {
      response = await fetch(
        process.env.NEXT_PUBLIC_URL_SERVER +
          `/api/buildings/users?address=${search}&category=Kontrakan`,
        { cache: "no-store" }
      );
    } else {
      response = await fetch(
        process.env.NEXT_PUBLIC_URL_SERVER +
          "/api/carrousels?category=Kontrakan",
        { cache: "no-store" }
      );
    }
    const data = await response.json();
    setKontrakans(data);
    setLoading(false);
  };

  useEffect(() => {
    getKontrakan();
  }, [search]);

  return (
    <>
      <BannerAdsKost />
      <div className="flex flex-wrap mb-5 w-11/12 m-auto">
        {loading ? (
          Array.from({ length: 8 }).map((_ : any, index : number) => <Skeleton key={index} />)
        ) : kontrakans.length === 0 ? (
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
          kontrakans.map((kontrakan, index) => (
            <CardProperty
              key={index}
              property={kontrakan}
              Linkslug={`/kontrakan/${kontrakan?.slug}`}
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
}
