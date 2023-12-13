import { Activity, Customer, TimeSheet } from "../api/models";
import { Box, Button, Flex } from "@sfgov/design-system/dist/react";
import { Link, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

import IconLeave from "../icons/IconLeave";
import IconWork from "../icons/IconWork";
import { useMakeCopilotActionable } from "@copilotkit/react-core";

function calculateDuration(
  duration: number,
  hoursWorked: { hours: number; minutes: number } = { hours: 0, minutes: 0 }
) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return {
    hours: hoursWorked.hours + hours,
    minutes: hoursWorked.minutes + minutes,
  };
}

type HomeProps = {
  allTimesheets: TimeSheet[];
  timeOffBudget: number;
  timeWorked: number;
  getTaskById: (taskId: number) => Activity | undefined;
  getCustomerByProjectId: (projectId: number) => Customer | undefined;
};

function Home({
  allTimesheets,
  timeOffBudget,
  timeWorked,
  getTaskById,
  getCustomerByProjectId,
}: HomeProps) {
  const navigate = useNavigate();
  useMakeCopilotActionable(
    {
      name: "record_hours",
      description:
        "Begin the record hours workflow by navigating to the select client page",
      argumentAnnotations: [],
      implementation: async (clientName: string) => {
        navigate("/client");
      },
    },
    []
  );
  return (
    <Flex className="flex-col">
      <Flex className="flex-col bg-grey-1 p-24 text-slate-3 mb-28">
        <Box className="mb-24">Weekly Summary</Box>
        <Box className="mb-24">
          <Flex className="flex-row content-center gap-8 flex-wrap">
            <Box>
              <IconWork />
            </Box>
            <Box>Hours Worked:&nbsp;</Box>
            <Box>
              {allTimesheets && calculateDuration(timeWorked).hours}h&nbsp;
              {allTimesheets && calculateDuration(timeWorked).minutes}m
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex className="flex-row content-center gap-8 flex-wrap">
            <Box>
              <IconLeave />
            </Box>
            <Box>Time-off available:&nbsp;</Box>
            <Box>
              {allTimesheets && calculateDuration(timeOffBudget).hours}h&nbsp;
              {allTimesheets && calculateDuration(timeOffBudget).minutes}m
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Flex className="space-between mb-28 px-20">
        <Box className="flex-1">
          <Button className="bg-bright-blue">
            <Link className="no-underline text-white" to={"/client"}>
              ADD HOURS
            </Link>
          </Button>
        </Box>
        <Box className="flex-1">
          <Button variant="secondary">REQUEST LEAVE</Button>
        </Box>
      </Flex>
      <Flex
        style={{
          height: "440px",
          overflow: "auto",
        }}
        className="flex-col px-24 gap-24"
      >
        {allTimesheets.map((timeSheet) => {
          return (
            <Flex
              key={`${timeSheet.begin}-${timeSheet.end}`}
              style={{
                boxShadow:
                  "0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 0px 2px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 0px rgba(0, 0, 0, 0.04)",
              }}
              className="flex-row rounded gap-16 pb-12 pt-12 px-16"
            >
              <Box>{format(parseISO(timeSheet.begin), "dd E")}</Box>
              <Box>
                <Flex className="flex-col">
                  <Box className="mb-8">
                    <span>Total:&nbsp;</span>
                    <span>
                      {calculateDuration(timeSheet.duration).hours}h&nbsp;
                      {calculateDuration(timeSheet.duration).minutes}m
                    </span>
                  </Box>
                  <Box className="mb-8">
                    <span>Client:&nbsp;</span>
                    <span>
                      {getCustomerByProjectId(timeSheet.project)?.name}
                    </span>
                  </Box>
                  <Box>
                    <span>Task:&nbsp;</span>
                    <span>{getTaskById(timeSheet.activity)?.name}</span>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default Home;
