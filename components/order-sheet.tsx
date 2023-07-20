"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  cartItems,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  totalPrice,
} from "@/features/cartSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function OrderSheet() {
  const items = useSelector(cartItems);
  const price = useSelector(totalPrice);
  const numberOfItems = useSelector(cartItems).length;

  const dispatch = useDispatch();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="font-semibold">
          Cart
          <span className="flex h-4 w-4 ml-2 items-center justify-center rounded-full bg-accent text-[10px]">
            {numberOfItems}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            Make sure you have everything you need
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {items.length ? (
            <>
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

                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>

                        <div className="flex space-x-2 items-center">
                          <button
                            className="inline-flex w-6 h-auto rounded-full bg-black/80 text-white justify-center items-center disabled:bg-stone-400"
                            disabled={item.quantity === 1}
                            onClick={() =>
                              dispatch(decreaseQuantity(item.name))
                            }
                          >
                            -
                          </button>
                          <div className="flex w-1/5 justify-center text-sm font-semibold">
                            {item.quantity}
                          </div>
                          <button
                            className="inline-flex w-6 h-auto rounded-full bg-black/80 text-white justify-center items-center disabled:text-gray-500"
                            onClick={() =>
                              dispatch(increaseQuantity(item.name))
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex justify-between">
                <p className="uppercase text-neutral-500">total</p>
                <strong className="text-lg">$ {price}</strong>
              </div>
            </>
          ) : (
            <p className="text-center py-4">
              Your cart is empty.
              <span className="text-muted-foreground inline-block text-sm mt-2">
                Looks like you have not added anything to your cart. Please
                choose something to fill it 😄
              </span>
            </p>
          )}
        </div>
        <SheetFooter className="flex justify-between">
          {items.length ? (
            <Button
              variant="link"
              className="text-red-600"
              onClick={() => dispatch(clearCart())}
            >
              Remove all
            </Button>
          ) : null}
          <SheetClose asChild>
            <Button type="submit" disabled={numberOfItems == 0}>
              Place order
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
