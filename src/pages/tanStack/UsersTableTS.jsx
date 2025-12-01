// VirtualizedMuiTableUnified.jsx
import React, { useRef, useState, useLayoutEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@material-ui/core";
import { useVirtualizer } from "@tanstack/react-virtual";

/**
 * Props:
 *  - rows
 *  - initialHeight (optional) -> used as initial/ fallback height in px (default 400)
 *  - rowHeight (default 48)
 *  - bottomOffset (optional) -> pixels to subtract from available space (e.g. footer/header height)
 */
export default function VirtualizedMuiTableUnified({
  rows,
  initialHeight = 400,
  rowHeight = 48,
  bottomOffset = 30,
}) {
  const columns = [
    { field: "id", label: "ID" },
    { field: "firstName", label: "First Name" },
    { field: "lastName", label: "Last Name" },
    { field: "age", label: "Age" },
    { field: "phone", label: "Phone" },
    { field: "location", label: "Location" },
  ];

  // wrapper is used to measure where the component sits on the page
  const wrapperRef = useRef(null);
  // the scrollable container used by the virtualizer
  const tableContainerRef = useRef(null);

  // measured height in px used as explicit height for the scroll element
  const [containerHeight, setContainerHeight] = useState(initialHeight);

  // measure available height (distance from top of wrapper to viewport bottom minus bottomOffset)
  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    let rafId = null;
    const measure = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      // available space between top of wrapper and bottom of viewport
      const available = Math.max(0, window.innerHeight - rect.top - bottomOffset);
      // enforce a sensible min height so virtualizer has some viewport
      const finalHeight = Math.max(50, Math.round(available));
      setContainerHeight(finalHeight);
    };

    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    // initial measure
    measure();

    // listen to window resize
    window.addEventListener("resize", onResize, { passive: true });

    // observe layout changes (e.g., parent size changes)
    const ro = new ResizeObserver(onResize);
    // observe the wrapper and also the document body (covers overall layout changes)
    ro.observe(wrapperRef.current);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [bottomOffset]);

  // virtualizer will use the tableContainerRef (scroll element)
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => rowHeight,
    overscan: 5
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - virtualItems[virtualItems.length - 1].end
      : 0;

  return (
    // wrapperRef used for measuring the component's top position
    <Paper ref={wrapperRef} style={{ display: "block" }}>
      <TableContainer
        ref={tableContainerRef}
        // set explicit measured height so virtualization can compute viewport
        style={{ height: containerHeight, overflow: "auto" }}
      >
        <Table stickyHeader style={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field} style={{ fontWeight: 600 }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Top padding for virtual rows */}
            {paddingTop > 0 && (
              <TableRow style={{ height: paddingTop }}>
                <TableCell colSpan={columns.length} />
              </TableRow>
            )}

            {/* Actual virtualized rows */}
            {virtualItems.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <TableRow
                  key={row.id ?? virtualRow.index}
                  hover
                  style={{ height: rowHeight }}
                  aria-rowindex={virtualRow.index + 1}
                  aria-rowcount={rows.length}
                >
                  {columns.map((col) => (
                    <TableCell key={col.field}>
                      {row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}

            {/* Bottom padding */}
            {paddingBottom > 0 && (
              <TableRow style={{ height: paddingBottom }}>
                <TableCell colSpan={columns.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
