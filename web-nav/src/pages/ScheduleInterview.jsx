import React, { useState } from 'react';
import {
  startOfWeek,
  addDays,
  addWeeks,
  format,
  subWeeks,
  isSameDay,
  addMinutes,
} from 'date-fns';
import './ScheduleInterview.css';

const ScheduleInterview = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 2 }));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [activeSlotBases, setActiveSlotBases] = useState([]);
  const [selectedRange, setSelectedRange] = useState('');
  const [timezone, setTimezone] = useState('Asia/Calcutta UTC+05:30');
  const [confirmedSlot, setConfirmedSlot] = useState(null);

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    return `${hour}${ampm}`;
  });

  const availableSlots = [
     '10AM', '11AM',
    '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM'
  ];

  const handleSlotClick = (slot) => {
    const match = slot.match(/^(\d+)(AM|PM)$/);
    if (!match) return;

    let hour = parseInt(match[1], 10);
    const isPM = match[2] === 'PM';
    if (hour === 12) hour = 0;
    hour = isPM ? hour + 12 : hour;

    const baseTime = new Date(selectedDate);
    baseTime.setHours(hour, 0, 0, 0);

    const slotRanges = [0, 15, 30, 45].map(offset => {
      const start = addMinutes(baseTime, offset);
      const end = addMinutes(start, 45);
      return `${format(start, 'hh:mm a')} - ${format(end, 'hh:mm a')}`;
    });

    const isAlreadySelected = activeSlotBases.includes(slot);
    if (isAlreadySelected) {
      setActiveSlotBases([]);
      setSelectedSlots([]);
      setSelectedRange('');
    } else {
      setActiveSlotBases([slot]);
      setSelectedSlots(slotRanges);
      setSelectedRange('');
    }
    setConfirmedSlot(null);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedRange) {
      alert('Please select a date and time range');
      return;
    }

    setConfirmedSlot({
      date: format(selectedDate, 'EEE, dd MMM yyyy'),
      slot: selectedRange
    });
  };

  const generateWeekDays = () => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = addDays(currentWeekStart, i);
      return {
        label: format(date, 'EEE'),
        number: format(date, 'd'),
        fullDate: date,
      };
    });
  };

  return (
    <div className="schedule-container" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2>Schedule Interview</h2>

      <div className="calendar-header">
        <span
  className="arrow"
  onClick={() => {
    const newStart = subWeeks(currentWeekStart, 1);
    setCurrentWeekStart(newStart);
    setSelectedDate(newStart); // update selectedDate to the new week start
  }}
>←</span>

<span className="month-year">{format(selectedDate, 'MMMM yyyy')}</span>

<span
  className="arrow"
  onClick={() => {
    const newStart = addWeeks(currentWeekStart, 1);
    setCurrentWeekStart(newStart);
    setSelectedDate(newStart); // update selectedDate to the new week start
  }}
>→</span>

      </div>

      <div className="date-selector">
        {generateWeekDays().map((day, index) => (
          <div
            key={index}
            className={`date-box ${isSameDay(day.fullDate, selectedDate) ? 'selected' : ''}`}
            onClick={() => {
              setSelectedDate(day.fullDate);
              setSelectedSlots([]);
              setActiveSlotBases([]);
              setSelectedRange('');
              setConfirmedSlot(null);
            }}
          >
            <div className="day">{day.label}</div>
            <div className="date">{day.number}</div>
          </div>
        ))}
      </div>

      <div className="timezone-selector">
        <label>Select a Time slot</label>
        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          <option value="Asia/Calcutta UTC+05:30">Asia/Calcutta UTC+05:30</option>
          <option value="America/New_York UTC-04:00">America/New_York UTC-04:00</option>
          <option value="Europe/London UTC+01:00">Europe/London UTC+01:00</option>
          <option value="Asia/Tokyo UTC+09:00">Asia/Tokyo UTC+09:00</option>
          <option value="Australia/Sydney UTC+10:00">Australia/Sydney UTC+10:00</option>
          <option value="Europe/Berlin UTC+02:00">Europe/Berlin UTC+02:00</option>
          <option value="America/Los_Angeles UTC-07:00">America/Los_Angeles UTC-07:00</option>
          <option value="UTC">UTC</option>
        </select>
      </div>

      <div className="timeslots-row">
        {timeSlots.map((slot, i) => {
          const isAvailable = availableSlots.includes(slot);
          const isActive = activeSlotBases.includes(slot);
          return (
            <div
              key={i}
              className={`slot ${isAvailable ? 'available' : 'unavailable'} ${isActive ? 'active' : ''}`}
              onClick={() => isAvailable && handleSlotClick(slot)}
            >
              {slot}
            </div>
          );
        })}
      </div>

      <div className="selected-slots-container">
        {selectedSlots.map((slot, i) => (
          <div
            key={i}
            className={`selected-slot-box ${selectedRange === slot ? 'selected-range' : ''}`}
            onClick={() => setSelectedRange(slot)}
          >
            {slot}
          </div>
        ))}
      </div>

      {selectedSlots.length > 0 && (
        <div className="confirm-wrapper">
          <button className="confirm-button" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      )}

      {confirmedSlot && (
        <div className="confirmation-box">
          ✅ Interview scheduled for <strong>{confirmedSlot.date}</strong> at <strong>{confirmedSlot.slot}</strong>
        </div>
      )}

      <div className="show-more" onClick={() => alert('More slots feature coming soon')}>
        Show more slots
      </div>
    </div>
  );
};

export default ScheduleInterview;
