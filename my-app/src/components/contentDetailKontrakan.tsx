import DetailImage from "./detailImage";
import { GiRoundStar } from "react-icons/gi";
import ModalPengajuan from "./modalPengajuan";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";


export default function ContentDetailKontrakan({ kontrakan, isLogin, images, currentImage, setCurrentImage } : {kontrakan: any, isLogin: boolean, images: any, currentImage: any, setCurrentImage: any}) {
  const router = useRouter();
  
  const openModal = () => {
    if (!isLogin) {
      router.push("/login/pencari");
      return;
    }
    (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="bg-white py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <DetailImage imageBuilding={images} currentImage={currentImage} setCurrentImage={setCurrentImage} />
          <div className="md:flex-1 px-4 flex flex-col justify-between relative text-black">
            <div>
              <h2 className="text-2xl font-bold text-black">
                {kontrakan?.nama}
              </h2>
              <div className="flex mb-2">
                <div className="mr-4">
                  <div className="flex items-center mt-2">
                    <button className="flex items-center justify-center text-black font-semibold py-0 px-1 mt-1 mb-2 mr-2 rounded-lg border border-gray-300">
                      {kontrakan?.status}
                    </button>
                    <GiRoundStar className={`m-2 w-4 h-4 text-blue-600`} />{" "}
                    <span className="text-blue-600 mr-2">0</span>{" "}
                    <span>{kontrakan?.alamat}</span>
                  </div>
                </div>
              </div>

              <span className="font-bold">Spesifikasi :</span>
              <p className="text-sm mt-2 mb-2 text-justify">
              {kontrakan.spesifikasi?.length > 0
                  ? kontrakan.spesifikasi
                      .map((fasilitas: any) => fasilitas.specification_name)
                      .join(", ")
                  : "-"}
              </p>

              <span className="font-bold">Fasilitas :</span>
              <p className="text-sm mt-2 mb-2 text-justify">
              {kontrakan.fasilitas?.length > 0
                  ? kontrakan.fasilitas
                      .map((fasilitas: any) => fasilitas.facility_name)
                      .join(", ")
                  : "-"}
              </p>

              <span className="font-bold">Peraturan :</span>
              <p className="text-sm mt-2 mb-2 text-justify">
              {kontrakan.peraturan?.length > 0
                  ? kontrakan.peraturan
                      .map((peraturan: any) => peraturan.rules_name)
                      .join(", ")
                  : "-"}
              </p>
              <div>
                <span className="font-bold">Deskripsi Kost:</span>
                <p className="text-sm mt-2 text-justify">
                  {kontrakan?.description}
                </p>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <div className="flex -mx-2 mb-2">
                    <div className="w-full px-2">
                      <span className="font-bold text-lg mb-4">
                        Rp. {kontrakan?.harga?.toLocaleString("id-ID")}
                      </span>
                      <span className="text-sm pb-4">/ Bulan</span>
                      <div className="flex space-x-2">
                        <button
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-500"
                          onClick={openModal}
                        >
                          Ajukan Sewa
                        </button>
                        <button
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-bold flex items-center justify-center hover:bg-green-500"
                          onClick={openModal}
                        >
                          <span>Hubungi Admin</span>
                          <FaWhatsapp className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalPengajuan id={kontrakan?.id}/>
    </div>
  );
}
