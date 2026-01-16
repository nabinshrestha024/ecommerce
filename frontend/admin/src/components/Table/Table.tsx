import { flexRender, type Table as TableType } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

interface GenericTableProps<TData> {
  table: TableType<TData>;
  pageIndex?: number;
  showPagination?: boolean;
  pageSize?: number;
}

export const Table = <TData,>({
  table,
  pageIndex,
  showPagination = true,
  pageSize,
}: GenericTableProps<TData>) => {
  const totalPages = table.getPageCount();
  const maxVisiblePages = 10;

  const currentPage = pageIndex ?? table.getState().pagination.pageIndex;

  let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));

  let endPage = startPage + maxVisiblePages;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(0, endPage - maxVisiblePages);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i,
  );

  return (
    <div className="space-y-3">
      <table className="min-w-full rounded-lg">
        <thead className="bg-[#EAF8E7] dark:bg-accent">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 border-b align-top text-left"
                >
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
              {row.getVisibleCells().map((cell) => {
                const cellName = cell.column.id;
                return (
                  <td
                    key={cell.id}
                    className={`${
                      cellName === "name"
                        ? "w-[260px]"
                        : cellName === "content"
                          ? "w-[250px]"
                          : cellName === "userName"
                            ? "w-[260px]"
                            : cellName === "productName"
                              ? "w-[260px]"
                              : cellName === "price"
                                ? "w-[100px]"
                                : cellName === "discountValue"
                                  ? "w-[150px]"
                                  : ""
                    } p-3 border-b align-middle whitespace-nowrap`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {showPagination && (
        <div className="flex items-center justify-between">
          <Pagination>
            <PaginationContent className="flex justify-around w-full">
              <PaginationItem className="flex gap-2">
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  aria-disabled={!table.getCanPreviousPage()}
                  className={
                    !table.getCanPreviousPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />

                {startPage > 0 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => table.setPageIndex(0)}
                        isActive={currentPage === 0}
                        className="cursor-pointer hover:bg-muted"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                      <span className="px-2 text-muted-foreground">...</span>
                    </PaginationItem>
                  </>
                )}

                {visiblePages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => table.setPageIndex(page)}
                      isActive={currentPage === page}
                      className={`
                        hover:bg-muted
                        ${
                          currentPage === page
                            ? "cursor-default data-[active=true]:bg-[#C1E6BA]"
                            : "cursor-pointer"
                        }
                      `}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {endPage < totalPages && (
                  <>
                    <PaginationItem>
                      <span className="px-2 text-muted-foreground">...</span>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationLink
                        onClick={() => table.setPageIndex(totalPages - 1)}
                        isActive={currentPage === totalPages - 1}
                        className="cursor-pointer hover:bg-muted"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationNext
                  onClick={() => table.nextPage()}
                  aria-disabled={!table.getCanNextPage()}
                  className={
                    !table.getCanNextPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <Select
                  defaultValue={String(pageSize)}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger className="w-20 cursor-pointer">
                    <SelectValue placeholder="Rows" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
