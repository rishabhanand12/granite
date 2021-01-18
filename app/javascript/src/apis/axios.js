import { getFromLocalStorage } from "../helpers/storage";
import axios from "axios";

// const handleSuccessResponse = (response) => {
//   if (response) {
//     response.success = response.status === 200;
//     if (response.data.notice) {
//       Toastr.success(response.data.notice);
//     }
//   }
//   return response;
// };

// const handleErrorResponse = (error) => {
//   if (error.response?.status === 401) {
//     setToLocalStorage({ authToken: null, email: null, userId: null });
//   }
//   Toastr.error(
//     error.response?.data?.error ||
//       error.response?.data?.notice ||
//       error.message ||
//       error.notice ||
//       "Something went wrong!"
//   );
//   if (error.response?.status === 423) {
//     window.location.href = "/";
//   }
//   return Promise.reject(error);
// };

// export const registerIntercepts = () => {
//   axios.interceptors.response.use(handleSuccessResponse, (error) =>
//     handleErrorResponse(error)
//   );
// };

export const setAuthHeaders = () => {
  axios.defaults.headers["X-Auth-Email"] = getFromLocalStorage(
    "authEmail"
  );
  axios.defaults.headers["X-Auth-Token"] = getFromLocalStorage(
    "authToken"
  );
};

export const resetAuthTokens = () => {
  delete axios.defaults.headers["X-Auth-Email"];
  delete axios.defaults.headers["X-Auth-Token"];
};
