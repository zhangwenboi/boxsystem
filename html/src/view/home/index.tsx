import { ProCard, Statistic, StatisticCard } from "@ant-design/pro-components"
import { EllipsisOutlined } from "@ant-design/icons"
import { useEffect, useMemo, useState } from "react"
import request from "../../api"
import { Column, Line } from '@ant-design/charts';
import RcResizeObserver from 'rc-resize-observer';
import dayjs from "dayjs"
import { Dropdown } from "antd";
import type { MenuProps, StatisticProps } from 'antd'
import React from "react";
import CountUp from "react-countup";
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
const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," decimals={2} />
);
export default () => {
    const [systemInfo, setSystemInfo] = useState<FormatSystemInfoMationData>()
    const [currentSystemInfo, setCurrentSystemInfo] = useState<any>()

    const [responsive, setResponsive] = useState(false)


    const getData = async () => {
        const res = await request.get<ResponseData<NetworkSpeed[]>>('/api/system-info-to-yes')
        if (res.code === 200) {
            setCurrentSystemInfo(res.data)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const formatbyKBMBGB = (value: number) => {
        if (value < 1024) {
            return {
                value: value,
                unit: 'KB'
            }
        } else if (value < 1024 * 1024) {
            return {
                value: (value / 1024).toFixed(2),
                unit: 'MB'
            }
        } else if (value < 1024 * 1024 * 1024) {
            return {
                value: (value / 1024 / 1024).toFixed(2),
                unit: 'GB'
            }
        } else {
            return {
                value: (value / 1024 / 1024 / 1024).toFixed(2),
                unit: 'TB'
            }
        }
    }
    const todayDownloadTotal = formatbyKBMBGB(currentSystemInfo?.total?.recivedTotal / 1024)
    const memeryTotal = isNaN(currentSystemInfo?.mem?.used / currentSystemInfo?.mem?.total) ? 0 : (currentSystemInfo?.mem?.used / currentSystemInfo?.mem?.total) * 100
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
                                    title: `今日下载`,
                                    value: todayDownloadTotal?.value,
                                    precision: 3,
                                    formatter: formatter,
                                    suffix: todayDownloadTotal?.unit
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
                                    title: '系统内存占用',
                                    value: memeryTotal,
                                    precision: 2,
                                    suffix: '%',
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

    // const
    const getData = async () => {
        const res = await request.get<ResponseData<NetworkSpeed[]>>('/api/system-network-info')
        if (res.code === 200) {
            const time = new Date().toLocaleTimeString()

            setItems(items => {
                if (!items?.length || items.length !== res.data?.length) {
                    setActive(res.data?.[0].iface)
                    return res.data.map(e => {
                        return {
                            label: e.iface,
                            key: e.iface
                        }
                    })
                }
                return items
            })

            setData(data => {
                const newData = Object.assign({}, data)
                res.data?.forEach(item => {
                    const prodata = {
                        'total': (item.rx_bytes / 1024).toFixed(2),
                        'title': item.iface,
                        'label': time,
                        'value': parseInt((item.rx_sec / 1024).toFixed(2)),
                        'category': '下载'
                    }
                    const prodata2 = {
                        'value': parseInt((item.tx_sec / 1024).toFixed(2)),
                        'label': time,
                        'title': item.iface,
                        'total': (item.tx_bytes / 1024).toFixed(2),
                        'category': '上传'
                    }
                    if (newData[item.iface]) {
                        newData[item.iface].push(prodata, prodata2)
                    } else {
                        newData[item.iface] = [prodata, prodata2]
                    }

                })

                return newData
            })
            await waitTimer(3000)
            getData()

        }
    }

    useEffect(() => {
        getData()
    }, [])




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
            <ColumnChart data={data} active={active} />
        }
    />
}



const ColumnChart = ({ data, active }) => {
    const config = {
        data: data[active] || [],
        xField: 'label',
        yField: 'value',
        seriesField: 'category',
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) => `${v}KB`
            },
        },
        tooltip: {
            title: '上传下载速度(KB) 1MB = 1024KB',
        },
        color: ['#1979C9', '#D62A0D', '#FAA219'],
        smooth: true,
        animation: false,
    };
    return <Line {...config} />
}




