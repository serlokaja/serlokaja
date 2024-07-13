import Image from "next/image";
import Logo from "../assets/logo.png";
export default function HeroProfileWeb() {
  return (
    <section className="bg-cover bg-slate-100 bg-center h-96 w-full flex items-center justify-center font-sans">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-black">
          SERLOK AJA : Teman setia pencarianmu!
        </h1>
        <p className="text-xl text-black mb-8">
        Temukan ribuan pilihan Tempat Usaha atau Kontrakan di seluruh Indonesia bersama <span className="font-bold text-blue-600 ">SERLOK AJA</span>
        </p>
        <div className="flex items-center justify-center">
          <Image src={Logo} alt="Kosyuk logo" width={90} height={90} />
        </div>
        <h1 className="text-2xl text-black font-sans font-bold">SERLOK AJA</h1>
      </div>
    </section>
  );
}
