
import {
    PageContainer,
    ProConfigProvider,
    ProLayout,
} from '@ant-design/pro-components';
import {
    ConfigProvider,
} from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';
import { Outlet } from 'react-router';







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

                            <Outlet />
                        </PageContainer>


                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    );
};