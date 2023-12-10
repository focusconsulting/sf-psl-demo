import { Box, Flex } from "@sfgov/design-system/dist/react";

import IconClient from "../icons/IconClient";
import IconHome from "../icons/IconHome";
import IconLeave from "../icons/IconLeave";
import IconProfile from "../icons/IconProfile";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer
    className="border-t-3 border-solid border-l-0 border-r-0 border-b-0 border-slate-3 w-max"
    style={{ height: "86px" }}
  >
    <Flex className="flex-row justify-evenly text-small py-20 px-16 text-center">
      <Box className="flex-1 ">
        <div>
          <Link to="/" className="no-underline text-black">
            <IconHome />
          </Link>
        </div>
        <div>Home</div>
      </Box>
      <Box className="flex-1">
        <div>
          <IconClient />
        </div>
        <div>Clients</div>
      </Box>
      <Box className="flex-1">
        <div>
          <IconLeave />
        </div>
        <div>Request Leave</div>
      </Box>
      <Box className="flex-1">
        <div>
          <IconProfile />
        </div>
        <div>Profile</div>
      </Box>
    </Flex>
  </footer>
);

export default Footer;
