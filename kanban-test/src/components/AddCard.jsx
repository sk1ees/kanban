import React, { useState } from "react";
import axios from "axios";

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");

  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    try {
      // Get CSRF token from cookie
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

      // Send POST request to Laravel API
      const response = await axios.post(
        "/cards",
        {
          title: text.trim(),
          column: column,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken), // Add decodeURIComponent
          },
        }
      );

      // Update cards state with the newly created card
      setCards((prev) => [...prev, response.data]);

      // Clear input field
      setText("");
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            autoFocus
            placeholder="Add new task..."
            className="w-full mt-2 rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />

          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>

            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add +</span>
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>+ Add Task</span>
        </button>
      )}
    </>
  );
};

export default AddCard;
