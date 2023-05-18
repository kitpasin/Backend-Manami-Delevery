import { faRedo, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import ButtonUI from "../../components/ui/button/button";
import { FormControl, Input, InputLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../store/app-slice";
import { useSearchParams } from "react-router-dom";
import ContentFormatButton from "../../components/ui/toggle-format/toggle-format";
import { svGetOrders, svGetOrderPending } from "../../services/orders.service";
import ReportsTab from "./reports-tab";

const Reports = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation("orders-page");
  const language = useSelector((state) => state.app.language);
  const [tabSelect, setTabSelect] = useState("0");
  const [refreshData, setRefreshData] = useState(0);
  const [reportsData, setReportsData] = useState([]);
  const [textSearch, setTextSearch] = useState(searchParams.get("search") || "");

  const onFetchOrderData = () => {
    svGetOrders(textSearch).then((res) => {
      if (res.status) {
        const report_data = res.data?.map((d) => {
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
            delivery_price: d.delivery_price
          };
        });
        setReportsData(report_data);
      } else {
        setReportsData([]);
      }
      dispatch(appActions.isSpawnActive(false));
    });
    svGetOrderPending().then((res) => {
      dispatch(appActions.setNewOrders(res.data.data));
      dispatch(appActions.setFollowNewOrders(res.data.data));
    });
  };

  useEffect(() => {
    dispatch(appActions.isSpawnActive(true));
    
    onFetchOrderData();
  }, [refreshData, language, tabSelect]);

   const onChangeTextSearchHandler = (e) => {
     setTextSearch(e.target.value);
     setSearchParams(`search=${e.target.value}`);
     setRefreshData(refreshData + 1);
   };

  return (
    <section id="reports-page">
      <HeadPageComponent
        h1={"ReportsPage"}
        icon={<FontAwesomeIcon icon={faTag} />}
        breadcrums={[{ title: "ReportsPage", link: false }]}
      />
      <div className="card-control fixed-width">
        <div className="card-head">
          <div
            className="head-action"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 className="head-title">
              <ButtonUI
                onClick={() => setRefreshData(refreshData + 1)}
                on="create"
                isLoading={false}
                icon={<FontAwesomeIcon icon={faRedo} />}
              >
                {t("Fetch")}
              </ButtonUI>
            </h2>
          </div>
        </div>

        <ReportsTab
          reportsData={reportsData}
          refreshData={refreshData}
          setRefreshData={setRefreshData}
          tabSelect={tabSelect}
          setTabSelect={setTabSelect}
        />
      </div>
    </section>
  );
};

export default Reports;
