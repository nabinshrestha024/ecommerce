import { Navigate, Route, Routes } from "react-router-dom";
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

export const App = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};
