import * as React from 'react';
// 每一个组件引入 react 就可以引入组件
// switch添加很多路由
import { Route, HashRouter, Switch, Router } from 'react-router-dom';
import { App } from './app';
import {About, MembersPage}from './components';

// 类型约束 外界传参
export const AppRouter:React.StatelessComponent<{}> = () => {
    return (
        <HashRouter>
            <div className="container-fluid">
                <Route component={App} />
                {/* 只匹配一个 */}
                <Switch>
                    {/* 只匹配/ */}
                    <Route exact path="/" component={About} />
                    <Route exact path="/about" component={About} />
                    <Route  path="/members" component={MembersPage} />
                </Switch>
            </div>
        </HashRouter>
    );
}