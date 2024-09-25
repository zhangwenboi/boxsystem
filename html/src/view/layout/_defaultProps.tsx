import {
    SmileFilled,
} from '@ant-design/icons';

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/home',
                name: '欢迎',
                icon: <SmileFilled />,
                component: './home',
            }
        ],
    },
    location: {
        pathname: '/',
    },

};