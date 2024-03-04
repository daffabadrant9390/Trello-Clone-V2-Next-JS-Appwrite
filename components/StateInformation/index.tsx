'use client';

import { fetchSuggestion } from '@/lib/services/fetchSuggestion';
import { useBoardStore } from '@/store/BoardStore';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

function StateInformation() {
  //TODO: Enable this if already pay the monthly billing
  // const [board] = useBoardStore((state) => [state.board]);

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [suggestion, setSuggestion] = useState<string>('');

  // useEffect(() => {
  //   if (board.columns.size === 0) return;

  //   setIsLoading(true);
  //   const fetchSuggestionDataFunc = async () => {
  //     const suggestionData = await fetchSuggestion(board);
  //     setSuggestion(suggestionData || '');
  //     setIsLoading(false);
  //   };

  //   fetchSuggestionDataFunc();
  // }, [board]);

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
