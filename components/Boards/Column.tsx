import { Draggable, Droppable } from 'react-beautiful-dnd';
import TodoCard from './TodoCard';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { DROPPABLE_TYPE } from '@/constants';

type ColumnOuterCardProps = {
  id: ColumnType;
  todos: Todo[];
  idx: number;
};

const idToColumnText: {
  [key in ColumnType]: string;
} = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

const Column = ({ id, todos, idx }: ColumnOuterCardProps) => {
  return (
    <Draggable draggableId={id} index={idx}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={idx.toString()} type={DROPPABLE_TYPE.CARD}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 shadow-sm rounded-2xl ${
                  snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'
                }`}
              >
                <div className="flex flex-col gap-2 md:gap-3">
                  {/* Title and Todos length */}
                  <div className="flex flex-row items-center justify-between">
                    <h2 className="font-bold text-xl text-black">
                      {idToColumnText[id]}
                    </h2>

                    <span className="px-2 py-1 text-sm font-normal text-gray-500 bg-gray-200 rounded-md">
                      {todos.length || 0}
                    </span>
                  </div>

                  {/* TODO Card */}
                  <div className="flex flex-col gap-3 md:gap-4">
                    <div className="w-full flex flex-col gap-2 md:gap-3">
                      {todos.map((todoItemObj, idx) => (
                        <Draggable
                          index={idx}
                          draggableId={todoItemObj.$id}
                          key={todoItemObj.$id}
                        >
                          {(provided) => (
                            <TodoCard
                              todoItem={todoItemObj}
                              index={idx}
                              id={id}
                              dragHandleProps={provided.dragHandleProps}
                              draggableProps={provided.draggableProps}
                              innerRef={provided.innerRef}
                            />
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  </div>

                  {/* Add TODO Button */}
                  <div className="w-full flex flex-row items-center justify-end">
                    <button className="text-green-500 hover:text-green-600 transition-all duration-200">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
