// 404 页面 使用tailwindcss样式
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const App: React.FC = () => (
    <Result
        status="404"
        title="404"
        subTitle="哦吼,找不到页面了!"
        extra={<Link to="/">
            <Button type="primary">返回首页</Button>
        </Link>}
    />
);

export default App;


