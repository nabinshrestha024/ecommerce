import { Button } from "@/ui/button";
import { Trash2, X, ShoppingBag } from "lucide-react"; // Added ShoppingBag for empty state
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
import { Checkbox } from "@/ui/checkbox";
import { Dialog } from "@/components/dialog/Dialog";
import { CartProductType } from "./TopNav";

export const CartComponent = () => {
  const [open, setOpen] = useState(false);
  const deleteCart = useDeleteCart();
  const updateCart = useUpdateCart();

  const { data, isLoading, isError, error, refetch } = useFetchCart();
  const { token } = useAuth();
  const isAuth = Boolean(token);
  const router = useRouter();

  const [selectedItems, setSelectedItems] = useState<CartProductType[]>([]);
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<number[]>([]);
  const totalPrice =
    selectedItems?.reduce((sum, val) => sum + val.quantity * val.price, 0) ?? 0;
  useEffect(() => {
    if (open) refetch();
  }, [open, refetch]);

  const handleQuantityDecrease = ({
    cartId,
    quantity,
  }: {
    cartId: number;
    quantity: number;
  }) => {
    updateCart.mutate({ cartId, quantity: quantity - 1 });
  };

  const handleSelect = (cart: CartProductType) => {
    if (selectedItems.find((val) => val.cartId === cart.cartId)) {
      setSelectedItems((prev) =>
        prev.filter((val) => val.cartId !== cart.cartId),
      );
      setSelectedCartItemIds((prev) =>
        prev.filter((val) => val !== cart.cartId),
      );
    } else {
      setSelectedItems((val) => [...val, cart]);
      setSelectedCartItemIds((val) => [...val, cart.cartId]);
    }
  };

  return (
    <div className="flex gap-2 shrink-0 items-center">
      <button
        onClick={() => setOpen(true)}
        className="relative p-2 transition-transform hover:scale-110 active:scale-95 text-2xl"
      >
        {isAuth && (data?.length ?? 0) > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 bg-red-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-white animate-in zoom-in">
            {data?.length}
          </span>
        )}
        <FaShoppingCart className="text-gray-700" />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-slate-50 shadow-2xl transform transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full bg-white">
          <header className="flex items-center justify-between px-6 py-5 border-b bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FaShoppingCart className="text-xl text-gray-800" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
                <p className="text-xs text-gray-500">
                  {data?.length
                    ? `${data.length} items reserved`
                    : "Items you've added"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
            {!isAuth ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="text-gray-300" size={32} />
                </div>
                <p className="text-gray-600 font-medium">
                  Please login to view your cart
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : data?.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <ShoppingBag className="text-gray-200" size={40} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Looks like you haven't added anything yet.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setOpen(false);
                    router.push("/product");
                  }}
                  className="rounded-full px-8"
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {data?.map((val) => (
                  <div
                    key={val.cartId}
                    className="group flex gap-4 p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center">
                      <Checkbox
                        className="border-[#4EA764] data-[state=checked]:bg-[#4EA764] data-[state=checked]:border-[#4EA764] data-[state=checked]:text-white"
                        onClick={() => handleSelect(val)}
                      />
                    </div>
                    <div className="w-24 h-24 relative rounded-xl overflow-hidden bg-gray-100 border shrink-0 shadow-sm">
                      <Image
                        src={`${val.productImageUrl}` || "/a.jpg"}
                        fill
                        alt={val.productName}
                        className="object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight">
                            {val.productName}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {val.description}
                          </p>
                        </div>
                        <button
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => deleteCart.mutate(val.cartId)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {val.attributes.map((attr, ind) => (
                          <span
                            key={ind}
                            className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium"
                          >
                            {attr.name}: {attr.value}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">
                          Rs. {val.totalPrice.toLocaleString()}
                        </span>

                        <div className="flex items-center bg-white border rounded-lg shadow-sm overflow-hidden">
                          <button
                            onClick={() =>
                              handleQuantityDecrease({
                                cartId: val.cartId,
                                quantity: val.quantity,
                              })
                            }
                            disabled={val.quantity <= 1}
                            className="p-1.5 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                          >
                            <MdKeyboardArrowDown size={18} />
                          </button>
                          <span className="px-3 text-xs font-bold w-8 text-center">
                            {val.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCart.mutate({
                                cartId: val.cartId,
                                quantity: val.quantity + 1,
                              })
                            }
                            className="p-1.5 hover:bg-gray-50 transition-colors"
                          >
                            <MdKeyboardArrowUp size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isAuth && data && data.length > 0 && (
            <div className="p-6 border-t bg-gray-50/50 space-y-4">
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Subtotal
                  </p>
                  <p className="text-sm text-gray-400 italic">
                    Taxes calculated at checkout
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-gray-900 leading-none">
                    Rs. {totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <Dialog
                triggerClassName="w-full"
                triggerText={
                  <Button
                    variant="default"
                    className="w-full h-12 text-md font-bold rounded-xl shadow-lg shadow-gray-200 transition-all hover:-translate-y-px active:translate-y-px"
                    onClick={() => setOpen(false)}
                  >
                    Proceed to Checkout
                  </Button>
                }
              >
                <CheckoutForm
                  data={selectedItems ?? []}
                  totalPrice={totalPrice}
                  selectedCartItemIds={selectedCartItemIds}
                />
              </Dialog>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
