import { NavCategories } from "./components/NavCategories";
import { NavRoutes } from "./components/NavRoutes";
import { TopNav } from "./components/TopNav";

export const Navbar = () => {
  return (
    <div>
      <TopNav />
      <NavRoutes />
      <NavCategories />
    </div>
  );
};
