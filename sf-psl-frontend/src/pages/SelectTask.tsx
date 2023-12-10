import { Box, Flex } from "@sfgov/design-system/dist/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { ActionCard } from "./SelectClient";
import { Activity } from "../api/models";

type SelectTaskProps = {
  getTasksByProjectId: (projectId: number) => Activity[];
};

const SelectTask = ({ getTasksByProjectId }: SelectTaskProps) => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  if (!clientId) {
    navigate("/");
    return null;
  }
  const tasks = getTasksByProjectId(parseInt(clientId, 10));
  return (
    <Flex className="flex-col">
      <Box className="bg-slate-4">
        <h1 className="text-white p-24">Select service</h1>
      </Box>
      <Box className=" p-24">
        {tasks.map((task) => (
          <Link
            key={task.id}
            className="no-underline w-96 block "
            to={`${location.pathname}/${task.id}/hours`}
          >
            <ActionCard name={task.name} />
          </Link>
        ))}
      </Box>
    </Flex>
  );
};

export default SelectTask;
