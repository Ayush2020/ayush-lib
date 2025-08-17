import { useState } from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
};

type DataTableProps<T extends {}> = {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
};

const DataTable = <T extends object>({
  data,
  columns,
  loading = true,
  selectable: _selectable = false,
  onRowSelect: _onRowSelect = () => {},
}: DataTableProps<T>) => {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <table className="table-auto w-full bg-white border border-gray-300">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.accessor)}
              className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100 "
              onClick={() => handleSort(col.accessor)}
            >
              <div className="flex gap-1">
                <span>{col.header}</span>
                <span>
                  {sortKey === col.accessor
                    ? sortOrder === "asc"
                      ? "⬆️"
                      : "⬇️"
                    : ""}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              Loading...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              No data available...
            </td>
          </tr>
        ) : (
          sortedData.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-600">
              {columns.map((col) => (
                <td key={String(col.accessor)} className="border px-4 py-2">
                  {String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
