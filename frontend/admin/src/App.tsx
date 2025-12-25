import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/dashboard";
import { OrderManagement } from "./screens/order-management";
import { Customer } from "./screens/customer";
import { Category } from "./screens/category";
import { ProductManagement } from "./screens/product-management";
import { Transaction } from "./screens/transaction";
import { Profile } from "./screens/profile";
import { Login } from "./screens/login";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";
import { ViewProduct } from "./screens/view-product";
import { Vendor } from "./screens/vendor";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";

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
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/view-products" element={<ViewProduct />} />
            <Route path="/vendor" element={<Vendor />} />
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
    <>
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};
