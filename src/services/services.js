import axios from "axios";
//import { SERVER_URL, ROLL_NUMBER } from "../utils/constants";

// export function serviceCall() {
//   return axios.post(`${SERVER_URL}`);
// }

export  function callAddInvoice(page) {
  return  axios
    .get("http://localhost:8080/Invoicedetail", {
      params: {
        page: page,
      },
    })
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    .catch((err) => {
      console.log(err);
      return "";
    });
}
