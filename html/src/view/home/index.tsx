import { ProCard, Statistic, StatisticCard } from "@ant-design/pro-components"
import { EllipsisOutlined } from "@ant-design/icons"
import { useEffect, useMemo, useState } from "react"
import request from "../../api"
import { GroupedColumn, Line } from '@ant-design/charts';
import RcResizeObserver from 'rc-resize-observer';
import dayjs from "dayjs"
import { Dropdown } from "antd";
import type { MenuProps } from 'antd'
const waitTimer = async (time: number) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}

const formatData = (oldData: FormatSystemInfoMationData, data: SystemInfoMationData, time: string): FormatSystemInfoMationData => {
    return {
        ...data,
        cpu: {
            ...oldData?.cpu,
            [time]: data.cpu
        },
        mem: {
            ...oldData?.mem,
            [time]: data.mem
        },
        disk: {
            ...oldData?.disk,
            [time]: data.disk
        },
        networkSpeed: {
            ...oldData?.networkSpeed,
            [time]: data?.networkSpeed.map((item) => {
                return {
                    'downtotal': item.rx_bytes / 1024,
                    'uptotal': item.tx_bytes / 1024,
                    'title': item.iface,
                    'label': time,
                    'value': item.rx_sec / 1024,
                    'upvalue': item.tx_sec / 1024,
                }
            })
        },
        networkInterfaces: {
            ...oldData?.networkInterfaces,
            [time]: data.networkInterfaces
        }
    }
}

export default () => {
    const [systemInfo, setSystemInfo] = useState<FormatSystemInfoMationData>()
    const [currentSystemInfo, setCurrentSystemInfo] = useState<SystemInfoMationData>()
    const [responsive, setResponsive] = useState(false)


    const getData = async () => {
        const res = await request.get<ResponseData<NetworkSpeed[]>>('/api/system-info')
        if (res.code === 200) {
            const time = new Date().toLocaleTimeString()
            setSystemInfo(systemInfo => {
                return formatData(systemInfo, res.data, time)
            })
            setCurrentSystemInfo(res.data)
            await waitTimer(3000)
            getData()
        }
    }

    // useEffect(() => {
    //     getData()
    // }, [])


    return <div>
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width < 596);
            }}
        >
            <ProCard
                title="数据概览"
                extra={dayjs().format('YYYY-MM-DD HH:mm:ss')}
                split={responsive ? 'horizontal' : 'vertical'}
                headerBordered
                bordered
            >
                <ProCard split="horizontal">
                    <ProCard split="horizontal">
                        <ProCard split="vertical">
                            <StatisticCard
                                statistic={{
                                    title: '昨日全部流量',
                                    value: 234,
                                    description: (
                                        <Statistic
                                            title="较本月平均流量"
                                            value="8.04%"
                                            trend="down"
                                        />
                                    ),
                                }}
                            />
                            <StatisticCard
                                statistic={{
                                    title: '本月累计流量',
                                    value: 234,
                                    description: (
                                        <Statistic title="月同比" value="8.04%" trend="up" />
                                    ),
                                }}
                            />
                        </ProCard>
                        <ProCard split="vertical">
                            <StatisticCard
                                statistic={{
                                    title: '运行中实验',
                                    value: '12/56',
                                    suffix: '个',
                                }}
                            />
                            <StatisticCard
                                statistic={{
                                    title: '历史实验总数',
                                    value: '134',
                                    suffix: '个',
                                }}
                            />
                        </ProCard>
                    </ProCard>
                    <LineChat />
                </ProCard>
                <StatisticCard
                    title="流量占用情况"
                    chart={
                        <img
                            src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
                            alt="大盘"
                            width="100%"
                        />
                    }
                />
            </ProCard>
        </RcResizeObserver>



    </div>
}


const LineChat = () => {
    const [items, setItems] = useState<MenuProps["items"]>()
    const [active, setActive] = useState<string>()
    const [data, setData] = useState({})

    const getData = async () => {
        const res = await request.get<ResponseData<NetworkSpeed[]>>('/api/system-network-info')
        if (res.code === 200) {
            const time = new Date().toLocaleTimeString()
            if (!items && items?.length !== res.data.length) {
                setActive(res.data?.[0].iface)
                setItems(res.data.map(e => {
                    return {
                        label: e.iface,
                        key: e.iface
                    }
                }))
            }
            setData(data => {
                res.data?.forEach(item => {
                    const prodata = {
                        'downtotal': (item.rx_bytes / 1024).toFixed(2),
                        'title': item.iface,
                        'label': time,
                        'value': (item.rx_sec / 1024).toFixed(2),
                    }
                    const prodata2 = {
                        'value': (item.tx_sec / 1024).toFixed(2),
                        'label': time,
                        'title': item.iface,

                        'uptotal': (item.tx_bytes / 1024).toFixed(2),
                    }
                    if (data[item.iface]) {
                        if (data[item.iface].length >= 12) {
                            data[item.iface]?.push(prodata, prodata2)?.splice(0, 2)
                        } else {
                            data[item.iface].push(prodata, prodata2)

                        }
                    } else {
                        data[item.iface] = [prodata, prodata2]
                    }

                })
                return data
            })
            await waitTimer(1000)
            getData()
        }
    }

    useEffect(() => {
        getData()
    }, [])



    const config = {
        data: data[active],
        title: {
            visible: true,
            text: '带数据点的折线图',
        },
        xField: 'label',
        yField: 'value',
        yAxis: { min: 0 },
        color: ['#1ca9e6', '#f88c24'],
        groupField: 'time',
    };
    return <StatisticCard
        title="流量走势"
        extra={<Dropdown menu={{
            items, onClick: (e) => {
                setActive(e.key)
            }
        }}>
            <a onClick={(e) => e.preventDefault()}>
                <EllipsisOutlined />
                更多
            </a>
        </Dropdown>}
        chart={
            <GroupedColumn   {...config} onlyChangeData={true} />
        }
    />


}




