import React, { useContext } from "react";
import { ScrumboardContext } from "../scrumboard/ScrumboardContext";
import { Droppable } from "react-beautiful-dnd";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { memberIds } from "../scrumboard/ScrumboardData";
import { modalModeTypes, AssigneeAvatar } from "../utils";
import { Scrollbars } from "react-custom-scrollbars";
import Board from "./Board";

const BoardWrapper = ({
  containerHeight,
  useClone,
  isCombineEnabled,
  withScrollableColumns,
}) => {
  const { ordered, columns, updateModal, updateModalMode } = useContext(
    ScrumboardContext
  );

  const onAddBoardModal = () => {
    updateModal(true);
    updateModalMode(modalModeTypes(2));
  };
  return (
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
      ignoreContainerClipping={containerHeight}
      isCombineEnabled={isCombineEnabled}
    >
      {(provided) => (
        <div
          className="scrumboard"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="scrumboard-header">
            <div>
              <h3>Backlog</h3>
            </div>
            <div className="text-right">
              <div className="d-flex align-items-center">
                {memberIds.map((member, i) =>
                  i < 4 ? (
                    <AssigneeAvatar key={member} id={member} size={30} chain />
                  ) : null
                )}
                <Avatar className="ml-n2" size={30}>
                  <span className="text-gray font-weight-semibold font-size-base">
                    +9
                  </span>
                </Avatar>
              </div>
            </div>
          </div>
          <Scrollbars className="scrumboard-body">
            {ordered.map((key, index) => (
              <Board
                key={key}
                index={index}
                title={key}
                contents={columns[key]}
                isScrollable={withScrollableColumns}
                isCombineEnabled={isCombineEnabled}
                useClone={useClone}
              />
            ))}
            {provided.placeholder}
            <div className="board-column add">
              <div className="board-title" onClick={() => onAddBoardModal()}>
                <h4 className="mb-0">
                  <PlusOutlined />
                  <span>Add List</span>
                </h4>
              </div>
            </div>
          </Scrollbars>
        </div>
      )}
    </Droppable>
  );
};

export default BoardWrapper;
