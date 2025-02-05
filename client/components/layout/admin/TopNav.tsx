'use client'

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import useMenuStore from 'stores/useMenuStore'
import useUserStore from 'stores/useUserStore'

export default function TopNav() {
  const router = useRouter()
  const { isExpanded, setIsExpanded, resetState: resetMenuState } = useMenuStore()
  const { user, resetState: resetUserState } = useUserStore()

  const handleLogout = () => {
    resetUserState()
    resetMenuState()
    router.push('/login')
  }

  return (
    <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start'>
            <div className='flex items-center gap-4 ml-2 md:mr-24'>
              <div className='pl-3'>
                <button onClick={() => setIsExpanded(!isExpanded)} className='rounded-full p-1'>
                  {isExpanded ? (
                    <ChevronLeftIcon className='h-5 w-5' />
                  ) : (
                    <ChevronRightIcon className='h-5 w-5' />
                  )}
                </button>
              </div>
              <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap'>
                Admin Panel
              </span>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center ml-3'>
              <div>
                <Menu as='div' className='relative ml-3'>
                  <div className='flex items-center gap-4'>
                    <div className='font-medium'>{user?.username}</div>
                    <MenuButton className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300'>
                      <Image
                        className='w-8 h-8 rounded-full'
                        src='/avatar-placeholder.png'
                        alt='user photo'
                        width={32}
                        height={32}
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <MenuItems className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col'>
                      <div className='flex-grow'>
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              href='/profile'
                              className={`duration-200 ${
                                focus ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-gray-700`}>
                              My Profile
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              href='/settings'
                              className={`duration-200 ${
                                focus ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-gray-700`}>
                              Settings
                            </Link>
                          )}
                        </MenuItem>
                      </div>
                      <div className='border-t border-gray-100'>
                        <MenuItem>
                          {({ focus }) => (
                            <div
                              onClick={handleLogout}
                              className={`duration-200 ${
                                focus ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-gray-700 cursor-pointer`}>
                              Sign out
                            </div>
                          )}
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
