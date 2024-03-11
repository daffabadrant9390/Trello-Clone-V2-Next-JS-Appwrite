import { getImageUrl } from '@/lib/services/getImageUrl';
import { PopupRemoveTodoCardState } from '@/lib/types';
import { useBoardStore } from '@/store/BoardStore';
import { useModalStore } from '@/store/ModalStore';
import { XCircleIcon } from '@heroicons/react/24/solid';
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
};

const TodoCard = ({
  todoItem,
  id,
  index,
  innerRef,
  dragHandleProps,
  draggableProps,
  onUpdatePopupRemoveTodoItemState,
}: TodoCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [deleteTodoItem] = useBoardStore((state) => [state.deleteTodoItem]);

  const { $id, status, title, image } = todoItem;

  useEffect(() => {
    if (!!todoItem.image) {
      const fetchImageUrl = async () => {
        const url = await getImageUrl(todoItem.image || ({} as Image));
        if (!!url) {
          setImageUrl(url.toString());
        }
      };

      fetchImageUrl();
    }
  }, [todoItem]);

  console.log('todoItem.image: ', todoItem.image);
  console.log('imageUrl: ', imageUrl);

  return (
    <div
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      className="bg-white rounded-md flex flex-col gap-2 md:gap-3 drop-shadow-md"
    >
      <div className="flex flex-row items-center justify-between p-5 gap-5">
        <p>{title || ''}</p>
        <button
          // onClick={() => {
          //   deleteTodoItem({
          //     todoItemIdx: index,
          //     todoData: todoItem,
          //     columnId: id,
          //   });
          // }}
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

      {/* Add Image */}
      {!!imageUrl && (
        <div className="w-full h-[200px] md:h-[240px] lg:h-[280px] relative rounded-b-md flex-shrink-0">
          <Image
            src={imageUrl}
            alt="Task Image"
            fill
            className="object-cover object-center rounded-b-md"
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;
