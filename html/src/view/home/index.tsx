import { StatisticCard } from "@ant-design/pro-components"
import { EllipsisOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import request from "../../api"
import { intervalRequest } from "../../uitls"
export default () => {
    const [systemInfo, setSystemInfo] = useState<SystemInfoMationData>()
    const getData = () => {
        request.get<ResponseData<SystemInfoMationData>>('/api/system-info').then((res) => {

            if (res.code === 200) {
                setSystemInfo(res.data)
                console.log("🚀 ~ res.data:", res.data);
            }

        })
    }
    useEffect(() => {
        intervalRequest(getData, 2000, () => {
            return true
        })
    }, [])

    return <div>
        <StatisticCard
            title="大盘趋势"

            tooltip="大盘说明"
            style={{ maxWidth: 480 }}
            extra={<EllipsisOutlined />}
            chart={
                <img
                    src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
                    alt="柱状图"
                    width="100%"
                />
            }
        />
    </div>
}