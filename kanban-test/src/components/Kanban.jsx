import React, { useState } from "react";
import Board from "./Board";

export const Kanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

// const Board = () => {
//   const [cards, setCards] = useState(DEFAULT_CARDS);

//   return (
//     <div className="flex w-full h-full gap-3 overflow-scroll p-12">
//       <Column
//         title="Backlog"
//         column="backlog"
//         headingColor="text-neutral-500"
//         cards={cards}
//         setCards={setCards}
//       />
//       <Column
//         title="TODO"
//         column="todo"
//         headingColor="text-yellow-200"
//         cards={cards}
//         setCards={setCards}
//       />
//       <Column
//         title="In progress"
//         column="doing"
//         headingColor="text-blue-200"
//         cards={cards}
//         setCards={setCards}
//       />
//       <Column
//         title="Complete"
//         column="done"
//         headingColor="text-emerald-200"
//         cards={cards}
//         setCards={setCards}
//       />
//     </div>
//   );
// };

// const Column = ({ title, headingColor, column, cards, setCards }) => {
//   const [active, setActive] = useState(false);

//   const filterCards = cards.filter((c) => c.column == column);

//   return (
//     <div className="w-56 shrink-0">
//       <div className="mb-3 flex items-center justify-between">
//         <h3 className={`font-medium ${headingColor}`}>{title}</h3>
//         <span className="rounded text-sm text-neutral-400">
//           {filterCards.length}
//         </span>
//       </div>
//       <div
//         className={`h-full w-full transition-colors ${
//           active ? "bg-neutral-800/50" : "bg-neutral-800/0"
//         }`}
//       >
//         {filterCards.map((c) => {
//           return <Card key={c.id} {...c} />;
//         })}
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, id, column }) => {
//   return (
//     <>
//       <div
//         draggable="true"
//         className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
//       >
//         <p className="text-sm text-neutral-100">{title}</p>
//       </div>
//     </>
//   );
// };


