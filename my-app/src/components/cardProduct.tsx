"use client";

import Link from "next/link";
import Image from "next/image";
export default function CardProduct({ product } : { product : any}) {

  return (
    <>
      <div className="card bg-white px-1 w-1/4 relative overflow-hidden transform transition-transform duration-500 hover:shadow-lg flex flex-col mt-5">
        <Link href="{`/products/${product.slug}`}">
          <Image
          className="rounded-md" 
            src={product?.thumbnail}
            alt="Air Jordan Legacy 312 Low Shoes"
            width={592}
            height={592}
          />
          {/* <Image src={product?.thumbnail} alt="Shoes" className="rounded-md" /> */}
        </Link>
        <div className="flex-1 relative">
          <div className="mb-2 mt-3 ml-1 text-black">
            <h2
              className="font-sans font-bold text-base antialiased leading-relaxed"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {product?.name}
            </h2>
            <p
              className="text-sm text-gray-400"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {product?.excerpt}
            </p>
            <p className="text-sm font-semibold">
              Rp. {product?.price?.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
