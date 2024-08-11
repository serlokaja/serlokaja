"use client";
import Link from "next/link";
import Image from "next/image";
import register from "../assets/register.png";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormRegister() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    telp: "",
    password: "",
  });

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, telp, password } = formData;
    const isPencari = pathname === "/register/pencari";
    const registerUrl = process.env.NEXT_PUBLIC_URL_SERVER + (isPencari ? "/api/auth/users/register" : "/api/auth/providers/register");
    const loginPath = isPencari ? "/login/pencari" : "/login/pemilik";

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

      return router.push(pathname === "/register/pencari" ? `/register/pencari?error=${status.message}` : `/register/pemilik?error=${status.message}`);
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
      return router.push(loginPath);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="bg-gray-100 text-gray-900 flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg flex flex-col lg:flex-row justify-center w-full max-w-4xl p-5 lg:p-10">
          <div className="lg:w-1/2 xl:w-5/12 sm:p-6">
            <h2 className="text-3xl font-semibold text-center lg:text-left mb-6">
              {pathname === "/register/pencari"
                ? "Register Sebagai Pencari Kost"
                : "Register Sebagai Pemilik Kost"}
            </h2>
            <form onSubmit={handleRegister} className="w-full">
              <div className="flex flex-col mb-6">
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full mt-2 px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="flex flex-col mb-6">
                <label className="text-sm font-medium text-gray-700" htmlFor="telp">
                  Kontak
                </label>
                <input
                  className="w-full mt-2 px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                  type="text"
                  id="telp"
                  name="telp"
                  onChange={handleChange}
                  placeholder="Kontak Anda"
                  required
                />
              </div>
              <div className="flex flex-col mb-6">
                <label className="text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full mt-2 px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 focus:bg-white"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              {isLoading ? (
                <button
                  type="submit"
                  className="text-center w-full py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md transition duration-300 ease-in-out hover:bg-blue-700"
                >
                  Loading...
                </button>
              ) : (
                <button
                  className="text-center w-full py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md transition duration-300 ease-in-out hover:bg-blue-700"
                  type="submit"
                >
                  Daftar
                </button>
              )}
            </form>
            <p className="text-sm text-gray-600 text-center mt-6">
              Sudah punya akun?{" "}
              <Link
                href={
                  pathname === "/register/pencari"
                    ? "/login/pencari"
                    : "/login/pemilik"
                }
                className="text-blue-600 font-bold hover:underline"
              >
                Masuk
              </Link>
            </p>
          </div>
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <Image
              src={register}
              alt="Registration Image"
              className="object-cover rounded-lg h-full max-h-[600px] w-full"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
