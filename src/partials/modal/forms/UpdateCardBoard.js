import React, { useState, useEffect, useContext, useRef } from 'react';
import { Form, Input, Button, Select, DatePicker, Tag, Badge, Divider } from 'antd';
import styled from 'styled-components';

import { FileTextOutlined } from '@ant-design/icons';
import { AssigneeAvatar, getLabelsColor, getCover, createCommentObject } from '../../utils';
import { DATE_FORMAT_DD_MM_YYYY } from '../../../constants/DateConstant';
import { memberIds, labels } from '../../scrumboard/ScrumboardData';
import moment from 'moment';
import { ScrumboardContext } from '../../scrumboard/ScrumboardContext';
import Comments from '../../../components/Comments';
import Attachments from '../../../components/Attachments';

const FormTitle = styled(Form.Item)`
  margin-bottom: 0;
`;

const InputTitle = styled(Input)`
  font-size: 16px;
  font-weight: 500;
  border-color: transparent;
  max-width: 95%;
  padding: 5px 7.5px;
  box-shadow: none;
  color: #1a3353;
`;

const CurrentStatus = styled.span`
  font-weight: 500;
`;

const { Option } = Select;

const memberTagRender = (props) => <AssigneeAvatar id={props.value} size={25} />;

function labelTagRender(props) {
  const { value } = props;
  return (
    <Tag className="my-1">
      <div className="d-flex align-items-center">
        <Badge color={getLabelsColor(value)} />
        <span>{value}</span>
      </div>
    </Tag>
  );
}

const UpdateCardForm = ({ onSubmit, cardData, listId }) => {
  const context = useContext(ScrumboardContext);

  const [attachmentsList, setAttachmentsList] = useState(cardData.attachments);
  const [commentsList, setCommentsList] = useState(cardData.comments);
  const [cover, setCover] = useState(cardData.cover);

  const commentInput = useRef();

  useEffect(() => {
    setAttachmentsList(cardData.attachments);
    setCommentsList(cardData.comments);
    setCover(cardData.cover);
  }, [cardData.attachments, cardData.comments, cardData.cover]);

  const initialValues = {
    name: cardData?.name,
    members: cardData?.members,
    dueDate: cardData?.dueDate ? moment(cardData.dueDate) : '',
    labels: cardData?.labels,
    description: cardData?.description,
  };

  const onCoverChange = (id) => {
    const updatedCover = getCover(id, attachmentsList);
    updateAttachment(updatedCover);
  };

  const submitUpdate = (values) => {
    let updatedValue = values;
    updatedValue.attachments = attachmentsList;
    updatedValue.comments = commentsList;
    updatedValue.cover = cover;
    updatedValue.id = cardData.id;
    onSubmit(updatedValue);
  };

  const updateAttachment = (updatedCover) => {
    const data = context.columns;
    const updatadedCards = data[listId].map((elm) => {
      if (elm.id === cardData.id) {
        elm.attachments = attachmentsList;
        elm.cover = updatedCover;
      }
      return elm;
    });
    data[listId] = updatadedCards;
    context.updateColumns(data);
    context.updateOrdered(Object.keys(data));
  };

  const removeCover = () => {
    updateAttachment('');
  };

  const submitComment = () => {
    const message = commentInput.current.state.value;
    const { currentListId, columns, updateColumns, updateOrdered } = context;
    const data = columns;
    let newComment = createCommentObject();
    newComment.message = message;
    const updatedComment = data[currentListId].map((elm) => {
      if (elm.id === cardData.id) {
        elm.comments = [...elm.comments, ...[newComment]];
      }
      return elm;
    });
    commentInput.current.state.value = '';
    data[currentListId] = updatedComment;
    updateColumns(data);
    updateOrdered(Object.keys(data));
  };

  return (
    <Form
      name="edit-card-ref"
      layout="vertical"
      onFinish={submitUpdate}
      initialValues={initialValues}
    >
      <FormTitle name="name">
        <InputTitle />
      </FormTitle>
      <Form.Item className="mb-3">
        <p>
          Board: <CurrentStatus>{listId}</CurrentStatus>
        </p>
      </Form.Item>
      <Form.Item label="Assigned to" name="members" className="blockform-col col-3">
        <Select
          filterOption={false}
          tagRender={memberTagRender}
          mode="tags"
          removeIcon={null}
          placeholder="None"
          className="board-card-modal select"
        >
          {memberIds.map((elm) => (
            <Option key={elm} value={elm}>
              <AssigneeAvatar id={elm} name />
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Due Date" name="dueDate" className="blockform-col col-3">
        <DatePicker
          placeholder="Due date unset"
          className="board-card-modal date-picker w-100"
          format={DATE_FORMAT_DD_MM_YYYY}
        />
      </Form.Item>
      <Form.Item label="Labels" name="labels" className="blockform-col col-3">
        <Select
          filterOption={false}
          tagRender={labelTagRender}
          mode="tags"
          removeIcon={null}
          placeholder="None"
          className="board-card-modal select"
        >
          {labels.map((elm) => (
            <Option key={elm.label} value={elm.label}>
              <div className="d-flex align-items-center">
                <Badge color={getLabelsColor(elm.label)} />
                <span>{elm.label}</span>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Divider className="mt-0" />

      <div className="d-flex">
        <div className="mr-3 font-size-md">
          <FileTextOutlined />
        </div>
        <div className="w-100">
          <h4>Description</h4>
          <Form.Item name="description">
            <Input.TextArea className="board-card-modal text-area" />
          </Form.Item>
        </div>
      </div>

      <Attachments
        data={attachmentsList}
        cover={cover}
        onCoverChange={onCoverChange}
        removeCover={removeCover}
      />
      <Comments data={commentsList} ref={commentInput} onSubmit={submitComment} />

      <Form.Item className="text-right mb-0">
        <Button type="primary" htmlType="submit">
          Change
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCardForm;
