import * as React from 'react';
import { MemberEntity } from '../../model';
interface Props {
    member: MemberEntity
}
// 内部没有状态 接受外界传的props 只要涉及类型检测就给typescipt   {member}解构外面传来的member
export const MemberRow: React.StatelessComponent<Props> = ({ member }) => {
    return (
        <tr>
            <td><img src={member.avatar_url} /></td>
            <td><span>{member.id}</span></td>
            <td><span>{member.login}</span></td>
        </tr>
    );
}