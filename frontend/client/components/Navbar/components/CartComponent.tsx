import { Dialog } from "@/components/Dialog/Dialog";
import { Button } from "@/ui/button";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { CheckoutForm } from "./CheckoutForm";
import { useEffect, useState } from "react";
import { useDeleteCart } from "@/hooks/cart/useDeleteCart";
import { useFetchCart } from "@/hooks/cart/useFetchCart";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";

export const CartComponent = () => {
  const [open, setOpen] = useState(false);
  const deleteCart = useDeleteCart();
  const updateCart = useUpdateCart();

  const { data, isLoading, isError, error, refetch } = useFetchCart();
  const totalPrice =
    data?.reduce((sum, val) => sum + val.quantity * val.price, 0) ?? 0;

  const { token } = useAuth();
  const isAuth = Boolean(token);
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [open]);

  const handleQuantityDecrease = ({
    cartId,
    quantity,
  }: {
    cartId: number;
    quantity: number;
  }) => {
    updateCart.mutate({
      cartId: cartId,
      quantity: quantity - 1,
    });
  };

  return (
    <div className="flex gap-2 shrink-0 items-center text-xl">
      <div onClick={() => setOpen(true)} className="cursor-pointer relative">
        {isAuth && (
          <div className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-semibold">
            {data?.length || 0}
          </div>
        )}
        <FaShoppingCart />
      </div>
      <div
        className={`fixed right-0 top-0 z-20 h-screen transform ${open ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 w-full max-w-md bg-white shadow-lg overflow-y-auto`}
        role="dialog"
        aria-label="Cart drawer"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <FaShoppingCart className="text-xl" />
              <div className="text-lg font-semibold">Your Cart</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">
                {data
                  ? `${data.length} item${data.length === 1 ? "" : "s"}`
                  : ""}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close cart"
              >
                <X />
              </button>
            </div>
          </div>

          <div className="flex-1 px-6 py-4 space-y-4">
            {!isAuth ? (
              <div className="py-12 text-center text-gray-600">
                Please login to check your cart
              </div>
            ) : isLoading ? (
              <div className="py-12 text-center text-gray-600">Loading...</div>
            ) : isError ? (
              <div className="py-12 text-center text-red-600">
                {error?.message}
              </div>
            ) : data?.length === 0 ? (
              <div className="py-12 flex flex-col items-center gap-4">
                <div className="text-lg font-semibold">Your cart is empty</div>
                <div className="text-sm text-gray-500">
                  Add items you like to start shopping.
                </div>
                <Button
                  onClick={() => {
                    setOpen(false);
                    router.push("/product");
                  }}
                  className="mt-2"
                >
                  Start shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {data?.map((val) => (
                  <div key={val.cartId} className="flex gap-4 items-start">
                    <div className="w-20 h-20 relative rounded-md overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={`${val.productImageUrl}` || "/a.jpg"}
                        fill
                        alt={val.productName}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-semibold text-gray-800">
                            {val.productName}
                          </div>
                          <div className="text-xs text-gray-600 line-clamp-2">
                            {val.description}
                          </div>
                        </div>
                        <button
                          className="p-1 hover:bg-red-50 rounded transition-colors ml-2"
                          title="Remove from cart"
                          onClick={() => deleteCart.mutate(val.cartId)}
                        >
                          <Trash2
                            size={16}
                            className="text-red-500 hover:text-red-600"
                          />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Price:{" "}
                          <span className="font-semibold">Rs. {val.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityDecrease({
                                cartId: val.cartId,
                                quantity: val.quantity,
                              })
                            }
                            disabled={val.quantity <= 1}
                            className="p-1 rounded border disabled:opacity-50"
                            aria-label="Decrease quantity"
                          >
                            <MdKeyboardArrowDown />
                          </button>
                          <div className="px-3 py-1 border rounded">
                            {val.quantity}
                          </div>
                          <button
                            onClick={() =>
                              updateCart.mutate({
                                cartId: val.cartId,
                                quantity: val.quantity + 1,
                              })
                            }
                            className="p-1 rounded border"
                            aria-label="Increase quantity"
                          >
                            <MdKeyboardArrowUp />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {data?.length !== 0 && (
            <div className="px-6 py-4 border-t bg-white sticky bottom-0">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-600">Grand Total</div>
                <div className="text-2xl font-semibold text-green-600">
                  Rs. {totalPrice}
                </div>
              </div>

              <Dialog
                triggerClassName="w-full"
                triggerText={
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Checkout
                  </Button>
                }
              >
                <CheckoutForm data={data ?? []} totalPrice={totalPrice} />
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
