import * as React from 'react';
import { memberAPI } from '../../api/member';
import { MemberEntity} from '../../model';
import { MemberHeader } from './memberHeader';
import { MemberRow } from './memberRow';

// export const MembersPage: React.StatelessComponent<{}> = () => {
//     return (
//         <div className="row">
//             <h2>Members Page</h2>
//         </div>
//     )
// }
//有状态的组件
// 泛型<>  props state也是接口 


interface State {
    // 一定要有member 否则报错
    members: MemberEntity[]
}
interface Props {

}

export class MembersPage extends React.Component<Props, State> {
    constructor (props) {
        super(props);
        this.state = {
            members: []
        }
    }
    public componentDidMount () {
        memberAPI.fetchMembers()
            .then((members) => { 
                this.setState({
                    members
                })
            })
    }
    // 公开的方法 要加public
    public render () {
        return (
            <div>
                <table className="table">
                    <MemberHeader />
                    <tbody>
                        {
                            // this.state.members.map(MemberRow)
                            this.state.members.map((member) => 
                                <MemberRow key={member.id} member={member} />
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

// const MemberRow = (member: MemberEntity) => {
//     return (
//         <tr key={member.id}>
//             <td>
//                 <img src={member.avatar_url} alt="" className="avatar"/>
//             </td>
//             <td><span>{member.id}</span></td>
//             <td><span>{member.login}</span></td>
//         </tr>
//     )
// }