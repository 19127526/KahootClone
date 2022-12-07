import request from "../request";
import {
    ADD_PRESENTATION,
    DELETE_PRESENTATION,
    LIST_PRESENTATION_FROM_GROUP,
    PRESENTATION_DETAIL
} from "../../configs/url";

export  const getListPresentation = async({type,groupID}) =>{

    return await request.get(type === "public" ? ""  : LIST_PRESENTATION_FROM_GROUP + `?id=${groupID}&isPublic=0`)

}

export const addNewPresentation = async ({groupID, name, email,isPublic}) => {
    return await request.post(ADD_PRESENTATION, {
        groupId: groupID,
        name: name,
        email: email,
        isPublic: false
    })
}

export  const getPresentationDetail = async ({id}) =>  {
    return await request.get(PRESENTATION_DETAIL + `?id=${id}`)
}

export const deletePresentation = async ({id}) => {
    return await request.post(DELETE_PRESENTATION, {
       "id": id
    })
}
