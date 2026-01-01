import type { OrderData } from "@/hooks/order/useFetchOrder";
import { useGetOrderById } from "@/hooks/order/useGetOrderById";

export const OrderDetails = ({ order }: { order: OrderData }) => {
  const { data } = useGetOrderById(order.orderId);

  return (
    <div className="space-y-4 max-h-[500px] overflow-auto">
      {data?.items?.map((item) => (
        <div key={item.orderItemId} className="flex items-start gap-4">
          <div className="w-20 h-20 relative shrink-0">
            {item.productImageUrl ? (
              <img
                src={item.productImageUrl}
                alt={item.productName}
                className="object-cover rounded-md w-20 h-20"
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
    </div>
  );
};
