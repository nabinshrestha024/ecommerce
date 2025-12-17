import Image from "next/image";
import { ReviewData } from "./components/ReviewData.import";
export const Review = () => {
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
        {ReviewData.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-lg hover:bg-[#EAF8E7]`}
          >
            <div className="mb-4 flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />

              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h4>
                <div className="text-sm text-yellow-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>

            <p className="leading-relaxed text-gray-700">“{item.message}”</p>
          </div>
        ))}
      </div>

      <button className="mx-auto mt-14 rounded-full bg-slate-900 px-10 py-4 text-sm font-medium text-white transition hover:bg-slate-800">
        GET STARTED
      </button>
    </section>
  );
};
