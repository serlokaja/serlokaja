"use client";
import FormDetailProperti from "@/components/formDetailProperty";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPropertiPemilik({
  params,
}: {
  params: { slug: string };
}) {


  
  const { slug } = params
  
  return (
    <>
      <FormDetailProperti slug={slug}/>
    </>
  );
}
