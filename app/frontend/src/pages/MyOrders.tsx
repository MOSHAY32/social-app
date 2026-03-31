import "./MyOrders.css";
import React from "react";
import Table from "../componnets/Table";

export default function Profile() {
  return (
    <div className="container">
        <div className="profile-header" style={{ padding: "20px" }}>
        <h2>My Orders</h2>
      </div>

      <section className="order-comtiner">
        <input type="text" placeholder="Search orders..." className="search"></input>
        <div className="wrapper">
            <Table />
            
        </div>
        {/* Event items would go here */}
      </section>

      </div>
  );
}