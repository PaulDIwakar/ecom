"use client";

import { useCartStore } from "@/store";
import { Product } from "@/typings/productTypings";
import { Button } from "./ui/button";
import { sendProductRemovalToBackend } from '@/lib/products';

function RemoveFromCart({ product }: { product: Product }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleRemove = async () => {
    console.log("Removing from cart", product.title);
    removeFromCart(product);

    try {
      await sendProductRemovalToBackend(product.title);
      console.log("Product successfully removed from backend");
    } catch (error) {
      console.error("Error removing product from backend:", error);
      // Optionally handle error state or notify user
    }
  };

  return (
    <Button className="bg-walmart hover:bg-walmart/50" onClick={handleRemove}>
      -
    </Button>
  );
}

export default RemoveFromCart;
