import React from 'react';
import { Form, Input, Card, Row, Col, Menu, Dropdown } from 'antd';
import {
  FileTextOutlined,
  PaperClipOutlined,
  EllipsisOutlined,
  StarOutlined,
  DeleteOutlined,
  StarFilled,
} from '@ant-design/icons';

const Attachments = ({ data, cover, onCoverChange, removeCover }) => {
  return (
    <>
      {data?.length > 0 ? (
        <div className="d-flex">
          <div className="mr-3 font-size-md">
            <PaperClipOutlined />
          </div>
          <div className="w-100">
            <h4>Attachments</h4>
            <Row gutter={16}>
              {data?.map((elm) => (
                <Col sm={24} md={8} key={elm.id}>
                  <Card
                    bodyStyle={{ padding: 0 }}
                    cover={
                      <div className="p-2">
                        <img className="img-fluid" alt="example" src={elm.src} />
                      </div>
                    }
                  >
                    <div className="px-2 pb-2 d-flex align-items-center justify-content-between">
                      <div>
                        <h5 className="mb-0">{elm.name}</h5>
                        <span className="text-muted font-size-sm">{elm.size}</span>
                      </div>
                      <div className="d-flex">
                        {cover === elm.src ? (
                          <div className="mr-2 text-warning font-size-md">
                            <StarFilled />
                          </div>
                        ) : null}
                        <Dropdown
                          placement="bottomRight"
                          overlay={
                            <Menu>
                              <Menu.Item key="0" onClick={() => onCoverChange(elm.id)}>
                                <span>
                                  <>
                                    <StarOutlined />
                                    <span className="ml-2">Set Cover</span>
                                  </>
                                </span>
                              </Menu.Item>
                              <Menu.Item key="1" onClick={() => removeCover()}>
                                <span>
                                  <DeleteOutlined />
                                  <span className="ml-2">Remove</span>
                                </span>
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={['click']}
                        >
                          <a
                            className="font-size-md text-gray"
                            href="/#"
                            onClick={(e) => e.preventDefault()}
                          >
                            <EllipsisOutlined style={{ transform: 'rotate(90deg)' }} />
                          </a>
                        </Dropdown>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Attachments;
