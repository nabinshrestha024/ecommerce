import { flexRender, type Table as TableType } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/ui/pagination";

interface GenericTableProps<TData> {
  table: TableType<TData>;
  pageIndex: number;
  showPagination?: boolean;
}

export const Table = <TData,>({
  table,
  pageIndex,
  showPagination = true,
}: GenericTableProps<TData>) => {
  const totalPages = table.getPageCount();
  return (
    <div className="space-y-3">
      <table className="min-w-full mt-5 rounded-lg">
        <thead className="bg-[#EAF8E7] dark:bg-accent">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border-b">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-2 border-b text-center whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showPagination && (
        <div className="flex items-center justify-between">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  aria-disabled={!table.getCanPreviousPage()}
                  className={
                    !table.getCanPreviousPage()
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => table.setPageIndex(i)}
                    isActive={pageIndex === i}
                    className="data-[active=true]:bg-[#C1E6BA] data-[active=true]:text-foreground data-[inactive=true]:bg-foreground data-[inactive=true]:text-background"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  aria-disabled={!table.getCanNextPage()}
                  className={
                    !table.getCanNextPage()
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
