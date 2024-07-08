import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function ModalPengajuan({ id }: { id: any }) {
  const [form, setForm] = useState({
    duration: "",
    date: "",
    building_id: "",
  });
const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  localStorage.setItem('pathname', pathname);
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      building_id: id,
    }));
  }, [id]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + "/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( form ),
      }
    );

    if (response.ok) {
      setForm({
        duration: "",
        date: "",
        building_id: "",
      });

      toast.success('Pengajuan sewa berhasil!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      closeModal();
      setIsLoading(false);
    } else {
      toast.error('Pengajuan sewa gagal!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    (document.getElementById("my_modal_1") as HTMLDialogElement)?.close();
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <h3 className=" py-3 font-bold text-lg text-black">
            Form Pengajuan Sewa
          </h3>
          <form method="dialog" action={handleSubmit}>
            {/* <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nama"
              >
                Nama<span className="text-red-500">*</span>
              </label>
              <input
                id="nama"
                name="nama"
                type="text"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-100"
                placeholder="Masukkan Nama"
                required
              />
            </div> */}
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="duration"
              >
                Durasi
              </label>
              <select
                id="duration"
                name="duration"
                onChange={handleChange}
                value={form.duration}
                className="select select-bordered shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-100"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Pilih Durasi
                </option>
                <option value="1">1 Bulan</option>
                <option value="3">3 Bulan</option>
                <option value="6">6 Bulan</option>
                <option value="12">12 bulan</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="date"
              >
                Tanggal Masuk <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                name="date"
                onChange={handleChange}
                type="date"
                value={form.date}
                placeholder="Pilih Tanggal Masuk"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-100"
                required
              />
            </div>
            <div className="modal-action">
              {isLoading ? (
              <button
                type="submit"
                className="p-2 px-4 rounded-md bg-blue-600 text-white transition-colors duration-300 ease-in-out hover:bg-blue-500"
              >
                Loading...
              </button>
              ) : (
              <button
                type="submit"
                className="p-2 px-4 rounded-md bg-blue-600 text-white transition-colors duration-300 ease-in-out hover:bg-blue-500 w-28"
              >
                Ajukan
              </button>
              )}

              <button
                type="button"
                onClick={closeModal}
                className="p-2 px-4 rounded-md bg-orange-600 text-white transition-colors duration-300 ease-in-out hover:bg-orange-500"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}
