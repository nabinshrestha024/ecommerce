import { CartProductType } from "@/components/Navbar/components/TopNav";
import { useAuth } from "@/contexts/AuthContext";
import { fetchCart } from "@/lib/cart/fetchCart";
import { useQuery } from "@tanstack/react-query";

export const useFetchCart = () => {
  const { token } = useAuth();
  const { data, isLoading, isError, error, refetch } = useQuery<
    CartProductType[]
  >({
    queryKey: ["fetchCart"],
    queryFn: fetchCart,
    enabled: !!token,
  });
  return { data, isLoading, isError, error, refetch };
};
