import request from "../request";
import {
    ADD_NEW_SLIDE,
    ADD_OPTION,
    NEXT_SLIDE,
    REMOVE_OPTION,
    REMOVE_SLIDE,
    START_PRESENTATION
} from "../../configs/url";

export const addNewSlide = async ({id,question}) =>{
    return await request.post(ADD_NEW_SLIDE,{"presentationId":id,"text":question})
}

export const deleteSlide = async ({id}) => {
    return await request.post(REMOVE_SLIDE, {
        "id": id
    })
}

export  const addOption = async ({option,questionId}) => {
    return await request.post(ADD_OPTION, {
        "text": option,
        "question": questionId
    })
}

export const removeOption  = async ({optionID, questionID}) => {
    return await request.post("https://spring-heroku.herokuapp.com/option/delete", {
        "id": optionID,
        "question": questionID
    })
}

export const startPresentation = async ({presentationId, slideId})=>{
    return await request.post(START_PRESENTATION, {
        "presentationId": presentationId,
        "slideId": slideId
    })
}

export const nextSlide = async ({slideId}) => {
    return await request.get(NEXT_SLIDE + `?slideId=${slideId}`)
}