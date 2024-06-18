// components/Basket.tsx
"use client";
import useUserStore from "@/store/userStore";
import { useState } from "react";
import { getCartTotal } from "@/lib/getCartTotal";
import { groupBySKU } from "@/lib/groupBySKU";
import { useCartStore } from "@/store";
import Image from "next/image";
import AddToCart from "./AddToCart";
import { Button } from "./ui/button";
import { sendOrderToBackend } from "@/lib/products";

const Basket: React.FC = () => {
    const [orderPlaced, setOrderPlaced] = useState(false); // State to track order placement
    const cart = useCartStore((state) => state.cart);
    const grouped = groupBySKU(cart);
    const basketTotal = getCartTotal(cart);
    const user = useUserStore((state) => state.user);


    // Function to handle checkout
    const handleCheckout = async () => {
        try {
            // Iterate through each product in cart and send to backend
            await Promise.all(cart.map(async (item) => {
                const dataToSend = {
                    product: item,
                    username: user ? user.username : 'Guest', // Include username
                    title: item.title,
                    url: item.url,
                    price: item.price,
                };

                await sendOrderToBackend(dataToSend);
                console.log('Product sent to backend:', item.title);
            }));

            // Update state to indicate order placed
            setOrderPlaced(true);
            window.location.href="/basket";
        } catch (error) {
            console.error("Error placing order:", error);
            // Handle error, optionally display error message
        }
    };

    // Function to simulate placing order (replace with actual API call)
    const placeOrderToBackend = async () => {
        // Simulate delay for demonstration purposes
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Simulate successful order placement
        console.log("Order placed successfully!"); // Log success to console
    };

    return (
        <div className="max-w-7xl mx-auto">
            <ul className="space-y-5 divide-y-2">
                {Object.keys(grouped).map((sku) => {
                    const item = grouped[sku][0];
                    const total = getCartTotal(grouped[sku]);

                    return (
                        <li key={sku} className="p-5 my-2 flex items-center justify-between">
                            {item.images[0] && (
                                <Image src={item.images[0]} alt={item.title} width={100} height={100} />
                            )}

                            <div className="flex space-x-4 pl-4">
                                <div>
                                    <p className="line-clamp-2 font-bold">{item.title}</p>
                                    <div dangerouslySetInnerHTML={{ __html: item.description }} className="line-clamp-1 font-light text-sm mt-2" />
                                </div>

                                <div className="flex flex-col border rounded-md p-5">
                                    <AddToCart product={item} />
                                    <p className="mt-4 font-bold text-right">{total}</p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div className="flex flex-col justify-end p-5">
                <p className="font-bold text-2xl text-right text-walmart mb-5">
                    Total: {basketTotal}
                </p>

                {!orderPlaced ? (
                    <Button onClick={handleCheckout} className="mt-5 h-20 bg-walmart hover:bg-walmart/50">
                        Checkout
                    </Button>
                ) : (
                    <p className="font-bold text-green-600 text-center">Order successfully placed!</p>
                )}
            </div>
        </div>
    );
};

export default Basket;
/*
    // Function to handle checkout
    const handleCheckout = async () => {
        try {
            // Iterate through each product in cart and send to backend
            await Promise.all(cart.map(async (item) => {
                const dataToSend = {
                    product: item,
                    username: user ? user.username : 'Guest', // Include username
                    title: item.title,
                    url: item.url,
                    price: item.price,
                };

                await sendOrderToBackend(dataToSend);
                console.log('Product sent to backend:', item.title);
            }));

            // Update state to indicate order placed
            setOrderPlaced(true);
        } catch (error) {
            console.error("Error placing order:", error);
            // Handle error, optionally display error message
        }
    };*/