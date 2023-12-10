import {
  Activity,
  ActivityDetail,
  Customer,
  Project,
  TimeSheet,
} from "../api/models";
import { getActivities, getActivityDetail } from "../api/getActivities";
import { useCallback, useEffect, useState } from "react";

import { getCustomers } from "../api/getCustomers";
import { getProjects } from "../api/getProjects";
import { getTimesheets } from "../api/getTimesheets";

export type PslClientData = {
  readonly customer: Customer;
  readonly project: Project;
  readonly psl: {
    task: Activity;
    taskDetail: ActivityDetail;
    timesheets: TimeSheet[];
  };
  readonly tasks: {
    task: Activity;
    timesheets: TimeSheet[];
  }[];
};

const fetchData = async (): Promise<PslClientData[]> => {
  const customers = await getCustomers();
  const projects = await getProjects(customers);
  const activities = await getActivities(projects);
  const timeSheets = await getTimesheets(projects, activities);
  const pslActivities = activities.filter((a) => a.name === "PSL");
  const pslAcitivitDetails = await Promise.all(
    pslActivities.map((a) => getActivityDetail(a))
  );

  const data: PslClientData[] = customers.map((customer) => {
    const project = projects.find((p) => p.customer === customer.id)!!;
    const pslActivity = activities.find(
      (a) => a.project === project.id && a.name === "PSL"
    )!!;
    const pslActivityDetail = pslAcitivitDetails.find(
      (ad) => ad.id === pslActivity.id
    )!!;
    const pslTimesheets = timeSheets.filter(
      (t) => t.activity === pslActivity?.id
    );

    const tasks = activities
      .filter((a) => a.project === project.id && a.name !== "PSL")
      .map((a) => {
        const timesheets = timeSheets.filter((t) => t.activity === a.id);
        return {
          task: a,
          timesheets,
        };
      });

    return {
      customer,
      project,
      psl: {
        task: pslActivity,
        taskDetail: pslActivityDetail,
        timesheets: pslTimesheets,
      },
      tasks,
    };
  });

  return data;
};

export const usePslAppData = ():
  | false
  | {
      getTimeOffBudget: () => number;
      getTimeWorked: () => number;
      getAllTimesheets: () => TimeSheet[];
      getTaskById: (taskId: number) => Activity | undefined;
      getCustomerByProjectId: (projectId: number) => Customer | undefined;
      getAllClients: () => PslClientData[];
      getTasksByProjectId: (projectId: number) => Activity[];
      refreshTimeoffBudget: (
        projectId: number,
        newTimeSheet: TimeSheet
      ) => Promise<void>;
    } => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [appData, setAppData] = useState<PslClientData[]>();

  useEffect(() => {
    fetchData().then((data) => {
      setAppData(data);
      setIsInitialized(true);
    });
  }, []);

  const getTimeOffBudget = useCallback(() => {
    if (!appData) {
      return 0;
    }

    return appData.reduce(
      (timeOffBudget, client) =>
        client.psl.taskDetail.timeBudget + timeOffBudget,
      0
    );
  }, [appData]);

  const getTimeWorked = useCallback(() => {
    if (!appData) {
      return 0;
    }

    return appData.reduce((timeWorked, client) => {
      const timeWorkedForClient = client.tasks
        .flatMap((t) => t.timesheets)
        .reduce((timeWorked, timesheet) => timeWorked + timesheet.duration, 0);

      return timeWorked + timeWorkedForClient;
    }, 0);
  }, [appData]);

  const getAllTimesheets = useCallback(() => {
    if (!appData) {
      return [];
    }
    const allTimesheets = appData
      ?.flatMap((c) => c.tasks)
      .flatMap((c) => c.timesheets)
      .sort();

    return allTimesheets;
  }, [appData]);

  const getTaskById = useCallback(
    (taskId: number) => {
      return appData?.flatMap((c) => c.tasks).find((t) => t.task.id === taskId)
        ?.task;
    },
    [appData]
  );

  const getTasksByProjectId = useCallback(
    (projectId: number) => {
      if (!appData) {
        return [];
      }
      const project = appData.find((c) => c.project.id === projectId);
      if (!project) {
        return [];
      }
      return project.tasks.map((t) => t.task);
    },
    [appData]
  );

  const getCustomerByProjectId = useCallback(
    (projectId: number) => {
      return appData?.find((c) => c.project.id === projectId)?.customer;
    },
    [appData]
  );

  const getAllClients = useCallback(() => {
    if (!appData) {
      return [];
    }
    return appData;
  }, [appData]);

  const refreshTimeoffBudget = useCallback(
    (projectId: number, newTimeSheet: TimeSheet) => {
      if (!appData) {
        return Promise.resolve();
      }

      const client = appData.find((c) => c.project.id === projectId);
      if (!client) {
        return Promise.resolve();
      }

      const task = client.tasks.find(
        (t) => t.task.id === newTimeSheet.activity
      );
      if (!task) {
        return Promise.resolve();
      }
      const pslActivity = client.psl.task;
      return getActivityDetail(pslActivity).then((updatedPslActivityDetail) => {
        const updatedAppData = [
          ...appData.filter((c) => c.project.id !== projectId),
          {
            ...client,
            psl: {
              ...client.psl,
              taskDetail: updatedPslActivityDetail,
            },
            tasks: [
              ...client.tasks.filter(
                (task) => task.task.id !== newTimeSheet.activity
              ),
              {
                ...task,
                timesheets: [...task?.timesheets, newTimeSheet],
              },
            ],
          },
        ];

        setAppData(updatedAppData);
      });
    },
    [appData]
  );

  if (!isInitialized) {
    return false;
  }

  return {
    getTimeOffBudget,
    getTimeWorked,
    getAllTimesheets,
    getTaskById,
    getCustomerByProjectId,
    getAllClients,
    getTasksByProjectId,
    refreshTimeoffBudget,
  };
};
