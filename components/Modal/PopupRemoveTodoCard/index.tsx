'use client';

import { useBoardStore } from '@/store/BoardStore';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';

export type PopupRemoveTodoCardProps = {
  isOpen: boolean;
  todoData: Todo;
  todoItemIdx: number;
  columnId: ColumnType;
  onClosePopupRemoveTodoItem: () => void;
};

const PopupRemoveTodoCard = ({
  isOpen,
  todoData,
  todoItemIdx,
  columnId,
  onClosePopupRemoveTodoItem,
}: PopupRemoveTodoCardProps) => {
  const deleteTodoItem = useBoardStore((state) => state.deleteTodoItem);

  const handleDeleteTodoItem = () => {
    deleteTodoItem({
      todoItemIdx,
      todoData,
      columnId,
    });
    onClosePopupRemoveTodoItem();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={onClosePopupRemoveTodoItem}>
        {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="w-full flex flex-col items-center justify-center gap-2 lg:gap-3">
                  {/* Illustration Image */}
                  <div className="relative flex-shrink-0 w-[200px] h-[174px] lg:w-[250px] lg:h-[216px]">
                    <Image
                      alt="remove-todo-illustration"
                      src="/assets/remove-todo-illustration.png"
                      fill
                      className="w-full object-cover object-center"
                    />
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pb-2 text-center"
                  >
                    Are you sure want to remove this{' '}
                    <span className="inline font-bold text-gray-600">
                      Todo Card Item
                    </span>
                    ?
                  </Dialog.Title>

                  {/* Buttons */}
                  <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-3 ">
                    <button
                      className="w-full border border-transparent text-white bg-red-400 hover:text-white hover:bg-red-500 transition-all duration-200 px-4 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 rounded-md"
                      type="button"
                      onClick={handleDeleteTodoItem}
                    >
                      Confirm
                    </button>
                    <button
                      className="w-full border border-transparent text-gray-600 bg-gray-200 hover:text-gray-900 hover:bg-gray-300 transition-all duration-200 px-4 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded-md"
                      type="button"
                      onClick={onClosePopupRemoveTodoItem}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PopupRemoveTodoCard;
