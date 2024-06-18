"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Grid2X2, Heart, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";
import { FormEvent } from "react";
import { useCartStore } from "@/store"; 
import useUserStore from "@/store/userStore"; 
import { getCartTotal } from "@/lib/getCartTotal";
import { Button } from "./ui/button";

function Header() {
  const cart = useCartStore((state) => state.cart);
  const total = getCartTotal(cart);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);


  const handleSignOut = () => {
    setUser(null); // Clear user from global state
    localStorage.removeItem('user'); // Clear user from localStorage
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.input.value;
    window.location.href = `/search?q=${input}`;
  };

  return (
    <header className="flex flex-col md:flex-row bg-walmart items-center px-10 py-7 space-x-5 hover:zoom">
      <Link href="/" className="mb-5 md:mb-0">
        <div className="transition-transform transform hover:scale-110">
          <Image
            src="https://i.imgur.com/5V4wehM.png"
            alt="Logo"
            width={150}
            height={150}
          />
        </div>
      </Link>

      <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full w-full flex-1">
        <input
          type="text"
          name="input"
          placeholder="Search Everything..."
          className="flex-1 px-4 rounded-l-full outline-none placeholder:text-sm text-black focus:outline-none focus:border-blue-950 border border-transparent py-2"
        />
        <button type="submit">
          <Search className="rounded-full h-10 px-2 w-10 bg-yellow-400 cursor-pointer" />
        </button>
      </form>

      <div className="flex space-x-5 mt-5 md:mt-0">
        <Link href="/" className="hidden xl:flex text-white font-bold items-center space-x-2 text-sm hover:bg-blue-950 rounded-full px-2">
          <Grid2X2 size={20} />
          <p>Departments</p>
        </Link>

        <Link href="/basket" className="hidden xl:flex text-white font-bold items-center space-x-2 text-sm hover:bg-blue-950 rounded-full px-2">
          <LayoutGrid size={20} />
          <p>orders</p>
        </Link>

        <Link href="/" className="flex text-white font-bold items-center space-x-2 text-sm hover:bg-blue-950 rounded-full px-4 py-2">
          <Heart size={20} />
          <div>
            <p className="text-xs font-extralight">Reorder</p>
            <p>My Items</p>
          </div>
        </Link>

        {user ? (
          <div className="flex text-white font-bold items-center space-x-2 text-sm hover:bg-blue-950 rounded-full px-4 cursor-pointer" onClick={handleSignOut}>
            <User size={20} />
            <div className="ml-2">
              <p className="text-xs font-extralight">Sign Out</p>
              <p>{user.username}</p>
            </div>
          </div>
        ) : (
          <Link href="/signin" passHref>
            <div className="flex text-white font-bold items-center space-x-2 text-sm hover:bg-blue-950 rounded-full px-4 cursor-pointer">
              <User size={20} />
              <div className="ml-2">
                <p className="text-xs font-extralight">Sign In</p>
                <p>Account</p>
              </div>
            </div>
          </Link>
        )}

        <Link href="/basket" className="flex text-white font-bold items-center space-x-2 text-sm hover:bg-blue-950 rounded-full px-4">
          <ShoppingCart size={20} />
          <div>
            <p className="text-xs font-extralight">{cart.length > 0 ? `${cart.length} items` : "No items"}</p>
            <p>{cart.length > 0 ? `${total}` : "0"}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
