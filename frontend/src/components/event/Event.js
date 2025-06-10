import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Event = ({ eventTime, eventName, eventDescription, eventImage }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    // Convert the timestamp to seconds and nanoseconds
    const eventSeconds = eventTime.seconds; // Example seconds (you can replace with eventTime)
    const eventNanoseconds = eventTime.nanoseconds; // Example nanoseconds (replace as needed)
    
    const eventDate = new Date((eventSeconds * 1000) + (eventNanoseconds / 1000000)); // Convert seconds and nanoseconds to milliseconds
    const difference = eventDate - new Date(); // Time difference in milliseconds
    
    // console.log(eventDate);  // Log the event date
    // console.log(new Date()); // Log the current time

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return null; // Event has passed
  }

  const renderCountdown = () => {
    if (!timeLeft) {
      return <p>The event has started or passed!</p>;
    }

    const { days, hours, minutes, seconds } = timeLeft;
    return (
      <p>
        {days}d {hours}h {minutes}m {seconds}s
      </p>
    );
  };

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <img class="w-full" src={eventImage} alt={eventName} />
      <div class="px-6 py-4">
        <h2 class="font-bold text-xl mb-2">{eventName}</h2>
        <p class="text-gray-700 text-base">{eventDescription}</p>
        <div class="font-bold px-6 pt-4 pb-2">Time until event starts: {renderCountdown()}</div>
      </div>
    </div>
  );
};

Event.propTypes = {
  eventTime: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  eventDescription: PropTypes.string.isRequired,
  eventImage: PropTypes.string.isRequired,
};

export default Event;
