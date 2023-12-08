"use client";

import "./navbar.css";
import React, { useEffect, useState } from "react";
import { Flex, Avatar, Badge, Text, Box } from "@chakra-ui/react";
import isAuthenticated from "@/hooks/IsAuthenticated";

const Navbar = () => {
  const { user } = isAuthenticated();

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!user) {
    return null;
  }

  const emailString = `${user?.email}`;
  const takeNameBeforeAtSign = emailString.indexOf("@");
  const nameBeforeAtSign = emailString.substring(0, takeNameBeforeAtSign);
  const uppercasedName =
    nameBeforeAtSign.charAt(0).toUpperCase() + nameBeforeAtSign.slice(1);

  return (
    <>
      {isClient ? (
        <>
          <div className="welcome">
            {/* <p>Welcome to LogicRoom Tech</p> */}
            <Flex>
              <Avatar src={`/${nameBeforeAtSign}.jpg`} />
              <Box ml="3">
                <Text fontWeight="bold">
                  {uppercasedName}
                  <Badge ml="1" colorScheme="green">
                    Admin
                  </Badge>
                </Text>
                <Text fontSize="sm">Front End Developer</Text>
              </Box>
            </Flex>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Navbar;
