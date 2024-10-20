import { useState } from "react";
import { TextInput } from "./ui/TextInput";
import { EventsPage } from "../pages/EventPage";

export const EventSearch = () => {
  return (
    <>
      <label>Search for an event:</label>
      <TextInput w={200} mb={8} />
      <EventsPage />
    </>
  );
};
