import React, { useState } from "react";
import {
  Input,
  FormLabel,
  CheckboxGroup,
  Checkbox,
  Stack,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom"; // To navigate after the form is submitted

export const EditEventForm = ({ event, categories, users, onSubmit }) => {
  const [updatedEvent, setUpdatedEvent] = useState({
    ...event,
    categoryIds: event.categoryIds.map(String), // Ensure categoryIds are treated as strings
    startTime: event.startTime ? event.startTime.split(".")[0] : "",
    endTime: event.endTime ? event.endTime.split(".")[0] : "",
  });

  const toast = useToast(); // For showing success or failure messages
  const navigate = useNavigate(); // For redirecting the user

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: name === "createdBy" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (categoryIds) => {
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      categoryIds, // Directly update the categoryIds array
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedEventWithNumberIds = {
      ...updatedEvent,
      categoryIds: updatedEvent.categoryIds.map(Number),
    };
    try {
      // Assuming onSubmit returns a Promise
      await onSubmit(updatedEventWithNumberIds);

      // Show a success toast
      toast({
        title: "Event updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to the EventsPage after a delay (so the user sees the toast)
      setTimeout(() => {
        navigate("/"); // Redirect to the EventsPage
      }, 3000); // Short delay before redirection
    } catch (error) {
      // Show an error toast if something goes wrong
      toast({
        title: "Failed to update event.",
        description:
          error.message || "An error occurred while updating the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormLabel>Creator</FormLabel>
      <Select
        placeholder="Select Creator"
        name="createdBy"
        value={updatedEvent.createdBy}
        onChange={handleInputChange}
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </Select>

      <FormLabel>Event Title</FormLabel>
      <Input
        placeholder="Title"
        name="title"
        value={updatedEvent.title}
        onChange={handleInputChange}
      />

      <FormLabel>Description</FormLabel>
      <Input
        placeholder="Description"
        name="description"
        value={updatedEvent.description}
        onChange={handleInputChange}
      />

      <FormLabel>Image URL</FormLabel>
      <Input
        placeholder="Image URL"
        name="image"
        value={updatedEvent.image}
        onChange={handleInputChange}
      />

      <FormLabel>Start Time</FormLabel>
      <Input
        type="datetime-local"
        name="startTime"
        value={updatedEvent.startTime}
        onChange={handleInputChange}
      />

      <FormLabel>End Time</FormLabel>
      <Input
        type="datetime-local"
        name="endTime"
        value={updatedEvent.endTime}
        onChange={handleInputChange}
      />

      <FormLabel>Select Categories</FormLabel>
      <CheckboxGroup
        value={updatedEvent.categoryIds} // Bind directly to state
        onChange={handleCategoryChange} // Set category IDs on change
      >
        <Stack>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Checkbox
                key={category.id}
                value={String(category.id)} // Ensure it's a string
              >
                {category.name}
              </Checkbox>
            ))
          ) : (
            <Text>No categories available</Text>
          )}
        </Stack>
      </CheckboxGroup>

      <Button colorScheme="teal" type="submit" mt={4}>
        Save Event
      </Button>
    </form>
  );
};
