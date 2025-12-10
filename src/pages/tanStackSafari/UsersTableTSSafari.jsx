import React, { useRef, useLayoutEffect, useState } from "react";
import { Box } from "@material-ui/core";

import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

/*
Props:
  - users: array of rows
  - rowHeight: px
*/
export default function UsersTableWithWindowVirtualizer({
  users,
  rowHeight = 54
}) {
  const tableRef = useRef(null);

  // track the table's top position on the page
  const [tableOffset, setTableOffset] = useState(0);

  useLayoutEffect(() => {
    if (tableRef.current) {
      const rect = tableRef.current.getBoundingClientRect();
      // distance from page top = rect.top + scrollY
      setTableOffset(rect.top + window.scrollY);
    }
  }, []);

  // recalc offset on resize/scroll
  useLayoutEffect(() => {
    const updateOffset = () => {
      if (tableRef.current) {
        const rect = tableRef.current.getBoundingClientRect();
        setTableOffset(rect.top + window.scrollY);
      }
    };

    window.addEventListener("scroll", updateOffset);
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  // ---------------------------
  // Internal columns
  // ---------------------------
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: info => <em>{info.getValue()}</em>,
        size: "100px"
      },
      { accessorKey: "firstName", header: "First Name", size: "1fr" },
      { accessorKey: "lastName", header: "Last Name", size: "1fr"},
      { accessorKey: "age", header: "Age", size: "50px" },
      { accessorKey: "phone", header: "Phone", size: "2fr"},
      {
        accessorKey: "location",
        header: "Location",
        cell: info => {
          const ident = info.row.original.id;
          return (
            <>
              <input type="checkbox" id={ident} />
              &#xa0;
              <label for={ident}>{info.getValue()}</label>
            </>
          )
        },
        size: "2fr",  }
    ],
    []
  );

  // ---------------------------
  // TanStack table
  // ---------------------------
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const rows = table.getRowModel().rows;
  const colCount = columns.length;

  const gridTemplateColumns = columns
    .map((col) => col.size)
    .join(" ");

  // ---------------------------
  // Window Virtualizer
  // ---------------------------
  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => rowHeight,
    overscan: 8,
    scrollMargin: tableOffset // *** key part for window virtualizer
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return (
    <Box
      elevation={1}
      style={{
        marginTop: 24,
        marginBottom: 24,
        width: "100%",
      }}
    >
      {/* Single logical table */}
      <Box
        ref={tableRef}
        role="table"
        aria-rowcount={rows.length}
        aria-colcount={colCount}
        style={{
          position: "relative",
          width: "100%"
        }}
      >
        {/* Header rowgroup */}
        <Box
          role="rowgroup"
          style={{
            background: "white",
            boxShadow: "0 1px 0 rgba(0,0,0,0.1)"
          }}
        >
          <Box
            role="row"
            style={{
              display: "grid",
              gridTemplateColumns,
              height: rowHeight,
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              fontWeight: 600,
              padding: "0 8px",
              boxSizing: "border-box"
            }}
          >
            {table.getFlatHeaders().map((header, idx) => (
              <Box
                key={header.id}
                role="columnheader"
                aria-colindex={idx + 1}
                style={{ padding: "8px" }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Body rowgroup */}
        <Box
          role="rowgroup"
          style={{
            height: totalSize,
            width: "100%"
          }}
        >
          {virtualItems.map((vi) => {
            const row = rows[vi.index];

            return (
              <Box
                key={row.id}
                role="row"
                aria-rowindex={vi.index + 1}
                style={{
                  position: "absolute",
                  top: vi.start - tableOffset + rowHeight,
                  left: 0,
                  right: 0,
                  height: rowHeight,
                  display: "grid",
                  gridTemplateColumns,
                  padding: "0 8px",
                  alignItems: "center",
                  borderBottom: "1px solid #f0f0f0",
                  background: vi.index % 2 ?  "white" : "#fafafa",
                  boxSizing: "border-box"
                }}
              >
                {row.getVisibleCells().map((cell, colIdx) => (
                  <Box
                    key={cell.id}
                    role="cell"
                    aria-colindex={colIdx + 1}
                    style={{
                      overflow: "hidden",
                      whiteSpace: "wrap",
                      textOverflow: "ellipsis",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    {flexRender(
                      cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey,
                      cell.getContext()
                    )}
                  </Box>
                ))}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
