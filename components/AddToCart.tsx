"use client";

import React from 'react';
import { useCartStore } from '@/store';
import { Product } from '@/typings/productTypings';
import { Button } from './ui/button';
import RemoveFromCart from './RemoveFromCart';
import { sendProductToBackend } from '@/lib/products';
import useUserStore from '@/store/userStore'; // Import user store

interface AddToCartProps {
  product: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const [cart, addToCart] = useCartStore((state) => [state.cart, state.addToCart]);
  const user = useUserStore((state) => state.user); // Get user data

  // Calculate how many of this product are already in the cart
  const howManyInCart = cart.filter((item) => item.meta.sku === product.meta.sku).length;

  // Function to handle adding the product to cart and sending to backend
  const handleAdd = async () => {
    try {
      // Add product to local cart state
      addToCart(product);

      // Prepare data to send to backend
      const dataToSend = {
        product,
        username: user ? user.username : 'Guest', // Include username
        title:product.title,
        url:product.url,
        price:product.price,
        quantity: howManyInCart + 1
      };

      // Send product to backend
      await sendProductToBackend(dataToSend);
      console.log('Product successfully sent to backend');
    } catch (error) {
      console.error('Error adding product or sending to backend:', error);
      // Optionally handle error state or notify user
    }
  };

  return (
    <div className="flex space-x-5 items-center">
      {howManyInCart > 0 ? (
        // If product is already in cart, show remove button and count
        <>
          <RemoveFromCart product={product} />
          <span>{howManyInCart}</span>
          <Button className="bg-walmart hover:bg-walmart/50" onClick={handleAdd}>
            +
          </Button>
        </>
      ) : (
        // If product is not in cart, show add to cart button
        <Button className="bg-walmart hover:bg-walmart/50" onClick={handleAdd}>
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default AddToCart;
