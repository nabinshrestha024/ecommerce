import { Button } from "@/ui/button";
import { X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { CheckoutForm } from "./CheckoutForm";
import { useEffect, useState } from "react";
import { useDeleteCart } from "@/hooks/cart/useDeleteCart";
import { useFetchCart } from "@/hooks/cart/useFetchCart";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";
import { Checkbox } from "@/ui/checkbox";
import { CartProductType } from "./TopNav";
import { Dialog } from "@/components/dialog/Dialog";
import { FaShoppingCart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import {
  currencyFormatter,
  LocalCartType,
} from "@/components/Product/ProductDisplay";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export const CartComponent = () => {
  const [open, setOpen] = useState(false);
  const deleteCart = useDeleteCart();
  const updateCart = useUpdateCart();

  const { data, isLoading, refetch } = useFetchCart();
  const { token } = useAuth();
  const isAuth = Boolean(token);
  const router = useRouter();
  const { cartLocal, setCartLocal } = useCart();

  const [selectedCartItemIds, setSelectedCartItemIds] = useState<number[]>([]);
  const [selectedLocalCartItemIds, setSelectedLocalCartItemIds] = useState<
    number[]
  >([]);

  const selectedItems =
    data?.filter((item) => selectedCartItemIds.includes(item.cartId)) ?? [];

  const selectedLocalItems =
    cartLocal?.filter((item) =>
      selectedLocalCartItemIds.includes(item.variantId),
    ) ?? [];

  const totalPrice =
    selectedItems?.reduce(
      (sum, val) => sum + val.quantity * val.finalPrice,
      0,
    ) ?? 0;

  const localTotalPrice =
    selectedLocalItems?.reduce(
      (sum, val) => sum + val.quantity * val.finalPrice,
      0,
    ) ?? 0;
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
      setSelectedCartItemIds((prev) =>
        prev.filter((val) => val !== cart.cartId),
      );
    } else {
      setSelectedCartItemIds((val) => [...val, cart.cartId]);
    }
  };

  const handleLocalSelect = (cart: CartProductType) => {
    const local = cart as unknown as LocalCartType;
    const id = local.variantId ?? (cart.cartId as number);
    if (selectedLocalCartItemIds.includes(id)) {
      setSelectedLocalCartItemIds((prev) => prev.filter((v) => v !== id));
    } else {
      setSelectedLocalCartItemIds((prev) => [...prev, id]);
    }
  };

  const handleSelectAll = () => {
    if (token) {
      if (!data || data.length === 0) {
        setSelectedCartItemIds([]);
        return;
      }
      const allIds = data.map((v) => v.cartId);
      const allSelected =
        allIds.length > 0 &&
        allIds.every((id) => selectedCartItemIds.includes(id));
      setSelectedCartItemIds(allSelected ? [] : allIds);
    } else {
      if (!cartLocal || cartLocal.length === 0) {
        setSelectedLocalCartItemIds([]);
        return;
      }
      const allIds = cartLocal.map((v) => v.variantId);
      const allSelected =
        allIds.length > 0 &&
        allIds.every((id) => selectedLocalCartItemIds.includes(id));
      setSelectedLocalCartItemIds(allSelected ? [] : allIds);
    }
  };

  const allSelected = Boolean(
    data &&
    data.length > 0 &&
    data.every((item) => selectedCartItemIds.includes(item.cartId)),
  );
  const allLocalSelected = Boolean(
    cartLocal &&
    cartLocal.length > 0 &&
    cartLocal.every((item) =>
      selectedLocalCartItemIds.includes(item.variantId),
    ),
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartLocal));
  }, [cartLocal]);

  return (
    <div className="flex gap-2 shrink-0 items-center">
      <button
        onClick={() => setOpen(true)}
        className="relative transition-transform active:scale-95 text-2xl"
      >
        {(data?.length ?? 0) > 0 && token && (
          <span className="absolute -top-1 -right-2 h-3 w-3 bg-red-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold ring-1 ring-white animate-in zoom-in">
            {data?.length}
          </span>
        )}
        {(cartLocal?.length ?? 0) > 0 && !token && (
          <span className="absolute -top-1 -right-2 h-3 w-3 bg-red-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold ring-1 ring-white animate-in zoom-in">
            {cartLocal?.length}
          </span>
        )}
        <FaShoppingCart className="cursor-pointer" size={22} />
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
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : token ? (
              data?.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="text-gray-200" size={40} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Looks like you haven&apos;t added anything yet.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      router.push("/product");
                    }}
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-4 px-3">
                    <div className="flex items-center">
                      <Checkbox
                        className="border-[#4EA764] data-[state=checked]:bg-[#4EA764] data-[state=checked]:border-[#4EA764] data-[state=checked]:text-white"
                        checked={allSelected}
                        onClick={handleSelectAll}
                      />
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      Select All
                    </div>
                  </div>
                  {data?.map((val) => (
                    <div
                      key={val.cartId}
                      className="group flex gap-4 p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all"
                    >
                      <div className="flex items-center">
                        <Checkbox
                          className="border-[#4EA764] data-[state=checked]:bg-[#4EA764] data-[state=checked]:border-[#4EA764] data-[state=checked]:text-white"
                          checked={selectedCartItemIds.includes(val.cartId)}
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
                            <FaTrash size={16} />
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
                          <div className="flex flex-col gap-2">
                            {val?.finalPrice === 0 ? (
                              <span className="md:text-[15px] text-[12px] font-bold text-[#4EA674]">
                                {currencyFormatter.format(val?.price ?? 0)}
                              </span>
                            ) : (
                              <div className="flex gap-2">
                                <span className="md:text-[15px] text-[12px] font-bold text-[#4EA674]">
                                  {currencyFormatter.format(
                                    val?.finalPrice ?? 0,
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
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
              )
            ) : cartLocal?.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <ShoppingBag className="text-gray-200" size={40} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Looks like you haven&apos;t added anything yet.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setOpen(false);
                    router.push("/product");
                  }}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-4 px-3">
                  <div className="flex items-center">
                    <Checkbox
                      className="border-[#4EA764] data-[state=checked]:bg-[#4EA764] data-[state=checked]:border-[#4EA764] data-[state=checked]:text-white"
                      checked={allLocalSelected}
                      onClick={handleSelectAll}
                    />
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    Select All
                  </div>
                </div>
                {cartLocal?.map((val) => (
                  <div
                    key={val.variantId}
                    className="group flex gap-4 p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center">
                      <Checkbox
                        className="border-[#4EA764] data-[state=checked]:bg-[#4EA764] data-[state=checked]:border-[#4EA764] data-[state=checked]:text-white"
                        checked={selectedLocalCartItemIds.includes(
                          val.variantId,
                        )}
                        onClick={() =>
                          handleLocalSelect(val as unknown as CartProductType)
                        }
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
                          onClick={() => {
                            setCartLocal((prev) =>
                              prev.filter(
                                (value) => value.cartId !== val.cartId,
                              ),
                            );
                            toast.success("Item deleted from cart");
                          }}
                        >
                          <FaTrash size={16} />
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
                        <div className="flex flex-col gap-2">
                          {val?.finalPrice === 0 ? (
                            <span className="md:text-[15px] text-[12px] font-bold text-[#4EA674]">
                              {currencyFormatter.format(val?.price ?? 0)}
                            </span>
                          ) : (
                            <div className="flex gap-2">
                              <span className="md:text-[15px] text-[12px] font-bold text-[#4EA674]">
                                {currencyFormatter.format(val?.finalPrice ?? 0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center bg-white border rounded-lg shadow-sm overflow-hidden">
                          <button
                            onClick={() =>
                              setCartLocal((prev) =>
                                prev.map((item) =>
                                  item.variantId === val.variantId
                                    ? {
                                        ...item,
                                        quantity: Math.max(
                                          1,
                                          item.quantity - 1,
                                        ),
                                        totalPrice:
                                          (item.quantity - 1) * item.price,
                                        finalPrice: item.price,
                                      }
                                    : item,
                                ),
                              )
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
                              setCartLocal((prev) =>
                                prev.map((item) =>
                                  item.variantId === val.variantId
                                    ? {
                                        ...item,
                                        quantity: item.quantity + 1,
                                        totalPrice:
                                          (item.quantity + 1) * item.price,
                                        finalPrice: item.price,
                                      }
                                    : item,
                                ),
                              )
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
                    Rs. {totalPrice}
                  </p>
                </div>
              </div>

              {selectedCartItemIds.length === 0 ? (
                <Button className="w-full h-12 text-md font-bold hover:cursor-not-allowed">
                  Proceed to Checkout
                </Button>
              ) : token ? (
                <Dialog
                  triggerClassName="w-full"
                  triggerText={
                    <Button
                      variant="default"
                      className="w-full h-12 text-md font-bold shadow-lg shadow-gray-200 transition-all hover:-translate-y-px active:translate-y-px "
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
              ) : (
                <Button
                  variant="default"
                  className="w-full h-12 text-md font-bold shadow-lg shadow-gray-200 transition-all hover:-translate-y-px active:translate-y-px "
                  onClick={() => setOpen(false)}
                >
                  Proceed to Checkout
                </Button>
              )}
            </div>
          )}
          {!isAuth && cartLocal && cartLocal.length > 0 && (
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
                    Rs. {localTotalPrice}
                  </p>
                </div>
              </div>

              {selectedLocalCartItemIds.length === 0 ? (
                <Button
                  className="w-full h-12 text-md font-bold hover:cursor-not-allowed"
                  disabled
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <Button
                  className="w-full h-12 text-md font-bold"
                  onClick={() => {
                    router.push(`/login`);
                  }}
                >
                  Proceed to Checkout
                </Button>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
