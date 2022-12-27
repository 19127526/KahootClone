import request from "../request";
import {
    ADD_NEW_SLIDE,
    ADD_OPTION, CHANGE_OPTION, CHANGE_QUESTION, DETAIL_SLIDE,
    NEXT_SLIDE,
    REMOVE_OPTION,
    REMOVE_SLIDE,
    START_PRESENTATION, STOP_PRESENTATION
} from "../../configs/url";

export const addNewSlide = async ({id,question, genre}) =>{
    return await request.post(ADD_NEW_SLIDE,{"presentation":id,"text":question, "genreQuestion": genre})
}

export const addNewParagraphSlide = async ({id,text,heading, genre}) =>{
    return await request.post(ADD_NEW_SLIDE,{"presentation":id,"text":text,heading:heading, "genreQuestion": genre})
}

export const deleteSlide = async ({id}) => {
    return await request.post(REMOVE_SLIDE, {
        "id": id
    })
}

export const getDetailSlide = async ({id}) => {
    return await request.get(DETAIL_SLIDE, {
        params: {
            id: id
        }
    })
}

export  const addOption = async ({option,slideId}) => {
    return await request.post(ADD_OPTION, {
        "text": option,
        "slideId": slideId
    })
}

export const removeOption  = async ({optionID}) => {
    return await request.post(REMOVE_OPTION, {
        "id": optionID,
    })
}

export const startPresentation = async ({presentationId, mode, email,groupId})=>{
    return await request.post(START_PRESENTATION, {
        "presentationId": presentationId,
        "mode": mode,
        "email": email,
        "groupId": groupId
    })
}

export const closePresentation = async ({presentationId, owner, groupId})=>{
    return await request.post(STOP_PRESENTATION, {
        "presentId": presentationId,
        "email": owner,
        "groupId": groupId
    })
}


export const nextSlide = async ({presentationId, email, groupId, action}) => {
    return await request.post(NEXT_SLIDE , {
        presentId: presentationId,
        email: email,
        groupId: groupId,
        action: action
    })
}

export const changeOption = async ({id,text}) => {
    return await request.post(CHANGE_OPTION, {
        "id": id,
        "text": text
    })
}

export const changeQuestion  = async ({id, text}) => {
    return await request.post(CHANGE_QUESTION, {
        "id": id,
        "text": text
    })
}

export const updateHeader  = async ({id, heading, text}) => {
    return await request.post(CHANGE_QUESTION, {
        "id": id,
        "text": text,
        "heading": heading
    })
}