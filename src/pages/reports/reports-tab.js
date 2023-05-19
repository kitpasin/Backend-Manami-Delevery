import {
  faCircleCheck,
  faCircleXmark,
  faFolderOpen,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Tab,
  TablePagination,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import ReportsCard from "./reports-card";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import SwalUI from "../../components/ui/swal-ui/swal-ui";
import { svDeleteOrder, svGetOrderByOrderNumber } from "../../services/orders.service";
import { t } from "i18next";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ReportsTab = ({ tabSelect, setTabSelect, reportsData, refreshData, setRefreshData }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [limited, setLimited] = useState({ begin: 0, end: rowsPerPage });
  const [page, setPage] = useState(0);
  const modalSwal = withReactContent(Swal);

  const [filteredData, setFilteredData] = useState(reportsData);
  const [totalData, setTotalData] = useState(0);
  const [orderShow, setOrderShow] = useState({});
  const [isWashing, setIsWashing] = useState(false);

  // Date Picker
  const [mode, setMode] = useState("date");
  const [dateValue, setDateValue] = useState(null);
  const [monthValue, setMonthValue] = useState(null);
  const [yearValue, setYearValue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleModeChange = (event) => {
    setMode(event.target.value);
    setDateValue(null);
    setMonthValue(null);
    setYearValue(null);
    setStartDate(null);
    setEndDate(null);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const renderDatePicker = () => {
    switch (mode) {
      case "date":
        return (
          <DatePicker
            label="Select Date"
            value={dateValue}
            onChange={(newDateValue) => setDateValue(newDateValue)}
            renderInput={(props) => <TextField {...props} />}
          />
        );
      case "month":
        return (
          <DatePicker
            label="Select Month"
            value={monthValue}
            onChange={(newMonthValue) => setMonthValue(newMonthValue)}
            views={["year", "month"]}
            openTo="month"
            renderInput={(props) => <TextField {...props} />}
          />
        );
      case "year":
        return (
          <DatePicker
            label="Select Year"
            value={yearValue}
            onChange={(newYearValue) => setYearValue(newYearValue)}
            views={["year"]}
            openTo="year"
            renderInput={(props) => <TextField {...props} />}
          />
        );
      case "range":
        return (
          <div
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}
          >
            <DatePicker
              label="Select Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <b style={{ fontWeight: "500" }}>to</b>
            <DatePicker
              label="Select End Date"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const tabLists = [{ value: "0", title: "All", icon: <FontAwesomeIcon icon={faFolderOpen} /> }];

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
          <Box
            style={{
              marginTop: "24px",
              marginLeft: "24px",
              marginRight: "24px",
              marginBottom: "0",
              width: "96.5%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <RadioGroup name="mode" value={mode} onChange={handleModeChange} row>
              <FormControlLabel value="date" control={<Radio />} label="Date" />
              <FormControlLabel value="month" control={<Radio />} label="Month" />
              <FormControlLabel value="year" control={<Radio />} label="Year" />
              <FormControlLabel value="range" control={<Radio />} label="Range" />
            </RadioGroup>
            <LocalizationProvider dateAdapter={(AdapterDayjs, AdapterDateFns)}>
              <Box>{renderDatePicker()}</Box>
            </LocalizationProvider>
          </Box>

          {tabLists.map((tab) => (
            <TabPanel className={`orders-tab-body asRow`} value={tab.value} key={tab.value}>
              <div className="item-list">
                <ReportsCard
                  items={filteredData}
                  dateValue={dateValue}
                  monthValue={monthValue}
                  yearValue={yearValue}
                  startDate={startDate}
                  endDate={endDate}
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
