import Image from "next/image";
import type { OrderData } from "./Order";
import { useGetOrderById } from "@/hooks/orders/useGetOrderById";
import { Button } from "@/ui/button";
import { useCancelOrder } from "@/hooks/orders/useCancelOrder";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useInitiatePayment } from "@/hooks/esewa/useInitiatePayment";
import { EsewaPaymentPayload } from "../Navbar/components/CheckoutForm";
import { Trash2, X } from "lucide-react";
import { Dialog } from "../dialog/Dialog";
import { ProductReviewForm } from "../Product/Review/ReviewForm";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";

export const OrderDetails = ({
  order,
  setOrder,
}: {
  order: OrderData;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
}) => {
  const { data, isLoading } = useGetOrderById(order.orderId);
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder(
    order.orderId,
  );
  const [total, setTotal] = useState("");
  const [signature, setSignature] = useState("");
  const [transactionUid, setTransactionUid] = useState("");
  const esewaInitiate = useInitiatePayment();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.paymentStatus === "Paid") return;
    if (signature) return;

    esewaInitiate.mutate(order.orderId, {
      onSuccess: (data: EsewaPaymentPayload) => {
        setTotal(data.fields.amount);
        setSignature(data.fields.signature);
        setTransactionUid(data.fields.transaction_uuid);
      },
    });
  }, [data?.paymentStatus, order.orderId, signature]);

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-400">
        Loading order details...
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">
            Items in Order
          </h3>
          <div className="cursor-pointer" onClick={() => setOrder(null)}>
            <X />
          </div>
        </div>
        {data?.items?.map((val) => (
          <div
            key={val.orderItemId}
            className="group flex flex-col gap-5 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex gap-3">
              <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-gray-50 border shrink-0">
                <Image
                  src={val.productImageUrl || "/placeholder.jpg"}
                  fill
                  alt={val.productName}
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
              </div>

              <div className="flex-1 flex flex-col justify-center min-w-0">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="text-md font-bold w-40 text-gray-900 leading-tight truncate">
                      {val.productName}
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {val?.variant?.map((attr, ind) => (
                        <span
                          key={ind}
                          className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium"
                        >
                          {attr.name}: {attr.value}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      Rs. {val.unitPrice.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium">
                      Qty: {val.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {order.status === "Delivered" && (
              <Dialog
                triggerText={
                  <Button className="flex rounded-sm px-6 py-5 bg-[#60bb46] hover:bg-[#52a63b] transition-all shadow-md hover:shadow-lg">
                    Add Review
                  </Button>
                }
                open={open}
                onOpenChange={setOpen}
              >
                <ProductReviewForm
                  productId={val.productId}
                  setOpen={setOpen}
                />
              </Dialog>
            )}
          </div>
        ))}
      </div>

      {order.status !== "Cancelled" && (
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">Order Total</p>
              <p className="text-2xl font-black text-gray-900">
                Rs. {order.totalAmount}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-sm ${
                  order.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-amber-100 text-amber-700 border border-amber-200"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {order.paymentStatus !== "Paid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ConfirmationDialog
                trigger={
                  <Button
                    variant="outline"
                    disabled={isCancelling}
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors py-6 rounded-xl flex gap-2"
                  >
                    <Trash2 size={18} />
                    Cancel Order
                  </Button>
                }
                confirmFunc={() => cancelOrder(order.orderId)}
              />

              <form
                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                method="POST"
                className="w-full"
              >
                <input type="hidden" name="amount" value={total} />
                <input type="hidden" name="tax_amount" value="0" />
                <input type="hidden" name="total_amount" value={total} />
                <input type="hidden" name="product_service_charge" value="0" />
                <input type="hidden" name="product_delivery_charge" value="0" />
                <input
                  type="hidden"
                  name="transaction_uuid"
                  value={transactionUid}
                />
                <input type="hidden" name="product_code" value="EPAYTEST" />
                <input
                  type="hidden"
                  name="success_url"
                  value="http://localhost:3000/success"
                />
                <input
                  type="hidden"
                  name="failure_url"
                  value="http://localhost:3000/failure"
                />
                <input
                  type="hidden"
                  name="signed_field_names"
                  value="total_amount,transaction_uuid,product_code"
                />
                <input type="hidden" name="signature" value={signature} />

                <Button
                  type="submit"
                  disabled={!signature}
                  className="w-full bg-[#60bb46] hover:bg-[#52a63b] text-white py-6 rounded-xl flex gap-2 shadow-lg shadow-green-100"
                >
                  Pay with eSewa
                </Button>
              </form>
            </div>
          )}

          {order.paymentStatus === "Paid" && (
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium bg-green-50 p-4 rounded-xl border border-green-100">
              Payment Completed Successfully
            </div>
          )}
        </div>
      )}
    </div>
  );
};
