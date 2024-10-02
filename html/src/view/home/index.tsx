import { ProCard, ProColumns, ProTable, StatisticCard } from "@ant-design/pro-components"
import { EllipsisOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import request from "../../api"
import { Line } from '@ant-design/charts';
import RcResizeObserver from 'rc-resize-observer';
import dayjs from "dayjs"
import { Dropdown } from "antd";
import type { MenuProps, StatisticProps } from 'antd'

import CountUp from "react-countup";
const waitTimer = async (time: number) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}
/**
 * 将 storage size 转换为人类可读的格式
 * @example "1.23GiB" => { value: 1.23, unit: "GB" }
 * @param {string} data
 * @returns {{ value: number, unit: string }}
 */

function convertStorageUnit(data) {

    if (!data) return {
        value: 0,
        unit: 'KB'
    }
    const units = {
        "GiB": Math.pow(2, 30),
        "GB": Math.pow(10, 9),
        "MiB": Math.pow(2, 20),
        "MB": Math.pow(10, 6),
        "KiB": Math.pow(2, 10),
        "KB": Math.pow(10, 3)
    };
    const value = data?.match(/\d/g)?.[0]
    const fromUnit = data?.match(/[a-zA-Z]+/g)?.[0]

    if (value && fromUnit) {
        const result = value * units[fromUnit] / units[fromUnit?.replace('i', '')];
        return {
            value: result?.toFixed(2),
            unit: fromUnit?.replace('i', '')
        };
    } else {
        return {
            value: 0,
            unit: 'KB'
        }
    }
}


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





const formatter: StatisticProps['formatter'] = (data: string) => {
    if (data) {
        const value = data?.split(/\ /g) || [0, 'KB']
        return <CountUp end={value[0] as number} suffix={value[1] as string} separator="," decimals={2} />
    }
    return '0KB'

};
export default () => {
    const [currentSystemInfo, setCurrentSystemInfo] = useState<any>()

    const [responsive, setResponsive] = useState(false)
    const [tableData, setTableData] = useState<HomeTableData[]>([])

    const getData = async () => {
        const res = await request.get<ResponseData<NetworkSpeed[]>>('/api/system-info-to-yes')
        if (res.code === 200) {
            setCurrentSystemInfo(res.data)
        }
    }
    useEffect(() => {
        getData()
    }, [])


    const todayDownloadTotal = tableData?.[tableData.length - 2]?.rx

    const memeryTotal = isNaN(currentSystemInfo?.mem?.used / currentSystemInfo?.mem?.total) ? 0 : (currentSystemInfo?.mem?.used / currentSystemInfo?.mem?.total) * 100

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
            dataIndex: 'avg. rate',
        },
    ]
    const monthTotal = tableData?.find(e => e.day === 'estimated')?.rx
    return <div>
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width < 596);
            }}
        >
            <ProCard
                title="数据概览"
                extra={<>
                    {dayjs().format('YYYY-MM-DD HH:mm:ss')}
                </>}
                split={responsive ? 'horizontal' : 'vertical'}
                headerBordered
                bordered
            >
                <ProCard split="horizontal"  >
                    <ProCard split="horizontal">
                        <ProCard split={responsive ? 'horizontal' : 'vertical'}>
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
                                    title: '本月流量',
                                    value: monthTotal,

                                }}
                            />
                        </ProCard>
                        <ProCard split={responsive ? 'horizontal' : 'vertical'}>
                            <StatisticCard
                                statistic={{
                                    title: '内存占用',
                                    value: memeryTotal,
                                    precision: 2,
                                    suffix: '%',

                                }}
                            />
                            <StatisticCard
                                statistic={{
                                    title: 'CPU',
                                    value: `${currentSystemInfo?.cpu?.cores || 0}`,
                                    suffix: '核',

                                }}
                            />
                        </ProCard>
                    </ProCard>
                    <ProTable
                        toolbar={{
                            title: '近日流量'
                        }}
                        options={responsive ? false : {
                            density: true,
                            fullScreen: true,
                            reload: true,
                        }}
                        tooltip="注意GIB不等于GB," request={async () => {
                            const res = await request.get<ResponseData<HomeTableData[]>>("/api/system-info-all")
                            if (res.code === 200) {
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

                <LineChat />

            </ProCard>
        </RcResizeObserver>



    </div>
}


const LineChat = () => {
    const [items, setItems] = useState<MenuProps["items"]>()
    const [active, setActive] = useState<string>('eth0')
    const [data, setData] = useState({})

    // const
    const getData = async () => {
        const time = dayjs().format('HH:mm:ss')
        const res = await request.get<ResponseData<NetworkSpeed[]>>('/api/system-network-info')
        if (res.code === 200) {
            setItems(items => {
                if (!items?.length || items.length !== res.data?.length) {
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
                let total = 0

                res.data?.forEach(item => {
                    total += item.rx_bytes

                    const prodata = {
                        'total': (item.rx_bytes / 1024).toFixed(2),
                        'title': item.iface,
                        'label': time,
                        'value': parseInt((item.rx_sec / 1024).toFixed(2)),
                        'category': '下载'
                    }
                    const prodata2 = {
                        'value': parseInt((item.tx_sec / 10240).toFixed(2)),
                        'label': time,
                        'title': item.iface,
                        'total': (item.tx_bytes / 10240).toFixed(2),
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
                更多网卡
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
            title: '上传下载速度',
            formatter: (data) => {
                return {
                    name: data.category,
                    value: formatbyKBMBGB(data.value).value + formatbyKBMBGB(data.value).unit
                }
            }
        },
        color: ['#1979C9', '#D62A0D', '#FAA219'],
        smooth: true,
        animation: false,
    };
    return <Line {...config} />
}




