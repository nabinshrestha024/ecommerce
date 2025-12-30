"use client";
import { getOrderById } from "@/lib/orders/getOrderById";
import { useQuery } from "@tanstack/react-query";

export type OrderData = {
  orderItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  productImageUrl?: string;
  productDescription?: string;
};

export type OrderResponse = {
  items: OrderData[];
  orderId: number;
  userId: number;
  orderDate: string;
  totalAmount: 390;
  status: string;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPhone: string;
  paymentMethodId: number;
  paymentStatus: string;
  paymentGateway: string;
  notes: string;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useGetOrderById = (orderId: number) => {
  const { data, isLoading, isError, refetch } = useQuery<OrderResponse>({
    queryKey: ["orderData", orderId],
    queryFn: () => getOrderById(orderId),
  });
  return { data, isLoading, isError, refetch };
};
