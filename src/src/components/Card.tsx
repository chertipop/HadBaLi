"use client";

import Image from "next/image";
import { Rating } from "@mui/material";
import InteractiveCard from "./InteractiveCard";
import { useState } from "react";

export default function Card({
  carName,
  imgSrc,
  onRatingChange,
}: {
  carName: string;
  imgSrc: string;
  onRatingChange?: (carName: string, newValue: number | null) => void;
}) {
  const [value, setValue] = useState<number | null>(0);

  return (
    <InteractiveCard Element={carName}>
      <div className="w-[410px] h-[440px] bg-[#596176] rounded-lg shadow-lg flex flex-col items-center justify-between p-4">
        {/* White Inner Rectangle for Image */}
        <div className="w-[375px] h-[330px] bg-white rounded-md flex items-center justify-center overflow-hidden">
          <Image
            src={imgSrc}
            alt="Product Picture"
            width={370} 
            height={250}
            className="object-cover rounded-md"
          />
        </div>

        {/* Car Name & Rating */}
        <div className="text-white text-2xl font-bold text-left w-full px-3">
        {carName}
        </div>





        {/* Rating (Optional) */}
        {onRatingChange && (
          <div onClick={(e) => e.stopPropagation()} className="mt-2">
            <Rating
              id={`${carName} Rating`}
              name={`${carName} Rating`}
              data-testid={`${carName} Rating`}
              value={value}
              onChange={(event, newValue) => {
                event.stopPropagation();
                setValue(newValue);
                onRatingChange(carName, newValue);
              }}
            />
          </div>
        )}
      </div>
    </InteractiveCard>
  );
}
