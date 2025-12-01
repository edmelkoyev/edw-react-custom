import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { VariableSizeList as List } from "react-window";

const tableHeightTotal = 500;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: tableHeightTotal,              // total height of the table including header
    overflow: "hidden"
  },
  table: {
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "collapse"
  },
  row: {
    display: "table",
    tableLayout: "fixed",
    width: "100%"
  },
  headerRow: {
    display: "table",
    tableLayout: "fixed",
    width: "100%",
    backgroundColor: theme.palette.grey[200]
  },
  tableBody: {
    display: "block",
    height: "100%",
    overflow: "auto",
  }
}));

export default function UsersTableRW({ rows, rowHeight = 48 }) {
    const classes = useStyles();

    const columns = [
      { field: "id", label: "ID" },
      { field: "firstName", label: "First Name" },
      { field: "lastName", label: "Last Name" },
      { field: "age", label: "Age" },
      { field: "phone", label: "Phone" },
      { field: "location", label: "Location" },
    ];

    const renderRow = ({ index, style }) => {
      const row = rows[index];

      return (
        <TableRow
          component="div"
          hover
          role="row"
          className={classes.row}
          aria-rowindex={index + 1}
          aria-rowcount={rows.length}
          style={style}
          key={row.id}
        >
          {columns.map((col) => (
            <TableCell component="div" role="cell" key={col.field}>
              {row[col.field]}
            </TableCell>
          ))}
        </TableRow>
      );
    };


  const getRowHeight = index => {
    const item = rows[index];
    
    return item.location?.length > 25 ? 96 : rowHeight; // Each item in your data can have a different height
  };


    return (
      <Paper className={classes.root}>
        <Table className={classes.table} component="div" role="table" aria-label="Users table">
          <TableHead component="div" role="rowgroup">
            <TableRow className={classes.headerRow} component="div" role="row">
              {columns.map((col) => (
                <TableCell component="div" role="columnheader" key={col.field}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody
            role="rowgroup"
            component="div"
            className={classes.tableBody}
          >
            <List
              height={tableHeightTotal - rowHeight}
              itemCount={rows.length}
              itemSize={getRowHeight}
              width={"100%"}
            >
              {renderRow}
            </List>
          </TableBody>
        </Table>
      </Paper>
    );
}
