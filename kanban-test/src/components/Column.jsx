import React, { useState } from "react";
import Card from "./Card";
import AddCard from "./AddCard";

const Column = ({ title, headingColor, column, cards, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();

    setActive(true);
  };
  const handleDragLeave = (e) => {
    setActive(false);
  };
  const filterCards = cards.filter((c) => c.column == column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filterCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filterCards.map((c) => {
          return <Card key={c.id} {...c} initialColumn={column}/>;
        })}

        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default Column;
