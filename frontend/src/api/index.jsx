import Axios from "axios";
import * as qs from "query-string";
import * as caseConverter from "change-object-case";


export function apiCaller({
  method = "GET",
  url = "",
  params = {},
  data = {},
  showErrors = true
} = {}) {
  // set-up case conversion configurations
  caseConverter.options = { recursive: true, arrayRecursive: true };
  return Axios({
    method,
    url,
    params,
    // paramsSerializer: params => qs.stringify(params, { arrayFormat: "comma" }),
    data,
    transformResponse: [
      data => caseConverter.toCamel(JSON.parse(data || "{}"))
    ],
    transformRequest: [
      reqData => {
        if (reqData instanceof FormData) {
          return reqData;
        } else {
          return JSON.stringify(caseConverter.snakeKeys(reqData));
        }
      }
    ],
    responseType: "json",
    validateStatus: status => status >= 200 && status < 300,
    showErrors
  })
    .catch(error => {
      throw error;
    });
}