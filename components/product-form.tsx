"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import axios from "axios";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const categories = [
  { label: "Cà phê truyền thống", value: "1" },
  { label: "Cà phê máy", value: "2" },
  { label: "Trà sữa macchiato", value: "3" },
  { label: "Fruit Tea", value: "4" },
] as const;

const FormSchema = z.object({
  productName: z.string(),
  unitsInStock: z.string(),
  price: z.string(),
  category: z.string(),
  isSignature: z.boolean().default(false).optional(),
  imageUrl: z.string(),
  description: z.string().min(10),
});

export interface Product {
  Id: number;

  Name: string;
  Category: {
    Id: string;
    Name: string;
  };
  UnitsInStock: number;
  UnitPrice: number;
  CategoryId: number;
  IsSignature: boolean;
  ImageUrl: string;
  Description: string;
}

export default function ProductForm({
  title,
  id,
}: {
  title: string;
  id?: string;
}) {
  const isAddMode = !id;
  const { toast } = useToast();

  const router = useRouter();

  const { setValue, register } = useForm();

  const [product, setProduct] = useState<Product>({
    Id: 0,
    Name: "",
    Category: {
      Id: "",
      Name: "",
    },
    UnitsInStock: 0,
    UnitPrice: 0,
    CategoryId: 0,
    IsSignature: false,
    ImageUrl: "",
    Description: "",
  });

  useEffect(() => {
    if (!isAddMode) {
      const onGetProductById = async () => {
        const response = await axios.get(
          `https://localhost:7133/api/v1/Product/${id}`
        );
        if (response.status === 200) {
          const returnedProduct = response.data;

          setValue("productName", returnedProduct.Name);
          setValue("unitsInStock", returnedProduct.UnitsInStock.toString());
          setValue("price", returnedProduct.UnitPrice.toString());
          setValue("category", {
            label: returnedProduct.Category.Name,
            value: returnedProduct.Category.Id.toString(),
          });
          setValue("isSignature", returnedProduct.IsSignature);
          setValue("imageUrl", returnedProduct.ImageUrl);
          setValue("description", returnedProduct.Description);
          setProduct(returnedProduct);
          console.log(returnedProduct);
        }
      };
      onGetProductById();
    }
  }, [isAddMode, id, setValue]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productName: "",
      unitsInStock: "0",
      price: "0",
      category: "",
      isSignature: false,
      imageUrl: "",
      description: "",
    },
  });

  const onSubmit = async (product: z.infer<typeof FormSchema>) => {
    if (!isAddMode) {
      await onUpdateProduct();
    } else {
      await onCreateProduct(product);
    }
  };

  const onUpdateProduct = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7133/api/v1/Product/UpdateProduct",
        {
          Id: id,
          Name: product.Name,
          CategoryId: product.CategoryId,
          UnitsInStock: product.UnitsInStock,
          Description: product.Description,
          UnitPrice: product.UnitPrice,
          IsSignature: product.IsSignature,
          Discount: 0,
          Status: 1,
          ImageUrl: product.ImageUrl,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Product updated",
        });
        // redirect to product list
        router.push("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateProduct = async (product: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post(
        "https://localhost:7133/api/v1/Product/CreateProduct",
        {
          Name: product.productName,
          CategoryId: parseInt(product.category),
          UnitsInStock: parseInt(product.unitsInStock),
          Description: product.description,
          UnitPrice: parseInt(product.price),
          IsSignature: product.isSignature,
          Discount: 0,
          Status: 1,
          ImageUrl: product.imageUrl,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Product created",
          description: `${product.productName} has been created`,
        });
        // redirect to product list
        router.push("/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h1 className="text-3xl font-semibold mb-8">{title}</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Product name */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Macchiato"
                          {...register("productName")}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setProduct({ ...product, Name: e.target.value });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Unit in stock */}
              <div>
                <FormField
                  control={form.control}
                  name="unitsInStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit In Stock</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          {...register("unitsInStock")}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setProduct({
                              ...product,
                              UnitsInStock: +e.target.value,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Unit Price */}
              <div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="$0.00"
                          {...register("price")}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setProduct({
                              ...product,
                              UnitPrice: +e.target.value,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Category */}
              <div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...register("category")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Signature */}
              <div>
                <FormField
                  control={form.control}
                  name="isSignature"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          {...register("isSignature")}
                          onCheckedChange={field.onChange as () => void}
                          {...register("isSignature")}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Is Signature</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Image URL */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          {...register("imageUrl")}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setProduct({
                              ...product,
                              ImageUrl: e.target.value,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Give a short description about the product."
                          className="resize-none"
                          {...register("description")}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setProduct({
                              ...product,
                              Description: e.target.value,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-8 text-sm font-medium text-center text-white bg-gray-700 rounded-md"
            >
              {isAddMode ? "Create" : "Update"}
            </button>
          </form>
        </Form>
      </div>
    </section>
  );
}
