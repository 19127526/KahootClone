import request from "../request";
import {
    ADD_PRESENTATION,
    DELETE_PRESENTATION,
    LIST_PRESENTATION_FROM_GROUP,
    PRESENTATION_DETAIL
} from "../../configs/url";

export  const getListPresentation = async({type,groupID}) =>{
    console.log(type)
    return await request.get(type === "public" ? ""  : LIST_PRESENTATION_FROM_GROUP + `?id=${groupID}`)

}

export const addNewPresentation = async ({groupID, name, email}) => {
    return await request.post(ADD_PRESENTATION, {
        "groupID": groupID,
        "name": name,
        "email": email
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
