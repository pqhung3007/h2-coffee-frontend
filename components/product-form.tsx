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
  { label: "Juice", value: "2" },
  { label: "Coffee", value: "3" },
  { label: "Beverage", value: "1" },
  { label: "Sweet", value: "4" },
] as const;

const FormSchema = z.object({
  productName: z.string().nonempty(),
  unitsInStock: z.string(),
  price: z.string(),
  category: z.string(),
  isSignature: z.boolean().default(false).optional(),
  description: z.string().min(10).max(1000),
});

export interface Product {
  Id: string;
  Name: string;
  Category: {
    Id: string;
    Name: string;
  };
  UnitsInStock: number;
  UnitPrice: number;
  CategoryId: number;
  IsSignature: boolean;
  Description: string;
}

export default function ProductForm({
  title,
  id,
}: {
  title: string;
  id?: string;
}) {
  const { toast } = useToast();

  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (title === "Edit Product" && id) {
      const onGetProductById = async () => {
        const response = await axios.get(
          `https://localhost:7133/api/v1/Product/${id}`
        );
        if (response.status === 200) {
          const returnedProduct = response.data;
          setProduct(returnedProduct);
        } else {
          console.log("failed");
        }
      };
      onGetProductById();
    }
  }, [title, id]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productName: "",
      unitsInStock: "0",
      price: "0",
      category: "",
      isSignature: false,
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post(
        "https://localhost:7133/api/v1/Product/CreateProduct",
        {
          Name: data.productName,
          CategoryId: parseInt(data.category),
          UnitsInStock: parseInt(data.unitsInStock),
          Description: data.description,
          UnitPrice: parseInt(data.price),
          IsSignature: data.isSignature,
          Discount: 0,
          Status: "Inactive",
          ImageUrl: "string",
        }
      );

      if (response.status === 200) {
        toast({
          title: "Product created",
          description: `${data.productName} has been created`,
        });
        // redirect to product list
        router.push("/products");
      } else {
        console.log("failed");
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
                          {...field}
                          value={product?.Name}
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
                          {...field}
                          value={product?.UnitsInStock}
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
                          {...field}
                          value={product?.UnitPrice}
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
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
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
                          checked={product?.IsSignature}
                          onCheckedChange={field.onChange as () => void}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Is Signature</FormLabel>
                      </div>
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
                          defaultValue={product?.Description}
                          {...field}
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
              Add product
            </button>
          </form>
        </Form>
      </div>
    </section>
  );
}
