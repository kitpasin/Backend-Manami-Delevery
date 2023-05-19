import axios from 'axios';

export const svGetOrderDash = (year) => {
    return axios.get(`dashboard/order?year=${year}`).then(
    (res) => { return { status: true, data: res.data.data }},
    (error) => { return { status: false, description: (!error.response.data)?"Something went wrong":error.response.data.description }}
    )
}