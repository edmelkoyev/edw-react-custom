import React, { useRef, useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

/*
Props:
  - rows: array of data
  - columns: [{ field, label, width }]
  - rowHeight: px
*/
export default function UsersTableTSScroll({
  rows,
  rowHeight = 48
}) {
  const wrapperRef = useRef(null); // used to measure where the table sits on page
  const columns = [
    { field: "id", label: "ID", width: "10%" },
    { field: "firstName", label: "First Name",width: "20%"  },
    { field: "lastName", label: "Last Name",width: "20%"  },
    { field: "age", label: "Age", width: "10%"  },
    { field: "phone", label: "Phone", width: "20%" },
    { field: "location", label: "Location", width: "20%"  },
  ];

  // Window virtualizer
  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => rowHeight,
    overscan: 8
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return (
    <Paper style={{ margin: "20 0" }}>
      {/* wrapperRef defines where table sits on the page; we measure it */}
      <div ref={wrapperRef}>
        <Table stickyHeader style={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  style={{
                    width: col.width,
                    minWidth: col.width,
                    fontWeight: 600
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody
            component="tbody"
            style={{
              position: "relative",
              height: totalSize
            }}
          >
            {virtualItems.map((vi) => {
              const row = rows[vi.index];
              const top = vi.start;

              return (
                <TableRow
                  key={row.id ?? vi.index}
                  hover
                  aria-rowindex={vi.index + 1}
                  aria-rowcount={rows.length}
                  style={{
                    position: "absolute",
                    top,
                    left: 0,
                    right: 0,
                    height: rowHeight,
                    display: "flex",
                    width: "100%",
                    boxSizing: "border-box"
                  }}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.field}
                      style={{
                        width: col.width,
                        minWidth: col.width,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        padding: "8px",
                        boxSizing: "border-box",
                        alignContent: "center"
                      }}
                    >
                      {row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}
