import { TransactionDashboard } from "@/components/Transaction/TransactionDashboard";
import { TransactionTable } from "@/components/Transaction/TransactionTable";

export const Transaction = () => {
  return (
    <div className="p-3 space-y-4 w-full">
      <TransactionDashboard />
      <TransactionTable />
    </div>
  );
};
