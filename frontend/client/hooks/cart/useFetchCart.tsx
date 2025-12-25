import { CartProductType } from "@/components/Navbar/components/TopNav";
import { fetchCart } from "@/lib/cart/fetchCart";
import { useQuery } from "@tanstack/react-query";

export const useFetchCart = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    CartProductType[]
  >({
    queryKey: ["fetchCart"],
    queryFn: fetchCart,
  });
  return { data, isLoading, isError, error, refetch };
};
