"use client";

import Image from "next/image";

interface ProductItemProps {
  Id: number;
  Name: string;
  CategoryName: string;
  UnitPrice: number;
  ImageUrl: string;
}

export default function ProductItem({
  Id,
  Name,
  CategoryName,
  UnitPrice,
  ImageUrl,
}: ProductItemProps) {
  return (
    <div key={Id} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          alt={Name}
          src={ImageUrl}
          width={250}
          height={250}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <button
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-black/20 bg-opacity-0 text-white py-2 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out cursor-pointer"
        onClick={() => console.log(Id)}
      >
        Add to Cart
      </button>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {Name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{CategoryName}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{UnitPrice}</p>
      </div>
    </div>
  );
}
