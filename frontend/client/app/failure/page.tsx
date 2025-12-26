"use client";

import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button"; // adjust import if needed

export default function PaymentFailurePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <XCircle className="mx-auto text-red-500" size={72} />

        <h1 className="text-2xl font-semibold mt-4">Payment Failed ❌</h1>

        <p className="text-gray-600 mt-2">
          Something went wrong while processing your payment. Please try again
          or choose another payment method.
        </p>

        <div className="mt-6 space-y-3">
          <Button className="w-full" onClick={() => router.push("/home")}>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
