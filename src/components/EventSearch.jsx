import { useState } from "react";
import { TextInput } from "./ui/TextInput";
import { Select } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

export const EventSearch = ({ events, setFilteredEvents, categories }) => {
  const [searchField, setSearchField] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State for category filter

  const handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchField(searchValue);
    filterEvents(searchValue, selectedCategory);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterEvents(searchField, category);
  };

  // Filter events based on search and category selection
  const filterEvents = (searchTerm, category) => {
    let filteredEvents = events;

    // Filter based on event title
    if (searchTerm) {
      filteredEvents = filteredEvents.filter((ev) =>
        ev.title.toLowerCase().includes(searchTerm)
      );
    }

    // Filter based on category if selected
    if (category) {
      filteredEvents = filteredEvents.filter((ev) =>
        ev.categoryIds.includes(Number(category))
      );
    }

    setFilteredEvents(filteredEvents);
  };

  return (
    <>
      <label>Search for events:</label>
      <TextInput onChange={handleChange} w={200} mb={8} value={searchField} />

      {/* Dropdown for category filter */}
      <label>Filter by category:</label>
      <Select
        placeholder="Select category"
        onChange={handleCategoryChange}
        mb={8}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </>
  );
};
