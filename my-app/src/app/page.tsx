import CarrouselKost from "@/components/carrouselKost";
import CarrouselKontrakan from "@/components/carrouselKontrakan";
import Footer from "@/components/footer";
import Ads from "@/components/bannerAds";
import HeroProfileWeb from "@/components/heroProfileWeb";
import NavbarProduct from "@/components/navbar";
import {getCookies } from "next-client-cookies/server";
import BannerAds from "@/components/bannerAdsKost";
async function getDataKost() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/api/carrousels?category=Ruko`, { cache: 'no-store' });
  const data = await response.json();
  return data.slice(0, 6); 
}

async function getDataKontrakan() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER}/api/carrousels?category=Kontrakan`, { cache: 'no-store' });
  const data = await response.json();
  return data.slice(0, 6); 
}

export default async function Home() {
  const kosts = await getDataKost();
  const kontrakans = await getDataKontrakan();

  const { get, set } = getCookies();
  const token = get('Authorization');
  const isLogin = token ? true : false;

  return (  
    <>
      <NavbarProduct isLogin={isLogin} />
      <div className="w-11/12 m-auto">
        <Ads />
        <BannerAds />
        <CarrouselKost kosts={kosts} />
        <CarrouselKontrakan kontrakans={kontrakans} />
      </div>  
      <HeroProfileWeb />
      <Footer />
    </>
  );
}
