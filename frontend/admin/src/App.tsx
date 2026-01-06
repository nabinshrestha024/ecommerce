import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/dashboard";
import { OrderManagement } from "./screens/order-management";
import { Customer } from "./screens/customer";
import { Category } from "./screens/category";
import { ProductManagement } from "./screens/product-management";
import { Profile } from "./screens/profile";
import { Login } from "./screens/login";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";
import { Vendor } from "./screens/vendor";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { AttributeManagement } from "./screens/attribute-management";
import { TagManagement } from "./components/Tags/TagManagement";

export const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route
              path="/attribute-management"
              element={<AttributeManagement />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/tag-management" element={<TagManagement />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
const LoginLayout = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Outlet />
    </div>
  );
};
const AppLayout = () => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
