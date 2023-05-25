import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import ButtonUI from "../../../components/ui/button/button";

const FoodsTable = ({ orderList }) => {
  const uploadPath = useSelector((state) => state.app.uploadPath);

  // console.log(orderList)

  return (
    <Table
      sx={{ minWidth: 650 }}
      aria-label="simple table"
      style={{ backgroundColor: "rgb(233 233 233)" }}
    >
      <TableHead>
        <TableRow>
          <TableCell>No.</TableCell>
          <TableCell align="left">Product Image</TableCell>
          <TableCell align="left">Product Name</TableCell>
          <TableCell align="left">Category</TableCell>
          <TableCell align="left">Price</TableCell>
          <TableCell align="left">Quantity</TableCell>
          <TableCell align="left">Microwave</TableCell>
          <TableCell align="left">Sweetness</TableCell>
          <TableCell align="left">Requirements</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orderList?.map((row, index) => (
          <React.Fragment key={index}>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell align="left">{++index}</TableCell>
              <TableCell className="product-image" align="center">
                <figure>
                  <img
                    src={`${uploadPath + row.thumbnail_link}`}
                    alt="washingIcon"
                  />
                </figure>
              </TableCell>
              <TableCell align="left">{row.product_name}</TableCell>
              <TableCell align="left">{row.cate_title}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.quantity}</TableCell>
              <TableCell align="left">{row.microwave_name}</TableCell>
              <TableCell align="left">{row.sweetness_name}</TableCell>
              <TableCell align="left">{row.requirements}</TableCell>
              <TableCell align="center">
                <ButtonUI
                  style={{minWidth: "65px"}}
                  onClick={(e) => console.log("click")}
                  on="show"
                  className="btn-custom onShow"
                  width="small"
                >
                  Edit
                </ButtonUI>
                <ButtonUI
                  style={{minWidth: "65px"}}
                  onClick={(e) => console.log("click")}
                  on="delete"
                  className="btn-custom onDelete"
                  icon=""
                >
                  Delete
                </ButtonUI>
              </TableCell>
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default FoodsTable;
