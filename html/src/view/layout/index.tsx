import {
    CaretDownFilled,
    DoubleRightOutlined,
    PlusCircleFilled,
    SearchOutlined,
} from '@ant-design/icons';
import {
    PageContainer,
    ProCard,
    ProConfigProvider,
    ProLayout,
} from '@ant-design/pro-components';
import {
    ConfigProvider,
    Divider,
    Input,
    Popover,
    theme,
} from 'antd';
import React, { useState } from 'react';
import defaultProps from './_defaultProps';
import { Outlet } from 'react-router';

const Item: React.FC<{ children: React.ReactNode }> = (props) => {
    const { token } = theme.useToken();
    return (
        <div

            style={{
                width: '33.33%',
            }}
        >
            {props.children}
            <DoubleRightOutlined
                style={{
                    marginInlineStart: 4,
                }}
            />
        </div>
    );
};

const List: React.FC<{ title: string; style?: React.CSSProperties }> = (
    props,
) => {
    const { token } = theme.useToken();

    return (
        <div
            style={{
                width: '100%',
                ...props.style,
            }}
        >
            <div
                style={{
                    fontSize: 16,
                    color: token.colorTextHeading,
                    lineHeight: '24px',
                    fontWeight: 500,
                    marginBlockEnd: 16,
                }}
            >
                {props.title}
            </div>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                {new Array(6).fill(1).map((_, index) => {
                    return <Item key={index}>具体的解决方案-{index}</Item>;
                })}
            </div>
        </div>
    );
};





export default () => {

    const [pathname, setPathname] = useState('/home');
    if (typeof document === 'undefined') {
        return <div />;
    }
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProConfigProvider hashed={false}>
                <ConfigProvider
                    getTargetContainer={() => {
                        return document.getElementById('test-pro-layout') || document.body;
                    }}
                >
                    <ProLayout
                        prefixCls="my-prefix"

                        {...defaultProps}
                        location={{
                            pathname,
                        }}
                        token={{
                            header: {
                                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                            },
                        }}
                        siderMenuType="group"
                        menu={{
                            collapsedShowGroupTitle: true,
                        }}

                        title="系统信息"


                        menuItemRender={(item, dom) => (
                            <div
                                onClick={() => {
                                    setPathname(item.path || '/home');
                                }}
                            >
                                {dom}
                            </div>
                        )}
                    >
                        <PageContainer

                            subTitle="下行盒子拉取查看"

                        >
                            <ProCard
                                style={{
                                    minHeight: 800,
                                }}
                            >
                                <Outlet />
                            </ProCard>
                        </PageContainer>


                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
};