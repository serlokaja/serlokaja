"use client";
import Link from "next/link";
import login from "../assets/login.png";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function FormLogin() {
  const pathname = usePathname();
  const router = useRouter();

  const [isloading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const urlLocalStorage = localStorage.getItem('pathname');
  const string : any = ""
  const [urlLocalStorage, setUrlLocalStorage] = useState(string)
  useEffect(()=>{
    setUrlLocalStorage(localStorage.getItem('pathname'))
  },[])
  

  const handleLogin = async (e : any) => {
    e.preventDefault();
    setIsLoading(true);
    
    const email = formData.email;
    const password = formData.password;

    const url = pathname === "/login/pencari"
      ? "/api/auth/users/login"
      : "/api/auth/providers/login";

    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const result = await response.json();


    if (!response.ok) {
      toast.error("Email / Password salah!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return router.push(pathname === "/login/pencari" ? `/login/pencari?error=${result.message}` : `/login/pemilik?error=${result.message}`);
    }

    if (urlLocalStorage){
      router.push(urlLocalStorage);
      localStorage.removeItem('pathname');
      router.refresh();
      return;
    }else{
      router.push(pathname === "/login/pencari" ? "/" : "/dashboard-pemilik");
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
      <div className="bg-gray-100 text-gray-900 flex justify-center">
        <div className="bg-white shadow flex justify-center flex-1">
          <div className="lg:w-1/2 mt-20 xl:w-5/12 sm:p-12">
            <h2 className="text-2xl font-bold">
              {pathname === "/login/pencari"
                ? "Login Sebagai Pencari Kost : "
                : "Login Sebagai Pemilik Kost : "}{" "}
            </h2>
            <div className="flex flex-col items-center">
              <form onSubmit={handleLogin} className="w-full flex-1 mt-8">
                <div className="flex flex-col mb-4">
                  <label className="text-sm text-gray-600" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full mt-2 px-8 py-4 rounded-lg font-medium bg-slate-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-slate-100 focus:bg-white appearance-none"
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="text-sm text-gray-600" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full mt-2 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
                {isloading ? (
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
                    Masuk
                  </button>
                )}
              </form>
              <p className="text-sm text-gray-600 text-center">
                Belum punya akun?{" "}
                <Link
                  href={
                    pathname === "/login/pencari"
                      ? "/register/pencari"
                      : "/register/pemilik"
                  }
                  className="hover:text-blue-600 font-bold"
                >
                  Daftar
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden mt-5 mb-10 lg:flex lg:w-1/2 items-center justify-center">
            <Image
              src={login}
              alt="Registration Image"
              className="object-cover rounded-lg h-[600px]"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
