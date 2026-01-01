import Image from "next/image";
import type { OrderData } from "./Order";
import { useGetOrderById } from "@/hooks/orders/useGetOrderById";
import { Button } from "@/ui/button";
import { useCancelOrder } from "@/hooks/orders/useCancelOrder";
import { useEffect, useState } from "react";
import { useInitiatePayment } from "@/hooks/esewa/useInitiatePayment";
import { EsewaPaymentPayload } from "../Navbar/components/CheckoutForm";

export const OrderDetails = ({ order }: { order: OrderData }) => {
  const { data } = useGetOrderById(order.orderId);
  const { mutate } = useCancelOrder(order.orderId);
  console.log(data?.items);
  const [total, setTotal] = useState("");
  const [signature, setSignature] = useState("");
  const [transactionUid, setTransactionUid] = useState("");
  const esewaInitiate = useInitiatePayment();
  useEffect(() => {
    if (data && data?.paymentStatus !== "Paid") {
      esewaInitiate.mutate(order.orderId, {
        onSuccess: (data: EsewaPaymentPayload) => {
          setTotal(data.fields.amount);
          setSignature(data.fields.signature);
          setTransactionUid(data.fields.transaction_uuid);
        },
      });
    }
  }, [data]);
  const handleCancelOrder = () => {
    mutate(order.orderId);
  };

  return (
    <div className="space-y-4">
      {data?.items?.map((item) => (
        <div
          key={item.orderItemId}
          className="flex items-start gap-4 max-h-[500px] overflow-auto"
        >
          <div className="w-20 h-20 relative shrink-0">
            {item.productImageUrl ? (
              <Image
                src={item.productImageUrl}
                alt={item.productName}
                fill
                className="object-cover rounded-md"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-md" />
            )}
          </div>

          <div className="flex-1">
            <div className="font-medium">{item.productName}</div>
            <div className="text-sm text-muted-foreground line-clamp-2">
              {item.productDescription}
            </div>

            <div className="mt-2 flex items-center gap-4 text-sm">
              <div>
                Qty: <span className="font-semibold">{item.quantity}</span>
              </div>
              <div>Unit: Rs {item.unitPrice}</div>
              <div>Total: Rs {item.lineTotal}</div>
            </div>
          </div>
        </div>
      ))}
      {order.paymentStatus !== "Paid" ? (
        <div>
          <div className="text-lg text-gray-700">
            Total: <span className="font-semibold">Rs. {total}</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleCancelOrder()}
              className="bg-red-500 hover:bg-red-600"
            >
              Cancel Order
            </Button>
            <form
              action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
              method="POST"
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

              <Button type="submit">Pay with eSewa</Button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
