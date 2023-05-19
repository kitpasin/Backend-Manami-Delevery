import React from "react";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TextField } from "@mui/material";

import "./dashboard.scss";

function DatePickerComponent({setYear, label}) {
  const minDate = dayjs("2023-01-01");
  const [yearValue, setYearValue] = useState(dayjs());

  useEffect(() => {
    setYear(yearValue)
  }, [yearValue])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableMaskedInput={true}
        label={label}
        views={["year", "month", "day"]}
        value={yearValue}
        minDate={minDate}
        inputFormat="YYYY-MM-DD"
        onChange={(newValue) => setYearValue(newValue)}
        renderInput={(props) => (
          <TextField
            size="small"
            {...props}
            sx={{
              width: "150px",
              //   "& .MuiOutlinedInput-root": {
              //     "& fieldset": {
              //       borderColor: "red",
              //     },
              //     "&:hover fieldset": {
              //       borderColor: "green",
              //     },
              //     "&.Mui-focused fieldset": {
              //       borderColor: "purple",
              //     },
              //   },
            }}
            inputProps={{...props.inputProps, readOnly: true}}
          />
        )}
        size="small"
      />
      {/* <DatePicker
              label={'"month"'}
              openTo="month"
              views={["year", "month", "day"]}
            /> */}
    </LocalizationProvider>
  );
}

export default DatePickerComponent;
