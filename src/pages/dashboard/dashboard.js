import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import "./dashboard.scss";
import { faGamepad, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonUI from "../../components/ui/button/button";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import OrderTable from "./order-tab";
import { getBookingList } from "../../services/booking.service";
import { appActions } from "../../store/app-slice";
import BookingSettings from "./settings";
import { svGetOrders, svGetOrderPending } from "../../services/orders.service";
import Chart from "./chart";
import DatePickerComponent from "./DatePicker";
import { svGetOrderDash } from "../../services/dashboard.service";

const DashboardPage = () => {
  const { t } = useTranslation(["dashboard-page"]);
  const dispatch = useDispatch();
  const [refreshData, setRefreshData] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [filteredData, setFIlteredData] = useState([]);
  const [settings, setSettings] = useState({
    numberPeople: 1,
    timesAvailable: "",
    disabledDay: "",
    disabledDate: "",
    disabledHoliday: "",
  });
  const [year, setYear] = useState(dayjs());
  const [date, setDate] = useState("");
  const [dateDisable, setDateDisable] = useState(true);

  const [totalPriceWash, setTotalPriceWash] = useState(0);
  const [totalPriceFood, setTotalPriceFood] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [mountChecked, setMountChecked] = useState(true);
  const [orderDash, setOrderDash] = useState([]);

  useEffect(() => {
    let ttWash = 0;
    let ttFood = 0;
    let delivery_price = 0;
    svGetOrderDash(year.$y).then((res) => {
      const order_data = res.data?.map((d) => {
        d.type_order == "washing"
          ? (ttWash += d.total_price)
          : (ttFood += d.total_price);
        delivery_price += d.delivery_price;
        return {
          orders_number: d.orders_number,
          delivery_drop_address: d.delivery_drop_address,
          delivery_drop_address_more: d.delivery_drop_address_more,
          delivery_pickup_address: d.delivery_pickup_address,
          delivery_pickup_address_more: d.delivery_pickup_address_more,
          details: d.details,
          phone_number: d.phone_number,
          status: d.status_name,
          transaction_date: d.transaction_date,
          shipping_date: d.shipping_date,
          type_order: d.type_order,
          date_pickup: d.date_pickup,
          date_drop: d.date_drop,
          pickup_image: d.pickup_image,
          drop_image: d.drop_image,
          member_name: d.member_name,
          branch_name: d.branch_name,
          branch_id: d.branch_id,
          delivery_pickup: d.delivery_pickup,
          delivery_drop: d.delivery_drop,
          status_id: d.status_id,
          id: d.id,
          total_price: d.total_price,
        };
      });
      // orderData?.map((item) => {
      //   item.type_order == "washing"
      //     ? (ttWash += item.total_price)
      //     : (ttFood += item.total_price);
      //   delivery_price += item.delivery_price;
      // });
      setTotalPriceWash(ttWash);
      setTotalPriceFood(ttFood);
      setDeliveryPrice(delivery_price);
      setOrderDash(order_data);
    });
  }, [year, mountChecked, refreshData]);

  useEffect(() => {
    dispatch(appActions.isSpawnActive(true));
    svGetOrders("").then((res) => {
      if (res.status) {
        const order_data = res.data?.map((d) => {
          return {
            orders_number: d.orders_number,
            delivery_drop_address: d.delivery_drop_address,
            delivery_drop_address_more: d.delivery_drop_address_more,
            delivery_pickup_address: d.delivery_pickup_address,
            delivery_pickup_address_more: d.delivery_pickup_address_more,
            details: d.details,
            phone_number: d.phone_number,
            status: d.status_name.toLowerCase(),
            transaction_date: d.transaction_date,
            shipping_date: d.shipping_date,
            type_order: d.type_order,
            date_pickup: d.date_pickup,
            date_drop: d.date_drop,
            pickup_image: d.pickup_image,
            drop_image: d.drop_image,
            member_name: d.member_name,
            branch_name: d.branch_name,
            branch_id: d.branch_id,
            delivery_pickup: d.delivery_pickup,
            delivery_drop: d.delivery_drop,
            status_id: d.status_id,
            id: d.id,
            total_price: d.total_price,
          };
        });
      } else {
        // setOrdersData([]);
      }
      dispatch(appActions.isSpawnActive(false));
    });
  }, [year, refreshData]);

  const filterData = () => {
    const filted = orderData.filter((f) => {
      return f;
    });
    setFIlteredData(filted);
  };
  console.log(orderDash)


  return (
    <section id="dashboard-page">
      <HeadPageComponent
        h1={"dashboardPage"}
        icon={<FontAwesomeIcon icon={faGamepad} />}
        breadcrums={[{ title: "dashboardPage", link: false }]}
      />
      <div className="action-header">
        <ButtonUI
          onClick={() => setRefreshData(refreshData + 1)}
          on="create"
          isLoading={false}
          icon={<FontAwesomeIcon icon={faRedo} />}
        >
          {t("Fetch")}
        </ButtonUI>
        <div className="date-picker">
          {/* <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    e.target.checked
                      ? setMountChecked(true)
                      : setMountChecked(false)
                  }
                  defaultChecked={true}
                />
              }
              label="Month"
            />
          </FormGroup> */}
          <DatePickerComponent setYear={setYear} label={"Start Date"} />--
          <DatePickerComponent setYear={setYear} label={"End Date"} />
        </div>
      </div>

      <div className="chart-section">
        <div className="card-chart-control">
          <div className="head-title">
            <p>Wash&Dry</p>
            <p>Total: {totalPriceWash} THB</p>
          </div>
          <div className="card-body">
            <Chart
              colorRGB={"7, 148, 239, 1"}
              barTitle={"Wash&Dry"}
              mountChecked={mountChecked}
              setMountChecked={setMountChecked}
              orderDash={orderDash}
              setRefreshData={setRefreshData}
              refreshData={refreshData}
            />
            {/* <OrderTable
            filteredData={filteredData}
            setRefreshData={() => setRefreshData(refreshData + 1)}
            /> */}
            {/* <BookingSettings setRefreshData={setRefreshData} settings={settings} /> */}
          </div>
        </div>
        <div className="card-chart-control">
          <div className="head-title">
            <p>Vending&Cafe</p>
            <p>Total: {totalPriceFood} THB</p>
          </div>
          <div className="card-body">
            <Chart
              colorRGB={"255, 87, 51, 1"}
              barTitle={"Vending&Cafe"}
              mountChecked={mountChecked}
              setMountChecked={setMountChecked}
              orderDash={orderDash}
              refreshData={refreshData}
              setRefreshData={setRefreshData}
            />
            {/* <OrderTable
            filteredData={filteredData}
            setRefreshData={() => setRefreshData(refreshData + 1)}
          /> */}
            {/* <BookingSettings setRefreshData={setRefreshData} settings={settings} /> */}
          </div>
        </div>
        <div className="card-chart-control">
          <div className="head-title">
            <p>Delivery</p>
            <p>Total: {deliveryPrice} THB</p>
          </div>
          <div className="card-body">
            <Chart
              colorRGB={"33, 183, 23, 1"}
              barTitle={"Delivery"}
              mountChecked={mountChecked}
              setMountChecked={setMountChecked}
              orderDash={orderDash}
              setRefreshData={setRefreshData}
              refreshData={refreshData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
