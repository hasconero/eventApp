import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Center } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Center w="100%" maxW="1200px" mx="auto" p={5}>
      <Box w="100%">
        <Navigation />
        <Outlet />
      </Box>
    </Center>
  );
};
