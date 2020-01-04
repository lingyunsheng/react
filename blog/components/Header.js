import React from 'react'
import '../public/style/components/header.css'
import {Row, Col, Menu, Icon} from 'antd'

const Header = () => (
    <div className="header">
        <Row type="flex" justify="center" style={{height:'50px',lineHeight:'50px'}}>
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">地平线</span>
                <span className="header-title">太阳升起的那方，地平线</span>
            </Col>
            <Col xs={0} sm={0} md={14} lg={8} xl={6} className="menu-div">
                <Menu mode="horizontal" style={{background:'#303133',border:'0',color:'#fff'}}>
                    <Menu.Item key="home">
                        <Icon type="home" />
                         首页
                    </Menu.Item>
                    <Menu.Item key="video">
                        <Icon type="youtube" />
                         视频
                    </Menu.Item>
                    <Menu.Item key="life">
                        <Icon type="smile" />
                         生活
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Header