'use client'
import { isLoginCek } from "@/app/action";
import ContentDetailKontrakan from "@/components/contentDetailKontrakan";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

export default function KontrakanDetail({ params }: { params: { slug: string } }) {
  
  const [isLogin, setIsLogin] = useState(false);
  const [currentImage, setCurrentImage] = useState([]);
  const [images, setImages] = useState([]);
  const [kontrakan, setKontrakan] = useState([]);

  const fetchKontrakan = async () => {
    const slug = params.slug;
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + `/api/buildings/users/${slug}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    setCurrentImage(data.images[0].image_url);
    setImages(data.images);
    setKontrakan(data)
  };


  useEffect(() => {
    fetchKontrakan();
    const isLogin = async () => {
      const isLogin = await isLoginCek();
      setIsLogin(isLogin);
    }
    isLogin();
  }, [params.slug]);
      
    return (
        <>
            <div className="flex flex-wrap mb-3 mt-5 w-11/12 m-auto">
                <ContentDetailKontrakan kontrakan={kontrakan} isLogin={isLogin} images={images} currentImage={currentImage} setCurrentImage={setCurrentImage}/>
            </div>
            <Footer />
        </>
    )
}