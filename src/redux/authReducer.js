import axios from 'axios';

const initialState = {
    //Can initialize user as null, instead of empty object, to register as falsy value.
    user: {},
    loading: false
    // isLoggedIn: false
    // I deleted isLoggedIn from switch statement below.
}

const LOGIN_USER  = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_USER    = 'GET_USER';

export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export function getUser(){
    console.log("fired getUser")
    const user = axios.get('/auth/user')
        .then(res => res.data)
        .catch(err => console.log(err));
    return {
        type: GET_USER,
        payload: user
    }
}

export default function authReducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type){
        case LOGIN_USER:
            console.log('hit login user redux', payload)
            return {...state, user: payload }
        case LOGOUT_USER:
            return {...state, ...payload}
        case GET_USER + "_PENDING":
            return {...state, loading: true}
        case GET_USER + "_FULFILLED":
            console.log('payload authReducer', payload)
            return {...state, user: payload}
        case GET_USER + "_REJECTED":
            return state
        default:
            return state
    }
}


