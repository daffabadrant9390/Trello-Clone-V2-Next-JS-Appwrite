'use client';

import Board from '@/components/Boards';
import Header from '@/components/Header';
import PopupRemoveTodoCard from '@/components/Popup/PopupRemoveTodoCard';
import StateInformation from '@/components/StateInformation';
import { POPUP_REMOVE_TODO_CARD_ITEM_DEFAULT_STATE } from '@/constants';
import { PopupRemoveTodoCardState } from '@/lib/types';
import { useCallback, useState } from 'react';

export default function Home() {
  const [popupRemoveTodoItemState, setPopupRemoveTodoItemState] =
    useState<PopupRemoveTodoCardState>(
      POPUP_REMOVE_TODO_CARD_ITEM_DEFAULT_STATE
    );

  const handleOpenPopupRemoveTodoItem = useCallback(
    ({ isOpen, columnId, todoData, todoItemIdx }: PopupRemoveTodoCardState) => {
      setPopupRemoveTodoItemState({
        isOpen: !!isOpen || true,
        columnId,
        todoData,
        todoItemIdx,
      });
    },
    []
  );

  const handleClosePopupRemoveTodoItem = useCallback(() => {
    setPopupRemoveTodoItemState(POPUP_REMOVE_TODO_CARD_ITEM_DEFAULT_STATE);
  }, []);

  return (
    <>
      <Header />
      <main>
        <StateInformation />
        <Board
          onUpdatePopupRemoveTodoItemState={handleOpenPopupRemoveTodoItem}
        />
        <PopupRemoveTodoCard
          isOpen={!!popupRemoveTodoItemState.isOpen}
          todoData={popupRemoveTodoItemState.todoData || ({} as Todo)}
          columnId={popupRemoveTodoItemState.columnId || 'todo'}
          todoItemIdx={popupRemoveTodoItemState.todoItemIdx || 0}
          onClosePopupRemoveTodoItem={handleClosePopupRemoveTodoItem}
        />
      </main>
    </>
  );
}
