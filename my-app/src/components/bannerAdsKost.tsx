import adsImageTwo from "../assets/bg-adsen.png";

export default function BannerAdsKost() {
  return (
    <div
      className="relative flex justify-center items-center mt-5"
      style={{
        height: '300px',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${adsImageTwo.src})`,
          opacity: 0.8,
          zIndex: 1,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
        }}
      />
      <div className="relative flex-1 p-4 text-center z-10 bg-opacity-0 bg-white ">
        <h2 className="text-2xl font-bold text-black mb-3">
          Hemat Waktu dengan Aplikasi Pencari Tempat Usaha atau Kontrakan Terbaik!
        </h2>
        <p className="text-base text-black">
          Tidak punya waktu untuk berkeliling mencari Tempat Usaha atau Kontrakan? <span className="text-blue-600 font-bold font-sans">SERLOK AJA</span> hadir untuk membantumu. Dengan fitur pencarian yang mudah dan cepat, kamu bisa menemukan Tempat Usaha atau Kontrakan yang sesuai dengan kebutuhanmu tanpa harus keluar rumah. nikmati kemudahannya!
        </p>
      </div>
    </div>
  );
}
