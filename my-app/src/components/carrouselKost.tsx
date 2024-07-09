import Image from "next/image";
import Link from "next/link";
import { GiRoundStar } from "react-icons/gi";

export default function CarrouselKost({ kosts }: { kosts: any }) {
  return (
    <div className="pt-10 pb-10">
      <div className="flex justify-between text-black pb-3">
        <h1 className="text-xl font-sans font-bold">Ruko/Tempat Usaha Terlaris :</h1>
        <Link
          href="/tempat-usaha"
          className="text-sm text-gray-500 mr-2 hover:text-black"
        >
          View all ❯
        </Link>
      </div>
      <div className="carousel w-full overflow-x-auto space-x-4 bg-white rounded-md flex">
        {kosts?.map((value: any, index: number) => {
          const kecStartIndex = value.alamat.indexOf("Kec.");
          let kecText = "";

          if (kecStartIndex !== -1) {
            kecText = value.alamat
              .slice(kecStartIndex)
              .split(",")[0]
              .replace("Kec. ", "");
          }

          return (
            <div
              key={index}
              className="carousel-item flex-shrink-0 flex-col bg-white rounded-md w-72"
            >
              <Link href={`/tempat-usaha/${value.slug}`}>
                <Image
                  src={value.thumbnail}
                  className="rounded-md w-full h-48 object-cover"
                  alt="Carousel Item"
                  width={500}
                  height={500}
                />
                <div className="mt-2 mb-5">
                  <div className="flex items-center">
                    <button className="flex items-center justify-center text-black font-semibold py-0 px-1 mt-1 mb-2 rounded-lg border border-gray-300">
                      {value.kategori}
                    </button>
                    <GiRoundStar className="m-2 w-4 h-4 text-blue-600" />
                    <span className="text-blue-600">0</span>
                  </div>
                  <h1 className="font-sans text-black">{value.nama}</h1>
                  <h1 className="font-sans text-black font-semibold text-justify overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[300px]">
                    {kecText}
                  </h1>
                  <h1 className="font-sans text-gray-400 text-xs text-justify overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[300px]">
                    {value.fasilitas.join(", ")}
                  </h1>
                  <h1 className="font-sans text-lg font-semibold text-black">
                    Rp. {value.harga.toLocaleString("id-ID")}
                  </h1>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
