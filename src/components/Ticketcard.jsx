/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from "react";
import "./Ticketcard.css";
import PropTypes from "prop-types";

const TicketCard = ({ ticket }) => {
  console.log(ticket.tag[0]);

  const { title, priority, status, userId, id } = ticket;

  const priorityColors = {
    4: "urgent",
    3: "high",
    2: "medium",
    1: "low",
    0: "no-priority",
  };

  return (
    <div className={`ticket-card ${priorityColors[priority]}`}>
      <p>{id}</p>
      <h4>{title}</h4>
      <p>{ticket.tag[0]}</p>
    </div>
  );
};

TicketCard.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

export default TicketCard;
