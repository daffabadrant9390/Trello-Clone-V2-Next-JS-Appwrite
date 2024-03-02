'use client';

import Image from 'next/image';
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Avatar from 'react-avatar';

const Header = () => {
  return (
    <header className="relative bg-gray-500/20">
      <div className="absolute top-0 left-0 w-full min-h-screen bg-gradient-to-br from-green-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50" />

      <div className="max-container padding-container py-5 w-full flex flex-col md:flex-row items-center md:justify-between rounded-2xl gap-10">
        {/* LOGO */}
        <Image
          src={'https://links.papareact.com/c2cdd5'}
          alt="Trello Logo"
          width={300}
          height={100}
          className="w-44 md:w-56"
        />

        {/* FORM and AVATAR */}
        {/* TODO: Might be change later to be DARK MODE TOGGLE and AVATAR */}
        <div className="w-full md:w-max flex flex-row items-center space-x-5">
          <form className="w-full flex flex-row items-center justify-between bg-white rounded-md p-2 shadow-md md:flex-initial space-x-2 md:space-x-5">
            <div className="w-full flex flex-row items-center justify-start">
              <MagnifyingGlassIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Type something..."
                className="w-full outline-none p-2 md:px-3 text-gray-700 text-[14px] md:text-[16px] lg:text-[18px]"
              />
            </div>
            <button
              className="px-2 md:px-4 py-2 bg-blue-500/90 text-gray-100 rounded-md text-[14px] md:text-[16px] lg:text-[18px] font-medium hover:bg-blue-500 hover:text-white transition-all duration-200 "
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
