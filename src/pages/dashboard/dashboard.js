import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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
import { svGetOrderBar } from "../../services/dashboard.service";

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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateDisable, setDateDisable] = useState(true);
  const [totalPriceWash, setTotalPriceWash] = useState(0);
  const [totalPriceFood, setTotalPriceFood] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [mountChecked, setMountChecked] = useState(true);
  const [orderDash, setOrderDash] = useState([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  const minDate = dayjs("2023-01-01");
  const maxDate = minDate.add(10, "year");

  useEffect(() => {
    // svGetOrderBar(startDate, endDate).then((res) => console.log(res.data));
  }, [endDate]);

  useEffect(() => {
    let ttWash = 0;
    let ttFood = 0;
    let delivery_price = 0;
    // svGetOrderDash(year.$y).then((res) => {
    //   const order_data = res.data?.map((d) => {
    //     d.type_order == "washing"
    //       ? (ttWash += d.total_price)
    //       : (ttFood += d.total_price);
    //     delivery_price += d.delivery_price;
    //     return {
    //       orders_number: d.orders_number,
    //       delivery_drop_address: d.delivery_drop_address,
    //       delivery_drop_address_more: d.delivery_drop_address_more,
    //       delivery_pickup_address: d.delivery_pickup_address,
    //       delivery_pickup_address_more: d.delivery_pickup_address_more,
    //       details: d.details,
    //       phone_number: d.phone_number,
    //       status: d.status_name,
    //       transaction_date: d.transaction_date,
    //       shipping_date: d.shipping_date,
    //       type_order: d.type_order,
    //       date_pickup: d.date_pickup,
    //       date_drop: d.date_drop,
    //       pickup_image: d.pickup_image,
    //       drop_image: d.drop_image,
    //       member_name: d.member_name,
    //       branch_name: d.branch_name,
    //       branch_id: d.branch_id,
    //       delivery_pickup: d.delivery_pickup,
    //       delivery_drop: d.delivery_drop,
    //       status_id: d.status_id,
    //       id: d.id,
    //       total_price: d.total_price,
    //     };
    //   });
    //   // orderData?.map((item) => {
    //   //   item.type_order == "washing"
    //   //     ? (ttWash += item.total_price)
    //   //     : (ttFood += item.total_price);
    //   //   delivery_price += item.delivery_price;
    //   // });
    //   setTotalPriceWash(ttWash);
    //   setTotalPriceFood(ttFood);
    //   setDeliveryPrice(delivery_price);
    //   setOrderDash(order_data);
    // });
  }, [mountChecked, refreshData]);

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
  }, [refreshData]);

  const filterData = () => {
    const filted = orderData.filter((f) => {
      return f;
    });
    setFIlteredData(filted);
  };

  const [views, setViews] = useState("week");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (views === "week") {
      setStartDate(dayjs().subtract(6, "day").toISOString().substring(0, 10));
      setEndDate(dayjs().toISOString().substring(0, 10));
      setTitle("7 Days ago");
    } else if (views === "month") {
      const today = new Date();
      today.toLocaleString("default", { month: "long" });
      setTitle(today.toLocaleString("default", { month: "long" }));
    } else if (views === "year") {
      setTitle("2023");
    }
    svGetOrderBar(startDate, endDate).then((res) => {
      if (res.status) {
        setOrderDash(res.data);
      }
    });
  }, [views]);

  const handleChange = (e) => {
    setViews(e.target.value);
  };

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
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={"week"}
            >
              <FormControlLabel
                value="week"
                onChange={handleChange}
                control={<Radio />}
                label="Week"
              />
              <FormControlLabel
                value="month"
                onChange={handleChange}
                control={<Radio />}
                label="Month"
              />
              <FormControlLabel
                value="year"
                onChange={handleChange}
                control={<Radio />}
                label="Year"
              />
            </RadioGroup>
          </FormControl>

          {/* <DatePickerComponent
            state={true}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            label={"Start Date"}
            setDateDisable={setDateDisable}
            dateDisable={false}
            minDate={minDate}
            setMin={setMin}
            maxDate={maxDate}
            setMax={setMax}
          />
          --
          <DatePickerComponent
            state={false}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            label={"End Date"}
            setDateDisable={setDateDisable}
            dateDisable={dateDisable}
            minDate={min}
            setMin={setMin}
            maxDate={max}
            setMax={setMax}
          /> */}
        </div>
      </div>

      <div className="chart-section">
        <div className="pie-chart"></div>
          
        <div className="bar-chart">
          <div className="card-chart-control">
            <div className="head-title">
              <p>Wash&Dry</p>
              <h3>{title}</h3>
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
                views={views}
                startDate={startDate}
                endDate={endDate}
                setTotalPriceFood={setTotalPriceFood}
                setTotalPriceWash={setTotalPriceWash}
                setTotalPrice={setTotalPrice}
              />
            </div>
          </div>
          <div className="card-chart-control">
            <div className="head-title">
              <p>Vending&Cafe</p>
              <h3>{title}</h3>
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
                views={views}
                dateStart={startDate}
                dateEnd={endDate}
                setTotalPriceFood={setTotalPriceFood}
                setTotalPriceWash={setTotalPriceWash}
                setTotalPrice={setTotalPrice}
              />
            </div>
          </div>
          <div className="card-chart-control">
            <div className="head-title">
              <p>Delivery</p>
              <h3>{title}</h3>
              <p>Total: {totalPrice} THB</p>
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
                views={views}
                startDate={startDate}
                endDate={endDate}
                setTotalPriceFood={setTotalPriceFood}
                setTotalPriceWash={setTotalPriceWash}
                setTotalPrice={setTotalPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
