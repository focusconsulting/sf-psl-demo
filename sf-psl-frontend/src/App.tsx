import { Box, Flex } from "@sfgov/design-system/dist/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import RecordHours from "./pages/RecordHours";
import SelectClient from "./pages/SelectClient";
import SelectTask from "./pages/SelectTask";
import { usePslAppData } from "./hooks/usePslAppData";

function App() {
  const appData = usePslAppData();
  if (!appData) {
    return (
      <BrowserRouter>
        <Flex className="flex-col flex-nowrap w-full h-full">
          <Header />
          <Flex
            style={{ height: "calc(100vh - 212px)" }}
            className="flex-col items-center justify-center"
          >
            <div
              className="border-t-3 border-solid border-l-0 border-r-0 border-b-0 border-slate-3 w-max"
              style={{ opacity: ".1" }}
            ></div>
            <Box>Loading...</Box>
          </Flex>

          <Footer />
        </Flex>
      </BrowserRouter>
    );
  }

  const {
    getTimeOffBudget,
    getTimeWorked,
    getAllTimesheets,
    getCustomerByProjectId,
    getTaskById,
    getAllClients,
    getTasksByProjectId,
    refreshTimeoffBudget,
  } = appData;

  return (
    <BrowserRouter>
      <Flex className="flex-col flex-nowrap w-full h-full">
        <Header />
        <div
          className="overflow-auto grow"
          style={{ height: "calc(100vh - 212px)" }}
        >
          <div
            className="border-t-3 border-solid border-l-0 border-r-0 border-b-0 border-slate-3 w-max"
            style={{ opacity: ".1" }}
          ></div>
          <Routes>
            <Route
              element={
                <Home
                  allTimesheets={getAllTimesheets()}
                  timeOffBudget={getTimeOffBudget()}
                  timeWorked={getTimeWorked()}
                  getCustomerByProjectId={getCustomerByProjectId}
                  getTaskById={getTaskById}
                />
              }
              path="/"
            ></Route>
            <Route
              element={<SelectClient clients={getAllClients()} />}
              path="/client"
            ></Route>
            <Route
              element={<SelectTask getTasksByProjectId={getTasksByProjectId} />}
              path="/:clientId/task"
            ></Route>
            <Route
              element={
                <RecordHours
                  getTaskById={getTaskById}
                  getCustomerByProjectId={getCustomerByProjectId}
                  refreshTimeoffBudget={refreshTimeoffBudget}
                />
              }
              path="/:clientId/task/:taskId/hours"
            ></Route>
          </Routes>
        </div>
        <Footer />
      </Flex>
    </BrowserRouter>
  );
}

export default App;
