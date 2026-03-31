import React from "react";
import "./Table.css";

const data = [
  {
    email: "shay@example.com",
    eventTitle: "React Workshop",
    buyer: "Shay",
    created: "2026-03-29",
    amount: "$50",
  },
  {
    email: "mona@example.com",
    eventTitle: "Vue Seminar",
    buyer: "Mona",
    created: "2026-03-28",
    amount: "$30",
  },
  {
    email: "noa@example.com",
    eventTitle: "Angular Meetup",
    buyer: "Noa",
    created: "2026-03-27",
    amount: "$40",
  },
];

const EventsTable = () => {
  return (
    <div className="table-container">
      {/* כותרות */}
      <div className="table-row table-header">
        <div className="table-cell orderId">Order ID</div>
        <div className="table-cell email">Email</div>
        <div className="table-cell eventTitle">Event Title</div>
        <div className="table-cell buyer">Buyer</div>
        <div className="table-cell created">Created</div>
        <div className="table-cell amount">Amount</div>
      </div>

      {/* שורות */}
      {data.map((item, index) => (
        <div
          key={index}
          className={`table-row ${index % 2 === 0 ? "even-row" : "odd-row"}`}
        >
          <div className="table-cell orderId" data-label="Order ID">{index + 1}</div>
          <div className="table-cell email" data-label="Email">{item.email}</div>
          <div className="table-cell eventTitle" data-label="Event Title">{item.eventTitle}</div>
          <div className="table-cell buyer" data-label="Buyer">{item.buyer}</div>
          <div className="table-cell created" data-label="Created">{item.created}</div>
          <div className="table-cell amount" data-label="Amount">{item.amount}</div>
        </div>
      ))}
    </div>
  );
};

export default EventsTable;