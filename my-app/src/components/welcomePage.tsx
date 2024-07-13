import Image from "next/image";
import Logo from "../assets/logo.png";
import BackGround from "../assets/bg.png"

export default function WelcomePage() {
  return (
    <section 
      className="bg-cover bg-center h-screen w-full flex items-center justify-center font-sans -mt-10" 
    >
      <div className="text-center bg-white bg-opacity-80 p-10 rounded-lg" style={{ 
        backgroundImage: `url(${BackGround.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <h1 className="text-4xl font-bold mb-4 text-black">
        Dapatkan Penyewa Lebih Cepat dengan <span className="font-bold text-blue-600">SERLOK AJA</span>
        </h1>
        <p className="text-base text-black mb-3">
        Masih mencari cara efektif untuk memasarkan properti Anda? SERLOK AJA solusinya! Daftarkan properti Anda dan temukan penyewa lebih cepat. Proses pendaftaran mudah dan gratis!
        </p>
        
        <p className="mt-5 text-black">
          Ayo{" "}
          <a
            href="/tambah-properti"
            className="font-bold bg-blue-600 text-white border border-blue-600 p-1 rounded inline-block"
          >
            Daftarkan
          </a>{" "}
          properti anda sekarang
        </p>
        <div className="flex items-center justify-center mt-10">
          <Image src={Logo} alt="Kosyuk logo" width={150} height={150} />
        </div>
        <h1 className="text-4xl text-black font-sans font-bold">SERLOK AJA</h1>
      </div>
    </section>
  );
}
