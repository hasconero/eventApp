import React, { useState } from "react";
import { Input, FormLabel } from "@chakra-ui/react";
import { Button } from "./ui/Button";

export const AddEventForm = ({ onSubmit, onClose }) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
    createdBy: 1, // Defaulting to the first user for simplicity
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
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

      <FormLabel>Category IDs (comma-separated)</FormLabel>
      <Input
        placeholder="Category IDs"
        name="categoryIds"
        value={newEvent.categoryIds}
        onChange={(e) =>
          setNewEvent({
            ...newEvent,
            categoryIds: e.target.value.split(",").map(Number), // Convert to array of numbers
          })
        }
      />

      <Button colorScheme="teal" type="submit" mt={4}>
        Save Event
      </Button>
    </form>
  );
};
