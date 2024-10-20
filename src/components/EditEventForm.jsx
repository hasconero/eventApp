import { useState } from "react";

export const editEventForm = ({ editEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categories, setCategories] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // An async function, but no need to wait for it.
    editEvent({ title, description, image, startTime, endTime, categories });

    // Empty the form fields.
    setTitle("");
    setDescription("");
    setImage("");
    setStartTime("");
    setEndTime("");
    setCategories("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        required="required"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="email"
        required="required"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="url"
        required="required"
        placeholder="website"
        onChange={(e) => setWebsite(e.target.value)}
        value={website}
      />
      <button type="submit">Add user</button>
    </form>
  );
};
