"use client";

import { useState } from "react";

interface Event {
  id: number;
  name: string;
  date: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleAddEvent = () => {
    if (!name || !date) return;
    setEvents([...events, { id: Date.now(), name, date }]);
    setName("");
    setDate("");
  };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleAddEvent}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Event
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-4 bg-white rounded shadow">
            <h2 className="font-bold text-lg">{event.name}</h2>
            <p>{event.date}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
