import request from "../request";
import {
    ACCEPT_INVITATION,
    ADD_PRESENTATION, ASK_QUESTION,
    CHOOSE_OPTIONS_USER,
    COLLABORATING_INVITATION,
    DELETE_PRESENTATION,
    DISLIKE_QUESTION,
    GET_CHAT,
    JOIN_PRESENTATION,
    LIKE_QUESTION,
    LIST_INVITATION,
    LIST_PRESENTATION,
    LIST_PRESENTATION_FROM_GROUP,
    MARK_QUESTION,
    PRESENTATION_DETAIL,
    REJECT_INVITATION,
    UNMARK_QUESTION
} from "../../configs/url";

export  const getListPresentation = async({email}) =>{

    return await request.get(LIST_PRESENTATION + `?email=${email}`)

}

export  const getInvitation = async({email}) =>{

    return await request.get(LIST_INVITATION + `?email=${email}`)

}

export const addNewPresentation = async ({name, email}) => {
    return await request.post(ADD_PRESENTATION, {
        namePresentation: name,
        email: email,
    })
}

export const acceptInvitation = async ({id, email}) => {
    return await request.post(ACCEPT_INVITATION, {
        id: id,
        email: email,
    })
}


export const rejectInvitation = async ({id, email}) => {
    return await request.post(REJECT_INVITATION, {
        id: id,
        email: email,
    })
}


export  const getPresentationDetail = async ({id, email}) =>  {
    return await request.get(PRESENTATION_DETAIL, {
        params: {
            "id": id,
            "email": email
        }
    })
}


export  const inviteCollaboration = async ({id, email, emailInvited}) =>  {
    return await request.post(COLLABORATING_INVITATION, {
        id: id,
        email: email,
        emailInvited: emailInvited
    })
}

export const deletePresentation = async ({id, email}) => {
    return await request.post(DELETE_PRESENTATION, {
       "id": id,
        "email": email
    })
}


export const postAnswer=async ({answer,slideId, presentId,email})=>{
    // console.log(answer,question,email)
    return await request.post(CHOOSE_OPTIONS_USER,{votes:[answer],slideId:slideId,presentId: presentId,email:email});
}

export const joinPresentation=async ({preId,email,groupId})=>{
    return await request.post(JOIN_PRESENTATION, {
        "presentId" : preId,
        "email": email,
        "groupId": groupId
    });
}


export const getChat=async ({presentId,size,offset})=>{
    return await request.get(GET_CHAT,{
        params: {
           "presentId":presentId,
            "size":size,
            "offset":offset
        }
    })
}

export const askQuestion=async ({slideId,presentId,question,email})=>{
    return await request.post(ASK_QUESTION,{
        "slideId":slideId,
        "presentId":presentId,
        "question":question,
        "email":email
    })
}


export const likeQuestion=async ({questionId,email})=>{
    return await request.post(LIKE_QUESTION,{
        "questionId":questionId,
        "email":email
    })
}

export const dislikeQuestion=async ({questionId,email})=>{
    return await request.post(DISLIKE_QUESTION,{
        "questionId":questionId,
        "email":email
    })
}

export const markQuestion=async ({questionId})=>{
    return await request.post(MARK_QUESTION,{
        "questionId":questionId,
    })
}

export const unmarkQuestion=async ({questionId})=>{
    return await request.post(UNMARK_QUESTION,{
        "questionId":questionId,
    })
}