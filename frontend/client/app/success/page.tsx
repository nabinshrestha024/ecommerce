"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { usePaymentSuccess } from "@/hooks/esewa/usePaymentSuccess";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  if (data) {
    const successPayment = usePaymentSuccess(data);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle2 className="mx-auto text-green-500" size={72} />

        <h1 className="text-2xl font-semibold mt-4">Payment Successful 🎉</h1>

        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="mt-6 space-y-3">
          <Button
            className="w-full"
            onClick={() => router.push("/profile?page=myOrders")}
          >
            Go to Orders
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/product")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
