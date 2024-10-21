import React, { useState } from "react";
import {
  Heading,
  Image,
  Center,
  Text,
  Box,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventSearch } from "../components/EventSearch";
import { AddEventModal } from "../components/AddEventModal";
import { Button } from "../components/ui/Button";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { users, events, categories } = useLoaderData();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state

  // Handle adding new event (POST to server)
  const handleAddEvent = async (newEvent) => {
    console.log(newEvent);
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (response.ok) {
        const addedEvent = await response.json();
        setFilteredEvents([...filteredEvents, addedEvent]); // Update the displayed events list
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const getCategories = (categoryIds) => {
    return categoryIds
      .map((id) => categories.find((cat) => cat.id === id)?.name)
      .filter(Boolean) // Filter out any undefined names
      .map((categoryName) => (
        <Tag key={categoryName} colorScheme="teal" mr={2}>
          {categoryName}
        </Tag>
      ));
  };

  return (
    <Center w="100%" maxW="1200px" mx="auto" p={5}>
      {" "}
      {/* Same Center and maxW */}
      <Box w="100%" px={{ base: 4, md: 8 }} py={5}>
        {" "}
        {/* Ensure full width of content */}
        <Heading color="teal.500" mb={6}>
          List of events
        </Heading>
        {/* EventSearch component */}
        <EventSearch
          events={events}
          setFilteredEvents={setFilteredEvents}
          categories={categories}
        />
        {/* Add Event Button */}
        <Button onClick={() => setIsModalOpen(true)} mb={6}>
          Add Event
        </Button>
        {/* Modal for adding new events */}
        <AddEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddEvent}
          categories={categories} // Pass categories to the modal
          users={users}
        />
        {/* Display events as a responsive grid */}
        {filteredEvents.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }} // 1 column for base (mobile), 2 for small screens, 3 for medium and up
            spacing={6}
            w="100%"
            maxW="1200px"
          >
            {filteredEvents.map((event) => (
              <Box
                key={event.id}
                p={{ base: 3, md: 5 }}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
              >
                <Link to={`event/${event.id}`}>
                  <Heading
                    color="teal.500"
                    size={{ base: "sm", md: "md" }}
                    mb={2}
                  >
                    {event.title}
                  </Heading>
                </Link>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "sm", md: "md" }}
                  mb={2}
                >
                  {event.description}
                </Text>
                <Text fontSize={{ base: "xs", md: "md" }}>
                  Created by:{" "}
                  {users.find((user) => event.createdBy === user.id)?.name}
                </Text>
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.title}
                    boxSize={{ base: "150px", sm: "200px", md: "150px" }} // Resize for smaller screens
                    objectFit="cover"
                    mb={2}
                  />
                ) : (
                  <Text mb={8}>No image available</Text>
                )}
                <Text whiteSpace="normal" wordWrap="break-word">
                  Start Time: {new Date(event.startTime).toLocaleString()}
                </Text>
                <Text whiteSpace="normal" wordWrap="break-word">
                  End Time: {new Date(event.endTime).toLocaleString()}
                </Text>

                <Text as="i" color="gray.600">
                  Categories: {getCategories(event.categoryIds)}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text>No events found</Text>
        )}
      </Box>
    </Center>
  );
};
