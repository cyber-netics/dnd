import React from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';

import { modalModeTypes } from '../utils';
import { scrumboardData } from '../scrumboard/ScrumboardData';

import AddCardForm from './forms/AddCard';
import AddBoardForm from './forms/AddBoard';
import UpdateCardForm from './forms/UpdateCardBoard';

const InnerContainer = styled.div`
  padding: ${(props) => props.modalMode && '0.5rem 0'};
`;

const getModalTitle = (type) => {
  switch (type) {
    case modalModeTypes(0):
      return 'New card';
    case modalModeTypes(2):
      return 'New board';
    default:
      return;
  }
};

const ModalForm = ({ visible, modalMode, cardData, listId, onClose, onModalSubmit }) => {
  const showClosable = modalMode === modalModeTypes(1) ? false : true;
  const modalWidth = modalMode === modalModeTypes(1) ? 800 : 425;

  const submit = (values, mode) => {
    onModalSubmit(values, mode);
    onClose();
  };

  return (
    <Modal
      title={getModalTitle(modalMode)}
      visible={visible}
      closable={showClosable}
      footer={null}
      width={modalWidth}
      style={modalMode === modalModeTypes(1) ? { top: 20 } : null}
      destroyOnClose
      onCancel={() => onClose()}
    >
      <div
        style={
          modalMode === modalModeTypes(1)
            ? { maxHeight: '85vh', overflowY: 'auto', overflowX: 'hidden' }
            : null
        }
      >
        <InnerContainer modalMode={modalMode === modalModeTypes(1)}>
          {(() => {
            switch (modalMode) {
              case modalModeTypes(0):
                return <AddCardForm onSubmit={(values) => submit(values, modalModeTypes(0))} />;
              case modalModeTypes(1):
                return (
                  <UpdateCardForm
                    cardData={cardData}
                    listId={listId}
                    onSubmit={(values) => submit(values, modalModeTypes(1))}
                  />
                );
              case modalModeTypes(2):
                return (
                  <AddBoardForm
                    data={scrumboardData}
                    onSubmit={(values) => submit(values, modalModeTypes(2))}
                  />
                );
              default:
                return null;
            }
          })()}
        </InnerContainer>
      </div>
    </Modal>
  );
};

export default ModalForm;
