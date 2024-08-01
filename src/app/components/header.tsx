"use client"

import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader: React.FC = () => {
  return (
    <Header  style={{display: 'flex', alignItems: 'center' ,width:'100%',backgroundColor:'white'}}>
      <Space>
        <CheckCircleOutlined style={{ fontSize: '24px',color:'blue'}} />
        <Title level={2} style={{ margin: 1}}>
          Todo App
        </Title>
      </Space>
    </Header>
  );
};

export default AppHeader;
