import React from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Order List",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Transaction Date",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: false,
    label: "Delivery",
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: false,
    label: "Wash&Dry/Food",
  },
  {
    id: "protein",
    numeric: false,
    disablePadding: false,
    label: "Total Price",
  },
  {
    id: "payment",
    numeric: false,
    disablePadding: false,
    label: "Payment Type",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Order Status",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "normal" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableTab({ orderList }) {
  // const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            // size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead />
            <TableBody>
              {orderList?.map((row, index) => {
                return (
                  <TableRow tabIndex={-1} key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="normal"
                    >
                      {row.type_order}
                    </TableCell>
                    <TableCell align="left">{row.transaction_date}</TableCell>
                    <TableCell align="left">{row.delivery_price} THB</TableCell>
                    <TableCell align="left">{row.total_price} THB</TableCell>
                    <TableCell align="left">
                      {row.total_price + row.delivery_price} THB
                    </TableCell>
                    <TableCell align="left">{row.type_payment}</TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: row.status_id === 4 ? "#0FB900" : "#E32900",
                      }}
                    >
                      {row.status_id === 4 ? "Complete" : "Fails"}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={
                    {
                      // height: (dense ? 33 : 53) * emptyRows,
                    }
                  }
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={orderList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
