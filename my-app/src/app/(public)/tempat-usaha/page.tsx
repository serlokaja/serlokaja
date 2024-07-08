"use client";
import BannerAdsKost from "@/components/bannerAdsKost";
import CardProperty from "@/components/cardProperty";
import Footer from "@/components/footer";
import Skeleton from "@/components/skeleton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ImageNoData from "../../../assets/dataPropertiNotFound.png";
import Image from "next/image";

interface Kost {
  slug: string;
}

export default function Kostan() {
  const params = useSearchParams();
  const [kosts, setKosts] = useState<Kost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(params.get("search"));

  const getKosts = async () => {
    setLoading(true);
    let response;
    if (search) {
      response = await fetch(
        process.env.NEXT_PUBLIC_URL_SERVER +
          `/api/buildings/users?address=${search}&category=Ruko`,
        { cache: "no-store" }
      );
    } else {
      response = await fetch(
        process.env.NEXT_PUBLIC_URL_SERVER + "/api/carrousels?category=Ruko",
        { cache: "no-store" }
      );
    }
    const data = await response.json();
    console.log(data);
    
    setKosts(data);
    setLoading(false);
  };

  useEffect(() => {
    getKosts();
  }, [search]);

  return (
    <>
      <BannerAdsKost />
      <div className="flex flex-wrap mb-5 w-11/12 m-auto">
        {loading ? (
          Array.from({ length: 8 }).map((_ : any, index : number) => <Skeleton key={index} />)
        ) : kosts.length === 0 ? (
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
          kosts.map((kosts : any, index : number) => (
            <CardProperty
              key={index}
              property={kosts}
              Linkslug={`/tempat-usaha/${kosts?.slug}`}
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
}
