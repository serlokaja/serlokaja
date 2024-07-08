# SHARELOK AJA

### MVP :
-
-
-
-
-

## 1. Carrousel Kost

Menampilkan data list kost:

![Tampilan](./assets/carrousel_kost.png)

Response (200 - OK)

```json
[
    {
      "nama": "Kost Merpati",
      "slug": "Kost-Merpati",
      "alamat": "Jl. Merpati No. 12, Jakarta",
      "thumbnail": "https://i.pinimg.com/564x/39/54/03/3954034532271e8ef96cadaf23c911ef.jpg",
      "fasilitas": ["WiFi", "AC", "Kamar Mandi Dalam", "Dapur Bersama"],
      "images": [
                "https://i.pinimg.com/564x/25/ca/b1/25cab1173dd014d9760158d8e8f50ab7.jpg",
                "https://loremflickr.com/400/400/nightlife",
                "https://loremflickr.com/400/400/food",
                "https://loremflickr.com/400/400/transport",
                "https://loremflickr.com/400/400/food"
              ],
      "type" : "Putri",
      "harga": 1500000
    },
    {
      "nama": "Kost Cendrawasih",
      "slug": "Kost Cendrawasih",
      "alamat": "Jl. Cendrawasih No. 45, Bandung",
      "thumbnail": "https://i.pinimg.com/564x/6f/66/f7/6f66f782f4b4fb3fab18ce2f6d3e3857.jpg",
      "fasilitas": ["WiFi", "AC", "Lemari", "Meja Belajar"],
      "images": [
            "https://i.pinimg.com/564x/43/c1/5f/43c15ffede1e6be7d387c489658db6af.jpg"
      ],
      "type" : "Putra",
      "harga": 1200000
    }, ...
]
```

## 2. Carrousel Kontrakan

Menampilkan data Kontrakan:

![Tampilan](./assets/carrousel_kontrakan.png)

Response (200 - OK)

```json
[
        {
          "nama": "Kontrakan Merpati",
          "alamat": "Jl. Merpati No. 12, Jakarta",
          "slug": "Kontrakan-Merpati",
          "thumbnail": "https://i.pinimg.com/564x/16/bd/c1/16bdc1dd3ade930defa40f7a34a0102c.jpg",
          "fasilitas": ["WiFi", "AC", "Kamar Mandi Dalam", "Dapur Bersama"],
          "type" : "Rumah/Kontrakan",
          "harga": 1500000
        },
        {
          "nama": "Kontrakan Cendrawasih",
          "alamat": "Jl. Cendrawasih No. 45, Bandung",
          "slug": "Kontrakan-Cendrawasih",
          "thumbnail": "https://i.pinimg.com/564x/43/1e/1b/431e1b125907a895be3016107fe687c8.jpg",
          "fasilitas": ["WiFi", "AC", "Lemari", "Meja Belajar"],
          "type" : "Rumah/Kontrakan",
          "harga": 1200000
        }, ...
]
```

## 3. Halaman Kost

Menampilkan data Kost keseluruhan :

![Tampilan](./assets/halaman_kost.png)

Response (200 - OK)

```json
[
    {
      "nama": "Kost Merpati",
      "slug": "Kost-Merpati",
      "alamat": "Jl. Merpati No. 12, Jakarta",
      "thumbnail": "https://i.pinimg.com/564x/39/54/03/3954034532271e8ef96cadaf23c911ef.jpg",
      "fasilitas": ["WiFi", "AC", "Kamar Mandi Dalam", "Dapur Bersama"],
      "images": [
                "https://i.pinimg.com/564x/25/ca/b1/25cab1173dd014d9760158d8e8f50ab7.jpg",
                "https://loremflickr.com/400/400/nightlife",
                "https://loremflickr.com/400/400/food",
                "https://loremflickr.com/400/400/transport",
                "https://loremflickr.com/400/400/food"
              ],
      "type" : "Putri",
      "harga": 1500000
    },
    {
      "nama": "Kost Cendrawasih",
      "slug": "Kost Cendrawasih",
      "alamat": "Jl. Cendrawasih No. 45, Bandung",
      "thumbnail": "https://i.pinimg.com/564x/6f/66/f7/6f66f782f4b4fb3fab18ce2f6d3e3857.jpg",
      "fasilitas": ["WiFi", "AC", "Lemari", "Meja Belajar"],
      "images": [
            "https://i.pinimg.com/564x/43/c1/5f/43c15ffede1e6be7d387c489658db6af.jpg"
      ],
      "type" : "Putra",
      "harga": 1200000
    }, ...
]
```

