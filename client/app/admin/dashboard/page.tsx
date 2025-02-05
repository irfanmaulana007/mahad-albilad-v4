'use client'

import moment from 'moment'
import { useState } from 'react'

import BestArticles from 'components/admin/dashboard/best-articles'
import DashboardOverview from 'components/admin/dashboard/overview'
import DateRangeFilter from 'components/common/date-range-filter'

export default function DashboardPage() {
  const [startDate, setStartDate] = useState<Date>(moment().startOf('month').toDate())
  const [endDate, setEndDate] = useState<Date>(moment().toDate())

  const handleDateRangeFilter = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) {
      setStartDate(moment().subtract(1, 'month').toDate())
      setEndDate(moment().toDate())
      return
    }

    setStartDate(startDate)
    setEndDate(endDate)
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Dashboard</h2>
      </div>

      <div className='flex justify-end'>
        <DateRangeFilter value={[startDate, endDate]} onFilterChange={handleDateRangeFilter} />
      </div>

      <DashboardOverview startDate={startDate} endDate={endDate} />
      <BestArticles startDate={startDate} endDate={endDate} />
    </div>
  )
}
