import { OrderData } from "./Order";

export const OrderDetails = ({ order }: { order: OrderData }) => {
  return <div>{order.orderId}</div>;
};
