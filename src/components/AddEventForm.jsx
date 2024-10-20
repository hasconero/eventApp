import React, { useState } from "react";
import {
  Input,
  FormLabel,
  CheckboxGroup,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { Button } from "./ui/Button";

export const AddEventForm = ({ onSubmit, onClose, categories }) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
    createdBy: "", // Allow the user to input their name
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setNewEvent((prevEvent) => {
      const categoryIds = prevEvent.categoryIds.includes(categoryId)
        ? prevEvent.categoryIds.filter((id) => id !== categoryId)
        : [...prevEvent.categoryIds, categoryId];
      return {
        ...prevEvent,
        categoryIds,
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(newEvent); // Submit form data to the parent component
    onClose(); // Close modal after submission
  };

  return (
    <form onSubmit={handleFormSubmit}>
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

      {/* Input field for creator's name */}
      <FormLabel>Creator</FormLabel>
      <Input
        placeholder="Creator's Name"
        name="createdBy"
        value={newEvent.createdBy}
        onChange={handleInputChange}
      />

      {/* Category checkboxes */}
      <FormLabel>Select Categories</FormLabel>
      <CheckboxGroup>
        <Stack>
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              value={category.id}
              onChange={() => handleCategoryChange(category.id)}
              isChecked={newEvent.categoryIds.includes(category.id)}
            >
              {category.name}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>

      <Button colorScheme="teal" type="submit" mt={4}>
        Save Event
      </Button>
    </form>
  );
};
