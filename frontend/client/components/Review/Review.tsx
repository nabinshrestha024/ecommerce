"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { Dialog } from "../dialog/Dialog";
import { useMemo, useState } from "react";
import { ReviewForm } from "./components/ReviewForm";
import { useFetchWebsiteReview } from "@/hooks/websiteReview/useFetchWebsiteReview";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/ui/button";
import { ReviewSkeleton } from "./components/ReviewSkeleton";

export const Review = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const { token } = useAuth();
  const { data, isError, isLoading } = useFetchWebsiteReview();
  const [open, setOpen] = useState(false);

  const reviews = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data],
  );

  const displayReviews = useMemo(() => {
    return [...reviews]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 6);
  }, [reviews]);

  const placeholderCount = 6;
  const isReady = !isLoading && !isError;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 text-center">
      <h2 className="mb-3 text-4xl font-semibold text-emerald-600">
        Our Happy Customers
      </h2>

      <p className="mx-auto mb-14 max-w-2xl text-gray-600">
        Dont just take our word for it – see how our products and services have
        delighted customers across the globe, one experience at a time.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {isLoading &&
          Array.from({ length: placeholderCount }).map((_, index) => (
            <ReviewSkeleton key={index} />
          ))}

        {isError &&
          Array.from({ length: placeholderCount }).map((_, index) => (
            <ReviewSkeleton key={index} />
          ))}

        {isReady &&
          displayReviews.map((item, id) => (
            <div
              key={item.reviewId ?? item.userId ?? id}
              className="rounded-2xl border bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-lg hover:bg-[#EAF8E7] hover:cursor-pointer"
            >
              <div className="mb-4 flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 relative overflow-hidden rounded-full">
                  <Image
                    src={item.userImageUrl || "/default.jpg"}
                    alt={item.userName}
                    fill
                    className="w-full h-full  object-cover shrink-0"
                    unoptimized
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.userName}
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

              <p
                className={`leading-relaxed text-gray-700 ${clicked ? "" : "line-clamp-3"}`}
                onClick={() => setClicked(!clicked)}
              >
                {item.content}
              </p>
            </div>
          ))}
      </div>
      {token ? (
        <Dialog
          open={open}
          onOpenChange={setOpen}
          triggerClassName="mx-auto mt-14 rounded-full bg-slate-900 px-10 py-4 text-sm font-medium text-white transition hover:bg-slate-600 hover:cursor-pointer"
          triggerText="Add Your Own Review"
        >
          <div className="p-6">
            <ReviewForm onClose={() => setOpen(false)} />
          </div>
        </Dialog>
      ) : (
        <Button
          onClick={() => router.push("/login")}
          className="mx-auto mt-14 rounded-full bg-slate-900 px-10 py-4 text-sm font-medium text-white transition hover:bg-slate-600"
        >
          Add Your Own Review
        </Button>
      )}
    </section>
  );
};
