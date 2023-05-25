import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
} from "@mui/material";
import {
  faAdd,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ButtonUI from "../../../components/ui/button/button";
import "./foods-table.scss";

import { useState } from "react";

const FoodsTable = ({ orderList, orderShow }) => {
  const uploadPath = useSelector((state) => state.app.uploadPath);
  const [open, setOpen] = React.useState(false);
  const [productList, setProductList] = useState({});
  const status_id = orderShow.status_id;

  const editHandle = (row, id, orders_number, quan) => {
    setProductList(row);
    setOpen(true);
  };

  const deleteHandle = (id, orders_number) => {
    console.log(orders_number);
    console.log(id);
  };

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
          {(status_id === 2 || status_id === 3) && (
            <TableCell align="center">Action</TableCell>
          )}
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
              {(status_id === 2 || status_id === 3) && (
                <TableCell
                  align="center"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5rem",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      editHandle(row, row.id, row.orders_number, row.quantity)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => deleteHandle(row.id, row.orders_number)}
                  >
                    Del
                  </Button>
                </TableCell>
              )}
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
      <ModalEdit open={open} setOpen={setOpen} productList={productList} setProductList={setProductList} />
    </Table>
  );
};

const ModalEdit = ({ setOpen, open, productList, setProductList }) => {
  const handleClose = () => setOpen(false);

  const quantityHandle = (isAdding) => {
    if (isAdding) {
      if (productList.quantity >= 10) return false;
      setProductList((prev) => {
        return {...prev, quantity: productList.quantity + 1}
      })
    } else {
      if (productList.quantity <= 1) return false;
        setProductList((prev) => {
        return {...prev, quantity: productList.quantity - 1}
      } )
    }
  }

  const saveHandle = () => {
    console.log('click click')
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Product List
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {productList.product_name}
          <div className="input-group">
            <ButtonUI color="error" onClick={(e) => quantityHandle(false)}>
              <FontAwesomeIcon icon={faMinus} />
            </ButtonUI>
            <span className="title">
             Quantity {productList.quantity}
            </span>
            <ButtonUI onClick={(e) => quantityHandle(true)}>
              <FontAwesomeIcon icon={faAdd} />
            </ButtonUI>
          </div>
        </Typography>
        <div
          className="button-footer"
          style={{
            width: "100%",
            display: "flex",
            gap: ".5rem",
            justifyContent: "end",
            marginTop: "2rem",
          }}
        >
          <Button
            variant="contained"
            onClick={(e) => saveHandle()}
            sx={{ height: "30px" }}
          >
            save
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default FoodsTable;
