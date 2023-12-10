export type Project = {
  id: number;
  name: string;
  customer: number;
};

export type Activity = {
  id: number;
  name: string;
  project: number;
};

export type ActivityDetail = {
  id: number;
  timeBudget: number;
};

export type TimeSheet = {
  activity: number;
  project: number;
  begin: string;
  end: string;
  duration: number;
};

export type Customer = {
  id: number;
  name: string;
};
