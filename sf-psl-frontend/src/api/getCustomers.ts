import { API_HOST, getDefaultHeaders } from "./config";

import { Customer } from "./models";
import axios from "axios";

export const getCustomers = async (): Promise<Customer[]> => {
  const resp = await axios.get(`${API_HOST}/customers`, {
    headers: getDefaultHeaders(),
  });

  return resp.data as Customer[];
};
