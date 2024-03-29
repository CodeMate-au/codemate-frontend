"use client"
import React, { ReactElement } from 'react'
import "@/styles/globals.css";
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    Cog6ToothIcon,
    HomeIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import ThemeButton from './ThemeButton';

import { Avatar } from '../ui/CodeMirror/Avatars';
import { usePathname } from 'next/navigation'
import ShareModal from '../ui/Dashboard/Share/ShareModal';

const teams = [
    { id: 1, name: 'Home', href: '/dashboard', icon: HomeIcon, current: true },
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Sidebar = ({ children, userName, userAvatar, userGithub, roomMembers }: { children: React.ReactNode, userName: string, userAvatar: string, userGithub: string, roomMembers: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()


    return (
        <div>

            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto dark:bg-[#00040fba] bg-rose-100 px-6 pb-4 ring-1 ring-white/10">

                                    <div className="flex h-16 shrink-0 items-center">
                                        <h1
                                            className="text-[25px]"
                                        >
                                            Code <span className="text-rose-400"> Mates</span>
                                            <span className="text-white">.</span>

                                        </h1>
                                    </div>

                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li className='flex  justify-between space-x-2 px-2 py-2 rounded bg-rose-300 dark:bg-gray-800 text-sm  leading-6 focus-visible:ring-2 focus-visible:ring-white/75'>


                                                <div className="w-fit">
                                                    <p className="font-semibold">{userName}</p>

                                                    <p className='text-sm font-normal'>Github ID : {userGithub} </p>
                                                </div>
                                                <Avatar picture={userAvatar} name={userName}></Avatar>
                                            </li>

                                            <li>
                                                <div className="text-xs font-semibold leading-6 ">Your Dashboard</div>
                                                <ul role="list" className="mt-2 space-y-1">
                                                    {teams.map((team) => (
                                                        <li key={team.name}>
                                                            <a
                                                                href={team.href}
                                                                className={classNames(
                                                                    team.current
                                                                        ? 'bg-gray-800 text-white'
                                                                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                )}
                                                            >
                                                                <team.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                                {team.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            {/* {children} */}
                                            {roomMembers}
                                            {/* {React.cloneElement(roomMembers as React.ReactElement, { children: <ShareModal></ShareModal> })} */}

                                            <li className="mt-auto">
                                                <ul>
                                                    <li className="mb-3">
                                                        <ThemeButton></ThemeButton>
                                                    </li>
                                                    <li className="">
                                                        <a
                                                            href="/"
                                                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:text-white hover:bg-gray-800"
                                                        >
                                                            <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                            Log Out
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto px-4 pb-4">
                    <div className="flex h-16 shrink-0 items-center mb-[70px] mt-3 ">
                        <h1
                            className="text-[25px]"
                        >
                            Code <span className="text-rose-400"> Mates</span>
                            <span className="font-inter text-white">.</span>
                        </h1>
                    </div>
                    <nav className="flex flex-1 flex-col mb-5 w-full">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7 w-full">
                            <li className='flex justify-between space-x-2 px-2 py-2 rounded bg-rose-300 dark:bg-gray-800 text-sm  leading-6 focus-visible:ring-2 focus-visible:ring-white/75'>


                                <div className="w-fit">
                                    <p className="font-semibold">{userName}</p>

                                    <p className='text-sm font-normal'>Github ID : {userGithub} </p>
                                </div>
                                <Avatar picture={userAvatar} name={userName}></Avatar>
                            </li>


                            <li>
                                <div className="text-xs font-semibold leading-6 ">Your Dashboard</div>
                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                    {teams.map((team) => (
                                        <li key={team.name}>
                                            <a
                                                href={team.href}
                                                className={classNames(
                                                    team.current
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                                <team.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                {team.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {/* {roomMembers} */}
                            {React.cloneElement(roomMembers as ReactElement, { children: <ShareModal /> })}
                        </ul>
                        <ul>
                            <li className="mb-3">
                                <ThemeButton></ThemeButton>
                            </li>
                            <li className="">
                                <a
                                    href="/"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:text-white hover:bg-gray-800"
                                >

                                    <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    Log Out
                                </a>
                            </li>
                        </ul>
                    </nav >
                </div >
            </div >

            <div className="lg:pl-72">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 px-4">
                    <button type="button" className="-m-2.5 p-2.5 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div >
    )
}
export default Sidebar;
