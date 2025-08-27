"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

const images = [
  "/images/img_1.webp",
  "/images/img_2.webp",
  "/images/img_3.webp",
  "/images/img_4.png",
  "/images/img_5.webp",
  "/images/img_6.webp",
  "/images/img_7.webp",
];

export default function ImageCarousel() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 16, // gap between slides
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider px-2">
      {images.map((src, index) => (
        <div
          className="keen-slider__slide aspect-video relative overflow-hidden rounded-xl cursor-pointer"
          key={index}
        >
          <Image
            src={src}
            alt={`Slide ${index}`}
            fill
            className="object-cover "
            sizes="(min-width: 1024px) 50vw, 50vw"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
