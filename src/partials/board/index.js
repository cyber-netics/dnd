import React, { useContext } from 'react';
import styled from 'styled-components';
import { ScrumboardContext } from '../scrumboard/ScrumboardContext';
import { Droppable } from 'react-beautiful-dnd';
import { PlusOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { memberIds } from '../scrumboard/ScrumboardData';
import { modalModeTypes, AssigneeAvatar } from '../utils';
import { Scrollbars } from 'react-custom-scrollbars';
import Board from './Board';
import { Scrumboard } from '../../components/Shared';

const ScrumboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 16px;
`;

const ScrumboardBody = styled(Scrollbars)`
  flex: 1 1;
  overflow-x: auto;
  display: flex;

  > div {
    flex: 1 1;
    display: flex;
  }
`;

const BoardColum = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  margin: 0 8px 15px;
  border: 0;
  background-color: transparent;
  border-radius: 0.625rem;
`;

const BoardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6ebf1;
  transition: background-color 0.2s ease;
  padding: 0.625rem 0.9375rem;
  border-top-left-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
`;

const H4 = styled.h4`
  margin-bottom: 0;
`;

const AvatarContainer = styled.div`
  text-align: center;
`;

const AvatarList = styled.div`
  display: flex;
  align-items: center;
`;

const BoardWrapper = ({ containerHeight, useClone, isCombineEnabled, withScrollableColumns }) => {
  const { ordered, columns, updateModal, updateModalMode } = useContext(ScrumboardContext);

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
        <Scrumboard ref={provided.innerRef} {...provided.droppableProps}>
          <ScrumboardHeader>
            <div>
              <h3>Backlog</h3>
            </div>
            <AvatarContainer>
              <AvatarList>
                {memberIds.map((member, i) =>
                  i < 4 ? <AssigneeAvatar key={member} id={member} size={30} chain /> : null,
                )}
                <Avatar className="ml-n2" size={30}>
                  <span className="text-gray font-weight-semibold font-size-base">+9</span>
                </Avatar>
              </AvatarList>
            </AvatarContainer>
          </ScrumboardHeader>
          <ScrumboardBody>
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
            <BoardColum>
              <BoardTitle onClick={() => onAddBoardModal()}>
                <H4>
                  <PlusOutlined />
                  <span>Add List</span>
                </H4>
              </BoardTitle>
            </BoardColum>
          </ScrumboardBody>
        </Scrumboard>
      )}
    </Droppable>
  );
};

export default BoardWrapper;
