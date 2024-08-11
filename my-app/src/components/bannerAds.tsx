import Image from "next/image";
import adsen from "../assets/adsen.png"
export default function BannerAds() {
  return (
    <div className="bg-white flex justify-center items-center rounded-lg mt-5">
      <div className="flex flex-col md:flex-row justify-start items-center">
        <div className="flex justify-start md:ml-5">
          <Image src={adsen} alt="adsen" className="object-cover rounded-lg h-56 w-96" />
        </div>
        <div className="flex-1 p-4">
          <h2 className="text-2xl font-bold text-black">
            Daftarkan Properti Anda di SERLOK AJA
          </h2>
          <p className="text-lg text-black">
            Berbagai fitur dan layanan untuk meningkatkan bisnis properti Anda
          </p>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}
