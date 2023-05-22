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
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

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
import DonutChart from "./DonutChart";
import TableTab from "./TableTab";
import {
  svGetOrderDonut,
  svGetOrderTable,
} from "../../services/dashboard.service";

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
  const [views, setViews] = useState("week");
  const [viewsList, setViewsList] = useState("all");
  const [title, setTitle] = useState("");
  const [orderDonut, setOrderDonut] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderListTable, setOrderListTable] = useState([]);

  // useEffect(() => {
  //   let ttWash = 0;
  //   let ttFood = 0;
  //   let delivery_price = 0;
  //   // svGetOrderDash(year.$y).then((res) => {
  //   //   const order_data = res.data?.map((d) => {
  //   //     d.type_order == "washing"
  //   //       ? (ttWash += d.total_price)
  //   //       : (ttFood += d.total_price);
  //   //     delivery_price += d.delivery_price;
  //   //     return {
  //   //       orders_number: d.orders_number,
  //   //       delivery_drop_address: d.delivery_drop_address,
  //   //       delivery_drop_address_more: d.delivery_drop_address_more,
  //   //       delivery_pickup_address: d.delivery_pickup_address,
  //   //       delivery_pickup_address_more: d.delivery_pickup_address_more,
  //   //       details: d.details,
  //   //       phone_number: d.phone_number,
  //   //       status: d.status_name,
  //   //       transaction_date: d.transaction_date,
  //   //       shipping_date: d.shipping_date,
  //   //       type_order: d.type_order,
  //   //       date_pickup: d.date_pickup,
  //   //       date_drop: d.date_drop,
  //   //       pickup_image: d.pickup_image,
  //   //       drop_image: d.drop_image,
  //   //       member_name: d.member_name,
  //   //       branch_name: d.branch_name,
  //   //       branch_id: d.branch_id,
  //   //       delivery_pickup: d.delivery_pickup,
  //   //       delivery_drop: d.delivery_drop,
  //   //       status_id: d.status_id,
  //   //       id: d.id,
  //   //       total_price: d.total_price,
  //   //     };
  //   //   });
  //   //   // orderData?.map((item) => {
  //   //   //   item.type_order == "washing"
  //   //   //     ? (ttWash += item.total_price)
  //   //   //     : (ttFood += item.total_price);
  //   //   //   delivery_price += item.delivery_price;
  //   //   // });
  //   //   setTotalPriceWash(ttWash);
  //   //   setTotalPriceFood(ttFood);
  //   //   setDeliveryPrice(delivery_price);
  //   //   setOrderDash(order_data);
  //   // });
  // }, [mountChecked, refreshData]);

  // useEffect(() => {
  //   dispatch(appActions.isSpawnActive(true));
  //   svGetOrders("").then((res) => {
  //     if (res.status) {
  //       const order_data = res.data?.map((d) => {
  //         return {
  //           orders_number: d.orders_number,
  //           delivery_drop_address: d.delivery_drop_address,
  //           delivery_drop_address_more: d.delivery_drop_address_more,
  //           delivery_pickup_address: d.delivery_pickup_address,
  //           delivery_pickup_address_more: d.delivery_pickup_address_more,
  //           details: d.details,
  //           phone_number: d.phone_number,
  //           status: d.status_name.toLowerCase(),
  //           transaction_date: d.transaction_date,
  //           shipping_date: d.shipping_date,
  //           type_order: d.type_order,
  //           date_pickup: d.date_pickup,
  //           date_drop: d.date_drop,
  //           pickup_image: d.pickup_image,
  //           drop_image: d.drop_image,
  //           member_name: d.member_name,
  //           branch_name: d.branch_name,
  //           branch_id: d.branch_id,
  //           delivery_pickup: d.delivery_pickup,
  //           delivery_drop: d.delivery_drop,
  //           status_id: d.status_id,
  //           id: d.id,
  //           total_price: d.total_price,
  //         };
  //       });
  //     } else {
  //       // setOrdersData([]);
  //     }
  //     dispatch(appActions.isSpawnActive(false));
  //   });
  // }, [refreshData]);

  // const filterData = () => {
  //   const filted = orderData.filter((f) => {
  //     return f;
  //   });
  //   setFIlteredData(filted);
  // };

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

  useEffect(() => {
    dispatch(appActions.isSpawnActive(true));
    svGetOrderDonut().then((res) => {
      let priceDetails = [];
      let listDetails = [];
      let orderTable = [];
      let ttWash = 0;
      let ttDry = 0;
      let ttFoods = 0;
      let ttIron = 0;
      let ttDelivery = 0;
      let ttAll = 0;
      let orderComplete = 0;
      let orderFails = 0;
      if (res.status) {
        console.log(res.data);
        res.data?.map((item, ind) => {
          orderComplete += 1;
          if (item.status_id === 4) {
            if (item.type_order === "washing") {
              ttWash += item.washing_price;
              ttDry += item.drying_price;
            } else if (item.type_order === "foods") {
              ttFoods += item.total_price;
            } else {
              ttIron += item.total_price;
            }
            ttDelivery += item.delivery_price;
            ttAll = ttDelivery + ttWash + ttDry + ttFoods;
          } else if (item.status_id === 5) {
            orderFails += 1;
          }
          if (item.status_id === 4 || item.status_id === 5) {
            orderTable.push(item);
          }
        });
        priceDetails.push(ttWash);
        priceDetails.push(ttDry);
        priceDetails.push(ttFoods);
        priceDetails.push(ttIron);
        priceDetails.push(ttDelivery);
        priceDetails.push(ttAll);

        listDetails.push(orderComplete);
        listDetails.push(orderFails);
        listDetails.push(ttWash + ttDry + ttFoods);
        listDetails.push(ttDelivery);
        listDetails.push(ttAll);

        setOrderDonut(priceDetails);
        setOrderList(listDetails);
        setOrderListTable(orderTable);

        console.log(orderListTable);
      }
      dispatch(appActions.isSpawnActive(false));
    });

    // svGetOrderList().then((res) => {
    //   console.log(res.data);
    // });
  }, [refreshData]);

  useEffect(() => {
    svGetOrderDonut().then((res) => {
      let data = [];
      if (res.status) {
        if (viewsList === "all") {
          data = res.data?.filter(
            (item) => item.status_id === 4 || item.status_id === 5
          );
        } else if (viewsList === "wash&dry") {
          data = res.data?.filter((item) => item.type_order === "washing");
        } else if (viewsList === "food") {
          data = res.data?.filter((item) => item.type_order === "foods");
        } else if (viewsList === "fails") {
          data = res.data?.filter((item) => item.status_id === 5);
        } else {
          data = res.data?.filter((item) => item.status_id === 4);
        }
      }
      setOrderListTable(data)
    });
  }, [viewsList]);

  const handleChange = (e) => {
    if (
      e.target.value !== "week" &&
      e.target.value !== "month" &&
      e.target.value !== "year"
    ) {
      setViewsList(e.target.value);
    } else {
      setViews(e.target.value);
    }
  };

  const thumbnailType = [
    "/images/dashboard/washing.png",
    "/images/dashboard/drying.png",
    "/images/dashboard/food.png",
    "/images/dashboard/iron.png",
    "/images/dashboard/delivery.png",
    "/images/dashboard/total.png",
  ];

  const labelTitles = [
    "Washing",
    "Drying",
    "Food",
    "Iron",
    "Delivery",
    "Total",
  ];

  const detailsStyle = [
    {
      backgroundColor: "rgb(3,0,171)",
      boxShadow: "-1px 20px 20px 0px rgba(3,0,171, 0.2)",
    },
    {
      backgroundColor: "rgb(22,156,231)",
      boxShadow: "-1px 20px 20px 0px rgba(22,156,231, 0.4)",
    },
    {
      backgroundColor: "rgb(255,144,41)",
      boxShadow: "-1px 20px 20px 0px rgba(255,144,41, 0.4)",
    },
    {
      backgroundColor: "rgb(15,185,0)",
      boxShadow: "-1px 20px 20px 0px rgba(15,185,0, 0.4)",
    },
    {
      backgroundColor: "rgb(227,41,0)",
      boxShadow: "-1px 20px 20px 0px rgba(227,41,0, 0.4)",
    },
    {
      backgroundColor: "rgb(255,89,159)",
      boxShadow: "-1px 20px 20px 0px rgba(255,89,159, 0.4)",
    },
  ];

  const orderListStyle = [
    {
      style: {
        backgroundColor: "#0FB900",
      },
      title: "Complete",
      thumbnail: "images/dashboard/complete.png",
      unit: "List",
    },
    {
      style: {
        backgroundColor: "#E32900",
      },
      title: "Fails",
      thumbnail: "images/dashboard/fails.png",
      unit: "List",
    },
    {
      style: {
        backgroundColor: "#001524",
      },
      title: "Product and Services",
      thumbnail: "images/dashboard/store.png",
      unit: "THB",
    },
    {
      style: {
        backgroundColor: "#78290F",
      },
      title: "Delivery",
      thumbnail: "images/dashboard/delivery.png",
      unit: "THB",
    },
    {
      style: {
        backgroundColor: "#89003A",
      },
      title: "Total",
      thumbnail: "images/dashboard/total.png",
      unit: "THB",
    },
  ];

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
      </div>
      <div className="main-content">
        <div className="chart-section">
          <div className="donut-chart">
            <div className="head-title">
              <Typography variant="subtitle1" gutterBottom>
                Order Type / Day
              </Typography>
              <Typography variant="h6" gutterBottom>
                22 May 2023
              </Typography>
            </div>
            <div className="chart-content">
              <div className="content-left">
                <DonutChart data={orderDonut} labelTitles={labelTitles} />
              </div>
              <div className="content-right">
                <Grid container columnSpacing={2} rowSpacing={6}>
                  {detailsStyle.map((item, ind) => (
                    <Grid key={ind} container item xs={6} direction="column">
                      <div style={item} className="price-details">
                        <div className="top-content" style={{ height: "60%" }}>
                          <img src={thumbnailType[ind]} alt="" width={62} />
                          <Typography variant="h6" gutterBottom>
                            {labelTitles[ind]}
                          </Typography>
                        </div>
                        <div
                          className="bottom-content"
                          style={{ height: "40%" }}
                        >
                          <p style={{ marginTop: "1rem" }}>
                            {orderDonut[ind]} THB
                          </p>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>

          <div className="bar-chart">
            <div className="bar-chart-head">
              <div className="head-title">
                <Typography variant="subtitle1" gutterBottom>
                  Order Type / Month / Year
                </Typography>
              </div>
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

                {/* <div className="date-picker">
                <DatePickerComponent
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
                />
              </div> */}
              </div>
            </div>

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
                  colorRGB={"255,144,41, 1"}
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
                  colorRGB={"227,41,0, 1"}
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
        <div className="table-section">
          <div className="header">
            <div className="head-title">
              <Typography variant="subtitle1" gutterBottom>
                Order List
              </Typography>
            </div>
            <div className="head-checkbox">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={"all"}
                >
                  <FormControlLabel
                    value="all"
                    onChange={handleChange}
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="wash&dry"
                    onChange={handleChange}
                    control={<Radio />}
                    label="Wash&Dry"
                  />
                  <FormControlLabel
                    value="food"
                    onChange={handleChange}
                    control={<Radio />}
                    label="Food"
                  />
                  <FormControlLabel
                    value="iron"
                    onChange={handleChange}
                    control={<Radio />}
                    label="Iron"
                    disabled
                  />
                  <FormControlLabel
                    value="fails"
                    onChange={handleChange}
                    control={<Radio />}
                    label="Fails"
                  />
                  <FormControlLabel
                    value="comlete"
                    onChange={handleChange}
                    control={<Radio />}
                    label="Complete"
                  />
                </RadioGroup>
              </FormControl>
              {/* <FormGroup sx={{ flexDirection: "row" }}>
                <FormControlLabel
                  labelPlacement="end"
                  control={<Checkbox defaultChecked />}
                  label="All"
                />
                <FormControlLabel
                  labelPlacement="end"
                  control={<Checkbox />}
                  label="Wash&Dry"
                />
                <FormControlLabel
                  labelPlacement="end"
                  control={<Checkbox disabled />}
                  label="Iron"
                />
                <FormControlLabel
                  labelPlacement="end"
                  control={<Checkbox />}
                  label="Food"
                />
                <FormControlLabel
                  labelPlacement="end"
                  control={<Checkbox />}
                  label="Fails"
                />
                <FormControlLabel
                  labelPlacement="end"
                  control={<Checkbox />}
                  label="Complete"
                />
              </FormGroup> */}
            </div>
          </div>
          <div className="price-details">
            {orderListStyle.map((item, ind) => (
              <div key={ind} className="details-list" style={item.style}>
                <div className="content-left">
                  <p>{item.title}</p>
                  <Typography variant="subtitle2" gutterBottom>
                    {orderList[ind]} {item.unit}
                  </Typography>
                </div>
                <div className="content-right">
                  <img src={item.thumbnail} alt="" width={40} />
                </div>
              </div>
            ))}
          </div>
          <div className="table-tab">
            <TableTab orderList={orderListTable} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
