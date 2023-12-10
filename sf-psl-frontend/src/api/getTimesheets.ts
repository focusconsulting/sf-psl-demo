import { API_HOST, getDefaultHeaders } from "./config";
import { Activity, Project, TimeSheet } from "./models";

import axios from "axios";

export const getTimesheets = async (
  projects: Project[],
  activities: Activity[]
): Promise<TimeSheet[]> => {
  const projectQuery = projects.reduce((query, project) => {
    if (query === "") {
      return encodeURI(`projects[]=${project.id}`);
    }
    return `${query}&${encodeURI(`projects[]=${project.id}`)}`;
  }, "");
  const activitiesQuery = activities.reduce((query, activity) => {
    if (query === "") {
      return encodeURI(`activities[]=${activity.id}`);
    }
    return `${query}&${encodeURI(`activities[]=${activity.id}`)}`;
  }, "");
  const resp = await axios.get(
    `${API_HOST}/timesheets?${projectQuery}&${activitiesQuery}`,
    {
      headers: getDefaultHeaders(),
    }
  );

  return resp.data as TimeSheet[];
};
