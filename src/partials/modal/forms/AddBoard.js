import React from 'react';
import { Form, Input, Button } from 'antd';

const AddBoardForm = ({ onSubmit, data }) => {
  return (
    <Form layout="inline" name="add-board-ref" onFinish={onSubmit}>
      <Form.Item
        name="boardTitle"
        label="Board Title"
        rules={[
          () => ({
            validator(rule, value) {
              if (data[value]) {
                return Promise.reject('Board already exist!');
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBoardForm;
