import { API_HOST, getDefaultHeaders } from "./config";
import { Activity, ActivityDetail, Project } from "./models";

import axios from "axios";

export const getActivities = async (
  projects: Project[]
): Promise<Activity[]> => {
  const projectQuery = projects.reduce((query, project) => {
    if (query === "") {
      return encodeURI(`projects[]=${project.id}`);
    }
    return `${query}&${encodeURI(`projects[]=${project.id}`)}`;
  }, "");
  const resp = await axios.get(`${API_HOST}/activities?${projectQuery}`, {
    headers: getDefaultHeaders(),
  });

  return resp.data as Activity[];
};

export const getActivityDetail = async (
  activity: Activity
): Promise<ActivityDetail> => {
  const resp = await axios.get(`${API_HOST}/activities/${activity.id}`, {
    headers: getDefaultHeaders(),
  });

  return resp.data as ActivityDetail;
};
