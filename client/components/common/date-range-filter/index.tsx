'use client'

import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Button from 'components/common/button'

interface DateRangeFilterProps {
  value: [Date | null, Date | null]
  onFilterChange: (startDate: Date | null, endDate: Date | null) => void
}

export default function DateRangeFilter({ value, onFilterChange }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState<Date | null>(value[0])
  const [endDate, setEndDate] = useState<Date | null>(value[1])

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    onFilterChange(start, end)
  }

  const handleClear = () => {
    setStartDate(null)
    setEndDate(null)
    onFilterChange(null, null)
  }

  return (
    <div className='flex items-center gap-3 transition-all duration-200'>
      <div className='relative group'>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          className='w-72 pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl 
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
            hover:border-gray-300 transition-all duration-200
            text-gray-700 placeholder:text-gray-400'
          placeholderText='Select date range'
          dateFormat='dd MMM yyyy'
          closeOnScroll={true}
          wrapperClassName='react-datepicker-wrapper'
          popperClassName='react-datepicker-popper !z-[100]'
          calendarClassName='shadow-lg border-0 !rounded-xl'
          dayClassName={() => 'hover:!bg-blue-50 !rounded-lg'}
        />
        <CalendarIcon
          className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 
          text-gray-400 group-hover:text-gray-500 transition-colors duration-200 
          pointer-events-none'
        />
      </div>
      {(startDate || endDate) && (
        <Button
          variant='secondary'
          icon={<XMarkIcon className='w-4 h-4' />}
          onClick={handleClear}
          className='animate-fade-in hover:bg-gray-100 transition-colors duration-200'
          iconPosition='left'>
          Clear
        </Button>
      )}
    </div>
  )
}
