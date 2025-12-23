"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Sidebar } from "./Sidebar";
import { Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const TopNav = () => {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      description:
        "Premium noise-canceling headphones with 30-hour battery life and superior sound quality. ",
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      rating: 5,
      reviews: 235,
      stock: 45,
      sslug: "wireless-bluetooth-headphones",
      category: "electronics",
    },
    {
      id: 2,
      name: "Smart Watch Series 7",
      description:
        "Advanced fitness tracking, heart rate monitor, and smartphone notifications on your wrist.",
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      rating: 4,
      reviews: 189,
      stock: 28,
      sslug: "smart-watch-series-7",
      category: "electronics",
    },
    {
      id: 3,
      name: "Minimalist Leather Backpack",
      description:
        "Handcrafted genuine leather backpack with laptop compartment and multiple pockets.",
      price: 149.99,
      originalPrice: 200,
      discount: 20,
      quantity: 5,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      rating: 5,
      reviews: 156,
      stock: 17,
      sslug: "minimalist-leather-backpack",
      category: "clothes",
    },
  ]);
  const token = localStorage.getItem("token");
  const isAuth = Boolean(token);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    let total = 0;
    cartItems.map((val) => {
      total = total + val.quantity * val.price;
    });
    return total;
  };

  useEffect(() => {
    let t = calculateTotal();
    setTotal(t);
  }, [cartItems, total]);

  const handleDelete = (id: number) => {
    setCartItems((prev) => prev.filter((val) => val.id !== id));
  };

  return (
    <div className="flex justify-between px-5 lg:px-10 items-center py-5 border-b">
      <div className="flex gap-2 divide-x-2">
        <Image
          src={"/logo.png"}
          alt="Logo"
          height={80}
          width={200}
          className="hidden lg:block"
        />
        <Image
          src={"/logo.png"}
          alt="Logo"
          height={80}
          width={120}
          className="lg:hidden"
        />
        <div className="flex items-center gap-2">
          <FaLocationDot className="text-2xl" />
          <div>
            <div className="text-xs">Deliver to</div>
            <div className="text-sm font-semibold">Your Address</div>
          </div>
        </div>
      </div>
      <div className="gap-4 items-center hidden lg:flex">
        <div className="relative">
          <Input
            type={"text"}
            placeholder="What you're looking for"
            className="bg-[#EAF8E7] shrink-0 w-[500px] h-12 rounded-3xl pr-25"
          />
          <Button
            variant={"ghost"}
            className="bg-white rounded-3xl absolute right-2 top-1/2 -translate-y-1/2"
          >
            <IoSearch />
            Search
          </Button>
        </div>
        {!isAuth && (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
        {isAuth && (
          <Link href="/home">
            <Button onClick={handleLogout}>LogOut</Button>
          </Link>
        )}
        <div className="flex gap-2 shrink-0 items-center text-xl">
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <FaShoppingCart />
          </div>
          <div
            className="text-sm font-semibold cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Cart
          </div>
          <div
            className={`fixed right-0 top-0 z-20 h-screen w-[500px] bg-white ${open ? "tranlsate-x-0" : "translate-x-[500px]"} transition-all ease-in-out duration-500`}
          >
            <div className="relative px-10 pt-12 flex flex-col gap-5">
              <div
                className="absolute left-4 top-4"
                onClick={() => setOpen(false)}
              >
                <X />
              </div>
              {cartItems.map((val) => (
                <div
                  key={val.id}
                  className={`flex gap-4 pb-4 border-b transition-opacity duration-300 `}
                >
                  <div className="w-20 h-20 shrink-0 relative rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={val.image}
                      fill
                      alt={val.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-800">
                        {val.name}
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-1">
                        {val.description}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-700">
                        <span className="font-semibold">$ {val.price}</span> ×{" "}
                        {val.quantity}
                      </div>
                      <button
                        className="p-1 hover:bg-red-50 rounded transition-colors"
                        title="Remove from cart"
                        onClick={() => handleDelete(val.id)}
                      >
                        <Trash2
                          size={16}
                          className="text-red-500 hover:text-red-600"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-xl font-semibold flex items-center gap-2">
                Grand Total:{" "}
                <span className="text-3xl text-green-500">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <Sidebar />
      </div>
    </div>
  );
};
