import React from "react";
import { Heading, Image, Text } from "@chakra-ui/react";
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
      <Heading color="green.600">Event Details</Heading>
      <Heading size="md">{event.title}</Heading>
      <Text>by {users.find((user) => user.id === event.createdBy)?.name}</Text>
      <Text as="b">{event.description}</Text>
      <Image src={event.image} alt={event.title} boxSize="300px" />
      <Text>Start Time: {new Date(event.startTime).toLocaleString()}</Text>
      <Text>End Time: {new Date(event.endTime).toLocaleString()}</Text>
      <Text as="i">
        Categories:{" "}
        {event.categoryIds
          .map((id) => categories.find((cat) => cat.id === id)?.name)
          .join(", ")}
      </Text>
    </div>
  );
};
