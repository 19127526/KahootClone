import request from "../request";
import {
    ACCEPT_INVITATION,
    ADD_PRESENTATION, CHOOSE_OPTIONS_USER, COLLABORATING_INVITATION,
    DELETE_PRESENTATION, JOIN_PRESENTATION, LIST_INVITATION, LIST_PRESENTATION,
    LIST_PRESENTATION_FROM_GROUP,
    PRESENTATION_DETAIL, REJECT_INVITATION
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


export const postAnswer=async ({answer,question,email})=>{
    console.log(answer,question,email)
    return await request.post(CHOOSE_OPTIONS_USER,{answers:[answer],question:question,email:email});
}

export const joinPresentation=async ({preId,email,groupId})=>{
    return await request.post(JOIN_PRESENTATION, {
        "presentationId" : preId,
        "email": email,
        "groupId": groupId
    });
}