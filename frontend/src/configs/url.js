export const SERVER_URL="https://spring-heroku.herokuapp.com"
// export const SERVER_URL="http://localhost:8080"
export const CLIENT_URL="http://localhost:3000"

//SERVER
export const CREATE_GROUP = "/room/generate"

export const LIST_GROUP_CREATED_API = "account/listRoomCreated"
export const LIST_GROUP_JOINED_API = "account/listRoomJoined"
export const DETAIL_GROUP_API="/room/detail?name="
export const INVITE_MEMBER_INTO_GROUP="/room/join"
export const REGISTER_URi="/account/auth/register"
export const VALIDATE_OTP_URI="/account/auth/validate/otp"
export const LOGIN_NORMAL="/account/auth/loginTraditional"
export const LIST_PRESENTATION_FROM_GROUP = "/presentation/list/group"
export const ADD_PRESENTATION = "/presentation/add"
export const DELETE_PRESENTATION = "/presentation/delete"
export const PRESENTATION_DETAIL = "/presentation/details"
export const ADD_NEW_SLIDE = "/slide/add"
export const REMOVE_SLIDE = "/slide/delete"
export const ADD_OPTION = "/option/add"
export const REMOVE_OPTION = "/option/delete"
export const CHOOSE_OPTIONS_USER="/slide/play"
export const GET_QUESTION_OPTION_USER="/play/connect"
export const START_PRESENTATION = "/presentation/present/start"
export const STOP_PRESENTATION = "/presentation/present/stop"
export const NEXT_SLIDE = "/play/nextSlide"
export const CHANGE_OPTION = "/option/update"
export const CHANGE_QUESTION = "/slide/update"


//CLIENT ROUTE
export const REDIRECT_URI="/login/oauth2/redirect"
export const HOME_URI="/home"
export const GROUP_URI = "/group"
export const DETAIL_GROUP_URI="/group/detail/"
export const KICK_MEMBER_IN_GROUP_URI="/room/remove"
export const VERIFY_INVITE_URI="/verify/:name/:code/:email"
export const INFORMATION_LOGIN_GOOGLE_URI="account/auth/loginSocial"
export const PUBLIC_GROUP_URI="/group/public";
export const PRESENTATION_URI="/presentation/"
export const PRESENTATION_SEE_URI="/presentation/:preId/see"
export const PRESENTATION_EDIT_URI="/presentation/:id/edit"
export const PRESENTATION_SHOW_URI="/presentation/:id/show"
export const FORGOT_PASSWORD_URI="/forgot"

export const PRESENTATION_PUBLIC="/present/public"
export const PRESENTATION_PRIVATE="/present/private"
export const REGISTER_URI="/register"
export const LOGIN_URI="/login"
export const MEMBER_URI="/group/member"
export const INVITE_URL_REDIRECT=CLIENT_URL+"/verify";
export const CLIENT_URL_REDIRECT=CLIENT_URL+REDIRECT_URI;
export const CLIENT_LOGIN_GOOGLE=SERVER_URL+"/login";
export const CLIENT_JOIN_GROUP_URL=CLIENT_URL+DETAIL_GROUP_URI;


export const GET_LOGIN_OAUTH2="/account/auth/loginSocial";


/*
// auth
export const REGISTER="/auth/register"
export const VALIDATE_OTP="/auth/validate/otp"
export const LOGIN_NORMAL="/auth/loginTraditional"
export const LOGIN_OAUTH2="/auth/loginSocial";
// group
export const DETAIL_GROUP="/group/detail/"
export const CREATE_GROUP = "/group/generate"
export const UPDATE_GROUP="/group/update"
export const DELETE_GROUP="/group/delete"
export const REMOVE_MEMBER_GROUP="/group/remove/member"
export const JOIN_GROUP="/group/join"
// presentation
export const DETAIL_PRESENTATION = "/presentation/details"
export const ADD_PRESENTATION = "/presentation/add"
export const DELETE_PRESENTATION = "/presentation/delete"
export const CLEAR_ADVANCED_PRESENTATION = "/presentation/update/clearAdvanced"
// realtime present
export const START_PRESENTATION = "/present/start"
export const STOP_PRESENTATION = "/present/stop"
export const CHANGE_SLIDE_PRESENTATION = "/present/changeSlide";
export const CONNECT_PRESENTATION="/present/connect"
export const CHOSE_OPTION_PRESENTATION = "/present/option/chose"
// slide
export const NEW_SLIDE = "/slide/add"
export const DELETE_SLIDE = "/slide/delete"
export const DETAIL_SLIDE = "/slide/detail"
export const UPDATE_SLIDE = "/slide/update"
// option
export const NEW_OPTION = "/option/add"
export const DELETE_OPTION = "/option/delete"
export const UPDATE_OPTION = "/option/update"
// account
export const UPDATE_ACCOUNT = "/account/update"
export const LIST_GROUP_CREATED_ACCOUNT = "/account/listRoomCreated";
export const LIST_GROUP_JOINED_ACCOUNT = "/account/listRoomJoined";
*/