import {
  faCircleCheck,
  faCircleXmark,
  faFolderOpen,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, TablePagination } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import ReportsCard from "./reports-card";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import SwalUI from "../../components/ui/swal-ui/swal-ui";
import { svDeleteOrder, svGetOrderByOrderNumber } from "../../services/orders.service";
import { t } from "i18next";

const ReportsTab = ({
  tabSelect,
  setTabSelect,
  reportsData,
  refreshData,
  setRefreshData,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [limited, setLimited] = useState({ begin: 0, end: rowsPerPage });
  const [page, setPage] = useState(0);
  const modalSwal = withReactContent(Swal);

  const [filteredData, setFilteredData] = useState(reportsData);
  const [totalData, setTotalData] = useState(0);
  const [orderShow, setOrderShow] = useState({});
  const [isWashing, setIsWashing] = useState(false);

  const tabLists = [
    { value: "0", title: "All", icon: <FontAwesomeIcon icon={faFolderOpen} /> },
    // {
    //   value: "2",
    //   title: "Pending",
    //   icon: <FontAwesomeIcon icon={faStopwatch} />,
    // },
    // {
    //   value: "3",
    //   title: "Inprogress",
    //   icon: <FontAwesomeIcon icon={faStopwatch} />,
    // },
    // {
    //   value: "4",
    //   title: "Complete",
    //   icon: <FontAwesomeIcon icon={faCircleCheck} />,
    // },
    // {
    //   value: "5",
    //   title: "Failed",
    //   icon: <FontAwesomeIcon icon={faCircleXmark} />,
    // },
  ];

  const handleChange = (event, newValue) => {
    setTabSelect(newValue);
    setLimited({ begin: 0, end: rowsPerPage });
    setPage(0);
  };

  /* Pagination */
  const handleChangePage = (event, newPage) => {
    setLimited({
      begin: newPage * rowsPerPage,
      end: (newPage + 1) * rowsPerPage,
    });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    let rowPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowPage);
    setLimited({ begin: 0, end: rowPage });
    setPage(0);
  };

  useEffect(() => {
    const result = reportsData?.filter((d) => {
      if (tabSelect != 0) {
        if (tabSelect == d.status_id) {
          return d;
        }
      } else {
        return d;
      }
    });
    if (result) {
      setTotalData(result.length);
      setFilteredData(result.slice(limited.begin, limited.end));
    }
  }, [tabSelect, reportsData, page, rowsPerPage]);

  return (
    <Fragment>
      <Box className="orders-tab-section" sx={{ width: "100%" }}>
        <TabContext value={tabSelect}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              className={`tab-header`}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              {tabLists.map((tab) => (
                <Tab
                  className="orders-tab-head-field"
                  value={tab.value}
                  key={tab.value}
                  icon={tab.icon}
                  iconPosition="start"
                  label={t(tab.title)}
                />
              ))}
            </TabList>
          </Box>
          {tabLists.map((tab) => (
            <TabPanel className={`orders-tab-body asRow`} value={tab.value} key={tab.value}>
              <div className="item-list">
                <ReportsCard
                  items={filteredData}
                />
              </div>
              <TablePagination
                component="div"
                count={totalData}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Fragment>
  );
};

export default ReportsTab;
