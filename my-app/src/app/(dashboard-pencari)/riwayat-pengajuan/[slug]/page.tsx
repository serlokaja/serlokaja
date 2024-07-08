"use client";
import { isLoginCek } from "@/app/action";
import ContentDetailRiwayatPengajuan from "@/components/contentDetailRiwayatPengajuan";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailRiwayatPengajuan({ params }: { params: { slug: string } }) {
  const [riwayatPengajuan, setRiwayatPengajuan] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  const [images, setImages] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const fetchBookingBuilding = async () => {
    const slug = params.slug;
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + `/api/bookings/${slug}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    console.log(data);
    

    if(data.message == 'Unauthorzied / Auth timeout') {
      return router.push('/login/pencari')
    }

    setCurrentImage(data.images[0].image_url);
    setImages(data.images);
    setRiwayatPengajuan(data)
  };

  useEffect(() => {
    fetchBookingBuilding();
    const isLogin = async () => {
      const isLogin = await isLoginCek();
      setIsLogin(isLogin);
    }
    isLogin();
  }, [params.slug]);


  return (
    <>
      <div className="flex flex-wrap mb-3 mt-5 w-11/12 m-auto">
        <ContentDetailRiwayatPengajuan property={riwayatPengajuan} isLogin={isLogin} images={images} currentImage={currentImage} setCurrentImage={setCurrentImage} />
      </div>
      <Footer />
    </>
  );
}
