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
  Button,
} from "@chakra-ui/react";
import { useLoaderData, Link as RouterLink } from "react-router-dom";

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

  // Find the creator based on the createdBy field
  const creator = users.find((user) => user.id === event.createdBy);

  return (
    <Center w="100%" maxW="1200px" mx="auto" p={5}>
      <Box w="100%">
        <Heading color="teal.500" mb={6}>
          Event Details
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Event details */}
          <Stack spacing={4}>
            <Heading size="lg">{event.title}</Heading>

            {/* Display creator's name and image */}
            <Stack direction="row" spacing={4} alignItems="center">
              <Image
                src={creator?.image}
                alt={creator?.name}
                boxSize="50px"
                borderRadius="full"
                objectFit="cover"
              />
              <Text fontSize="lg" fontWeight="bold">
                by {creator?.name}
              </Text>
            </Stack>

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

            <Button as={RouterLink} to="/" colorScheme="teal" mb={4}>
              Back to Events
            </Button>
          </Stack>

          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              boxSize={{ base: "100%", md: "300px" }}
              borderRadius="md"
              objectFit="cover"
            />
          ) : (
            <Image
              src="/placeholder-image.png"
              alt="No image available"
              boxSize={{ base: "100%", md: "300px" }}
              borderRadius="md"
              objectFit="cover"
            />
          )}
        </SimpleGrid>
      </Box>
    </Center>
  );
};
