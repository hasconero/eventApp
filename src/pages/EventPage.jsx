import React from "react";
import {
  Heading,
  Image,
  Text,
  Box,
  Stack,
  SimpleGrid,
  Center,
  Tag,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  const usersData = await users.json();
  const eventsData = await events.json();
  const categoriesData = await categories.json();

  const event = eventsData.find((e) => e.id === Number(params.eventId));

  if (!event) {
    throw new Response("Event Not Found", { status: 404 });
  }

  return {
    users: usersData,
    event,
    categories: categoriesData,
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();

  return (
    <Center w="100%" maxW="1200px" mx="auto" p={5}>
      {" "}
      {/* Same Center and maxW as EventsPage */}
      <Box w="100%">
        {" "}
        {/* Ensure full width of content */}
        <Heading color="teal.500" mb={6}>
          Event Details
        </Heading>
        {/* SimpleGrid for responsiveness */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Event details */}
          <Stack spacing={4}>
            <Heading size="lg">{event.title}</Heading>
            <Text fontSize="lg" fontWeight="bold">
              by {users.find((user) => user.id === event.createdBy)?.name}
            </Text>
            <Text fontSize="md">{event.description}</Text>
            <Text>
              Start Time: {new Date(event.startTime).toLocaleString()}
            </Text>
            <Text>End Time: {new Date(event.endTime).toLocaleString()}</Text>
            <Text as="i" color="gray.600">
              Categories:{" "}
              {event.categoryIds.map((id) => {
                const categoryName = categories.find(
                  (cat) => cat.id === id
                )?.name;
                return categoryName ? (
                  <Tag key={id} colorScheme="teal" mr={2}>
                    {categoryName}
                  </Tag>
                ) : null;
              })}
            </Text>
          </Stack>

          {/* Event image */}
          <Image
            src={event.image}
            alt={event.title}
            boxSize={{ base: "100%", md: "300px" }} // Responsive sizing
            borderRadius="md"
            objectFit="cover"
          />
        </SimpleGrid>
      </Box>
    </Center>
  );
};
