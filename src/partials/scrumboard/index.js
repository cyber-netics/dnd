import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { ScrumboardContext } from "./ScrumboardContext";
import reorder, { reorderQuoteMap } from "../reoreder";
import { modalModeTypes, createCardObject } from "../utils";

import BoardWrapper from "../board";
import ModalForm from "../modal";

const ScrumboardWrapper = (props) => {
  const {
    ordered,
    columns,
    modal,
    cardData,
    currentListId,
    modalMode,
    updateOrdered,
    updateColumns,
    updateModal,
    updateCurrentListId,
  } = useContext(ScrumboardContext);

  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        updateOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const newColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      updateColumns(newColumns);
      return;
    }

    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === "COLUMN") {
      const newOrdered = reorder(ordered, source.index, destination.index);
      updateOrdered(newOrdered);
      return;
    }
    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });
    updateColumns(data.quoteMap);
  };

  const onCloseModal = () => {
    updateModal(false);
  };

  const onModalSubmit = (values, mode) => {
    const data = columns;
    if (mode === modalModeTypes(0)) {
      let newCard = createCardObject();
      newCard.name = values.cardTitle ? values.cardTitle : "Untitled Card";
      data[currentListId].push(newCard);
      updateColumns(data);
      updateModal(false);
      updateCurrentListId("");
    }

    if (mode === modalModeTypes(1)) {
      const updatadedCard = data[currentListId].map((elm) => {
        if (values.id === elm.id) {
          elm = values;
        }
        return elm;
      });
      data[currentListId] = updatadedCard;
      updateColumns(data);
      updateModal(false);
    }

    if (mode === modalModeTypes(2)) {
      data[values.boardTitle ? values.boardTitle : "Untitled Board"] = [];
      const newOrdered = [
        ...ordered,
        ...[values.boardTitle ? values.boardTitle : "Untitled Board"],
      ];
      let newColumns = {};
      newOrdered.forEach((elm) => {
        newColumns[elm] = data[elm];
      });
      updateColumns(newColumns);
      updateOrdered(Object.keys(newColumns));
      updateModal(false);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {props.containerHeight ? (
          <div className="scrumboard">
            <BoardWrapper {...props} />
          </div>
        ) : (
          <BoardWrapper {...props} />
        )}
      </DragDropContext>
      <ModalForm
        visible={modal}
        onClose={() => onCloseModal()}
        onModalSubmit={(values, modalMode) => onModalSubmit(values, modalMode)}
        modalMode={modalMode}
        cardData={cardData}
        listId={currentListId}
      />
    </>
  );
};

export default ScrumboardWrapper;
