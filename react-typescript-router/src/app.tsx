import * as React from 'react';
import { Header } from './components'
// Stateless可以接受外界传参
export const App: React.StatelessComponent<{}> = (props) => {
    return (
        <Header />
    )
}