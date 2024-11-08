import React, { useEffect, useState } from "react";
import Column from "./Column";

import axios from "axios";
// const DEFAULT_CARDS = [
//   // BACKLOG
//   { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
//   { title: "SOX compliance checklist", id: "2", column: "backlog" },
//   { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
//   { title: "Document Notifications service", id: "4", column: "backlog" },
//   // TODO
//   {
//     title: "Research DB options for new microservice",
//     id: "5",
//     column: "todo",
//   },
//   { title: "Postmortem for outage", id: "6", column: "todo" },
//   { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

//   // DOING
//   {
//     title: "Refactor context providers to use Zustand",
//     id: "8",
//     column: "doing",
//   },
//   { title: "Add logging to daily CRON", id: "9", column: "doing" },
//   // DONE
//   {
//     title: "Set up DD dashboards for Lambda listener",
//     id: "10",
//     column: "done",
//   },
// ];
const Board = () => {
  const [cards, setCards] = useState([]);
  const [backlogCards, setBacklogCards] = useState([]);
  const [todoCards, setTodoCards] = useState([]);
  const [doingCards, setDoingCards] = useState([]);
  const [doneCards, setDoneCards] = useState([]);

  useEffect(() => {
  const fetchCards = async () => {
    try {
        const response = await axios.get("http://localhost:8000/cards", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        
        // Log the response to check the data structure
        console.log('API Response:', response.data);
        
        // Check if response.data is an array
        const cardsData = Array.isArray(response.data) ? response.data : response.data.data;
        
        setCards(cardsData);
        
        const backlog = cardsData.filter(card => card.column === "backlog");
        const todo = cardsData.filter(card => card.column === "todo");
        const doing = cardsData.filter(card => card.column === "doing");
        const done = cardsData.filter(card => card.column === "done");

        setBacklogCards(backlog);
        setTodoCards(todo);
        setDoingCards(doing);
        setDoneCards(done);
        
    } catch (error) {
        // Detailed error logging
        console.error("Error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
    }
};    fetchCards();
  }, []);

  return (
    <div className="flex w-full h-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={backlogCards}
        setCards={setBacklogCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={todoCards}
        setCards={setTodoCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={doingCards}
        setCards={setDoingCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={doneCards}
        setCards={setDoneCards}
      />
    </div>
  );
};

export default Board;
