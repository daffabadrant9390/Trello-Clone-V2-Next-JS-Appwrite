'use client';

import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModalStore } from '@/store/ModalStore';
import { useBoardStore } from '@/store/BoardStore';
import TaskTypeRadioGroup from '../../TaskTypeRadioGroup';
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { getImageUrl } from '@/lib/services/getImageUrl';
import { uploadImage } from '@/lib/services/uploadImage';
import LoadingIndicator from '@/components/LoadingIndicator';

type PopupUpdateTodoCardProps = {
  isOpen: boolean;
  todoItemId: string;
  columnId: ColumnType;
  todoTitle: string;
  todoImage?: Image | null;
  todoImageUrl?: string | null;
  todoCreatedAt: string;
  onClosePopupEditTodoItem: () => void;
};

const PopupUpdateTodoCard = ({
  isOpen,
  todoItemId,
  columnId,
  todoTitle,
  todoImage,
  todoImageUrl,
  todoCreatedAt,
  onClosePopupEditTodoItem,
}: PopupUpdateTodoCardProps) => {
  const [currentTodoImage, setCurrentTodoImage] = useState<Image | null>(
    todoImage || null
  );
  const [currentTodoImageUrl, setCurrentTodoImageUrl] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [
    newTaskInputText,
    setNewTaskInputText,
    newTaskImage,
    setNewTaskImage,
    newTaskType,
    updateTodoItem,
  ] = useBoardStore((state) => [
    state.newTaskInputText,
    state.setNewTaskInputText,
    state.newTaskImage,
    state.setNewTaskImage,
    state.newTaskType,
    state.updateTodoItem,
  ]);

  useEffect(() => {
    if (!!todoImage) {
      setCurrentTodoImage(todoImage);
    }
  }, [todoImage]);

  useEffect(() => {
    if (!!currentTodoImage) {
      const fetchImageUrl = async () => {
        const url = await getImageUrl(currentTodoImage);
        if (!!url) {
          setCurrentTodoImageUrl(url.toString());
        }
      };

      fetchImageUrl();
    }
  }, [currentTodoImage]);

  const imagePickerRef = useRef<HTMLInputElement>(null);

  const handleSubmitForm = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!newTaskInputText) return;
    setIsLoading(true);

    await updateTodoItem({
      todoItemId: todoItemId,
      todoItemText: newTaskInputText,
      columnId: newTaskType,
      todoItemFileImage: newTaskImage || undefined,
      todoCreatedAt,
    });

    setNewTaskInputText('');
    setNewTaskImage(null);
    setCurrentTodoImage(null);
    setCurrentTodoImageUrl(null);
    setIsLoading(false);
    onClosePopupEditTodoItem();
  };

  return (
    <>
      {!!isLoading && (
        <LoadingIndicator
          isLoading={isLoading}
          loadingType="beat-loader"
          loadingDescription="Updating todo item, please wait..."
        />
      )}
      {/* // Use the `Transition` component at the root level */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="form"
          onSubmit={handleSubmitForm}
          className="relative z-10"
          onClose={() => {
            onClosePopupEditTodoItem();
            setCurrentTodoImage(null);
            setCurrentTodoImageUrl(null);
          }}
        >
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pb-2"
                  >
                    Update a Task
                  </Dialog.Title>

                  <div className="w-full flex flex-col mt-3 gap-2">
                    {/* Task Input Text */}
                    <input
                      type="text"
                      value={newTaskInputText}
                      onChange={(e) => setNewTaskInputText(e.target.value)}
                      placeholder="Enter a task here..."
                      className="w-full border border-gray-300 outline-none rounded-md p-5 focus:border-gray-400 transition-all duration-200"
                    />

                    {/* Task Type Radio Group */}
                    <TaskTypeRadioGroup />

                    {/* Image Upload */}
                    <div className="flex flex-col gap-2 md:gap-3">
                      {/* Add Button to upload image */}
                      <button
                        type="button"
                        className="w-full flex flex-row items-center gap-2 border border-gray-300 rounded-md p-5 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          imagePickerRef?.current?.click();
                        }}
                      >
                        <PhotoIcon className="w-6 h-6 inline-block" />
                        Upload Image
                      </button>

                      {/* Show image preview after user add the image */}
                      {(!!newTaskImage || !!currentTodoImageUrl) && (
                        <div
                          className="relative flex-shrink-0 w-full h-[200px] md:h-[240px] lg:h-[280px] shadow-md group rounded-lg overflow-hidden border border-gray-200"
                          onClick={() => {
                            setNewTaskImage(null);
                            setCurrentTodoImage(null);
                            setCurrentTodoImageUrl(null);
                          }}
                        >
                          <Image
                            alt="Task Image Uploaded"
                            fill
                            className="w-full object-cover object-center filter hover:grayscale transition-all duration-150 cursor-not-allowed rounded-md overflow-hidden"
                            src={
                              !!newTaskImage
                                ? URL.createObjectURL(newTaskImage)
                                : !!currentTodoImageUrl
                                ? currentTodoImageUrl
                                : '/'
                            }
                          />
                          <div className="w-full h-full flex flex-row items-center justify-center absolute top-0 right-0 invisible group-hover:visible cursor-pointer text-white group-hover:bg-gray-900/60 transition-all duration-300">
                            <TrashIcon className="w-8 h-8" />
                          </div>
                        </div>
                      )}

                      <input
                        type="file"
                        hidden
                        ref={imagePickerRef}
                        onChange={async (e) => {
                          // Check if the image is exist
                          if (!e.target.files?.[0].type.startsWith('image/')) {
                            return;
                          }

                          setNewTaskImage(e.target.files[0]);
                          const uploadedFileImage = await uploadImage(
                            e.target.files[0]
                          );
                          if (!!uploadedFileImage) {
                            setCurrentTodoImage({
                              bucketId: uploadedFileImage.bucketId,
                              fileId: uploadedFileImage.$id,
                            });
                          }
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-2">
                      <button
                        type="submit"
                        disabled={!newTaskInputText}
                        className="w-full rounded-md border border-transparent bg-blue-100 px-4 py-3 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                      >
                        Update Task
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PopupUpdateTodoCard;
