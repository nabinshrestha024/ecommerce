import Image from "next/image";
import type { OrderData } from "./Order";
import { useGetOrderById } from "@/hooks/orders/useGetOrderById";
import { Button } from "@/ui/button";

export const OrderDetails = ({ order }: { order: OrderData }) => {
  const { data } = useGetOrderById(order.orderId);
  console.log(data?.items);

  const handleCancelOrder = () => {};
  return (
    <div className="space-y-4">
      {data?.items?.map((item) => (
        <div key={item.orderItemId} className="flex items-start gap-4">
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
      {order.paymentStatus === "Processing" ? (
        <div className="w-full grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleCancelOrder()}
            className="bg-red-500 hover:bg-red-600"
          >
            Cancel Order
          </Button>
          <Button>Pay with eSewa</Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
