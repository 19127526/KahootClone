import request from "../request";
import {ADD_NEW_SLIDE, REMOVE_SLIDE} from "../../configs/url";

export const addNewSlide = async ({id,question}) =>{
    return await request.post(ADD_NEW_SLIDE,{"presentationID":id,"text":question})
}

export const deleteSlide = async ({id}) => {
    return await request.post(REMOVE_SLIDE, {
        "id": id
    })
}
