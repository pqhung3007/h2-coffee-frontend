import { getProducts } from "@/api/products";
import Image from "next/image";

export default async function StaffScreen() {
  const data = await getProducts();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Our menu
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((item: any) => (
          <div key={item.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <Image
                alt={item.Name}
                src={item.ImageUrl}
                width={250}
                height={250}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={item.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.Name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.CategoryName}
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  +
                </button>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  -
                </button>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {item.UnitPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
