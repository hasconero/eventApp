import React from "react";
import { Heading, Image } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { users, events, categories } = useLoaderData();

  const getCategories = (categoryIds) => {
    return categoryIds
      .map((id) => categories.find((cat) => cat.id === id)?.name)
      .join(", ");
  };

  return (
    <div>
      <Heading fontSize={"2xl"} color="green.600">
        List of events
      </Heading>
      {events.map((event) => (
        <div key={event.id}>
          <Link to={`event/${event.id}`}>
            <h2>{event.title}</h2>
          </Link>
          <p>{event.description}</p>
          <Image src={event.image} alt={event.title} boxSize="150px" />
          <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
          <p>End Time: {new Date(event.endTime).toLocaleString()}</p>
          <p>Categories: {getCategories(event.categoryIds)}</p>
          <p>
            Created by:{" "}
            {users.find((user) => event.createdBy === user.id)?.name}
          </p>
        </div>
      ))}
    </div>
  );
};
