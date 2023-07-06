import { Checkbox } from "@/components/ui/checkbox";

export default function AddProductForm() {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h1 className="text-3xl font-semibold mb-8">Create new product</h1>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Product name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Type product name"
              />
            </div>

            {/* Unit in stock */}
            <div>
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Units In Stock
              </label>
              <input
                type="text"
                name="quantity"
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Product quantity"
              />
            </div>

            {/* Unit Price */}
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="$2999"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
              >
                <option>Select category</option>
                <option value="Juice">Juice</option>
                <option value="Coffee">Coffee</option>
                <option value="Beverage">Beverage</option>
                <option value="Sweet">Sweet</option>
              </select>
            </div>

            {/* Signature */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is Signature
              </label>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Your description here"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-8 text-sm font-medium text-center text-white bg-gray-700 rounded-md"
          >
            Add product
          </button>
        </form>
      </div>
    </section>
  );
}
