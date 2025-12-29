import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/Input.tsx";
import type { OrderData } from "@/hooks/order/useFetchOrder.tsx";
import { orderSchema, type OrderFormValues } from "./OrderZod.tsx";
import { useEditOrder } from "@/hooks/order/useEditOrder.tsx";

type Props = {
  order: OrderData;
  onSave: (order: OrderData) => void;
};

export const OrderForm = ({ order, onSave }: Props) => {
  const editOrder = useEditOrder();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema) as Resolver<OrderFormValues>,
    defaultValues: {
      status: order.status,
    },
    mode: "onChange",
  });
  const onSubmit = (data: OrderFormValues) => {
    console.log(data);
    editOrder.mutate(
      {
        orderId: order.orderId,
        status: data.status,
      },
      {
        onSuccess: () => {
          onSave({ ...order, ...data });
          reset(data);
        },
      },
    );
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <h2 className="text-[24px] font-bold text-[#23272E] mb-6 text-center">
          Edit Order
        </h2>

        <div className="grid grid-cols-4 gap-4 items-center ">
          <label className="col-span-1 font-medium text-gray-700">Status</label>
          <div className="col-span-3">
            <Input
              type="text"
              placeholder=""
              {...register("status")}
              className="w-full px-4 py-2 border border-[#DFE0E1] rounded  focus-visible:border-[#DFE0E1] focus-visible:ring-0"
            />
            {errors.status && (
              <p className="text-[12px] text-red-500 ">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded transition mt-5"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};
