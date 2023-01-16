export const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export const ENDPOINTS = {
    CURRENCY_LIST: "/currencies/",
    CURRENCY_MONTHLY_VALUES_LIST: "currencies/monthly-values/",
};

export const REQUEST_TYPES = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};
