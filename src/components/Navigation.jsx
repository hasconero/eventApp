import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, HStack, Link, Heading } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box bg="teal.500" px={4} mb={6}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as={RouterLink} to="/" size="lg" color="white">
          Event Manager
        </Heading>

        <HStack as="nav" spacing={4}>
          <Link
            as={RouterLink}
            to="/"
            color="white"
            _hover={{ textDecoration: "none", color: "teal.200" }}
          >
            Events
          </Link>
          <Link
            as={RouterLink}
            to="/event/1"
            color="white"
            _hover={{ textDecoration: "none", color: "teal.200" }}
          >
            Event
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};
