'use client';
import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isToday, 
  addMonths, 
  subMonths, 
  setMonth, 
  setYear, 
  startOfWeek, 
  addDays 
} from 'date-fns';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const navigateMonth = (direction) => {
    const newDate = direction === 'next' 
      ? addMonths(currentDate, 1) 
      : subMonths(currentDate, 1);
    setCurrentDate(newDate);
  };

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  
  const firstDayOfMonth = startOfMonth(currentDate);
  const startWeek = startOfWeek(firstDayOfMonth);
  const emptyDays = Array.from(
    { length: firstDayOfMonth.getDay() }, 
    (_, index) => addDays(startWeek, index)
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from(
    { length: 10 }, 
    (_, index) => currentDate.getFullYear() - 5 + index
  );

  const handleMonthSelect = (monthIndex) => {
    setCurrentDate(setMonth(currentDate, monthIndex));
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (year) => {
    setCurrentDate(setYear(currentDate, year));
    setShowYearDropdown(false);
  };

  const jumpToToday = () => {
    setCurrentDate(new Date());
    setShowMonthDropdown(false);
    setShowYearDropdown(false);
  };

  const dropdownIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const navigationArrowLeft = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const navigationArrowRight = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  );

  const calendarIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => {
                setShowMonthDropdown(!showMonthDropdown);
                setShowYearDropdown(false);
              }}
              className="text-lg font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
            >
              {format(currentDate, 'MMMM')}
              {dropdownIcon}
            </button>
            
            {showMonthDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-1 z-10 w-32 border">
                {months.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => handleMonthSelect(index)}
                    className="w-full text-left px-3 py-1.5 hover:bg-orange-50 text-sm text-gray-700"
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowYearDropdown(!showYearDropdown);
                setShowMonthDropdown(false);
              }}
              className="text-lg font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
            >
              {format(currentDate, 'yyyy')}
              {dropdownIcon}
            </button>
            
            {showYearDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-1 z-10 w-20 border max-h-48 overflow-y-auto">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className="w-full text-left px-3 py-1.5 hover:bg-orange-50 text-sm text-gray-700"
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            {navigationArrowLeft}
          </button>
          
          <button 
            onClick={() => navigateMonth('next')}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            {navigationArrowRight}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="p-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {emptyDays.map((day) => (
          <div
            key={`empty-${day}`}
            className="aspect-square flex items-center justify-center text-gray-300"
          >
            {format(day, 'd')}
          </div>
        ))}
        
        {days.map((day) => (
          <div
            key={day}
            className={`
              aspect-square flex items-center justify-center rounded-full 
              ${isToday(day) 
                ? 'bg-orange-500 text-white font-bold' 
                : 'text-gray-700'
              }
              hover:bg-orange-100 cursor-pointer transition-all
            `}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>

      {!isToday(currentDate) && (
        <div className="flex justify-end mt-4">
          <button
            onClick={jumpToToday}
            className="text-sm px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors inline-flex items-center gap-1"
          >
            {calendarIcon}
            Jump to Today
          </button>
        </div>
      )}
    </div>
  );
}
