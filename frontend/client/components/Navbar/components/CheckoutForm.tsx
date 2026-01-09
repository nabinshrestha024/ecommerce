"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckoutFormSchema, CheckoutFormSchemaType } from "./checkoutForm.zod";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useAddOrder } from "@/hooks/orders/useAddOrder";
import { useInitiatePayment } from "@/hooks/esewa/useInitiatePayment";
import { useState } from "react";
import { CartProductType } from "./TopNav";
import Image from "next/image";
import { ScrollArea } from "@/ui/scroll-area";

interface OrderResponse {
  orderId: number;
  totalAmount: number;
}

export interface EsewaPaymentPayload {
  paymentUrl: string;
  fields: {
    amount: string;
    tax_amount: string;
    total_amount: string;
    transaction_uuid: string;
    product_code: string;
    signed_field_names: string;
    signature: string;
  };
}

export const CheckoutForm = ({
  data,
  totalPrice,
  selectedCartItemIds,
}: {
  data: CartProductType[];
  totalPrice: number;
  selectedCartItemIds: number[];
}) => {
  const [pay, setPay] = useState(false);
  const [signature, setSignature] = useState("");
  const [transactionUid, setTransactionUid] = useState("");
  const [total, setTotal] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(CheckoutFormSchema),
    mode: "onChange",
  });
  const addOrder = useAddOrder();
  const initiatePayment = useInitiatePayment();

  const onSubmit = (data: CheckoutFormSchemaType) => {
    addOrder.mutate(
      { ...data, selectedCartItemIds },
      {
        onSuccess: (orderData: OrderResponse) => {
          initiatePayment.mutate(orderData.orderId, {
            onSuccess: (paymentData: EsewaPaymentPayload) => {
              setTotal(paymentData.fields.amount);
              setPay(true);
              setSignature(paymentData.fields.signature);
              setTransactionUid(paymentData.fields.transaction_uuid);
            },
          });
        },
      },
    );
    reset();
  };
  return pay ? (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <div className="text-lg font-semibold mb-5">
        Order Placed Successfully
      </div>
      <ScrollArea className="h-[50vh] pr-5">
        <div className="space-y-4">
          {data?.map((val) => (
            <div
              key={val.cartId}
              className="group flex gap-4 p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all w-[420px]"
            >
              <div className="flex items-center"></div>
              <div className="w-24 h-24 relative rounded-xl overflow-hidden bg-gray-100 border shrink-0 shadow-sm">
                <Image
                  src={`${val.productImageUrl}` || "/a.jpg"}
                  fill
                  alt={val.productName}
                  className="object-cover group-hover:scale-105 transition-transform"
                  unoptimized
                />
              </div>

              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight">
                      {val.productName}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                      {val.description}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {val.attributes.map((attr, ind) => (
                    <span
                      key={ind}
                      className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium"
                    >
                      {attr.name}: {attr.value}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">
                    Rs. {val.totalPrice.toLocaleString()}
                  </span>

                  <div className="flex text-sm items-center bg-white overflow-hidden">
                    Quantity:
                    <span className="px-3 font-bold w-8 text-center">
                      {val.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <input type="hidden" name="amount" value={total} />
      <input type="hidden" name="tax_amount" value="0" />
      <input type="hidden" name="total_amount" value={total} />
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />
      <input type="hidden" name="transaction_uuid" value={transactionUid} />
      <input type="hidden" name="product_code" value="EPAYTEST" />
      <input
        type="hidden"
        name="success_url"
        value="http://localhost:3000/success"
      />
      <input
        type="hidden"
        name="failure_url"
        value="http://localhost:3000/failure"
      />
      <input
        type="hidden"
        name="signed_field_names"
        value="total_amount,transaction_uuid,product_code"
      />
      <input type="hidden" name="signature" value={signature} />

      <div className="flex justify-between items-center mt-5">
        <div className="text-sm text-gray-700">
          Total: <span className="font-semibold">Rs. {totalPrice}</span>
        </div>
        <Button type="submit">Pay with eSewa</Button>
      </div>
    </form>
  ) : (
    <form
      className="rounded-xl bg-background p-2 space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-lg font-semibold">Shipping Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="shippingName">Full Name</Label>
          <Input
            id="shippingName"
            type="text"
            placeholder="John Doe"
            {...register("shippingName")}
          />
          {errors.shippingName && (
            <p className="text-sm text-red-500">
              {errors.shippingName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="shippingPhone">Phone Number</Label>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
            maxLength={10}
            placeholder="Enter your phone number"
            {...register("shippingPhone")}
          />
          {errors.shippingPhone && (
            <p className="text-sm text-red-500">
              {errors.shippingPhone.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="shippingAddress">Address</Label>
        <Input
          id="shippingAddress"
          type="text"
          placeholder="Street, Area, House No."
          {...register("shippingAddress")}
        />
        {errors.shippingAddress && (
          <p className="text-sm text-red-500">
            {errors.shippingAddress.message}
          </p>
        )}
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="shippingCity">City</Label>
        <Input
          id="shippingCity"
          type="text"
          placeholder="Kathmandu"
          {...register("shippingCity")}
        />
        {errors.shippingCity && (
          <p className="text-sm text-red-500">{errors.shippingCity.message}</p>
        )}

        <Button type="submit" className="mt-5">
          Submit
        </Button>
      </div>
    </form>
  );
};
