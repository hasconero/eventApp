import { useState } from "react";
import { TextInput } from "./ui/TextInput";
import { Flex, Box, Select } from "@chakra-ui/react";

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
    <Box w="100%" mb={8}>
      {/* Flex container for aligning search and filter */}
      <Flex
        mb={4}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap" // Ensures proper wrap on smaller screens
      >
        <Box flex="1" maxW="300px" mr={4}>
          <label htmlFor="search" style={{ marginRight: "8px" }}>
            Search for events:
          </label>
          <TextInput
            id="search"
            onChange={handleChange}
            w="100%"
            value={searchField}
            placeholder="Search..."
          />
        </Box>

        <Box flex="1" maxW="300px">
          <label htmlFor="filter" style={{ marginRight: "8px" }}>
            Filter by category:
          </label>
          <Select
            id="filter"
            placeholder="Select category"
            onChange={handleCategoryChange}
            w="100%"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};
