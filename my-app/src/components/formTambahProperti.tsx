"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormStatus } from "react-dom";

export default function FormTambahProperti() {
  const router = useRouter();
  const { pending } = useFormStatus();

  let obj: any = {
    building_name: "",
    address: "",
    thumbnail: "",
    images: [],
    price: "",
    description: "",
    category: "",
    amount: 1,
    facility: [],
    rule: [],
    specification: [],
  };

  const [form, setForm] = useState(obj);
  let data: any = [];

  const [fasilitas, setFasilitas] = useState<string>("");
  const [kecamatan, setKecamatan] = useState<string>("");
  const [peraturan, setPeraturan] = useState<string>("");
  const [spesifikasi, setSpesifikasi] = useState<string>("");
  const [fasilitasPreview, setFasilitasPreview] = useState<string[]>([]);
  const [peraturanPreview, setPeraturanPreview] = useState<string[]>([]);
  const [spesifikasiPreview, setSpesifikasiPreview] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState(data);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const pathname = usePathname();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files) as any;
    setImagePreviews(files);
  };

  const handleRemoveImages = (index: any) => {
    const newImages = form.images.filter((_: any, i: any) => i !== index);
    const newPreviews = imagePreviews.filter((_: any, i: any) => i !== index);
    setImagePreviews(newPreviews);

    // Reset the file input value and update the label
    const fileInput = document.getElementById("images") as any;
    if (newImages.length === 0) {
      fileInput.value = null;
    } else {
      const dataTransfer = new DataTransfer();
      newImages.forEach((file: any) => dataTransfer.items.add(file));
      fileInput.files = dataTransfer.files;
    }
  };

  const handleAddFasilitas = (e: unknown) => {
    if (fasilitas && !fasilitasPreview.includes(fasilitas)) {
      setFasilitasPreview([...fasilitasPreview, fasilitas]);
      setFasilitas("");
    }
  };

  const handleRemoveFasilitas = (index: number) => {
    const newFasilitasPreview = fasilitasPreview.filter(
      (_: any, i: any) => i !== index
    );
    setFasilitasPreview(newFasilitasPreview);
  };

  const handleAddSpesifikasi = (e: unknown) => {
    if (spesifikasi && !spesifikasiPreview.includes(spesifikasi)) {
      setSpesifikasiPreview([...spesifikasiPreview, spesifikasi]);
      setSpesifikasi("");
    }
  };

  const handleRemoveSpesifikasi = (index: number) => {
    const newSpesifikasiPreview = spesifikasiPreview.filter(
      (_: any, i: any) => i !== index
    );
    setSpesifikasiPreview(newSpesifikasiPreview);
  };

  const handleThumbnailChange = (e: any) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      thumbnail: file,
    });
    setThumbnailPreview(URL.createObjectURL(file) as any);
  };

  const handleRemoveThumbnail = () => {
    setForm({
      ...form,
      thumbnail: null,
    });
    setThumbnailPreview(null);

    // Reset the file input value to null
    const fileInput = document.getElementById("thumbnail") as any;
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const handleAddPeraturan = (e: unknown) => {
    if (peraturan && !peraturanPreview.includes(peraturan)) {
      setPeraturanPreview([...peraturanPreview, peraturan]);
      setPeraturan("");
    }
  };

  const handleRemovePeraturan = (index: any) => {
    const newPeraturanPreview = peraturanPreview.filter(
      (_: any, i: any) => i !== index
    );
    setPeraturanPreview(newPeraturanPreview);
  };

  useEffect(() => {
    setForm({
      ...form,
      facility: fasilitasPreview,
      rule: peraturanPreview,
      specification: spesifikasiPreview,
      images: imagePreviews,
    });
  }, [fasilitasPreview, peraturanPreview, imagePreviews, spesifikasiPreview]);

  const [selectSpesifikasi, setSelectSpesifikasi] = useState<
    { id: number; specification_name: string }[]
  >([]);
  const [selectFasilitas, setSelectFasilitas] = useState<
    { id: number; facility_name: string }[]
  >([]);
  const [selectPeraturan, setSelectPeraturan] = useState<
    { id: number; rules_name: string }[]
  >([]);

  const fetchSpecification = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + "/api/buildings/specifications",
      { cache: "no-store" }
    );
    const data = await response.json();
    setSelectSpesifikasi(data);
  };

  const fetchFasilitas = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + "/api/buildings/facilities",
      { cache: "no-store" }
    );
    const data = await response.json();
    setSelectFasilitas(data);
  };

  const fetchPeraturan = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + "/api/buildings/rules",
      { cache: "no-store" }
    );
    const data = await response.json();
    setSelectPeraturan(data);
  };

  const fetchDetailProperty = async () => {
    console.log("fetchDetailProperty");
  };

  useEffect(() => {
    fetchSpecification();
    fetchFasilitas();
    fetchPeraturan();

    if (pathname !== "/tambah-properti") {
      fetchDetailProperty();
    }
  }, [pathname]);

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    let flagIsNotEmpty = false;
    // Logic to handle form
    for (const key in form) {
      if (
        key === "images" ||
        key === "facility" ||
        key === "rule" ||
        key === "specification"
      ) {
        for (const keys of form[key]) {
          if (keys == null || keys == undefined || keys == "")
            flagIsNotEmpty = true;
          formData.append(key, keys);
        }
      } else {
        if (form[key] == null || form[key] == undefined || form[key] == "")
          flagIsNotEmpty = true;
        if(key === "address"){
          formData.append(key, form[key] + ", " + kecamatan + ", Pekanbaru");
        }else{
          formData.append(key, form[key]);
        }
      }
    }

    if (flagIsNotEmpty) {
      toast.error("Semua kolom harus diisi!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false)
      return;
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_URL_SERVER + "/api/buildings/providers",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result.message == "Unauthorzied / Auth timeout") {
      return router.push("/login/pemilik");
    }
    

    if (response.ok) {
      toast.success("Property berhasil ditamabahkan!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/properti-saya");
    } else {
      toast.error("Property gagal ditambahkan!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false)
      router.push("/tambah-properti");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-black text-center mt-10">
        {pathname === "/tambah-properti"
          ? "Form Tambah Properti"
          : "Detail Properti"}
      </h2>

      <form className="relative pb-20">
        <div className="max-w-4xl mx-auto mt-1 grid grid-cols-2 gap-10 overflow-auto h-screen">
          <div className="col-span-1 mt-12">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="namaProperti"
              >
                Nama Properti<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="building_name"
                id="building_name"
                value={form.namaProperti}
                onChange={handleChange}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="alamat"
              >
                Alamat<span className="text-red-500">*</span> <span className="text-gray-500 font-semibold">(Jln Bahagia No.14)</span>
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={form.address}
                onChange={handleChange}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Kecamatan<span className="text-red-500">*</span>
              </label>
              <select
                name="kecamatan"
                id="kecamatan"
                value={kecamatan}
                onChange={(e : any) => setKecamatan(e.target.value)}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>
                  Pilih Kecamatan
                </option>
                <option value="Kec. Bina Widya">Bina Widya</option>
                <option value="Kec. Sail">Sail</option>
                <option value="Kec. Tenayan raya">Tenayan raya</option>
                <option value="Kec. Pekanbaru Kota">Pekanbaru Kota</option>
                <option value="Kec. Marpoyan Damai">Marpoyan Damai</option>
                <option value="Kec. Bukit Raya">Bukit Raya</option>
                <option value="Kec. Kulim">Kulim</option>
                <option value="Kec. Lima Puluh">Lima Puluh</option>
                <option value="Kec. Payung Sekaki">Payung Sekaki</option>
                <option value="Kec. Rumbai Barat">Rumbai Barat</option>
                <option value="Kec. Rumbai">Rumbai</option>
                <option value="Kec. Rumbai Timur">Rumbai Timur</option>
                <option value="Kec. Senapelan">Senapelan</option>
                <option value="Kec. Suka Jadi">Suka Jadi</option>
                <option value="Kec. Tuah Madani">Tuah Madani</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="thumbnail"
              >
                Gambar Cover<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                onChange={handleThumbnailChange}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-1.5 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {thumbnailPreview && (
                <div className="flex items-center space-x-2 mt-2">
                  <Image
                    src={thumbnailPreview}
                    className="h-10 w-10 object-cover rounded-md mr-2"
                    width={40}
                    height={40}
                    alt="Thumbnail Preview"
                  />
                  <div className="flex-grow flex justify-between items-center w-40">
                    <p className="text-sm text-gray-700">
                      {form.thumbnail.name}
                    </p>
                    <button
                      type="button"
                      onClick={handleRemoveThumbnail}
                      className="text-red-500 hover:text-red-700 mr-20"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="images"
              >
                Gambar Fasilitas<span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="images"
                id="images"
                multiple
                onChange={handleImageChange}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-1.5 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <div className="mt-4 space-y-2">
                {imagePreviews.map((src: any, index: any) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Image
                      src={URL.createObjectURL(src)}
                      alt={`Preview ${index}`}
                      className="h-10 w-10 object-cover rounded-md mr-2"
                      width={40}
                      height={40}
                    />
                    <div className="flex-grow flex justify-between items-center w-40">
                      <p className="text-sm text-gray-700">{src.name}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveImages(index)}
                        className="text-red-500 hover:text-red-700 mr-20"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="deskripsi"
              >
                Deskripsi<span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                value={form.deskripsi}
                onChange={handleChange}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[120px]"
                required
              ></textarea>
            </div>
          </div>

          <div className="col-span-1 mt-12">
            <div className="mb-4">
              <label
                htmlFor="kategori"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Kategori<span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                id="category"
                value={form.category}
                onChange={handleChange}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                // required
              >
                <option value="" disabled>
                  Pilih Kategori
                </option>
                <option value="Ruko">Ruko</option>
                <option value="Kontrakan">Kontrakan</option>
              </select>
            </div>

            {/* {form.category === "Kost" && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="amount"
                >
                  Jumlah Kamar (Kost)<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )} */}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Harga<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={form.price}
                onChange={handleChange}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {/* <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Type<span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                id="type"
                value={form.type}
                onChange={handleChange}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>
                  Pilih Type
                </option>
                <option value="Putra">Putra</option>
                <option value="Putri">Putri</option>
                <option value="Campur">Campur</option>
              </select>
            </div> */}

            <label
              htmlFor="peraturan"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Spesifikasi<span className="text-red-500">*</span>
            </label>

            <div className="mb-4 flex items-center">
              <select
                name="specification"
                id="specification"
                value={spesifikasi}
                onChange={(e) => setSpesifikasi(e.target.value)}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>
                  Pilih Spesifikasi
                </option>
                {selectSpesifikasi.map((spesifikasi: any) => (
                  <option key={spesifikasi.id} value={spesifikasi.id}>
                    {spesifikasi.specification_name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddSpesifikasi}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                Tambah
              </button>
            </div>
            {spesifikasiPreview.length > 0 && (
              <div className="mb-4">
                {spesifikasiPreview.map((spesifikasi: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full mb-2"
                  >
                    <p className="text-base text-gray-700 ml-2 font-semibold">
                      {
                        selectSpesifikasi.find((s: any) => s.id == spesifikasi)
                          ?.specification_name
                      }
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpesifikasi(index)}
                      className="text-red-500 hover:text-red-700 mr-20"
                    >
                      <FaMinusCircle />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label
              htmlFor="fasilitas"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Fasilitas<span className="text-red-500">*</span>
            </label>

            <div className="mb-4 flex items-center">
              <select
                name="facility"
                id="facility"
                value={fasilitas}
                onChange={(e) => setFasilitas(e.target.value)}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>
                  Pilih Fasilitas
                </option>
                {selectFasilitas.map((fasilitas: any) => (
                  <option key={fasilitas.id} value={fasilitas.id}>
                    {fasilitas.facility_name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddFasilitas}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
              >
                Tambah
              </button>
            </div>
            {fasilitasPreview.length > 0 && (
              <div className="mb-4">
                {fasilitasPreview.map((fasilitas: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full mb-2"
                  >
                    <p className="text-base text-gray-700 ml-2 font-semibold">
                      {
                        selectFasilitas.find((f: any) => f.id == fasilitas)
                          ?.facility_name
                      }
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemoveFasilitas(index)}
                      className="text-red-500 hover:text-red-700 mr-20"
                    >
                      <FaMinusCircle />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label
              htmlFor="peraturan"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Peraturan<span className="text-red-500">*</span>
            </label>

            <div className="mb-4 flex items-center">
              <select
                name="rule"
                id="rule"
                value={peraturan}
                onChange={(e) => setPeraturan(e.target.value)}
                className="bg-slate-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>
                  Pilih Peraturan
                </option>
                {selectPeraturan.map((peraturan: any) => (
                  <option key={peraturan.id} value={peraturan.id}>
                    {peraturan.rules_name}
                  </option>
                ))}
              </select>
              {pending ? (
                <button
                  type="button"
                  aria-disabled={pending}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                  <span className="ml-1 text-white">Loading...</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAddPeraturan}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                  Tambah
                </button>
              )}
            </div>
            {peraturanPreview.length > 0 && (
              <div className="mb-4">
                {peraturanPreview.map((peraturan: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full mb-2"
                  >
                    <p className="text-base text-gray-700 ml-2 font-semibold">
                      {
                        selectPeraturan.find((p: any) => p.id == peraturan)
                          ?.rules_name
                      }
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemovePeraturan(index)}
                      className="text-red-500 hover:text-red-700 mr-20"
                    >
                      <FaMinusCircle />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="fixed bottom-0 w-full max-w-screen-lg p-4 bg-white flex justify-end gap-2">
            {isLoading ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-56"
              disabled
            >
              Loading.....
            </button>

            ):(
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-56"
            >
              Tambah Properti
            </button>

            )}

            <Link
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-28"
              href="/properti-saya"
            >
              Kembali
            </Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
