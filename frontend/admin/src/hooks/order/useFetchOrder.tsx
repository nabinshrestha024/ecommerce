"use client";
import { getOrder } from "@/lib/order/getOrder";
import { useQuery } from "@tanstack/react-query";

type ProductData = {
  orderItemId: number;
  productId: number;
  userId: number;
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
  variant: AttributeType[];
};

export interface AttributeType {
  name: string;
  value: string;
}
export type OrderResponse = {
  items: OrderData[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useFetchOrder = (pageIndex: number) => {
  const { data, isLoading, isError, refetch } = useQuery<OrderResponse>({
    queryKey: ["orderData", pageIndex],
    queryFn: () => getOrder(pageIndex),
  });
  return { data, isLoading, isError, refetch };
};
