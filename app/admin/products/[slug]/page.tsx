import ProductForm from "@/components/product-form";

export default function EditPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <ProductForm title="Edit Product" id={params.slug} />
    </>
  );
}
