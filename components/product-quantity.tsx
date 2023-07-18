interface Props {
  quantity: number;
  increment: () => void;
  decrement: () => void;
}

export default function ProductQuantity({
  quantity,
  increment,
  decrement,
}: Props) {
  return (
    <div className="flex h-12 w-32 items-center bg-product">
      <button
        className="inline-flex w-2/5 justify-center disabled:text-gray-500"
        onClick={decrement}
        disabled={quantity === 0}
      >
        -
      </button>
      <div className="flex w-1/5 justify-center text-sm font-bold">
        {quantity}
      </div>
      <button className="inline-flex w-2/5 justify-center" onClick={increment}>
        +
      </button>
    </div>
  );
}
