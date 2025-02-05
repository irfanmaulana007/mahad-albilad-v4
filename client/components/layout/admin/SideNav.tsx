'use client'

import { ChartBarIcon, Cog6ToothIcon, NewspaperIcon, UsersIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useMenuStore from 'stores/useMenuStore'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Articles', href: '/admin/articles', icon: NewspaperIcon },
]

const settingsItem = { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon }

export default function SideNav() {
  const { isExpanded } = useMenuStore()
  const pathname = usePathname()

  return (
    <div
      className={`relative transition-all duration-500 ease-in-out pt-14 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}>
      <nav
        className={`fixed h-[calc(100%-48px)] flex flex-col bg-gray-800 text-white p-4 transition-all duration-500 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}>
        <div className={`${!isExpanded && 'hidden'} flex flex-col h-full`}>
          <div className='flex-1 px-3 pb-4 overflow-y-auto'>
            <ul className='space-y-2 font-medium whitespace-nowrap'>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name} className='h-9'>
                    <Link
                      href={item.href}
                      className={clsx(
                        'flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700',
                        {
                          'bg-gray-700': isActive,
                        },
                      )}>
                      <item.icon
                        className={clsx('w-5 h-5 transition duration-75', {
                          'text-gray-400': !isActive,
                          'text-white': isActive,
                        })}
                      />
                      <span className='ml-3'>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Settings item at bottom */}
          <div className='px-3'>
            <ul className='font-medium'>
              <li className='h-9'>
                <Link
                  href={settingsItem.href}
                  className={clsx(
                    'flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700',
                    {
                      'bg-gray-700': pathname === settingsItem.href,
                    },
                  )}>
                  <settingsItem.icon
                    className={clsx('w-5 h-5 transition duration-75', {
                      'text-gray-400': pathname !== settingsItem.href,
                      'text-white': pathname === settingsItem.href,
                    })}
                  />
                  <span className='ml-3'>{settingsItem.name}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimized view */}
        <div className={`${isExpanded && 'hidden'} h-full flex flex-col`}>
          <ul className='flex-1 space-y-2 pb-4 font-medium'>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name} className='h-9'>
                  <Link
                    href={item.href}
                    className={clsx(
                      'flex items-center justify-center p-2 rounded-lg hover:bg-gray-700',
                      {
                        'bg-gray-700': isActive,
                      },
                    )}>
                    <item.icon
                      className={clsx('w-5 h-5 transition duration-75', {
                        'text-gray-400': !isActive,
                        'text-white': isActive,
                      })}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Settings item at bottom */}
          <ul className='font-medium'>
            <li>
              <Link
                href={settingsItem.href}
                className={clsx(
                  'flex items-center justify-center p-2 rounded-lg hover:bg-gray-700',
                  {
                    'bg-gray-700': pathname === settingsItem.href,
                  },
                )}>
                <settingsItem.icon
                  className={clsx('w-5 h-5 transition duration-75', {
                    'text-gray-400': pathname !== settingsItem.href,
                    'text-white': pathname === settingsItem.href,
                  })}
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
