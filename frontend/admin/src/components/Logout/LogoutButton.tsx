import { useAuth } from "@/context/AuthContext";
import { Button } from "@/ui/button";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Button onClick={handleLogout} variant="default">
      <IoExitOutline className="text-2xl" />
    </Button>
  );
};
