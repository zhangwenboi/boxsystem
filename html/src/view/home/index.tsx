import { DrawerForm, ModalForm, ProCard, ProColumns, ProFormDependency, ProFormSlider, ProFormSwitch, ProFormTimePicker, ProTable, StatisticCard } from "@ant-design/pro-components"
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
                    <ModalForm
                        title="设置运行时间"
                        layout="horizontal"
                        width={responsive < 596 ? '80%' : '60%'}
                        trigger={
                            <a className="mx-2"> 设置 </a>
                        }
                        onFinish={async (data) => {
                            const res = await request.post('/api/system-exec-time-piker', {
                                data: data
                            })
                            message.success(res.data);
                        }}
                        submitter={{
                            render(props, dom) {
                                return <div className=" flex gap-x-2 justify-center w-full ">
                                    {dom}
                                </div>
                            },
                        }}
                    >
                        <ProFormDependency name={['repeat']}  >
                            {
                                ({ repeat }) => {
                                    return <ProFormTimePicker.RangePicker rules={repeat ? [] : [
                                        {
                                            required: true
                                        }
                                    ]} tooltip="只会在此时间段内运行" name='time' disabled={repeat} label="运行时间" fieldProps={{
                                        format: 'HH:mm'
                                    }} />
                                }
                            }
                        </ProFormDependency>

                        <ProFormSwitch name="repeat" label='持续运行' tooltip="开启后将全天运行" fieldProps={{
                            checkedChildren: "开启", unCheckedChildren: "关闭"
                        }} />

                    </ModalForm>
                    {dayjs().format('YYYY-MM-DD HH:mm:ss')}
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
                        toolbar={{
                            title: '近日流量'
                        }}
                        options={responsive > 596 ? false : {
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

                        }} />
                </ProCard>

                <CurrentLine />

            </ProCard>
        </RcResizeObserver>



    </div>
}




const CurrentLine = () => {

    return <StatisticCard
        title="流量走势"
        extra={false}
        chart={
            <ColumnChart />
        }
    />
};


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




