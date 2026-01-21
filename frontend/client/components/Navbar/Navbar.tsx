import { NavRoutes } from "./components/NavRoutes";
import { TopNav } from "./components/TopNav";

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-10" id="top">
      <TopNav />
      <div className="hidden md:block">
        <NavRoutes />
      </div>
    </div>
  );
};
