import App from "./App";
import Chat from "./components/Chat";
import { CopilotProvider } from "@copilotkit/react-core";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CopilotProvider chatApiEndpoint="http://localhost:3100/copilot">
      <Chat>
        <App />
      </Chat>
    </CopilotProvider>
  </React.StrictMode>
);
