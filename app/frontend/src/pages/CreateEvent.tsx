import { useState } from "react";
import "./CreateEvent.css";



function CreateEventPage() {
  return (
    <div className="create-continer"> 
      <h2>Create Event</h2>
      <form>
        <div className="inputs-conteiner" >
            <input className="inputs-btns" type="text" placeholder="Event Name" />
            <input className="inputs-btns" type="text" placeholder="Catagory" />

            <input className="inputs-text-area" type="text" placeholder="Event Description"/>
            <input className="inputs-text-area" type="image" placeholder="Drag photo here "/>
            <button className="inputs-btns">Select From Gallery</button>

            <input className="inputs-location" type="text" placeholder="Event Location"/>
            <input className="inputs-location" type="date" placeholder="Event Date"/>

            <input className="inputs-btns" type="text" placeholder="Price" />
            <input className="inputs-btns" type="text" placeholder="Url" />

            <button className="inputs-btns">Create Event</button>
        </div>

      </form>
    </div>
  );
}

export default CreateEventPage;