import { DrawerForm, ModalForm, ProCard, ProColumns, ProFormDependency, ProFormDigit, ProFormDigitRange, ProFormSelect, ProFormSlider, ProFormSwitch, ProFormText, ProFormTimePicker, ProTable, StatisticCard } from "@ant-design/pro-components"
import { EllipsisOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import request from "../../api"
import { Line } from '@ant-design/charts';
import RcResizeObserver from 'rc-resize-observer';
import dayjs from "dayjs"
import { Dropdown, message } from "antd";
import type { MenuProps, StatisticProps } from 'antd'

import CountUp from "react-countup";
const waitTimer = async (time: number) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}

const SettingCard = ({ width }) => {
    return <ModalForm<Setting>
        title="设置模式"
        layout="horizontal"
        labelCol={{ span: 8 }}
        request={async () => {
            const res = await request.get<ResponseData<Setting>>('/api/conf_info/')
            if (res.code === 1000) {
                return res.data
            }
        }}
        width={width}
        trigger={
            <a className="mx-2"> 系统设置 </a>
        }
        onFinish={async (data) => {
            const res = await request.post('/api/update_conf/', {
                data: data
            })
            if (res.code === 1000) {
                message.success(`修改成功, 稍后生效！`);
            } else {
                message.error('修改失败，请稍后再试');
            }
        }}
        submitter={{
            render(props, dom) {
                return <div className=" flex gap-x-2 justify-center w-full ">
                    {dom}
                </div>
            },
        }}
    >
        {/* <ProFormDependency name={['repeat']}  >
        {
            ({ repeat }) => {
                return <ProFormTimePicker.RangePicker
                    width={'md'}
                    rules={repeat ? [] : [
                        {
                            required: true
                        }
                    ]} tooltip="只会在此时间段内运行" name='time' disabled={repeat} label="运行时间" fieldProps={{
                        format: 'HH:mm'
                    }} />
            }
        }
    </ProFormDependency> */}

        <ProFormSelect name="video_type"
            label="下行流量类型"
            tooltip="下行基本都是省外业务，只是业务不同"
            options={[
                {
                    label: '抖音快手视频',
                    value: 'data'
                },

                {
                    label: '抖音直播',
                    value: 'dlive'
                },
                {
                    label: '快手直播',
                    value: 'klive'
                },
            ]}
            width={'md'}
        />
        <ProFormDependency name={['video_type']}  >
            {
                ({ video_type }, form) => {
                    const ifVideo = video_type === 'data'
                    ifVideo && form.getFieldValue('video_thread') > 6 && form.setFieldsValue({ video_thread: 6 })
                    return <ProFormSelect
                        name="video_thread"
                        label={`${ifVideo ? '同时下载线程' : '同时直播线程'}`}
                        tooltip="同时进行几个下载，越多越快"
                        width={'md'}
                        options={new Array(ifVideo ? 10 : 20).fill(0).map((_, index) => ({ label: index + 1 + ' 个线程', value: index + 1 }))} />
                }
            }
        </ProFormDependency>

        <ProFormText
            name="max_flow"
            label="当天最大流量"
            tooltip="当天下载的最大流量(GB)"
            allowClear={false}
            fieldProps={{
                addonAfter: "GB/天"
            }}
            width={'md'} />
        <ProFormText
            name="max_mb"
            label="线程最大速度"
            allowClear={false}
            fieldProps={{
                addonAfter: "MB/秒"
            }}
            tooltip="每个线程下载时的最大速度(MB/s)"
            width={'md'} />

        {/* <ProFormSwitch name="repeat" label='持续运行' tooltip="开启后将全天运行" fieldProps={{
        checkedChildren: "开启", unCheckedChildren: "关闭"
    }} /> */}

    </ModalForm>
}

