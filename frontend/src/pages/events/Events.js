import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function Countdown({ eventTime }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const event = dayjs(eventTime);
      const diff = event.diff(now);

      if (diff <= 0) {
        setTimeLeft('Event Started');
        clearInterval(interval);
        return;
      }

      const days = event.diff(now, 'day');
      const hours = event.diff(now, 'hour') % 24;
      const minutes = event.diff(now, 'minute') % 60;
      const seconds = event.diff(now, 'second') % 60;

      if (days > 0) {
        setTimeLeft(`${days} days${days > 1 ? 's' : ''} remaining`);
      } else if (hours > 0) {
        setTimeLeft(`${hours} hours${hours > 1 ? 's' : ''} remaining`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes} minutes${minutes > 1 ? 's' : ''} remaining`);
      }else{
        setTimeLeft(`${seconds} seconds${seconds > 1 ? 's' : ''} remaining`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventTime]);

  return <p className="text-blue-600 font-bold">{timeLeft}</p>;
}

function RSVPModal({ event, onClose, onSubmit }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      await onSubmit(email);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-2xl">&times;</button>
        <h2 className="text-xl font-semibold mb-4">RSVP for {event.name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full border p-2 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Submit RSVP
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [rsvpCounts, setRsvpCounts] = useState({});
  const [rsvpSubmitted, setRsvpSubmitted] = useState(null);
  const [activeRSVP, setActiveRSVP] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*').order('event_time', { ascending: false });
      if (data) {
        setEvents(data);
        for (const event of data) {
          const { count } = await supabase
            .from('rsvps')
            .select('*', { count: 'exact', head: true })
            .eq('event_id', event.id);
          setRsvpCounts(prev => ({ ...prev, [event.id]: count || 0 }));
        }
      }
    };

    fetchEvents();
  }, []);

  const soonestEvent = events
    .filter(event => dayjs(event.event_time).isAfter(dayjs()))
    .sort((a, b) => dayjs(a.event_time).diff(dayjs(b.event_time)))[0];

  const handleRSVPSubmit = async (email) => {
    const { error } = await supabase
      .from('rsvps')
      .insert({ event_id: activeRSVP.id, user_email: email });

    if (!error) {
      setRsvpCounts(prev => ({ ...prev, [activeRSVP.id]: (prev[activeRSVP.id] || 0) + 1 }));
      setRsvpSubmitted(activeRSVP.id);
      setActiveRSVP(null);
    } else {
      alert('Failed to RSVP. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📅 Upcoming Events</h1>

      {soonestEvent && (
        <div className="mb-6 p-4 bg-yellow-100 rounded shadow">
          <h2 className="text-xl font-semibold">⏳ Countdown to Next Event</h2>
          <Countdown eventTime={soonestEvent.event_time} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow p-4">
            <img src={event.image_url} alt={event.name} className="w-full h-48 object-cover rounded-md mb-3" />
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p className="text-gray-500 mb-2">{dayjs(event.event_time).format('dddd, MMM D • h:mm A')}</p>
            <p className="mb-2">🧍 RSVP Count: {rsvpCounts[event.id] || 0}</p>
            <button
              onClick={() => setActiveRSVP(event)}
              disabled={rsvpSubmitted === event.id}
              className={`px-4 py-2 rounded ${
                rsvpSubmitted === event.id ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {rsvpSubmitted === event.id ? 'RSVPed!' : 'RSVP'}
            </button>
          </div>
        ))}
      </div>

      {activeRSVP && (
        <RSVPModal
          event={activeRSVP}
          onClose={() => setActiveRSVP(null)}
          onSubmit={handleRSVPSubmit}
        />
      )}
    </div>
  );
}
