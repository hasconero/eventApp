import React from "react";
import { NavLink as RouterNavLink, Link as RouterLink } from "react-router-dom";
import { Box, Flex, HStack, Link, Heading } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box bg="teal.500" px={4} mb={6}>
      <Flex h={16} alignItems="center" justifyContent="flex-start">
        <Heading
          as={RouterLink}
          to="/"
          size="lg"
          color="white"
          _hover={{ textDecoration: "none" }}
          mr={16}
        >
          Event Manager
        </Heading>

        <HStack as="nav" spacing={10}>
          <Link
            as={RouterNavLink}
            to="/"
            color="white"
            _hover={{ textDecoration: "none", color: "teal.200" }}
            _activeLink={{ color: "teal.200", fontWeight: "bold" }}
            end
          >
            Events
          </Link>

          <Link
            as={RouterNavLink}
            to="/event/1"
            color="white"
            _hover={{ textDecoration: "none", color: "teal.200" }}
            _activeLink={{ color: "teal.200", fontWeight: "bold" }}
          >
            Event
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};
