import { useAuth } from "@/context/AuthContext";
import { Button } from "@/ui/button";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "../ConfirmationDialog/ConfirmationDialog";

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <ConfirmationDialog
      trigger={
        <Button variant="default">
          <IoExitOutline className="text-2xl" />
        </Button>
      }
      confirmFunc={handleLogout}
      description="Do you want to logout?"
    />
  );
};
