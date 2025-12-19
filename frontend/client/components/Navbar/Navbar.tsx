import { NavRoutes } from "./components/NavRoutes";
import { TopNav } from "./components/TopNav";

export const Navbar = () => {
  return (
    <div>
      <TopNav />
      <div className="hidden lg:block">
        <NavRoutes />
      </div>
    </div>
  );
};
