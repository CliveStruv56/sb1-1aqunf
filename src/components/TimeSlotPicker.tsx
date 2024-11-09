import React from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { getAvailableDates, generateTimeSlots } from '../lib/utils';
import type { TimeSlot } from '../types';

interface TimeSlotPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}

export function TimeSlotPicker({ isOpen, onClose, onSelectTimeSlot }: TimeSlotPickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const availableDates = getAvailableDates();
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Select Pickup Time</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Select Date</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableDates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {format(date, 'MMM d')}
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Select Time</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => onSelectTimeSlot({ date: selectedDate, time })}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}