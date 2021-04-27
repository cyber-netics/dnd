import React from 'react';
import { Form, Input, Button } from 'antd';

const AddCardForm = ({ onSubmit }) => {
  return (
    <Form layout="inline" name="add-card-ref" onFinish={onSubmit}>
      <Form.Item name="cardTitle" label="Card Title">
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

export default AddCardForm;
