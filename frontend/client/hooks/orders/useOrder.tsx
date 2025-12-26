"use client";
import { getOrders } from "@/services/orders.services";
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
  shippingCity: string;
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

export const useOrder = () => {
  const { data, isLoading, isError, refetch } = useQuery<OrderResponse>({
    queryKey: ["orderData"],
    queryFn: getOrders,
  });
  return { data, isLoading, isError, refetch };
};
