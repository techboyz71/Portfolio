// TableElement.tsx
import type { JSX } from "react/jsx-dev-runtime";
import React, { useState } from "react";

interface tableProps {
  headersData: { label: string; icon?: JSX.Element }[];
  data: any[];
  className?: string;
  onRowClick?: (row: any) => void;
}

// converts header label -> camelCase key
function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, "");
}

function TableElement({
  headersData,
  data,
  className,
  onRowClick,
}: tableProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleRowClick = (row: any, index: number) => {
    setSelectedIndex(index);
    onRowClick?.(row);
  };

  return (
    <div
      className={`${className} border-2 border-green-200 overflow-x-auto overflow-y-auto rounded-2xl`}
    >
      <table className="table-fixed rounded-2xl overflow-hidden w-full">
        <thead className="sticky top-0 z-10 text-blue-950 overflow-hidden">
          <tr>
            {headersData.map((item, index) => (
              <th
                key={index}
                className="py-2 px-2 sticky bg-green-400 text-white border-b-2 border-green-200 text-xs"
                style={{ width: `${100 / headersData.length}%` }}
              >
                <div className="flex flex-row items-center justify-center gap-1 text-xs">
                  {item.label}
                  <div>
                    {item.icon &&
                      React.cloneElement(item.icon, {
                        className: "w-7 h-7 text-white",
                      })}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            const isSelected = selectedIndex === index;

            return (
              <tr
                key={index}
                onClick={() => handleRowClick(item, index)}
                className={`text-blue-950 border-b border-gray-200 cursor-pointer transition-colors duration-200 ease-in-out 
                  ${
                    isSelected
                      ? "bg-green-200 hover:bg-green-300"
                      : "hover:bg-gray-200"
                  }
                `}
              >
                {headersData.map((header) => (
                  <td
                    key={header.label}
                    className="px-2 py-2 text-center text-xs"
                  >
                    {item[toCamelCase(header.label)]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableElement;
