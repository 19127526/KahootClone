import {
    ASSIGN_ROLE, DELETE_GROUP,
    DETAIL_GROUP_API,
    INVITE_MEMBER_INTO_GROUP, JOIN_INTO_GROUP, KICK_MEMBER_IN_GROUP_URI,
    LIST_GROUP_CREATED_API,
    LIST_GROUP_JOINED_API, REMOVE_MEMBER
} from "../../configs/url";
import request from "../request";

export const getDetailGroup = async ({email, id}) => {
    const params = {
        id: id,
        email: email
    };
    return await request.get(DETAIL_GROUP_API,{
        params
    });
}

export const postInviteInMember = async ({id, email, code}) => {
    return await request.post(JOIN_INTO_GROUP, {id: id, email: email, code: code});
}

export const getListGroup = async ({type, email}) => {
    return await request.get(type == "joined" ? LIST_GROUP_JOINED_API + `?email=${email}` : LIST_GROUP_CREATED_API + `?email=${email}`)
}


export const removeGroup = async ({id, email}) => {
    return await request.post(DELETE_GROUP, {id: id, email: email});
}

export const assignRole = async({id, email, assignedEmail,role})=>{
    return await request.post(ASSIGN_ROLE, {
        "id": id,
        "email": email,
        "emailAssign": assignedEmail,
        "role": role
    });

}

export const removeMember = async({id, email}) => {
    return await request.post(REMOVE_MEMBER, {
        "id": id,
        "email": email
    });
}