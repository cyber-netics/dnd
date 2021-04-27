import styled from 'styled-components';
import { Form as AntdForm, Avatar as AntdAvatar } from 'antd';

export const Form = styled(AntdForm)`
  width: 100%;
`;

export const FormItem = styled(AntdForm.Item)`
  margin-bottom: 0;
`;

export const Scrumboard = styled.div`
  width: 100%;
  flex: 1 1 auto;
  flex-direction: column;
  display: flex;
  height: calc(100vh - 130px - 25px - 25px);
`;

export const Avatar = styled(AntdAvatar)`
  cursor: pointer;
`;
