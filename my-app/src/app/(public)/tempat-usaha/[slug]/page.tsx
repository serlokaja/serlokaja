"use client";
import { isLoginCek } from "@/app/action";
import ContentDetailKost from "@/components/contentDetailKost";
import Footer from "@/components/footer";
import SkeletonDetail from "@/components/skeletonDetail";
import { useEffect, useState } from "react";

export default function KostanDetail({ params }: { params: { slug: string } }) {
  const [kosts, setKosts] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  const [images, setImages] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getKosts = async () => {
    const slug = params.slug;
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + `/api/buildings/users/${slug}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    setCurrentImage(data.images[0].image_url);
    setImages(data.images);
    setKosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getKosts();
    const isLogin = async () => {
      const isLogin = await isLoginCek();
      setIsLogin(isLogin);
    };
    isLogin();
  }, [params.slug]);

  return (
    <>
      <div className="flex flex-wrap mb-3 mt-5 w-11/12 m-auto">
          <ContentDetailKost
            kosts={kosts}
            isLogin={isLogin}
            images={images}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
      </div>
      <Footer />
    </>
  );
}
