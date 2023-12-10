import { API_HOST, getDefaultHeaders } from "./config";
import { addHours, formatISO, subMinutes } from "date-fns";

import { TimeSheet } from "./models";
import axios from "axios";

export const createTimeSheet = async (
  projectId: number,
  activityId: number
): Promise<TimeSheet> => {
  const now = Date.now();
  const body = {
    activity: activityId,
    project: projectId,
    begin: formatISO(now),
    end: formatISO(subMinutes(addHours(now, 8), 1)),
  };

  const resp = await axios.post(`${API_HOST}/timesheets`, body, {
    headers: getDefaultHeaders(),
  });

  return resp.data as TimeSheet;
};
