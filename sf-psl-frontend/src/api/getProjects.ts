import { API_HOST, getDefaultHeaders } from "./config";
import { Customer, Project } from "./models";

import axios from "axios";

export const getProjects = async (
  customers: Customer[]
): Promise<Project[]> => {
  const customerQuery = customers.reduce((query, customer) => {
    if (query === "") {
      return encodeURI(`customers[]=${customer.id}`);
    }
    return `${query}&${encodeURI(`customers[]=${customer.id}`)}`;
  }, "");
  const resp = await axios.get(
    `${API_HOST}/projects?visible=1&${customerQuery}`,
    {
      headers: getDefaultHeaders(),
    }
  );

  return resp.data as Project[];
};
