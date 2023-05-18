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
import React, { useState } from "react";
import ButtonUI from "../../components/ui/button/button";
import DateMoment from "../../components/ui/date-moment/date-moment";

const ReportsCard = ({ items }) => {
  const [num, setNum] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  let updatedNum = num;
  let updateProductPrice = productPrice;
  let updateDeliveryPrice = deliveryPrice;
  let updateTotalPrice = totalPrice;

  return (
    <>
      <TableContainer component={Paper} className="card-desktop">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>No.</TableCell> */}
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
            {items.map((row, index) => {
              if (row.status_id === 4) {
                updatedNum++;
                updateProductPrice += row.total_price;
                updateDeliveryPrice += row.delivery_price;
                updateTotalPrice += row.total_price + row.delivery_price;
                return (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    {/* <TableCell component="th" scope="row">
                      {updatedNum}
                    </TableCell> */}
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
                );
              }
              return false;
            })}
          </TableBody>
        </Table>
        {/* <hr />
      <div style={{ margin: "1rem", display: "flex", flexDirection: "column" }}>
        <b style={{ fontWeight: "500" }}>Summary</b>
        <b>Product Price : {updateProductPrice} THB</b>
        <b>Delivery Price : {updateDeliveryPrice} THB</b>
        <b>Total Price : {updateTotalPrice} THB</b>
      </div> */}
      </TableContainer>
      <TableContainer
        component={Paper}
        className="card-desktop"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
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
              <TableCell align="left">{updateProductPrice} THB</TableCell>
              <TableCell align="left">{updateDeliveryPrice} THB</TableCell>
              <TableCell align="left">{updateTotalPrice} THB</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReportsCard;
