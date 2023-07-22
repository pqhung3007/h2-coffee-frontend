"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cartItems, clearCart, totalPrice } from "@/features/cartSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

export default function CheckoutForm() {
  const router = useRouter();
  const { toast } = useToast();

  const items = useSelector(cartItems);
  const price = useSelector(totalPrice);
  const dispatch = useDispatch();

  const orderSubmissionSchema = z.object({
    employeeName: z.string().nonempty({
      message: "Employee name is required.",
    }),
    customerName: z.string().nonempty({
      message: "Customer name is required.",
    }),
    totalCost: z.number().nonnegative({
      message: "Total cost must be a positive number.",
    }),
    note: z.string().optional(),
    orderDetails: z.array(
      z.object({
        productName: z.string(),
        productImage: z.string().url(),
        productPrice: z.number().nonnegative(),
        quantity: z.number().nonnegative(),
      })
    ),
  });

  type OrderSubmission = z.infer<typeof orderSubmissionSchema>;

  const form = useForm<OrderSubmission>({
    resolver: zodResolver(orderSubmissionSchema),
    defaultValues: {
      employeeName: "",
      customerName: "",
      totalCost: price,
      note: "",
      orderDetails: items.map((item) => ({
        productName: item.name,
        productImage: item.image,
        productPrice: item.price,
        quantity: item.quantity,
      })),
    },
  });

  const onSubmit = async (data: z.infer<typeof orderSubmissionSchema>) => {
    try {
      const response = await axios.post("https://localhost:7133/api/v1/Order", {
        Note: data.note,
        EmployeeName: data.employeeName,
        CustomerName: data.customerName,
        TotalCost: data.totalCost,
        OrderDetails: data.orderDetails,
      });

      if (response.status === 200) {
        toast({
          title: "Order submitted!",
        });
        // remove all items from cart (in local storage)
        dispatch(clearCart());
        router.push("/staff");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative max-w-4xl mx-auto h-screen p-8 md:grid lg:grid-cols-2 gap-20">
          <div className="space-y-6">
            <h2 className=" pb-2 text-2xl font-semibold tracking-tight transition-colors">
              Order Information
            </h2>
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyen Van A" {...field} />
                  </FormControl>
                  <FormDescription>
                    We would like to know your name so that we can notify you
                    with future promotions
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div>
            <h2 className=" pb-2 text-2xl font-semibold tracking-tight transition-colors">
              Order Summary
            </h2>
            <div className="flex flex-col max-w-sm py-4">
              <ul role="list" className="mt-2 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.name} className="flex py-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={90}
                        height={90}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href="#">{item.name}</a>
                        </h3>
                        <p className="ml-4">{item.price}</p>
                      </div>

                      <p className="text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex justify-between">
                <p className="uppercase text-neutral-500">total</p>
                <strong className="text-lg">$ {price}</strong>
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Confirm order
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