const formatter: StatisticProps['formatter'] = (data: string) => {
    if (data) {
        const value = data?.split(/\ /g) || [0, 'KB']
        return <CountUp end={value[0] as number} suffix={value[1] as string} separator="," decimals={2} />
    }
    return '0KB'

};
export default () => {
    const [currentSystemInfo, setCurrentSystemInfo] = useState<any>()
    const [responsive, setResponsive] = useState(1920)
    const [tableData, setTableData] = useState<HomeTableData[]>([])

    const getData = async () => {
        const res = await request.get<ResponseData<NetworkSpeed[]>>('/api/system_status')
        if (res.code === 1000) {
            setCurrentSystemInfo(res.data)
        }
    }
    useEffect(() => {
        getData()
    }, [])


    const todayDownloadTotal = tableData?.[0]?.rx

    const column: ProColumns<HomeTableData>[] = [
        {
            title: '日期',
            dataIndex: 'day',
        },
        {
            title: '下载',
            dataIndex: 'rx',
        },
        {
            title: '平均速率',
            tooltip: '下载速率统计可能不准确，仅供参考',
            dataIndex: 'avg',
        },
    ]
    const monthTotal = tableData?.reduce((a, b) => a + Number(b.rx.match(/\d+\.\d+/g)?.[0]), 0)
    return <div>
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width);
            }}
        >
            <ProCard
                title="数据概览"
                extra={<>
                    <SettingCard width={responsive > 1000 ? 800 : 'md'} />
                    {responsive > 1280 && dayjs().format('YYYY-MM-DD HH:mm:ss')}
                </>}
                split={responsive < 1280 ? 'horizontal' : 'vertical'}
                headerBordered
                bordered
            >
                <ProCard split="horizontal"  >
                    <ProCard split="horizontal">
                        <ProCard split={responsive < 596 ? 'horizontal' : 'vertical'}>
                            <StatisticCard
                                statistic={{
                                    title: `今日下载`,
                                    value: todayDownloadTotal,
                                    precision: 3,
                                    formatter: formatter,
                                }}
                            />
                            <StatisticCard
                                statistic={{
                                    title: '近30日流量',
                                    value: monthTotal,
                                    suffix: 'GB',
                                    precision: 2,
                                }}
                            />
                        </ProCard>
                        <ProCard split="vertical">
                            <StatisticCard
                                statistic={{
                                    title: '内存占用',
                                    value: currentSystemInfo?.memory_used_percent || 0,
                                    precision: 2,
                                    suffix: '%',
                                }}
                            />
                            <StatisticCard
                                statistic={{
                                    title: 'CPU占用',
                                    value: `${currentSystemInfo?.cpu_percent || 0}`,
                                    suffix: '%',
                                    precision: 2,
                                }}
                            />
                        </ProCard>
                    </ProCard>
                    <ProTable
                        headerTitle="近30日流量"
                        options={responsive < 596 ? false : {
                            density: true,
                            fullScreen: true,
                            reload: true,
                        }}

                        tooltip="数据更新有延迟，仅供参考" request={async () => {
                            const res = await request.get<ResponseData<HomeTableData[]>>("/api/month_info")
                            if (res.code === 1000) {
                                setTableData(res.data)
                                return {
                                    data: res.data,
                                    success: true
                                }
                            }
                            return {
                                data: [],
                                success: false
                            }
                        }} search={false} columns={column} pagination={{
                            hideOnSinglePage: true,
                            defaultPageSize: 7
                        }} />
                </ProCard>

                <StatisticCard
                    title="流量走势"
                    extra={false}
                    chart={
                        <ColumnChart />
                    }
                />

            </ProCard>
        </RcResizeObserver>



    </div>
}





const ColumnChart = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            const res = await request.get<ResponseData<NetworkSpeed[]>>('/api/network_speed')
            if (res.code === 1000) {
                setData((rdata) => {
                    return [
                        ...rdata,
                        {
                            label: dayjs().format('HH:mm:ss'),
                            value: Number(res.data),
                        }
                    ]
                })
                await waitTimer(2000)
                getData()
            }
        }
        getData()
    }, [])
    const config = {
        data: data || [],
        xField: 'label',
        yField: 'value',
        // seriesField: 'category',
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) => `${v}MB`
            },
        },
        tooltip: {
            title: '下载速度',
            formatter: (data) => {
                return {
                    name: data.label,
                    value: data.value
                }
            }
        },
        color: ['#1979C9', '#D62A0D', '#FAA219'],
        smooth: true,
        animation: false,

    };
    return <Line  {...config} />
}




