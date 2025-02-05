'use client'

import SideNav from 'components/layout/admin/SideNav'
import TopNav from 'components/layout/admin/TopNav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-gray-100'>
      <TopNav />

      <div className='flex'>
        <SideNav />

        <main className='flex-1 p-6 mt-16'>
          <div className='mx-auto'>{children}</div>
        </main>
      </div>
    </div>
  )
}
