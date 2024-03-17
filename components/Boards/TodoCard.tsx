import { getImageUrl } from '@/lib/services/getImageUrl';
import { PopupEditTodoCardState, PopupRemoveTodoCardState } from '@/lib/types';
import { useBoardStore } from '@/store/BoardStore';
import { useModalStore } from '@/store/ModalStore';
import { XCircleIcon, PencilIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';

type TodoCardProps = {
  todoItem: Todo;
  index: number;
  id: ColumnType;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  onUpdatePopupRemoveTodoItemState: ({
    isOpen,
    columnId,
    todoData,
    todoItemIdx,
  }: PopupRemoveTodoCardState) => void;
  onUpdatePopupEditTodoItemState: ({
    isOpen,
    todoId,
    columnId,
    todoTitle,
    todoImage,
    todoImageUrl,
    todoCreatedAt,
  }: PopupEditTodoCardState) => void;
};

const TodoCard = ({
  todoItem,
  id,
  index,
  innerRef,
  dragHandleProps,
  draggableProps,
  onUpdatePopupRemoveTodoItemState,
  onUpdatePopupEditTodoItemState,
}: TodoCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [deleteTodoItem, setNewTaskType, setNewTaskImage, setNewTaskInputText] =
    useBoardStore((state) => [
      state.deleteTodoItem,
      state.setNewTaskType,
      state.setNewTaskImage,
      state.setNewTaskInputText,
    ]);

  const {
    $id: todoItemId,
    status,
    title,
    image: todoItemImage,
    $createdAt: todoItemCreatedAt,
  } = todoItem;

  useEffect(() => {
    if (!!todoItemImage) {
      const fetchImageUrl = async () => {
        const url = await getImageUrl(todoItemImage || ({} as Image));
        if (!!url) {
          setImageUrl(url.toString());
        }
      };

      fetchImageUrl();
    }

    //TODO: Quick fix for current bug (imageUrl always filled with deleted image, but the todoItemImage is null)
    if (!todoItemImage && !!imageUrl) setImageUrl(null);
  }, [todoItemImage, imageUrl]);

  return (
    <div
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      className="bg-white rounded-md flex flex-col gap-2 md:gap-3 drop-shadow-md"
    >
      <div className="flex flex-row items-center justify-between p-5 gap-5">
        <p>{title || ''}</p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => {
              setNewTaskType(id);
              setNewTaskInputText(title || '');
              setNewTaskImage(null);

              onUpdatePopupEditTodoItemState({
                isOpen: true,
                todoId: todoItemId,
                todoTitle: title || '',
                columnId: id,
                todoImage: todoItemImage,
                todoImageUrl: imageUrl || '',
                todoCreatedAt: todoItemCreatedAt || '',
              });
            }}
            className="bg-gray-200 hover:bg-gray-400 text-gray-600 hover:text-gray-800 transition-all duration-200 flex flex-row items-center justify-center w-7 h-7 rounded-full"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              onUpdatePopupRemoveTodoItemState({
                isOpen: true,
                todoData: todoItem,
                columnId: id,
                todoItemIdx: index,
              });
            }}
            className="text-red-500 hover:text-red-600 transition-all duration-200"
          >
            <XCircleIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Add Image */}
      {!!imageUrl && (
        <div className="w-full h-[200px] md:h-[240px] lg:h-[280px] relative rounded-b-md flex-shrink-0">
          <Image
            src={imageUrl}
            alt="Task Image"
            fill
            className="object-cover object-center rounded-b-md"
            sizes="50"
            priority
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;
