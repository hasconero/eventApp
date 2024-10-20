import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Center } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Center>
      <Box>
        <Navigation />
        <Outlet />
      </Box>
    </Center>
  );
};
