import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { OrderData } from "@/hooks/order/useFetchOrder.tsx";
import { orderSchema, type OrderFormValues } from "./OrderZod.tsx";
import { useEditOrder } from "@/hooks/order/useEditOrder.tsx";
import { Button } from "@/ui/button.tsx";
import { Select } from "../Select/Select.tsx";

type Props = {
  order: OrderData;
  onSave: (order: OrderData) => void;
};

export const OrderForm = ({ order, onSave }: Props) => {
  const editOrder = useEditOrder();

  const selectData = [
    {
      id: 1,
      value: "Pending",
      content: "Pending",
    },
    {
      id: 2,
      value: "Cancelled",
      content: "Cancelled",
    },
    {
      id: 3,
      value: "Shipped",
      content: "Shipped",
    },
  ];
  const { handleSubmit, setValue } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema) as Resolver<OrderFormValues>,
    defaultValues: {
      status: order.status,
    },
    mode: "onChange",
  });
  const onSubmit = (data: OrderFormValues) => {
    editOrder.mutate(
      {
        orderId: order.orderId,
        status: data.status,
      },
      {
        onSuccess: () => {
          onSave({ ...order, ...data });
        },
      },
    );
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6">
          Edit Order Status
        </h2>

        <div className="grid grid-cols-4 gap-4 items-center ">
          <label className="col-span-1 font-medium text-gray-700">Status</label>
          <div className="col-span-3">
            <Select
              defaultValue={order.status}
              selectData={selectData}
              triggerClassName="w-full border rounded-md px-3 py-2"
              itemClassName="cursor-pointer"
              onValueChange={(v) => setValue("status", v)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full hover:bg-green-700 mt-5">
          Save Status
        </Button>
      </form>
    </div>
  );
};
