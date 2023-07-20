import { getProducts } from "@/api/products";
import OrderSheet from "@/components/order-sheet";
import ProductItem from "@/components/product-item";

export default async function StaffScreen() {
  const data = await getProducts();

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex justify-between">
        <h2 className=" pb-2 text-2xl font-semibold tracking-tight transition-colors">
          Our menu
        </h2>
        <OrderSheet />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((item: any) => (
          <ProductItem key={item.Id} {...item} />
        ))}
      </div>
    </div>
  );
}
