"use client";
import Image from "next/image";
import { ReviewData } from "./components/ReviewData.import";
import { Star } from "lucide-react";
import { Dialog } from "../Dialog/Dialog";
import { useState } from "react";
import { ReviewForm } from "./components/ReviewForm";
import { useGetOrderById } from "@/hooks/orders/useGetOrderById";
import { useFetchWebsiteReview } from "@/hooks/websiteReview/useFetchWebsiteReview";
export const Review = () => {
  const { data } = useFetchWebsiteReview();
  const [open, setOpen] = useState(false);
  const reviews = Array.isArray(data?.data) ? [...data?.data] : [];
  const displayReviews = reviews.slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 text-center">
      <h2 className="mb-3 text-4xl font-semibold text-emerald-600">
        Our Happy Customers
      </h2>

      <p className="mx-auto mb-14 max-w-2xl text-gray-600">
        Don’t just take our word for it – see how our products and services have
        delighted customers across the globe, one experience at a time.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayReviews.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-lg hover:bg-[#EAF8E7] hover:cursor-pointer`}
          >
            <div className="mb-4 flex items-center gap-4">
              <Image
                src={item.image || "/default.jpg"}
                alt={item.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />

              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.userId}
                </h4>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < item.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="leading-relaxed text-gray-700">{item.content}</p>
          </div>
        ))}
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        triggerText={
          <button
            onClick={() => setOpen(true)}
            className="mx-auto mt-14 rounded-full bg-slate-900 px-10 py-4 text-sm font-medium text-white transition hover:bg-slate-600 hover:cursor-pointer"
          >
            Add Your Own Review
          </button>
        }
      >
        <div>
          <ReviewForm onClose={() => setOpen(false)} />
        </div>
      </Dialog>
    </section>
  );
};
