"use client";
import { getOrder } from "@/lib/order/getOrder";
import { useQuery } from "@tanstack/react-query";

type ProductData = {
  orderItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};
export type OrderData = {
  items: ProductData[];
  orderId: number;
  userId: number;
  orderDate: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingName: string | null;
  shippingPhone: string;
};
export type OrderResponse = {
  items: OrderData[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useFetchOrder = () => {
  const { data, isLoading, isError, refetch } = useQuery<OrderResponse>({
    queryKey: ["orderData"],
    queryFn: getOrder,
  });
  return { data, isLoading, isError, refetch };
};
