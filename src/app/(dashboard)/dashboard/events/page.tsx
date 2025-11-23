"use client";

import { useState } from "react";
import { FiCalendar, FiClock, FiMapPin, FiTrash2, FiPlus } from "react-icons/fi";

interface Event {
  id: number;
  name: string;
  date: string;
  time?: string;
  location?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddEvent = () => {
    if (!name || !date) return;
    setEvents([...events, { id: Date.now(), name, date, time, location }]);
    setName("");
    setDate("");
    setTime("");
    setLocation("");
    setShowForm(false);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      weekday: "short", 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  return (
    <main className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Events</h1>
          <p className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">
            Organize and manage your upcoming events
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base cursor-pointer"
        >
          <FiPlus className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Create Event Form */}
      {showForm && (
        <div className="bg-gray-900/80 rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-gray-800 mb-6 sm:mb-8 backdrop-blur-lg">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Create New Event</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Event Name *
              </label>
              <input
                type="text"
                placeholder="Enter event name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddEvent}
                disabled={!name || !date}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
              >
                Add Event
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 sm:px-6 sm:py-3 border border-gray-700 rounded-xl font-semibold text-gray-400 hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      {events.length === 0 ? (
        <div className="bg-gray-900/80 rounded-2xl p-8 sm:p-12 text-center shadow-sm border border-gray-800 backdrop-blur-lg">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-indigo-600/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <FiCalendar className="h-7 w-7 sm:h-8 sm:w-8 text-indigo-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No events yet</h3>
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
            Get started by creating your first event
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base cursor-pointer"
          >
            <FiPlus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Create Your First Event</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-900/80 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-800 hover:shadow-md transition-all duration-200 group backdrop-blur-lg"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <FiCalendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Delete event"
                >
                  <FiTrash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 line-clamp-2">
                {event.name}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FiCalendar className="h-4 w-4 flex-shrink-0" />
                  <span>{formatDate(event.date)}</span>
                </div>
                
                {event.time && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiClock className="h-4 w-4 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                )}
                
                {event.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiMapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
