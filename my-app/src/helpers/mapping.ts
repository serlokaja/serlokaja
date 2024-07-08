export const mappingBuildings = (data: any) => {

  let map = data.map((e: any) => {
    return {
      id: e.id,
      nama: e.building_name,
      alamat: e.address,
      slug: e.slug,
      thumbnail: e.thumbnail,
      images: e.images,
      fasilitas: e.facilities,
      type: e?.type ?? "campur",
      kategori: e.category,
      status: e.status,
      harga: e.price
    }
  })
  return map
}

export const mappingDetail = (data: any) => {
  return {
    id: data.id,
    nama: data.building_name,
    slug: data.slug,
    status: data.status,
    description: data.description,
    alamat: data.address,
    thumbnail: data.thumbnail,
    fasilitas: data.facilities,
    spesifikasi: data.specifications,
    peraturan: data.rules,
    images: data.images,
    type: data?.type ?? "campur",
    kategori: data.category,
    kontak: data.provider_telp,
    harga: data.price,
    amount: data.amount
  }
}

export const mappingBookings = (data: any) => {

  return data.map((e: any) => {
    return {
      id: e.id,
      nama: e.building_name,
      slug: e.bk_slug,
      alamat: e.address,
      date: e.date,
      thumbnail: e.thumbnail,
      email: e.email ?? "",
      fasilitas: e.facilities,
      status: e.status,
      images: e.images,
      type: e?.type ?? "campur",
      kategori: e.category,
      statusPengajuan: e.bk_status,
      harga: e.price,
      kontak: e.provider_telp ?? e.user_telp,
    }
  })
}

export const mappingDetailBook = (data: any) => {
  return {
    id: data.id,
    nama: data.building_name,
    slug: data.bk_slug,
    date: data.date,
    status: data.status,
    email: data.email ?? "",
    description: data.description,
    alamat: data.address,
    thumbnail: data.thumbnail,
    fasilitas: data.facilities,
    spesifikasi: data.specification,
    peraturan: data.rules,
    images: data.images,
    type: data?.type ?? "campur",
    kategori: data.category,
    kontak: data.provider_telp ?? data.user_telp,
    statusPengajuan: data.bookings[0],
    harga: data.price,
  }
}
