'use client';

import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import Column from './Column';
import { DROPPABLE_TYPE } from '@/constants';
import { PopupEditTodoCardState, PopupRemoveTodoCardState } from '@/lib/types';

type BoardProps = {
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

function Board({
  onUpdatePopupRemoveTodoItemState,
  onUpdatePopupEditTodoItemState,
}: BoardProps) {
  const [board, getBoardData, setBoardState, updateTodoItemStatusInDB] =
    useBoardStore((state) => [
      state.board,
      state.getBoardData,
      state.setBoard,
      state.updateTodoItemStatusInDB,
    ]);

  useEffect(() => {
    getBoardData();
  }, [getBoardData]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, type } = result || {};

    if (!destination) return;

    //* Handle Outer Column Drag
    if (!!type && type === DROPPABLE_TYPE.COLUMN) {
      const columnArrEntries = Array.from(board.columns.entries());
      // Remove the dragged column from the entries array
      const [removedColumnEntry] = columnArrEntries.splice(source.index, 1);
      // Add back the removed dragged column in the entries array in the destination index
      columnArrEntries.splice(destination.index, 0, removedColumnEntry);
      // Rearrange the column using new Map
      const newFormatColumns = new Map(columnArrEntries);

      // Updat the columns with new order to the state
      setBoardState({
        ...board,
        columns: newFormatColumns,
      });
    }

    if (!!type && type === DROPPABLE_TYPE.CARD) {
      const columnArray = Array.from(board.columns);
      const sourceColumn = columnArray[Number(source.droppableId)];
      const destinationColumn = columnArray[Number(destination.droppableId)];

      const sourceColObj: Column = {
        id: sourceColumn[0],
        todos: sourceColumn[1].todos,
      };

      const destinationColObj: Column = {
        id: destinationColumn[0],
        todos: destinationColumn[1].todos,
      };

      /**
       * - If there is no destination idx or source idx, return
       * - If the the destination and source id are same and source index and destination index also same, return.
       */
      if (!sourceColObj || !destinationColObj) return;

      if (
        source.index === destination.index &&
        sourceColObj.id === destinationColObj.id
      )
        return;

      if (sourceColObj.id === destinationColObj.id) {
        //? Handle Drag in the same column
        const copySourceColTodos = sourceColObj.todos;
        const [draggedTodoItem] = copySourceColTodos.splice(source.index, 1);
        copySourceColTodos.splice(destination.index, 0, draggedTodoItem);

        const newSourceCol: Column = {
          id: sourceColObj.id,
          todos: copySourceColTodos,
        };

        // Create new Map board.column & set the sourceColObj id with newSourceCol data
        const newBoardColumns = new Map(board.columns);
        newBoardColumns.set(sourceColObj.id, newSourceCol);

        // Update the board state with newBoardColumns
        setBoardState({
          ...board,
          columns: newBoardColumns,
        });
      } else {
        //? Handle Drag in the different column

        // Get the todos from source column and destination column (since they are different)
        const copySourceColTodos = sourceColObj.todos;
        const copyDestinationColTodos = destinationColObj.todos;

        /**
         * - Remove the draggedTodoItem from source column, also
         * - Store the draggedTodoItem data inside a const variable
         *
         * - Using destination.index, add draggedTodoItem into destination todos
         */
        const [draggedTodoItem] = copySourceColTodos.splice(source.index, 1);
        copyDestinationColTodos.splice(destination.index, 0, draggedTodoItem);

        const newSourceCol: Column = {
          id: sourceColObj.id,
          todos: copySourceColTodos,
        };

        const newDestinationCol: Column = {
          id: destinationColObj.id,
          todos: copyDestinationColTodos,
        };

        /**
         * Create copy Map from board.columns, and replace the source & destination columns
         * with the new column from each of it.
         *
         * Last, update the board state with newBoardColumns
         */
        const newBoardColums = new Map(board.columns);
        newBoardColums.set(sourceColObj.id, newSourceCol);
        newBoardColums.set(destinationColObj.id, newDestinationCol);

        // Update the board state in database
        updateTodoItemStatusInDB(draggedTodoItem, destinationColObj.id);

        setBoardState({
          ...board,
          columns: newBoardColums,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable
        droppableId="board"
        direction="horizontal"
        type={DROPPABLE_TYPE.COLUMN}
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-container padding-container"
          >
            {/* {provided.placeholder} */}
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column
                key={id}
                idx={index}
                id={id}
                todos={column.todos}
                onUpdatePopupRemoveTodoItemState={
                  onUpdatePopupRemoveTodoItemState
                }
                onUpdatePopupEditTodoItemState={onUpdatePopupEditTodoItemState}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
