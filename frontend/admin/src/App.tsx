import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/dashboard";
import { OrderManagement } from "./screens/order-management";
import { Customer } from "./screens/customer";
import { Category } from "./screens/category";
import { ProductManagement } from "./screens/product-management";
import { Transaction } from "./screens/transaction";
import { Profile } from "./screens/profile";
import { Login } from "./screens/login";
import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";

export const App = () => {
  return (
    <>
      <Navbar />
      {/*simran*/}
      <Sidebar />
      {/*utsarga*/}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/*utsarga*/}
        <Route path="/order-management" element={<OrderManagement />} />
        {/*simran*/}
        <Route path="/customer" element={<Customer />} />
        {/*pranawa*/}
        <Route path="/category" element={<Category />} />
        {/*pranawa*/}
        <Route path="/product-management" element={<ProductManagement />} />
        {/*amardeep*/}
        <Route path="/transaction" element={<Transaction />} />
        {/*simran*/}
        <Route path="/profile" element={<Profile />} />
        {/*amardeep*/}
        <Route path="/login" element={<Login />} />
        {/*utsarga*/}
      </Routes>
    </>
  );
};
