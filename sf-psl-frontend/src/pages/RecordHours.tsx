import { Activity, Customer, TimeSheet } from "../api/models";
import {
  Box,
  Button,
  Flex,
  Text,
  TitleMd,
  TitleSm,
} from "@sfgov/design-system/dist/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IconLocation from "../icons/IconLocation";
import IconStart from "../icons/IconStart";
import IconStop from "../icons/IconStop";
import { createTimeSheet } from "../api/createTimeSheet";

type RecordHoursProps = {
  refreshTimeoffBudget: (
    projectId: number,
    newTimesheet: TimeSheet
  ) => Promise<void>;
  getTaskById: (taskId: number) => Activity | undefined;
  getCustomerByProjectId: (projectId: number) => Customer | undefined;
};

const RecordHours = ({
  refreshTimeoffBudget,
  getTaskById,
  getCustomerByProjectId,
}: RecordHoursProps) => {
  const { clientId, taskId } = useParams();
  const navigate = useNavigate();

  const recordHours = (clientId: number, taskId: number) => {
    setRecordingHours(false);
    setSavingEntry(true);
    createTimeSheet(clientId, taskId)
      .then((newTimesheet) => {
        return refreshTimeoffBudget(clientId, newTimesheet);
      })
      .then(() => {
        navigate("/");
        setTime(0);
      });
  };

  const [savingEntry, setSavingEntry] = useState(false);
  const [recordingHours, setRecordingHours] = useState(false);
  const [time, setTime] = useState(0);
  useEffect(() => {
    let intervalId: any;
    if (recordingHours) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [recordingHours, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  if (!clientId || !taskId) {
    navigate("/");
    return null;
  }

  return (
    <Flex className="flex-col" style={{ height: "730px" }}>
      <Box className="bg-slate-4">
        <h1 className="text-white p-24">Record hours</h1>
      </Box>
      <Box className="p-24 bg-grey-1">
        <Flex className="flex-row gap-4 items-center">
          <Box>
            <IconLocation />
          </Box>
          <Box>{getCustomerByProjectId(parseInt(clientId))?.name}</Box>
        </Flex>
      </Box>
      <Box className="px-24">
        <h2 className="mb-8">Service</h2>
        <Flex className="flex-row flex-wrap-no">
          <Box className="p-8 bg-grey-1 rounded flex-shrink-0">
            {getTaskById(parseInt(taskId))?.name}
          </Box>
        </Flex>
      </Box>
      <Box className="px-24">
        <Flex className="flex-col items-center gap-28">
          <Box>
            <h3>START TIME</h3>
          </Box>
          <Box>
            <Text>
              {hours}:{minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </Text>
          </Box>
          {savingEntry ? (
            <Box>
              <Text>Recording entry. Page will refresh when complete</Text>
            </Box>
          ) : (
            <Box
              className={`${
                recordingHours ? "bg-grey-1" : "bg-action"
              } rounded-full`}
            >
              <Flex className="h-80 w-80 justify-center items-center content-center justify-items-center flex-wrap flex-col">
                {recordingHours ? (
                  <Box className="h-28 w-28">
                    <button
                      onClick={() =>
                        recordHours(
                          parseInt(clientId, 10),
                          parseInt(taskId, 10)
                        )
                      }
                      style={{
                        background: "none",
                        color: "inherit",
                        padding: "0",
                        outline: "inherit",
                        border: "0",
                        width: "100%",
                      }}
                    >
                      <IconStop />
                    </button>
                  </Box>
                ) : (
                  <Box className="h-28 w-28">
                    <button
                      onClick={() => setRecordingHours(true)}
                      style={{
                        background: "none",
                        color: "inherit",
                        padding: "0",
                        outline: "inherit",
                        border: "0",
                        width: "100%",
                      }}
                    >
                      <IconStart />
                    </button>
                  </Box>
                )}
              </Flex>
            </Box>
          )}
        </Flex>
      </Box>
      <Box>
        <Flex className="justify-center items-center content-center justify-items-center flex-wrap flex-col gap-24 py-16">
          <Box>
            <Text>OR</Text>
          </Box>
          <Button variant="secondary">Enter Manually</Button>
        </Flex>
      </Box>
      <Box className="p-24">
        <TitleSm className="mb-8">Notes</TitleSm>
        <textarea
          placeholder="Add notes here"
          className="w-full h-100 rounded"
        ></textarea>
      </Box>
    </Flex>
  );
};

export default RecordHours;
