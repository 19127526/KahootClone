export const SERVER_URL="http://localhost:8080"
export const CLIENT_URL="http://localhost:3000"

export const CREATE_GROUP = "/room/generate"
export const LIST_GROUP_CREATED_API = "account/listRoomCreated"
export const LIST_GROUP_JOINED_API = "account/listRoomJoined"
export const DETAIL_GROUP_API="/room/detail?name="
export const INVITE_MEMBER_INTO_GROUP="/room/join"


export const REDIRECT_URI="/login/google/redirect"
export const HOME_URI="/home"
export const GROUP_URI = "/group"
export const DETAIL_GROUP_URI="/group/detail/"
export const VERIFY_INVITE_URI="/verify/:name/:code/:email"


export const INVITE_URL_REDIRECT=CLIENT_URL+"/verify";
export const CLIENT_URL_REDIRECT=CLIENT_URL+REDIRECT_URI;

export const CLIENT_LOGIN_GOOGLE=SERVER_URL+"/login";
export const CLIENT_JOIN_GROUP_URL=CLIENT_URL+DETAIL_GROUP_URI;


export const GET_LOGIN_OAUTH2="/account/login";






