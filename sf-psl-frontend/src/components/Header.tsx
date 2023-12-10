import { Box, Flex } from "@sfgov/design-system/dist/react";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex-shrink-0" style={{ height: "104px" }}>
      <Flex className="justify-end bg-grey-1">
        <a>English</a>
        <a className="ml-28">Español</a>
      </Flex>
      <Flex className="px-20 flex-row py-24">
        <Box className="flex-1" css={{ verticalAlign: "top", padding: 0 }}>
          <span className="block">
            <img
              style={{
                width: "32px",
                height: "32px",
                verticalAlign: "middle",
              }}
              className="inline-block"
              src="https://sf.gov/themes/custom/sfgovpl/logo.svg"
              alt="City and County of San Francisco"
            />
            <img
              style={{
                width: "95px",
                height: "18px",
                verticalAlign: "middle",
              }}
              className="inline-block"
              src="https://sf.gov/themes/custom/sfgovpl/src/img/sfgov.svg"
              alt="sfgov home"
            />
          </span>
        </Box>
        <Box>
          <Link to="/" className="no-underline text-black">
            Home
          </Link>
        </Box>
      </Flex>
    </header>
  );
};

export default Header;
