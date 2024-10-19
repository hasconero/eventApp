import React from "react";
import { Heading, Image } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch(
    `http://localhost:3000/categories?eventId=${params.eventId}`
  );

  return {
    users: await users.json(),
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();

  return (
    <div>
      <Heading>Event</Heading>;<h1>{event.title}</h1>
      <p>by {users.find((user) => user.id === event.createdBy).name}</p>
      <p>{event.description}</p>
    </div>
  );
};
