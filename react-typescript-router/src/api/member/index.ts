import { members } from './mockData'; //假数据
import { MemberEntity } from '../../model';
 
//函数要声明返回值 什么都不返回就:void  promise的话还要约束自己返回的类型
const fetchMembers = (): Promise<MemberEntity[]> => {
    return Promise.resolve(members);
}
export const memberAPI = {
    fetchMembers
}