## 4. Halaman Detail Kost

Menampilkan data detail Kost:

![Tampilan](./assets/detail_kost.png)

Response (200 - OK)

```json
{
          "nama": "Kost Merpati",
          "slug": "Kost-Merpati",
          "status": "Tersedia",
          "description": "deskripsi",
          "alamat": "Jl. Merpati No. 12, Jakarta",
          "thumbnail": "https://i.pinimg.com/564x/39/54/03/3954034532271e8ef96cadaf23c911ef.jpg",
          "fasilitas": ["WiFi", "AC", "Kamar Mandi Dalam", "Dapur Bersama"],
          "images": [
                    "https://i.pinimg.com/564x/39/54/03/3954034532271e8ef96cadaf23c911ef.jpg",
                    "https://i.pinimg.com/564x/3a/95/0b/3a950baf9e56a99a4fe369784ff6e412.jpg",
                    "https://i.pinimg.com/564x/46/0d/3b/460d3b851b7a3647daac96ef141a0326.jpg",
                    "https://i.pinimg.com/564x/25/ca/b1/25cab1173dd014d9760158d8e8f50ab7.jpg",
                   
                  ],
          "type" : "Cewek",
          "harga": 1500000
        }
```

## 5. Halaman Kontrakan

Menampilkan data Kontrakan Keseluruhan :

![Tampilan](./assets/halaman_kontrakan.png)

Response (200 - OK)

```json
[
        {
          "nama": "Kontrakan Merpati",
          "alamat": "Jl. Merpati No. 12, Jakarta",
          "slug": "Kontrakan-Merpati",
          "thumbnail": "https://i.pinimg.com/564x/16/bd/c1/16bdc1dd3ade930defa40f7a34a0102c.jpg",
          "fasilitas": ["WiFi", "AC", "Kamar Mandi Dalam", "Dapur Bersama"],
          "type" : "Rumah/Kontrakan",
          "harga": 1500000
        },
        {
          "nama": "Kontrakan Cendrawasih",
          "alamat": "Jl. Cendrawasih No. 45, Bandung",
          "slug": "Kontrakan-Cendrawasih",
          "thumbnail": "https://i.pinimg.com/564x/43/1e/1b/431e1b125907a895be3016107fe687c8.jpg",
          "fasilitas": ["WiFi", "AC", "Lemari", "Meja Belajar"],
          "type" : "Rumah/Kontrakan",
          "harga": 1200000
        }, ...
]
```

## 6. Halaman Detail Kontrakan

Menampilkan data detail Kontrakan:

![Tampilan](./assets/detail_kontrakan.png)

Response (200 - OK)

```json
{
          "nama": "Kontrakan Merpati",
          "slug": "Kontrakan-Merpati",
          "status": "Tersedia",
          "description": "Deskripsi",
          "alamat": "Jl. Merpati No. 12, Jakarta",
          "thumbnail": "https://i.pinimg.com/564x/16/bd/c1/16bdc1dd3ade930defa40f7a34a0102c.jpg",
          "fasilitas": ["WiFi", "AC"],
          "spesifikasi" : [],
          "peraturan" : [],
          "images": [
                    "https://i.pinimg.com/564x/16/bd/c1/16bdc1dd3ade930defa40f7a34a0102c.jpg",
                    "https://i.pinimg.com/564x/3a/95/0b/3a950baf9e56a99a4fe369784ff6e412.jpg",
                    "https://i.pinimg.com/564x/46/0d/3b/460d3b851b7a3647daac96ef141a0326.jpg",
                    "https://i.pinimg.com/564x/25/ca/b1/25cab1173dd014d9760158d8e8f50ab7.jpg",
                   
                  ],
          "type" : "Kontrakan/Rumah",
          "kontak" : "08987654321",
          "harga": 1500000
}
```

## 7. Halaman Riwayat Pengajuan

Menampilkan data Riwayat Pengajuan:

![Tampilan](./assets/riwayat_pengajuan.png)

Response (200 - OK)

