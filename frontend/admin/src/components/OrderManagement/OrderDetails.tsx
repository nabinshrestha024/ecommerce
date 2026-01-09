import { useEditOrder } from "@/hooks/order/useEditOrder";
import type { OrderData } from "@/hooks/order/useFetchOrder";
import { useGetOrderById } from "@/hooks/order/useGetOrderById";
import { Button } from "@/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { X } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";

export const OrderDetails = ({
  order,
  setOrder,
}: {
  order: OrderData;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
}) => {
  const { data } = useGetOrderById(order.orderId);
  const [status, setStatus] = useState("");
  const editOrder = useEditOrder();

  const handleEditOrder = () => {
    editOrder.mutate({ orderId: order.orderId, status: status });
    setStatus("");
  };

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
            className="group flex gap-5 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-gray-50 border shrink-0">
              <img
                src={val.productImageUrl || "/placeholder.jpg"}
                alt={val.productName}
                className="object-cover group-hover:scale-110 transition-transform duration-500 h-full w-full"
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
        ))}
      </div>

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

        {order.paymentStatus === "Paid" && order.status !== "Delivered" && (
          <>
            <div className="flex flex-col gap-2 p-4 border rounded-lg bg-card">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Update Order Status
              </label>
              <div className="flex items-center gap-2">
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {order.status !== "Shipped" && (
                      <SelectItem value="Shipped">Shipped</SelectItem>
                    )}
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <ConfirmationDialog
                  trigger={
                    <Button variant="default" disabled={!status}>
                      Confirm
                    </Button>
                  }
                  confirmFunc={handleEditOrder}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
