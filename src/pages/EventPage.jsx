import React from "react";
import { Heading, Image } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

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

  return (
    <div>
      <Heading>Event Details</Heading>
      <h1>{event.title}</h1>
      <p>by {users.find((user) => user.id === event.createdBy)?.name}</p>
      <p>{event.description}</p>
      <Image src={event.image} alt={event.title} boxSize="300px" />
      <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(event.endTime).toLocaleString()}</p>
      <p>
        Categories:{" "}
        {event.categoryIds
          .map((id) => categories.find((cat) => cat.id === id)?.name)
          .join(", ")}
      </p>
    </div>
  );
};
