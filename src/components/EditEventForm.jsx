import React, { useState } from "react";
import {
  Input,
  FormLabel,
  CheckboxGroup,
  Checkbox,
  Stack,
  Select,
  Text,
} from "@chakra-ui/react";
import { Button } from "./ui/Button";

export const EditEventForm = ({
  event,
  categories,
  users,
  onSubmit,
  onClose,
}) => {
  const [updatedEvent, setUpdatedEvent] = useState({
    ...event,
    categoryIds: event.categoryIds.map(String), // Convert categoryIds to strings
    startTime: event.startTime ? event.startTime.split(".")[0] : "",
    endTime: event.endTime ? event.endTime.split(".")[0] : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: name === "createdBy" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setUpdatedEvent((prevEvent) => {
      const categoryIds = prevEvent.categoryIds.includes(String(categoryId))
        ? prevEvent.categoryIds.filter((id) => id !== String(categoryId))
        : [...prevEvent.categoryIds, String(categoryId)]; // Convert to string
      return {
        ...prevEvent,
        categoryIds,
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Convert categoryIds back to numbers before submitting
    const updatedEventWithNumberIds = {
      ...updatedEvent,
      categoryIds: updatedEvent.categoryIds.map(Number),
    };
    onSubmit(updatedEventWithNumberIds);
    onClose();
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
      <CheckboxGroup>
        <Stack>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Checkbox
                key={category.id}
                value={String(category.id)} // Convert to string
                onChange={() => handleCategoryChange(category.id)}
                isChecked={updatedEvent.categoryIds.includes(
                  String(category.id)
                )} // Check by string
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
