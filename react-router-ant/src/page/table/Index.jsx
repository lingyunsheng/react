

import React, { Component } from 'react'
import { Table } from 'antd'

function Message(props) {

    const { msg } = props
    const { time } = msg
    return (
        <li>
            {time}
        </li>
    )
}
class Index extends React.Component {
    state = {
        msgs: [
            {
                time: '2017-6-18'
            },
            {
                time: '2018-6-18'
            }
        ]
    }
    // 每隔3s 放一个时间对象进去

    handlePushTime = () => {
        // 获取当前时间
        const date = new Date();
        // 转换本地时间格式
        const dateLocal = date.toLocaleTimeString()
        // 浅拷贝
        const msgs = this.state.msgs.slice(0)
        this.setState({
            msgs: msgs.concat({ time: dateLocal })
        })
    }
    componentDidMount() {
        setInterval(() => {
            this.handlePushTime()
        }, 3000)
    }

    render() {
        const { location } = this.props
        const { msgs } = this.state
        console.log(this.props)
        const data = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                // 数据渲染方式
                render: text => <a href="#">{text}</a>
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
            // 添加
            {
                title: '操作',
                key: 'key',
                // text 对应上面name中的text，则表示这一个参数 record表示一整行
                render: (text, record) => {
                    console.log(text,record)
                    return (
                        <div>
                            <button>
                                <a href="#">+</a>
                            </button>
                            <button>
                                <a href="#">-</a>
                            </button>
                            正在操作的key:{record.key}
                        </div>
                    )
                }
            }
        ];

        return (
            <div>
                {location.search}
                {
                    msgs.map((msg, index) => {
                        return (
                            < Message key={index} msg={msg} />
                        )
                    })
                }
                <Table dataSource={data} columns={columns} />
            </div>
        )
    }
}
export default Index;