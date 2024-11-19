/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "./Header";
import TicketCard from "./Ticketcard";
import { fetchData } from "../Services/Api";
import "./KanbanBoard.css";

const KanbanBoard = () => {
  const priorityMap = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority",
  };

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");

  // Fetch tickets data from API
  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchData();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    getTickets();
  }, []);

  // Handle grouping and sorting
  const groupTickets = () => {
    let groupedTickets = {};
    if (groupBy === "status") {
      groupedTickets = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    } else if (groupBy === "user") {
      groupedTickets = tickets.reduce((acc, ticket) => {
        const user = users.find((u) => u.id === ticket.userId);
        const username = user ? user.name : "unkown user";

        acc[username] = acc[username] || [];
        acc[username].push(ticket);
        return acc;
      }, {});
    } else if (groupBy === "priority") {
      groupedTickets = tickets.reduce((acc, ticket) => {
        acc[priorityMap[ticket.priority]] =
          acc[priorityMap[ticket.priority]] || [];
        acc[priorityMap[ticket.priority]].push(ticket);
        return acc;
      }, {});

      const priorityOrder = ["Urgent", "High", "Medium", "Low", "No Priority"];
      groupedTickets = Object.fromEntries(
        priorityOrder
          .filter((priority) => groupedTickets[priority]) // Filter out empty groups
          .map((priority) => [priority, groupedTickets[priority]])
      );
    }
    return groupedTickets;
  };

  const sortTickets = (groupedTickets) => {
    Object.keys(groupedTickets).forEach((key) => {
      groupedTickets[key].sort((a, b) => {
        if (sortBy === "priority") return b.priority - a.priority;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
    });
    return groupedTickets;
  };

  const groupedTickets = sortTickets(groupTickets());

  return (
    <>
      <Header
        onGroupChange={(value) => setGroupBy(value)}
        onSortChange={(value) => setSortBy(value)}
      />
      <div className="kanban-board">
        <div className="kanban-columns">
          {Object.keys(groupedTickets).map((groupKey) => (
            <div key={groupKey} className="kanban-column">
              <h3>{groupKey}</h3>
              {groupedTickets[groupKey].map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
