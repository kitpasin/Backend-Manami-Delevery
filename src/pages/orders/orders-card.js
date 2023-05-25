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
  TableRow
} from "@mui/material";
import { t } from "i18next";
import React from "react";
import ButtonUI from "../../components/ui/button/button";
import DateMoment from "../../components/ui/date-moment/date-moment";

const OrdersCard = ({ items, editHandler, deleteHandler }) => {
  return (
      <TableContainer component={Paper} className="card-desktop">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="left">Order Number</TableCell>
              <TableCell align="left">Customer Name</TableCell>
              <TableCell align="left">Branch</TableCell>
              <TableCell align="left">Type Order</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Transaction Date</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {++index}
                </TableCell>
                <TableCell align="left">{row.orders_number}</TableCell>
                <TableCell align="left">{row.member_name}</TableCell>
                <TableCell align="left">{row.branch_name}</TableCell>
                <TableCell align="left">{row.type_order}</TableCell>
                <TableCell align="left">
                  <Chip
                    label={row.status}
                    size="small"
                    color={
                      row.status_id === 1
                        ? "secondary"
                        : row.status_id === 2
                        ? "warning"
                        : row.status_id === 3
                        ? "primary"
                        : row.status_id === 4
                        ? "success"
                        : "error"
                    }
                  />
                </TableCell>
                <TableCell align="left">
                  <DateMoment format={"LLL"} date={row.transaction_date} />
                </TableCell>
                <TableCell align="left" className="column-action">
                  <ButtonUI
                    onClick={(e) =>
                      editHandler(row.orders_number, row.type_order)
                    }
                    on="show"
                    className="btn-custom onShow"
                    width="md"
                    icon={<FontAwesomeIcon icon={faEye} />}
                  >
                    {t("Show")}
                  </ButtonUI>
                  <ButtonUI
                    onClick={(e) => deleteHandler(row.orders_number)}
                    on="delete"
                    className="btn-custom onDelete"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                  >
                    {t("Delete")}
                  </ButtonUI>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default OrdersCard;
