import React from 'react';
import Spinner from '../../common/Spinner';

interface Column<Type> {
  header: string;
  key: keyof Type | string;
  render?: (item: Type) => React.ReactNode;
}

interface PaginationData<Type> {
  current_page: number;
  data: Type[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface PaginatedTableProps<Type> {
  data: PaginationData<Type>;
  columns: Column<Type>[];
  isLoading: boolean;
}

const PaginatedTable = <Type extends object>({
  data,
  columns,
  isLoading,
}: PaginatedTableProps<Type>): React.ReactNode => {
  return (
    <div className="w-full">
      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[544px]">
          <Spinner />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="py-4 px-4 font-medium text-black dark:text-white"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="border-b border-[#eee] py-3 px-4 dark:border-strokedark"
                    >
                      {column.render
                        ? column.render(item)
                        : String(item[column.key as keyof Type])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaginatedTable;
