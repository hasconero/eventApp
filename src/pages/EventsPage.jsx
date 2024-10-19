import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");

  return { users: await users.json(), events: await events.json() };
};

export const EventsPage = () => {
  const { users, events } = useLoaderData();

  return (
    <div>
      <Heading>List of events</Heading>
      {events.map((event) => (
        <div key={event.id}>
          <Link to={`event/${event.id}`}>
            <h2>{event.title}</h2>
          </Link>
          <p>{event.description}</p>
          <p>
            Created by:{" "}
            {users.find((user) => event.createdBy === user.id)?.name}
          </p>
        </div>
      ))}
    </div>
  );
};
