import { useState } from "react";
import { EventsPage } from "./DrinkItems";
import { TextInput } from "./ui/TextInput";

export const EventSearch = () => {
  return (
    <>
      <label>Search for an event:</label>
      <TextInput w={200} mb={8} />
      <EventsPage />
    </>
  );
};
