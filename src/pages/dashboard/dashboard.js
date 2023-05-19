import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

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

  return (
    <section id="dashboard-page">
      <HeadPageComponent
        h1={"dashboardPage"}
        icon={<FontAwesomeIcon icon={faGamepad} />}
        breadcrums={[{ title: "dashboardPage", link: false }]}
      />
      <ButtonUI
        onClick={() => setRefreshData(refreshData + 1)}
        on="create"
        isLoading={false}
        icon={<FontAwesomeIcon icon={faRedo} />}
      >
        {t("Fetch")}
      </ButtonUI>

      <div className="chart-section">
        <div className="card-chart-control">
          <div className="head-title">
            <p>Wash&Dry</p>
            <p>Wash&Dry</p>
          </div>
          <div className="card-body">
            <Chart colorRGB={"7, 148, 239, 1"} barTitle={"Wash&Dry"} />
            {/* <OrderTable
            filteredData={filteredData}
            setRefreshData={() => setRefreshData(refreshData + 1)}
          /> */}
            {/* <BookingSettings setRefreshData={setRefreshData} settings={settings} /> */}
          </div>
        </div>
        <div className="card-chart-control">
          <div className="head-title">
            <p>Wash&Dry</p>
            <p>Wash&Dry</p>
          </div>
          <div className="card-body">
            <Chart colorRGB={"255, 87, 51, 1"} barTitle={"Vending&Cafe"} />
            {/* <OrderTable
            filteredData={filteredData}
            setRefreshData={() => setRefreshData(refreshData + 1)}
          /> */}
            {/* <BookingSettings setRefreshData={setRefreshData} settings={settings} /> */}
          </div>
        </div>
        <div className="card-chart-control">
          <div className="head-title">
            <p>Wash&Dry</p>
            <p>Wash&Dry</p>
          </div>
          <div className="card-body">
            <Chart colorRGB={"33, 183, 23, 1"} barTitle={"Delivery"} />
            {/* <OrderTable
            filteredData={filteredData}
            setRefreshData={() => setRefreshData(refreshData + 1)}
          /> */}
            {/* <BookingSettings setRefreshData={setRefreshData} settings={settings} /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
