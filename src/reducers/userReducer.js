import {signupApi} from '../apis/apis';
import { loginApi } from '../apis/apis';



const ACTION = {
    SIGNUP: 'SIGNUP',
    LOGIN:  'LOGIN',
}


 const   actionCreator = (type, fn = () => {}, payload)=> {

    return async(dispatch) =>{
        try{

        let data = await fn(payload);


        dispatch({type, data});
        }catch(err) {
            console.log(err);
        }
    }
}


export const signupActionCreator = (payload) =>{
    return actionCreator(ACTION.SIGNUP, signupApi, payload);
}
export const loginActionCreator = (payload)=> {
    return actionCreator(ACTION.LOGIN , loginApi, payload);
}


 const initialState =  {
    full_name : "",
    username: "",
    password: "",
    signupFlag : false,
    loginFlag : false,
}

export const userReducer = (state = initialState, action) =>{
    let {type, data} = action;
switch(type) {
    case 'SIGNUP': 
           state.signupFlag = data.data;
           return {...state}
    case 'LOGIN':
            state.loginFlag = true;
            return {...state, ...data.data}
  
        
        default:return {...state}
}
}