```json
[
        {
          "nama": "Kost Merpati",
          "slug": "Kost-Merpati",
          "alamat": "Jl. Merpati No. 12, Jakarta",
          "thumbnail":
            "https://i.pinimg.com/564x/39/54/03/3954034532271e8ef96cadaf23c911ef.jpg",
          "fasilitas": ["WiFi", "AC", "Kamar Mandi Dalam", "Dapur Bersama"],
          "status": "Tersedia",
          "images": [
            "https://i.pinimg.com/564x/25/ca/b1/25cab1173dd014d9760158d8e8f50ab7.jpg",
            "https://loremflickr.com/400/400/nightlife",
            "https://loremflickr.com/400/400/food",
            "https://loremflickr.com/400/400/transport",
            "https://loremflickr.com/400/400/food",
          ],
          "type": "Cewek",
          "statusPengajuan": "Menunggu",
          "harga": 1500000,
        },
        {
          "nama": "Kost Merpati",
          "slug": "Kost-Merpati",
          "alamat": "Jl. Merpati No. 12, Jakarta",
          "thumbnail":
            "https://i.pinimg.com/564x/39/54/03/3954034532271e8ef96cadaf23c911ef.jpg",
          "fasilitas": ["WiFi", "AC", "Kamar Mandi Dalam", "Dapur Bersama"],
          "status": "Tersedia",
          "images": [
            "https://i.pinimg.com/564x/25/ca/b1/25cab1173dd014d9760158d8e8f50ab7.jpg",
            "https://loremflickr.com/400/400/nightlife",
            "https://loremflickr.com/400/400/food",
            "https://loremflickr.com/400/400/transport",
            "https://loremflickr.com/400/400/food",
          ],
          "type": "Cewek",
          "statusPengajuan": "Disetujui",
          "harga": 1500000,
        },
        {
          "nama": "Kontrakan Merpati",
          "slug": "Kontrakan-Merpati",
          "status": "Penuh",
          "description":
            "Aksesoris / dekorasi pada foto kamar hanya untuk keperluan fotografi. Fasilitas yang akan didapatkan sesuai dengan informasi fasilitas pada detail iklan. Warna sprei yang akan disediakan tidak sama dengan warna sprei pada foto",
          "alamat": "Jl. Merpati No. 12, Jakarta",
          "thumbnail":
            "https://i.pinimg.com/564x/16/bd/c1/16bdc1dd3ade930defa40f7a34a0102c.jpg",
          "fasilitas": ["WiFi", "AC"],
          "spesifikasi": [],
          "peraturan": [],
          "images": [
            "https://i.pinimg.com/564x/16/bd/c1/16bdc1dd3ade930defa40f7a34a0102c.jpg",
            "https://i.pinimg.com/564x/3a/95/0b/3a950baf9e56a99a4fe369784ff6e412.jpg",
            "https://i.pinimg.com/564x/46/0d/3b/460d3b851b7a3647daac96ef141a0326.jpg",
            "https://i.pinimg.com/564x/25/ca/b1/25cab1173dd014d9760158d8e8f50ab7.jpg",
          ],
          "type": "Kontrakan/Rumah",
          "kontak": "08987654321",
          "statusPengajuan": "Tidak Disetujui",
          "harga": 1500000,
        }, ...
      ]
```

## 8. Halaman Detail Riwayat Pengajuan

Menampilkan data detail Riwayat Pengajuan:

![Tampilan](./assets/detail_riwayat.png)

Response (200 - OK)

```json
{
      nama: "Kontrakan Merpati",
      slug: "Kontrakan-Merpati",
      status: "Tersedia",
      description: "Deskription",
      alamat: "Jl. Merpati No. 12, Jakarta",
      thumbnail:
        "https://i.pinimg.com/564x/16/bd/c1/16bdc1dd3ade930defa40f7a34a0102c.jpg",
      fasilitas: ["WiFi", "AC"],
      spesifikasi: [],
      peraturan: [],
      images: [
        "https://i.pinimg.com/564x/16/bd/c1/16bdc1dd3ade930defa40f7a34a0102c.jpg",
        "https://i.pinimg.com/564x/3a/95/0b/3a950baf9e56a99a4fe369784ff6e412.jpg",
        "https://i.pinimg.com/564x/46/0d/3b/460d3b851b7a3647daac96ef141a0326.jpg",
        "https://i.pinimg.com/564x/25/ca/b1/25cab1173dd014d9760158d8e8f50ab7.jpg",
      ],
      type: "Kontrakan/Rumah",
      kontak: "08987654321",
      statusPengajuan: "Disetujui",
      harga: 1500000,
    }
```
