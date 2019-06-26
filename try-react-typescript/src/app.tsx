import * as React from 'react';
import {Header, About} from './components';

// :约束 类型  数据传参
export const App:React.StatelessComponent<{}>=
()=>{
    return (
        <div>
            <Header/>
            <About/>
        </div>
    )
}