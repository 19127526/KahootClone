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

export const startPresentation = async ({presentationId, slideId})=>{
    return await request.post(START_PRESENTATION, {
        "presentationId": presentationId,
        "slideId": slideId
    })
}

export const closePresentation = async ({presentationId})=>{
    return await request.post(STOP_PRESENTATION, {
        "presentationId": presentationId
    })
}


export const nextSlide = async ({slideId}) => {
    return await request.get(NEXT_SLIDE + `?slideId=${slideId}`)
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