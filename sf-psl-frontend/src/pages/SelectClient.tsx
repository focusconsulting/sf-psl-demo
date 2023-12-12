import { BodyText, Box, Flex } from "@sfgov/design-system/dist/react";

import { Link } from "react-router-dom";
import { PslClientData } from "../hooks/usePslAppData";

type SelectClientProps = {
  clients: PslClientData[];
};

const PlaceHolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M2 6C2 4.93913 2.42143 3.92172 3.17157 3.17157C3.92172 2.42143 4.93913 2 6 2H18C19.0609 2 20.0783 2.42143 20.8284 3.17157C21.5786 3.92172 22 4.93913 22 6V18C22 19.0609 21.5786 20.0783 20.8284 20.8284C20.0783 21.5786 19.0609 22 18 22H6C4.93913 22 3.92172 21.5786 3.17157 20.8284C2.42143 20.0783 2 19.0609 2 18V6Z"
      fill="#E5E7EB"
      stroke="#5A7A92"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 11C9.88071 11 11 9.88071 11 8.5C11 7.11929 9.88071 6 8.5 6C7.11929 6 6 7.11929 6 8.5C6 9.88071 7.11929 11 8.5 11Z"
      fill="#E5E7EB"
      stroke="#5A7A92"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.526 12.6211L6 22.0001H18.133C19.1586 22.0001 20.1422 21.5926 20.8674 20.8674C21.5926 20.1422 22 19.1586 22 18.1331V18.0001C22 17.5341 21.825 17.3551 21.51 17.0101L17.48 12.6151C17.2922 12.4102 17.0637 12.2467 16.8092 12.135C16.5546 12.0234 16.2796 11.966 16.0017 11.9666C15.7237 11.9671 15.449 12.0256 15.1949 12.1383C14.9408 12.251 14.713 12.4154 14.526 12.6211Z"
      fill="#E5E7EB"
      stroke="#5A7A92"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type CustomerCardProps = {
  name: string;
};

export const ActionCard = ({ name }: CustomerCardProps) => (
  <Flex className="flex-col text-black gap-8">
    <Box className=" rounded-4 bg-blue-1">
      <Flex className="w-96 h-96 justify-center items-center content-center justify-items-center flex-wrap">
        <Box className="h-24 w-24">
          <PlaceHolderIcon />
        </Box>
      </Flex>
    </Box>
    <Box className="no-underline">
      <BodyText>{name}</BodyText>
    </Box>
  </Flex>
);

const SelectClient = ({ clients }: SelectClientProps) => {
  return (
    <Flex className="flex-col">
      <Box className="bg-slate-4">
        <h1 className="text-white p-24">Select customer</h1>
      </Box>
      <Box className="pt-24 pb-24  p-24">
        <h2 className="mb-24">Recent</h2>
        {clients.map((client) => (
          <Link
            key={client.customer.id}
            className="no-underline w-96 block text-dark-grey"
            to={`/${client.project.id}/task`}
          >
            <ActionCard name={client.customer.name} />
          </Link>
        ))}
      </Box>
      <Box className="no-underline  p-24">
        <h2 className="mb-24">All</h2>
        {clients.map((client) => (
          <Link
            key={client.customer.id}
            className="no-underline w-96 block "
            to={`/${client.project.id}/task`}
          >
            <ActionCard name={client.customer.name} />
          </Link>
        ))}
      </Box>
    </Flex>
  );
};

export default SelectClient;
