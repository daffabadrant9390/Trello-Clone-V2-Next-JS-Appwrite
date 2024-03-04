import { useBoardStore } from '@/store/BoardStore';
import { XCircleIcon } from '@heroicons/react/24/solid';
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
};

const TodoCard = ({
  todoItem,
  id,
  index,
  innerRef,
  dragHandleProps,
  draggableProps,
}: TodoCardProps) => {
  const { $id, status, title, image } = todoItem;

  const [deleteTodoItem] = useBoardStore((state) => [state.deleteTodoItem]);

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
          onClick={() => {
            deleteTodoItem({
              todoItemIdx: index,
              todoData: todoItem,
              columnId: id,
            });
          }}
          className="text-red-500 hover:text-red-600 transition-all duration-200"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
