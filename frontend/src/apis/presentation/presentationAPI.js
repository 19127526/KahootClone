import request from "../request";
import {
    ADD_PRESENTATION, CHOOSE_OPTIONS_USER,
    DELETE_PRESENTATION, GET_QUESTION_OPTION_USER,
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


export const postAnswer=async ({answer,question,email})=>{
    console.log(answer,question,email)
    return await request.post(CHOOSE_OPTIONS_USER,{answers:[answer],question:question,email:email});
}

export const getListQuestionAndOptionByPreId=async ({preId})=>{
    return await request.get(GET_QUESTION_OPTION_USER+`?presentationId=${preId}`);
}