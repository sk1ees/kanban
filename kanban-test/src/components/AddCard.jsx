import React, { useState } from "react";

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");

  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };
   
    const formData = new URLSearchParams();
    formData.append("column", newCard.column);
    formData.append("title", newCard.title);
    formData.append("id", newCard.id);
    setCards((prev) => [...prev, newCard]);


    setAdding(false);
    try {
    
        
      const response = await fetch("http://localhost:8000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: formData.toString(), 
      });

     
      if (!response.ok) {
        const text = await response.text();
        console.error("Failed to add card:", text);
        throw new Error("Failed to add card: " + text);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit} method="post">
          <textarea
            onChange={(e) => {
              setText(e.target.value);
            }}
            autoFocus
            placeholder="Add new task..."
            className="w-full mt-2 rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />

          <div className="mt-1.5 flex items-center justify-end gap-1.5 ">
            <button
              onClick={() => {
                setAdding(false);
              }}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>

            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              {" "}
              <span>Add +</span>
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span> + Add Task </span>
        </button>
      )}
    </>
  );
};

export default AddCard;
