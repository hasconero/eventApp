import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import {
  useLoaderData,
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";
import { EditEventModal } from "../components/EditEventModal";
import { ConfirmationModal } from "../components/ConfirmationModal"; // Import the ConfirmationModal

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // State to control confirmation modal
  const toast = useToast();
  const navigate = useNavigate();

  const creator = users.find((user) => user.id === event.createdBy);

  const handleEditEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Function to handle the event deletion
  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      toast({
        title: "Event deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to the EventsPage after deletion
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Failed to delete event.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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

            <Stack direction="row" spacing={4} alignItems="center">
              {creator?.image && (
                <Image
                  src={creator.image}
                  alt={creator.name}
                  boxSize="50px"
                  borderRadius="full"
                  objectFit="cover"
                />
              )}
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

            {/* Edit Event Button */}
            <Button onClick={() => setIsModalOpen(true)} colorScheme="blue">
              Edit Event
            </Button>

            {/* Delete Event Button */}
            <Button
              onClick={() => setIsConfirmOpen(true)} // Show confirmation modal
              colorScheme="red"
            >
              Delete Event
            </Button>

            <Button as={RouterLink} to="/" colorScheme="teal" mb={4}>
              Back to Events
            </Button>

            {/* Edit Event Modal */}
            <EditEventModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              event={event}
              categories={categories}
              users={users}
              onSubmit={handleEditEvent}
            />

            {/* Confirmation Modal for Delete */}
            <ConfirmationModal
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={handleDeleteEvent}
              message="Are you sure you want to delete this event? This action cannot be undone."
            />
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
