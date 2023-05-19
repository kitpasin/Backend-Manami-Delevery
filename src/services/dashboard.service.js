import axios from 'axios';

export const svGetOrderBar = (startDate, endDate) => {
    return axios.get(`dashboard/order?startdate=${startDate}&enddate=${endDate}`).then(
    (res) => { return { status: true, data: res.data.data }},
    (error) => { return { status: false, description: (!error.response.data)?"Something went wrong":error.response.data.description }}
    )
}