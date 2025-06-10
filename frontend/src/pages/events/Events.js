import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebaseconfig";
import Event from "../../components/event/Event";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from Firestore
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      const eventSnapshot = await getDocs(eventsCollection);
      const eventList = eventSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventList);
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {events.map((event) => (
        <Event
          key={event.id}
          eventTime={event.time}
          eventName={event.name}
          eventDescription={event.description}
          eventImage="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg"
        />
      ))}
    </div>
  );
}

export default Events;
