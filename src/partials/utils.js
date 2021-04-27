import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import { Avatar } from '../components/Shared';
import { labels, membersDetail } from './scrumboard/ScrumboardData';

const AssigneeContainer = styled.div`
  display: flex;
`;

const NameText = styled.span`
  margin-bottom: 0;
  margin-left: 0.5rem;
  font-weight: 500;
`;

const createUID = (len) => {
  const buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length,
    length = len || 32;

  for (let i = 0; i < length; i++) {
    buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
  }
  return buf.join('');
};

export const modalModeTypes = (number) => {
  switch (number) {
    case 0:
      return 'ADD_CARD';
    case 1:
      return 'EDIT_CARD';
    case 2:
      return 'ADD_BOARD';
    default:
      return '';
  }
};

export const getLabelsColor = (label) => {
  if (label) {
    const color = labels.filter((elm) => label === elm.label)[0].color;
    return color;
  }
  return;
};

export const getMember = (id) => {
  if (id) {
    const member = membersDetail.filter((elm) => id === elm.id)[0];
    if (member) {
      return <Avatar src={member.img}></Avatar>;
    }
  }
  return;
};

export const getCover = (id, attachments) => {
  if (id) {
    const cover = attachments.filter((elm) => id === elm.id)[0].src;
    return cover;
  }
  return;
};

export const AssigneeAvatar = ({ id, size = 20, name, chain }) => {
  if (id) {
    const member = membersDetail.filter((elm) => id === elm.id)[0];
    if (member) {
      return (
        <AssigneeContainer className={chain ? 'ml-n2' : ''}>
          <Tooltip title={name ? '' : member.name}>
            <Avatar
              size={size}
              src={member.img}
              style={chain ? { border: '2px solid #fff' } : {}}
            ></Avatar>
          </Tooltip>
          {name ? <NameText>{member.name}</NameText> : null}
        </AssigneeContainer>
      );
    }
  }
  return null;
};

export const createCardObject = () => {
  return {
    id: createUID(10),
    name: '',
    description: '',
    cover: '',
    members: [],
    labels: [],
    attachments: [],
    checklists: [],
    comments: [],
    dueDate: null,
  };
};

export const createCommentObject = () => {
  return {
    id: createUID(10),
    name: 'Eileen Horton',
    src: '/img/avatars/thumb-1.jpg',
    message: '',
    date: new Date(),
  };
};
