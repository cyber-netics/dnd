import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ScrumboardContext } from '../scrumboard/ScrumboardContext';
import { Draggable } from 'react-beautiful-dnd';
import { modalModeTypes } from '../utils';
import EllipsisDropdown from '../../components/EllipsisDropdown';
import { Menu, Input, Modal } from 'antd';
import {
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import BoardCard from './BoardCard';
import { Form, FormItem } from '../../components/Shared';

const BoardColumn = styled.div`
  flex-direction: column;
  min-width: 300px;
  margin: 0 8px 15px;
  display: flex;
  border: 1px solid #e6ebf1;
  background-color: #f0f2f5;
  border-radius: 0.625rem;
`;

const BoardTitle = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #e6ebf1;
  background-color: #f0f2f5;
  border-radius: 0.625rem;
  transition: background-color 0.2s ease;
  padding: 0.625rem 0.9375rem;
  align-items: center;
`;

const Button = styled.div`
  background-color: #fff;
  justify-content: center;
  height: 2.8rem;
  display: flex;
  align-items: center;
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
  border-top: 1px solid #e6ebf1;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
`;

const H4 = styled.h4`
  margin-bottom: 0 !important;
`;

const Pointer = styled.div`
  cursor: pointer;
`;

const RenameForm = ({ title, finish }) => {
  const [form] = Form.useForm();

  const onRenameSubmit = (values) => {
    finish(values.title);
  };

  const onClose = () => {
    form.submit();
  };

  return (
    <Form
      form={form}
      name="renameField"
      onFinish={onRenameSubmit}
      layout="vertical"
      autoComplete="off"
      initialValues={{
        title: title,
      }}
    >
      <FormItem name="title">
        <Input
          autoFocus
          value={title}
          suffix={
            <Pointer onClick={() => onClose()}>
              <CloseOutlined />
            </Pointer>
          }
        />
      </FormItem>
    </Form>
  );
};

const Board = ({ title, contents, index, isScrollable, isCombineEnabled, useClone }) => {
  const {
    updateModal,
    updateModalMode,
    updateCurrentListId,
    updateCardData,
    columns,
    updateColumns,
    ordered,
    updateOrdered,
  } = useContext(ScrumboardContext);
  const [renameActive, setRenameActive] = useState('');

  const newCard = (listId) => {
    updateModal(true);
    updateModalMode(modalModeTypes(0));
    updateCurrentListId(listId);
  };

  const onUpdateCardModal = (obj, listId) => {
    updateModal(true);
    updateModalMode(modalModeTypes(1));
    updateCurrentListId(listId);
    updateCardData(obj);
  };

  const onTitleClick = (title) => {
    setRenameActive(title);
  };

  const onFinish = (newTitle) => {
    if (newTitle) {
      const newColumns = {};
      delete Object.assign(newColumns, columns, { [newTitle]: columns[title] })[title];
      const newOrder = ordered.map((elm) => {
        if (elm === title) {
          return newTitle;
        }
        return elm;
      });
      updateColumns(newColumns);
      updateOrdered(newOrder);
    }
    setRenameActive('');
  };

  const onBoardDelete = (title) => {
    Modal.confirm({
      title: 'Do you want to delete this board?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk() {
        const newOrder = ordered.filter((elm) => elm !== title);
        const newColumns = {};
        Object.assign(newColumns, columns);
        delete newColumns[title];
        updateColumns(newColumns);
        updateOrdered(newOrder);
      },
    });
  };

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <BoardColumn ref={provided.innerRef} {...provided.draggableProps}>
          <BoardTitle {...provided.dragHandleProps}>
            {renameActive === title ? (
              <RenameForm title={title} finish={onFinish} />
            ) : (
              <>
                <H4>{title}</H4>
                <EllipsisDropdown
                  menu={
                    <Menu>
                      <Menu.Item onClick={() => onTitleClick(title)}>
                        <EditOutlined />
                        <span>Rename Board</span>
                      </Menu.Item>
                      <Menu.Item onClick={() => onBoardDelete(title)}>
                        <DeleteOutlined />
                        <span>Delete Board</span>
                      </Menu.Item>
                    </Menu>
                  }
                />
              </>
            )}
          </BoardTitle>
          <BoardCard
            listId={title}
            listType="CONTENT"
            className={snapshot.isDragging ? 'is-dragging' : ''}
            contents={contents}
            internalScroll={isScrollable}
            isCombineEnabled={isCombineEnabled}
            useClone={useClone}
            cardData={onUpdateCardModal}
          />
          <Button onClick={() => newCard(title)}>
            <div>Add task</div>
          </Button>
        </BoardColumn>
      )}
    </Draggable>
  );
};

export default Board;
