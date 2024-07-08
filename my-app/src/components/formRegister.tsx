import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import register from "../assets/register.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function FormRegister() {
  const pathname = usePathname();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    telp: "",
    password: "",
  });

  const [isLoading, setIsloading] = useState(false);

  async function handleRegister() {
    setIsloading(true);
    const { email, telp, password } = formData;
    const isPencari = pathname === "/register/pencari";
    const registerUrl = process.env.NEXT_PUBLIC_URL_SERVER + (isPencari ? "/api/auth/users/register" : "/api/auth/providers/register");
    const loginPath = isPencari ? "/login/pencari" : "/login/pemilik";
    const registerPath = isPencari ? "/register/pencari" : "/register/pemilik";
  
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, telp, password }),
    });
    
    const status = await response.json();
  
    if (!response.ok) {
      toast.error("User sudah terdaftar!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return router.push(`${registerPath}?error=${status.message}`);
    }
  
    if (response.ok) {
      toast.success("Pendaftaran Berhasil!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  
    return router.push(loginPath);
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
    <div className="bg-gray-100 text-gray-900 flex justify-center">
      <div className="bg-white shadow flex justify-center flex-1">
        <div className="hidden mt-5 mb-10 lg:flex lg:w-1/2 items-center justify-center">
          <Image
            src={register}
            alt="Registration Image"
            className="object-cover rounded-lg h-[600px]"
          />
        </div>
        <div className="lg:w-1/2 xl:w-5/12 sm:p-12 mt-12">
          <h2 className="text-2xl font-bold">
            {pathname === "/register/pencari"
              ? "Register Sebagai Pencari Kost : "
              : "Register Sebagai Pemilik Kost : "}
          </h2>
          <div className="flex flex-col items-center">
            <form action={handleRegister} className="w-full flex-1 mt-8">
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2 text-gray-600" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email Anda"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm mb-2 text-gray-600" htmlFor="kontak">
                  Kontak
                </label>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="kontak"
                  id="telp"
                  name="telp"
                  onChange={handleChange}
                  placeholder="Kontak Anda"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  className="text-sm mb-2 text-gray-600"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password Anda"
                />
              </div>
              {isLoading ? (
                  <button
                    type="submit"
                    className="text-center mt-10 mb-5 w-full max-w-full font-bold shadow-sm rounded-lg py-3 bg-blue-600 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  >
                    <span className="ml-1 text-white">Loading...</span>
                  </button>
                ) : (
                  <button
                    className="text-center mt-10 mb-5 w-full max-w-full font-bold shadow-sm rounded-lg py-3 bg-blue-600 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    type="submit"
                  >
                    Daftar
                  </button>
                )}
            </form>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Sudah Punya Akun?{" "}
              <Link
                href={
                  pathname === "/register/pencari"
                    ? "/login/pencari"
                    : "/login/pemilik"
                }
                className="hover:text-blue-600 font-bold"
              >
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}
