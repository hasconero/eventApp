import React, { useState } from "react";
import {
  Heading,
  Image,
  Center,
  Text,
  Box,
  SimpleGrid,
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
      .join(", ");
  };

  return (
    <Center w="100%" maxW="1200px" mx="auto" p={5}>
      {" "}
      {/* Same Center and maxW */}
      <Box w="100%">
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
        />
        {/* Display events as a responsive grid */}
        {filteredEvents.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={6}
            w="100%"
            maxW="1200px"
          >
            {filteredEvents.map((event) => (
              <Box
                key={event.id}
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
              >
                <Link to={`event/${event.id}`}>
                  <Heading size="md" mb={2}>
                    {event.title}
                  </Heading>
                </Link>
                <Text fontWeight="bold" mb={2}>
                  {event.description}
                </Text>
                <Text mb={2}>
                  Created by:{" "}
                  {users.find((user) => event.createdBy === user.id)?.name}
                </Text>
                <Image
                  src={event.image}
                  alt={event.title}
                  boxSize={{ base: "100%", md: "150px" }}
                  mb={2}
                />
                <Text>
                  Start Time: {new Date(event.startTime).toLocaleString()}
                </Text>
                <Text>
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
