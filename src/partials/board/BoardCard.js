import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Card, Tooltip, Tag as AntdTag } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { CalendarOutlined, CommentOutlined, PaperClipOutlined } from '@ant-design/icons';
import { getLabelsColor, AssigneeAvatar } from '../utils';

const DraggableContainer = styled.div`
  margin-bottom: 1rem !important;
`;

const DraggableCard = styled(Card)`
  margin-bottom: 0;

  .ant-card-body {
    padding: 0.625rem;
  }
`;

const Image = styled.img`
  border-radius: 0.625rem !important;
  max-width: 100%;
  height: auto;
`;

const BoardLabel = styled.div`
  display: inline-block;
  width: 2rem;
  height: 0.1875rem;
  margin-right: 0.5rem;
`;

const H4 = styled.h4`
  margin-bottom: 0.5rem !important;
`;

const CardInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardInfoInner = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled(AntdTag)`
  background-color: #f7f7f8 !important;
`;

const TagTimestamp = styled.span`
  margin-left: 7px;
  font-weight: 500;
`;

const AvatarsContainer = styled.div`
  display: flex;
`;

const CountContainer = styled.p`
  margin-right: 0.5rem;
  margin-bottom: 0;
`;

const Count = styled.span`
  margin-left: 0.25rem;
`;

const ScrollBars = styled(Scrollbars)`
  overflow-y: auto;
  flex: 1 1 auto;
`;

const BoardDropzone = styled.div`
  padding: 0 0.9375rem;
  padding-top: 0.9375rem;
  height: 100%;
`;

const InnerCardList = React.memo(function InnerCardList(props) {
  return props.contents?.map((item, index) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <DraggableContainer
          key={item.id}
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
        >
          <DraggableCard hoverable cover={null} onClick={() => props.cardData(item, props.listId)}>
            {item.cover ? <Image src={item.cover} alt="cover" /> : null}
            {item.labels.map((label) => (
              <Tooltip title={label} key={label}>
                {/* Dnamic styling */}
                <BoardLabel className={`board-label ${getLabelsColor(label)}`}></BoardLabel>
              </Tooltip>
            ))}
            <H4>{item.name}</H4>
            <CardInfoContainer>
              <CardInfoInner>
                {item.dueDate ? (
                  <Tag>
                    <CalendarOutlined />
                    <TagTimestamp>{moment(item.dueDate).format('DD MMMM')}</TagTimestamp>
                  </Tag>
                ) : null}
                <SubIndicator counts={item.comments.length} icon={<CommentOutlined />} />
                <SubIndicator counts={item.attachments.length} icon={<PaperClipOutlined />} />
              </CardInfoInner>
              <AvatarsContainer>
                {item.members.map((member) => (
                  <AssigneeAvatar key={member} id={member} size={25} chain />
                ))}
              </AvatarsContainer>
            </CardInfoContainer>
          </DraggableCard>
        </DraggableContainer>
      )}
    </Draggable>
  ));
});

function InnerList(props) {
  const { contents, dropProvided, cardData, listId } = props;

  return (
    <BoardDropzone ref={dropProvided.innerRef}>
      <InnerCardList cardData={cardData} contents={contents} listId={listId} />
      {dropProvided.placeholder}
    </BoardDropzone>
  );
}

function SubIndicator(props) {
  if (props.counts) {
    return (
      <CountContainer>
        {props.icon}
        <Count>{props.counts}</Count>
      </CountContainer>
    );
  }
  return null;
}

export default function BoardCard(props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    contents,
    useClone,
    cardData,
  } = props;
  return (
    <>
      <Droppable
        droppableId={listId}
        type={listType}
        ignoreContainerClipping={ignoreContainerClipping}
        isDropDisabled={isDropDisabled}
        isCombineEnabled={isCombineEnabled}
        renderClone={useClone}
      >
        {(dropProvided, dropSnapshot) => (
          <ScrollBars style={style} autoHide {...dropProvided.droppableProps}>
            {internalScroll ? (
              <div style={scrollContainerStyle}>
                <InnerList
                  contents={contents}
                  listId={listId}
                  cardData={cardData}
                  dropProvided={dropProvided}
                />
              </div>
            ) : (
              <InnerList
                contents={contents}
                listId={listId}
                cardData={cardData}
                dropProvided={dropProvided}
              />
            )}
          </ScrollBars>
        )}
      </Droppable>
    </>
  );
}
