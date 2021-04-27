import React from 'react';
import { CommentOutlined } from '@ant-design/icons';
import { Avatar, Input } from 'antd';
import moment from 'moment';

const Comments = ({ data = [], ref, onSubmit }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="d-flex">
          <div className="mr-3 font-size-md">
            <CommentOutlined />
          </div>
          <div className="w-100">
            <h4 className="mb-3">Comments ({data.length})</h4>
            {data.map((elm) => (
              <div className="mb-3 d-flex" key={elm.id}>
                <div className="mt-2">
                  <Avatar src={elm.src} />
                </div>
                <div className="ml-2 bg-gray-lightest p-3 rounded w-100">
                  <div className="d-flex align-items-center mb-2">
                    <h4 className="mb-0">{elm.name}</h4>
                    <span className="mx-1"> | </span>
                    <span className="font-size-sm text-dark">
                      {moment(elm.date).format('DD MMMM YYYY')}
                    </span>
                  </div>
                  <p className="mb-0">{elm.message}</p>
                </div>
              </div>
            ))}
            <div className="mb-3 d-flex">
              <Avatar src="/img/avatars/thumb-1.jpg" />
              <div className="ml-2 bg-gray-lightest p-3 rounded w-100">
                <Input
                  ref={ref}
                  placeholder="Write comment"
                  suffix={
                    <div
                      onClick={() => onSubmit()}
                      className="cursor-pointer font-weight-semibold text-primary"
                    >
                      Send
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Comments;
