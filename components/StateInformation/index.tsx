import { UserCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';

function StateInformation() {
  return (
    <section className="max-container padding-container flex items-center justify-center py-4">
      <p className="flex flex-row items-center p-5 text-sm font-light pr-5 shadow-xl bg-white rounded-xl w-fit italic max-w-3xl text-[#0055D1] gap-2">
        <UserCircleIcon className="inline-block w-10 h-10 text-[#0055D1]" />
        GPT is summarizing your tasks for the day...
      </p>
    </section>
  );
}

export default StateInformation;
