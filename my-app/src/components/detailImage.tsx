'use client'
import Image from "next/image";
import React, { useEffect } from "react";

export default function DetailImage({imageBuilding, currentImage , setCurrentImage} : {imageBuilding: any, currentImage : any, setCurrentImage : any}) {
    const handleImageClick = (image: string) => {
        setCurrentImage(image);
    };

    return (
        <div className="md:flex px-4">
        <div className="flex-mx-2">
            {imageBuilding?.map((image : any, index : number) => (

                <div key={index} className=" px-2">
                    <Image
                        className={`w-15 h-20 rounded-md object-cover cursor-pointer border-2 ${currentImage === image
                            ? "border-gray-300 dark:border-gray-600"
                            : "border-transparent"
                            }`}
                        src={image.image_url}
                        width={100}
                        height={100}
                        alt={`Product Image ${index + 1}`}
                        onClick={() => handleImageClick(image.image_url)}
                    />
                </div>
            ))}
        </div>
        <div className="h-[480px] w-[500px] rounded-lg dark:border-gray-600 bg-gray-300 dark:bg-gray-700 mb-4">
            <Image
                className="w-screen h-full rounded-md object-cover cursor-pointer"
                src={currentImage}
                alt="Product Image"
                width={1000}
                height={1000}
                onClick={() => handleImageClick(imageBuilding[0]?.image_url)}
            />
        </div>
    </div>
    )
}