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

export const AddEventForm = ({
  onSubmit,
  onClose,
  categories = [],
  users = [],
}) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
    createdBy: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: name === "createdBy" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    const categoryIdString = String(categoryId);
    setNewEvent((prevEvent) => {
      const categoryIds = prevEvent.categoryIds.includes(categoryIdString)
        ? prevEvent.categoryIds.filter((id) => id !== categoryIdString)
        : [...prevEvent.categoryIds, categoryIdString];
      return {
        ...prevEvent,
        categoryIds,
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formattedEvent = {
      ...newEvent,
      categoryIds: newEvent.categoryIds.map((id) => Number(id)),
    };
    onSubmit(formattedEvent);
    onClose();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormLabel>Creator</FormLabel>
      <Select
        placeholder="Select Creator"
        name="createdBy"
        value={newEvent.createdBy}
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
        value={newEvent.title}
        onChange={handleInputChange}
      />

      <FormLabel>Description</FormLabel>
      <Input
        placeholder="Description"
        name="description"
        value={newEvent.description}
        onChange={handleInputChange}
      />

      <FormLabel>Image URL</FormLabel>
      <Input
        placeholder="Image URL"
        name="image"
        value={newEvent.image}
        onChange={handleInputChange}
      />

      <FormLabel>Start Time</FormLabel>
      <Input
        type="datetime-local"
        name="startTime"
        value={newEvent.startTime}
        onChange={handleInputChange}
      />

      <FormLabel>End Time</FormLabel>
      <Input
        type="datetime-local"
        name="endTime"
        value={newEvent.endTime}
        onChange={handleInputChange}
      />

      <FormLabel>Select Categories</FormLabel>
      <CheckboxGroup>
        <Stack>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Checkbox
                key={category.id}
                value={String(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                isChecked={newEvent.categoryIds.includes(String(category.id))}
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
