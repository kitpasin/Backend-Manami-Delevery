import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DateMoment from "../../components/ui/date-moment/date-moment";
import ExcelJS from "exceljs";
import saveAs from "file-saver";

const ReportsCard = ({ items, dateValue, monthValue, yearValue, startDate, endDate }) => {
  let formatDateValue = "";
  let formatMonthValue = "";
  let formatYearValue = "";
  let formatStartDateValue = "";
  let formatEndDateValue = "";

  if (dateValue) {
    const year = dateValue.getFullYear();
    const month = String(dateValue.getMonth() + 1).padStart(2, "0");
    const day = String(dateValue.getDate()).padStart(2, "0");

    formatDateValue = `${year}-${month}-${day}`;

    console.log(formatDateValue);
  } else if (monthValue) {
    const year = monthValue.getFullYear();
    const month = String(monthValue.getMonth() + 1).padStart(2, "0");

    formatMonthValue = `${year}-${month}`;

    console.log(formatMonthValue);
  } else if (yearValue) {
    const year = yearValue.getFullYear();

    formatYearValue = `${year}`;

    console.log(formatYearValue);
  } else if (startDate && !endDate) {
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");

    formatStartDateValue = `${year}-${month}-${day}`;

    console.log(formatStartDateValue);
  } else if ((startDate && endDate) || (!startDate && endDate)) {
    const year = endDate.getFullYear();
    const month = String(endDate.getMonth() + 1).padStart(2, "0");
    const day = String(endDate.getDate()).padStart(2, "0");

    formatEndDateValue = `${year}-${month}-${day}`;

    console.log(formatEndDateValue);
  } else {
    console.log("No Data Found");
  }

  const [summaryValues, setSummaryValues] = useState({
    num: 0,
    productPrice: 0,
    deliveryPrice: 0,
    totalPrice: 0,
  });

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    let updateProductPrice = 0;
    let updateDeliveryPrice = 0;
    let updateTotalPrice = 0;

    // Show Report Condition
    const filteredItems = items.filter((row) => {
      if (row.status_id === 4) {
        // Format Date
        let newFormatDate = row.transaction_date.split(" ")[0];
        // Format Month
        const [m_year, m_month] = row.transaction_date.split("-");
        let newFormatMonth = `${m_year}-${m_month}`;
        // Format Year
        let newFormatYear = row.transaction_date.split("-")[0];
        if (newFormatDate >= formatStartDateValue && newFormatDate <= formatEndDateValue) {
          return true;
        } else if (formatDateValue && newFormatDate === formatDateValue) {
          return true;
        } else if (formatMonthValue && newFormatMonth === formatMonthValue) {
          return true;
        } else if (formatYearValue && newFormatYear === formatYearValue) {
          return true;
        }
      }
      return false;
    });

    filteredItems.forEach((row) => {
      updateProductPrice += row.total_price;
      updateDeliveryPrice += row.delivery_price;
      updateTotalPrice += row.total_price + row.delivery_price;
    });

    setSummaryValues({
      productPrice: updateProductPrice,
      deliveryPrice: updateDeliveryPrice,
      totalPrice: updateTotalPrice,
    });

    setFilteredItems(filteredItems);
  }, [
    items,
    formatStartDateValue,
    formatEndDateValue,
    formatDateValue,
    formatMonthValue,
    formatYearValue,
  ]);

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add headers to the worksheet
    const headerRow = worksheet.addRow([
      "Order Number",
      "Customer Name",
      "Branch",
      "Order Type",
      "Transaction Date",
      "Product Price",
      "Delivery Price",
      "Total Price",
    ]);
    headerRow.font = { bold: true };

    // Add data to the worksheet
    filteredItems.forEach((row) => {
      worksheet.addRow([
        row.orders_number,
        row.member_name,
        row.branch_name,
        row.type_order,
        row.transaction_date,
        row.total_price + " THB",
        row.delivery_price + " THB",
        row.total_price + row.delivery_price + " THB",
      ]);
    });

    // Add headers to the worksheet Summary
    const headerRow2 = worksheet.addRow(["Summary Product Price", "Delivery Price", "Total Price"]);headerRow2.font = { bold: true };

    // Add data to the worksheet Summary
    worksheet.addRow([
      summaryValues.productPrice + "THB",
      summaryValues.deliveryPrice + "THB",
      summaryValues.totalPrice + "THB",
    ]);

    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      column.width = Math.max(12, column.width);
    });

    // Generate the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "data.xlsx");
    });
  };

  return (
    <>
      {filteredItems.length !== 0 && (
        <Button variant="contained" color="success" size="small" onClick={exportToExcel} style={{marginBottom:"24px",textTransform:"initial"}}>
          Export to Excel
        </Button>
      )}

      <TableContainer component={Paper} className="card-desktop" style={{ marginBottom: "24px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Summary Product Price</TableCell>
              <TableCell align="left">Summary Delivery Price</TableCell>
              <TableCell align="left">Summary Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="left">{summaryValues.productPrice} THB</TableCell>
              <TableCell align="left">{summaryValues.deliveryPrice} THB</TableCell>
              <TableCell align="left">{summaryValues.totalPrice} THB</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} className="card-desktop">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Order Number</TableCell>
              <TableCell align="left">Customer Name</TableCell>
              <TableCell align="left">Branch</TableCell>
              <TableCell align="left">Order Type</TableCell>
              <TableCell align="left">Transaction Date</TableCell>
              <TableCell align="left">Product Price</TableCell>
              <TableCell align="left">Delivery Price</TableCell>
              <TableCell align="left">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((row, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="left">{row.orders_number}</TableCell>
                <TableCell align="left">{row.member_name}</TableCell>
                <TableCell align="left">{row.branch_name}</TableCell>
                <TableCell align="left">{row.type_order}</TableCell>
                <TableCell align="left">
                  <DateMoment format={"LLL"} date={row.transaction_date} />
                </TableCell>
                <TableCell align="left">{row.total_price} THB</TableCell>
                <TableCell align="left">{row.delivery_price} THB</TableCell>
                <TableCell align="left">{row.total_price + row.delivery_price} THB</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReportsCard;
